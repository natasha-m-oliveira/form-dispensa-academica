import ValidateCpf from './modules/validate-cpf.js';
import SelectBox from './modules/select-box.js';
import Autocomplete from './modules/autocomplete.js';

const selectBox = new SelectBox(
  '.multiselect',
  '#select-box',
  '#seach-subject',
  '#checkboxes',
  '.option',
);
selectBox.init();

const validateCpf = new ValidateCpf('#cpf');
validateCpf.init();

const courses = [
  'Administração',
  'Engenharia Civil',
  'Sistemas de Informação',
  'Enfermagem',
  'Análise e Desenvolvimento de Sistemas',
];
const autocomplete = new Autocomplete('#course', courses);
autocomplete.init();
