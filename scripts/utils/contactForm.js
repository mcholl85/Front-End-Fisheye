// displayModal opens the form's modal
function displayModal() {
  const modal = document.getElementById('contact_modal');
  const body = document.querySelector('body');
  const main = document.getElementById('main');
  const firstNmame = document.getElementById('firstname');

  // hide non-interactive content from the accessibility API
  main.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'false');

  body.classList.add('noscroll'); // hide scrollbar
  modal.style.display = 'block'; // display the modal
  firstNmame.focus();

  // add the possibility to close with the space key
  document.addEventListener('keyup', (e) => {
    if (e.key === 'escape') {
      this.closeModal();
      console.log('test');
    }
  });
}

// closeModal close the form's modal
function closeModal() {
  const modal = document.getElementById('contact_modal');
  const body = document.querySelector('body');
  const main = document.getElementById('main');

  // hide non-interactive content from the accessibility API
  main.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');

  body.classList.remove('noscroll');
  modal.style.display = 'none'; // hide the modal
}

// removeMsgError if msgError exists
function removeMsgError(element) {
  if (element.parentElement.hasAttribute('data-error')) {
    element.parentElement.removeAttribute('data-error');
    element.parentElement.removeAttribute('data-error-visible');
  }
}

// setMsgError uses the css properties to display errors
function setMsgError(element, name) {
  element.parentElement.setAttribute(
    'data-error',
    `Veuillez entrer un ${name} valide`,
  );
  element.parentElement.setAttribute('data-error-visible', 'true');
}

// firstNameIsValid checks if firstname has at least 2 letters
// return boolean
function firstNameIsValid(firstname) {
  const regName = /^[A-zÀ-ú -]{2,}$/;
  return regName.test(firstname.value);
}

// lastNameIsValid checks if firstname has at least 2 letters
// return boolean
function lastNameIsValid(lastname) {
  const regName = /^[A-zÀ-ú -]{2,}$/;
  return regName.test(lastname.value);
}

// emailIsValid checks if email is valid
// return boolean
function emailIsValid(email) {
  const regEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEmail.test(email.value);
}

// messageIsValid checks if message is not empty
// return boolean
function messageIsValid(message) {
  if (message.value !== '') {
    return true;
  }
  return false;
}

// validate checks if all inputs values are valid
// send the response in the console
function validate(event) {
  event.preventDefault();

  const form = event.target;
  const firstname = form[0];
  const lastname = form[1];
  const email = form[2];
  const message = form[3];

  if (messageIsValid(message)) {
    removeMsgError(message);
  } else {
    setMsgError(message, 'message');
  }
  if (firstNameIsValid(firstname)) {
    removeMsgError(firstname);
  } else {
    setMsgError(firstname, 'prénom');
  }
  if (lastNameIsValid(lastname)) {
    removeMsgError(lastname);
  } else {
    setMsgError(lastname, 'nom');
  }
  if (emailIsValid(email)) {
    removeMsgError(email);
  } else {
    setMsgError(email, 'email');
  }
  if (
    messageIsValid(message) &&
    firstNameIsValid(firstname) &&
    lastNameIsValid(lastname) &&
    emailIsValid(email)
  ) {
    console.log(`Bonjour ${firstname.value} ${lastname.value}, 
Voici votre message :
${message.value}`);
    closeModal();
    form.reset(); // erase all input's values
  }
}
