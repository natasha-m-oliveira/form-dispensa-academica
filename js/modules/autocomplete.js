import debounce from './debounce.js';
import outsideClick from './outsideclick.js';

export default class Autocomplete {
  constructor(input, list) {
    this.input = document.querySelector(input);
    this.list = list;
  }
  closeAllSuggestions(element) {
    // Remove todas as sugestões exceto a passada como argumento
    this.suggestions = document.querySelectorAll('.autocomplete-items');
    this.suggestions.forEach((suggestion) => {
      if (element !== suggestion && element !== this.input) suggestion.remove();
    });
  }
  setValue({ target }) {
    this.input.value = target.innerText;
    this.closeAllSuggestions();
  }
  filterList() {
    const filter = this.inputData.toUpperCase();
    // Pecorre os itens da lista
    this.list.forEach((item) => {
      if (item.toUpperCase().includes(filter)) {
        this.suggestion = document.createElement('span');
        this.suggestion.classList.add('autocomplete-items');
        this.suggestion.innerText = item;
        this.suggestion.addEventListener('click', this.setValue);
        this.container.appendChild(this.suggestion);
      }
    });
    this.suggestions = document.querySelectorAll('.autocomplete-items');
    if (!this.suggestions.length) {
      this.suggestion = document.createElement('span');
      this.suggestion.classList.add('autocomplete-items');
      this.suggestion.innerText = 'Sem sugestões';
      this.container.appendChild(this.suggestion);
    }
  }
  activeClass() {
    if (!this.suggestions.length) return false;
    this.suggestions.forEach((suggestion) => {
      suggestion.classList.remove('active');
    });
    if (this.currentFocus >= this.suggestions.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = this.suggestions.length - 1;
    this.suggestions[this.currentFocus].classList.add('active');
  }
  nav(event) {
    const keyCode = event.keyCode;
    if (keyCode === 40) {
      // Se a seta para baixo for pressionada incrementamos o valor de currentFocus
      this.currentFocus++;
      this.activeClass();
    } else if (keyCode === 38) {
      // Se a seta para cima for pressionada decrementamos o valor de currentFocus
      this.currentFocus--;
      this.activeClass();
    } else if (keyCode === 13) {
      // Se o Enter for pressionado previnimos o envio do formulário
      event.preventDefault();
      if (this.currentFocus > -1) {
        // Simulamos o clica no item atual
        if (this.suggestions) this.suggestions[this.currentFocus].click();
      }
    }
  }
  createElement() {
    this.inputData = this.input.value;
    // Limpa todas as sugestções
    this.closeAllSuggestions();
    if (!this.inputData.length) {
      if (this.currentFocus) {
        this.container.remove();
        this.container = null;
      }
      return false;
    }
    this.currentFocus = -1;
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    // Cria o container que armazenará as sugestões
    this.container = document.createElement('div');
    this.container.id = 'autocomplete-list';
    this.container.classList.add('autocomplete-list');
    this.input.parentElement.insertBefore(
      this.container,
      this.input.nextElementSibling,
    );
    this.filterList();
    this.input.addEventListener('keydown', this.nav);
    outsideClick(this.container, ['click'], () => {
      this.container.remove();
      this.input.removeEventListener('keydown', this.nav);
    });
  }
  bindEvents() {
    this.createElement = this.createElement.bind(this);
    this.setValue = this.setValue.bind(this);
    this.nav = debounce(this.nav.bind(this), 100);
  }
  init() {
    if (this.input && this.list) {
      this.bindEvents();
      this.input.addEventListener('input', this.createElement);
      return this;
    }
  }
}
