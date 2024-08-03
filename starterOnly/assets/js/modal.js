function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM ELEMENTS
// ---- première modale : ouverture / fermeture
const modalBtn      = document.querySelectorAll(".btn-signup");
const modalBg       = document.querySelector(".bground");
const content       = document.querySelector(".content");
const closeBtnFirst = document.querySelector(".modalfirst-close-btn");

// ---- première modale : éléments formulaire
const firstInput            = document.getElementById("first");
const lastInput             = document.getElementById("last");
const emailInput            = document.getElementById("email");
const birthdateInput        = document.getElementById("birthdate");
const quantityInput         = document.getElementById("quantity");
const locationInputs        = document.querySelectorAll('input[name="location"]');
const checkboxInput         = document.getElementById("checkbox1");
const checkboxInput2        = document.getElementById("checkbox2");

// ---- deuxième modale : ouverture / fermeture
const modalBgConfirm  = document.querySelector(".bground-modal");
const contentConfirm  = document.querySelector(".modal-content");
const closeBtnSecond  = document.querySelector(".modalsecond-close-btn");
const closeModalBtn   = document.querySelector(".btn-close");

//FONCTIONS 
// ---- Ouverture de la première modale
function launchModal() {
  modalBg.style.display = "block";
  content.classList.remove("close-modal");
}

// ---- Fermeture de la première modale (clic croix) et nettoyage du formulaire
function clearInputs() {
  firstInput.value = ""
  lastInput.value = ""
  emailInput.value = ""
  birthdateInput.value = ""
  quantityInput.value = ""
  locationInputs.forEach((locationInput) => {
    locationInput.checked = false
  })
  checkboxInput.checked = false
  checkboxInput2.checked = false
}

function closeModal() {
  content.classList.add("close-modal");
  modalBg.style.display = 'none'
  clearInputs()
}

// ---- Ouverture de la seconde modale
function displaySecondModal() {
  modalBgConfirm.style.display = "block";
  contentConfirm.classList.remove("close-modal");
}

// ---- Fermeture de la seconde modale (clic croix)
function closeSecondModal() {
  contentConfirm.classList.add("close-modal");
  modalBgConfirm.style.display = 'none'
}

// ---- validation du formulaire : vérification des données entrées
// --------prénom
function isValidFirstname(input) {
  const firstnameRegexp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
  const firstError = document.querySelector(".first")
  if (!firstnameRegexp.test(input.value) || input ==="") {
    firstError.setAttribute('data-error-visible', 'true')
    console.log("false prénom")
    return false;
  } else {
    firstError.setAttribute('data-error-visible', 'false')
    console.log('true prénom')
    return true;
  }
}

// --------nom
function isValidLastname(input) {
  const lastnameRegexp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,}$/;
  const lastError = document.querySelector(".last")
  if (!lastnameRegexp.test(input.value) || input ==="") {
    lastError.setAttribute('data-error-visible', 'true')
    console.log("false nom")
    return false;
  } else {
    lastError.setAttribute('data-error-visible', 'false')
    console.log('true nom')
    return true;
  }
}

// --------email
function isValidEmail(input) {
  const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailError = document.querySelector(".email")
  if (!emailRegexp.test(input.value) || input ==="") {
    emailError.setAttribute('data-error-visible', 'true')
    console.log("false email")
    return false;
  } else {
    emailError.setAttribute('data-error-visible', 'false')
    console.log('true email')
    return true;
  }
}

// --------date
function isValidDateOfBirth(input) {

  const dateRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const dateOfBirth = new Date(input.value);
  const today = new Date();
  const birthdayError = document.querySelector(".birthdate")

  if (!dateRegex.test(input.value) || dateOfBirth >= today || input === "") {
    birthdayError.setAttribute('data-error-visible', 'true')
    console.log("false regex, futur ou vide")
    return false;
  }
  birthdayError.setAttribute('data-error-visible', 'false')
  console.log('true date')
  return true;
}

// --------Quantité
function isValidQuantity(input) {
  const numberRegexp = /^(?:[0-9]|[1-9][0-9])$/; // le nombre doit être compris entre 0 et 99
  const quantityError = document.querySelector(".quantity")
  if(input==="" || isNaN(input.value) || !numberRegexp.test(input.value)) {
    quantityError.setAttribute('data-error-visible', 'true')
    console.log("false quantité")
    return false;
  } else {
    quantityError.setAttribute('data-error-visible', 'false')
    console.log('true quantité')
    return true;
  }
}

// --------Radios
function isRadioSelected(locationInputs) {
  console.log(locationInputs)
  const radioError = document.querySelector(".tournoi-choix")
    for(let i = 0; i< locationInputs.length; i++) {
      if(locationInputs[i].checked) {
        radioError.setAttribute('data-error-visible', 'false')
        console.log('true radio')
        return true;
      } 
    }
    radioError.setAttribute('data-error-visible', 'true')
    console.log("false radio")
    return false;
}

// --------Checkbox
function isCheckboxChecked(input) {
  const cguError = document.querySelector(".cgu")
  if(!input.checked) {
    cguError.setAttribute('data-error-visible', 'true')
    console.log("false checkbox")
    return false
  }
  cguError.setAttribute('data-error-visible', 'false')
  console.log("true checkbox")
  return true;  
  
}

// ---- validation du formulaire
function validate() {
  const validFirstname   = isValidFirstname(firstInput);
  const validLastname    = isValidLastname(lastInput);
  const validEmail       = isValidEmail(emailInput);
  const validDateOfBirth = isValidDateOfBirth(birthdateInput);
  const validQuantity    = isValidQuantity(quantityInput);
  const selectedRadio    = isRadioSelected(locationInputs);
  const checkedCheckbox  = isCheckboxChecked(checkboxInput);

  function isValidForm() {
    if(validFirstname && validLastname && validEmail && validDateOfBirth && validQuantity && selectedRadio && checkedCheckbox) {
      return true
    } else {
      return false
    }
  }

  const validForm = isValidForm();
  console.log(validForm)

  if(validForm) {
    console.log("On peut valider ce formulaire")
    closeModal()
    event.preventDefault()
    displaySecondModal()
    
    return true
  } else {
    console.log("On ne peut pas valider ce formulaire")
    return false
  }
}

// EVENTLISTENERS : Modales et formulaire
// --------Modales
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtnFirst.addEventListener("click", closeModal);
closeBtnSecond.addEventListener("click", closeSecondModal);
closeModalBtn.addEventListener("click", closeSecondModal);

// --------Formulaire
firstInput.addEventListener("change", function() {
  isValidFirstname(firstInput);
});
lastInput.addEventListener("change", function() {
  isValidLastname(lastInput);
});
emailInput.addEventListener("change", function() {
  isValidEmail(emailInput);
});
birthdateInput.addEventListener("change", function() {
  isValidDateOfBirth(birthdateInput);
});
quantityInput.addEventListener("change", function() {
  isValidQuantity(quantityInput);
});
locationInputs.forEach((locationInput) =>{
  locationInput.addEventListener("change", function() {
    isRadioSelected(locationInputs);
  })
});
checkboxInput.addEventListener("change", function() {
  isCheckboxChecked(checkboxInput);
});