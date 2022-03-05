const selectBox = document.querySelector('#select-box');
const seachSubject = document.querySelector('#seach-subject');
let expanded = false;

function showOptions() {
  const checkboxes = document.querySelector('#checkboxes');
  if (!expanded) {
    checkboxes.style.display = 'block';
    expanded = true;
  } else {
    checkboxes.style.display = 'none';
    expanded = false;
  }
}

function searchOptions() {
  const input = document.querySelector('#seach-subject');
  const filter = input.value.toUpperCase();
  const options = document.querySelectorAll('.option');
  options.forEach((option) => {
    if (option.innerText.toUpperCase().includes(filter)) {
      option.style.display = 'flex';
    } else {
      option.style.display = 'none';
    }
  });
}
selectBox.addEventListener('click', showOptions);
seachSubject.addEventListener('keyup', searchOptions);
