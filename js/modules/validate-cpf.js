import debounce from './debounce.js';

export default class ValidateCpf {
  constructor(element) {
    this.element = document.querySelector(element);
  }
  clean(cpf) {
    return cpf.replace(/\D/g, '');
  }
  build(cpf) {
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  }
  format({ target }) {
    const cleanCpf = this.clean(target.value);
    this.element.value = this.build(cleanCpf);
  }
  validate(cpf) {
    // Verifica se o cpf é diferente de vazio e se possui 11 digítos.
    const matchCpf = cpf.match(/(?:\d{3}[-.\s]?){3}\d{2}/g);
    if (!matchCpf || matchCpf[0] !== cpf) return false;

    // Verifica se é uma sequência de valores repetidos.
    const repeatedValues = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ];
    repeatedValues.forEach((value) => {
      if (value === cpf) return false;
    });

    let sum;
    let digit;

    //Valida o 1º digíto.
    sum = 0;
    // charAt seria o mesmo que cpf[i].
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    // Verifica se o resultado da soma é diferente do 1º digíto.
    if (digit !== parseInt(cpf.charAt(9))) return false;

    // Valida o 2º digíto.
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    // Verifica se o resultado da soma é diferente do 2º digíto.
    if (digit != parseInt(cpf.charAt(10))) return false;

    return true;
  }
  validateWhenChanging({ target }) {
    if (this.validate(this.clean(target.value))) {
      target.classList.add('success');
      target.classList.remove('error');
      target.nextElementSibling.classList.remove('active');
    } else {
      target.classList.add('error');
      target.classList.remove('success');
      target.nextElementSibling.classList.add('active');
    }
  }
  bindEvents() {
    this.validateWhenChanging = this.validateWhenChanging.bind(this);
    this.format = debounce(this.format.bind(this), 200);
  }

  addEvents() {
    this.element.addEventListener('change', this.validateWhenChanging);
    this.element.addEventListener('keyup', this.format);
  }
  addError() {
    const errorElement = document.createElement('span');
    errorElement.classList.add('error-text');
    errorElement.innerText = 'CPF Inválido';
    this.element.parentElement.insertBefore(
      errorElement,
      this.element.nextElementSibling,
    );
  }
  init() {
    if (this.element) {
      this.bindEvents();
      this.addEvents();
      this.addError();
      return this;
    }
  }
}
