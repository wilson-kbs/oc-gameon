const MIN_PARTICIPANTS = 0;
const MAX_PARTICIPANTS = 99;

function editNav() {
  document.getElementById("myTopnav")
    .classList.toggle("responsive");
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalForm = document.querySelector("#modal-form");
const closeBtns = document.querySelectorAll(".close, .close-modal-confirm");
const modalConfirm = document.querySelector(".modal-confirm");
const body = document.querySelector("body");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtns.forEach((el)=> el.addEventListener("click", closeModal));

// submit form event
modalForm.addEventListener("submit", submitForm);


// launch modal form
function launchModal() {
  modalbg.classList.remove("none")
  body.classList.add("no-scroll")
}

// close modal form
function closeModal() {
  modalbg.classList.add("none")
  modalForm.classList.remove("none")
  modalConfirm.classList.add("none")
  body.classList.remove("no-scroll")
}

// submit form
function submitForm(e) {
  e.preventDefault();
  if (validate(modalForm, formData)) {
    modalForm.reset();
    modalForm.classList.add("none")
    modalConfirm.classList.remove("none")
  }
}

/**
 * validate modal form
 * @param {HTMLFormElement} modalForm
 * @param {NodeListOf<Element>} formDataElement
 * @return {boolean}
 */
function validate(modalForm, formDataElement) {
  const formData = Object.values(formDataElement);

  let valid = true;

  try {
    // validate first name
    const firstNameEl = modalForm.elements["first"];
    const firstNameEntry = formData.find((entry) => entry.contains(firstNameEl));
    const validFirstName = checkLength(firstNameEl.value, 2);
    firstNameEntry.setAttribute("data-error-visible", `${!validFirstName}`);
    if (!validFirstName) valid = false;

    // validate last name
    const lastNameEl = modalForm.elements["last"];
    const lastNameEntry = formData.find((entry) => entry.contains(lastNameEl));
    const validLastName = checkLength(lastNameEl.value, 2);
    lastNameEntry.setAttribute("data-error-visible", `${!validLastName}`);
    if (!validLastName) valid = false;

    // validate email
    const emailEl = modalForm.elements["email"];
    const emailEntry = formData.find((entry) => entry.contains(emailEl));
    const validEmail = checkEmail(emailEl.value);
    emailEntry.setAttribute("data-error-visible", `${!validEmail}`);
    if (!validEmail) valid = false;

    // validate birthdate
    const birthdateEl = modalForm.elements["birthdate"];
    const birthdateEntry = formData.find((entry) => entry.contains(birthdateEl));
    const validBirthdate = checkBirthdate(birthdateEl.value);
    birthdateEntry.setAttribute("data-error-visible", `${!validBirthdate}`);
    if (!validBirthdate) valid = false;

    // validate quantity
    const quantityEl = modalForm.elements["quantity"];
    const quantity = parseInt(quantityEl.value);
    const quantityEntry = formData.find((entry) => entry.contains(quantityEl));
    const validQuantity = !isNaN(quantity) && quantity >= MIN_PARTICIPANTS && quantity <= MAX_PARTICIPANTS;
    quantityEntry.setAttribute("data-error-visible", `${!validQuantity}`);
    if (!validQuantity) valid = false;

    // validate location
    const locations = Object.values(modalForm.elements["location"]);
    const locationEntry = formData.find((entry) => entry.contains(locations[0]));
    const validLocation = locations.some((location) => location.checked);
    locationEntry.setAttribute("data-error-visible", `${!validLocation}`);
    if (!validLocation) valid = false;

    // validate conditions
    const conditionsEl = modalForm.elements["checkbox1"];
    const conditionsEntry = formData.find((entry) => entry.contains(conditionsEl));
    const validConditions = conditionsEl.checked;
    conditionsEntry.setAttribute("data-error-visible", `${!validConditions}`);
    if (!validConditions) valid = false;
  } catch (error) {
    console.error(error);
    return false;
  }

  return valid;
}

/**
 * check string length
 * @param {string} value
 * @param {number} len
 * @return {boolean}
 */
function checkLength(value, len) {
  return value.trim().length >= len;
}

/**
 * check email
 * @param {string} email
 * @return {boolean}
 */
function checkEmail(email) {
  return /^([-_.\w]+)@([-_\w]+)\.([-_.\w]+[-_\w]+)$/.test(email);
}

function checkBirthdate(birthdate) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) return false;
  const date = new Date(birthdate);
  return date <= new Date();
}


