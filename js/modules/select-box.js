import debounce from './debounce.js';
import outsideClick from './outsideclick.js';

export default class SelectBox {
  constructor(container, selectBox, seachItem, checkboxes, options) {
    this.container = document.querySelector(container);
    this.selectBox = document.querySelector(selectBox);
    this.seachItem = document.querySelector(seachItem);
    this.checkboxes = document.querySelector(checkboxes);
    this.options = document.querySelectorAll(options);
    this.expanded = false;
    this.activeClass = 'active';
  }
  // Filtra as opções de acordo com o valor digitado
  searchOptions() {
    const index = this.options.length - 1;
    const filter = this.seachItem.value.toUpperCase();
    let isEmpty = false;
    this.options.forEach((option) => {
      if (option.innerText.toUpperCase().includes(filter)) {
        option.style.display = 'flex';
        isEmpty = false;
      } else {
        option.style.display = 'none';
        isEmpty = true;
      }
    });
    if (isEmpty) {
      if (!this.emptyElement) {
        this.emptyElement = document.createElement('span');
        this.emptyElement.classList.add('empty-message');
        this.emptyElement.innerText = 'Sem dados para exibir';
        this.options[index].parentElement.insertBefore(
          this.emptyElement,
          this.options[index].nextElementSibling,
        );
      }
    } else {
      if (this.emptyElement) {
        this.emptyElement.remove();
        this.emptyElement = null;
      }
    }
  }
  // Torna visível as apções e adiciona o evento keyup ao input search
  showOptions(event) {
    event.preventDefault();
    this.checkboxes.classList.toggle(this.activeClass);
    if (!this.expanded) {
      this.expanded = true;
      this.seachItem.addEventListener('keyup', this.searchOptions);
    } else {
      this.expanded = false;
      this.seachItem.removeEventListener('keyup', this.searchOptions);
    }
    outsideClick(this.container, ['click'], () => {
      this.checkboxes.classList.remove(this.activeClass);
    });
  }
  bindEvents() {
    this.showOptions = this.showOptions.bind(this);
    this.searchOptions = debounce(this.searchOptions.bind(this), 200);
  }
  init() {
    if (this.selectBox && this.seachItem) {
      this.bindEvents();
      this.selectBox.addEventListener('click', this.showOptions);
      return this;
    }
  }
}
