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
const modalBg       = document.querySelectorAll(".bground");
const content       = document.querySelectorAll(".content");
const closeBtnFirst = document.querySelector(".modalfirst-close-btn");

// ---- première modale : éléments formulaire
const firstInput     = document.getElementById("first");
const firstError     = document.querySelector(".first")
const lastInput      = document.getElementById("last");
const lastError      = document.querySelector(".last")
const emailInput     = document.getElementById("email");
const emailError     = document.querySelector(".email")
const birthdateInput = document.getElementById("birthdate");
const birthdayError  = document.querySelector(".birthdate")
const quantityInput  = document.getElementById("quantity");
const quantityError  = document.querySelector(".quantity")
const locationInputs = document.querySelectorAll('input[name="location"]');
const radioError     = document.querySelector(".tournoi-choix")
const checkboxInput  = document.getElementById("checkbox1");
const cguError       = document.querySelector(".cgu")
const checkboxInput2 = document.getElementById("checkbox2");

// ---- deuxième modale : ouverture / fermeture
const closeBtnSecond  = document.querySelector(".modalsecond-close-btn");
const closeModalBtn   = document.querySelector(".btn-close");

//FONCTIONS 
// ---- Ouverture de la première modale
function launchModal() {
  modalBg[0].style.display = "block";
  content[0].classList.remove("close-modal");
  modalBg[0].classList.remove("close-modal");
}

// ---- Ouverture de la seconde modale
function displaySecondModal() {
  modalBg[1].style.display = "block";
  content[1].classList.remove("close-modal");
  modalBg[1].classList.remove("close-modal");
}

// ---- Fermeture des modales et nettoyage du formulaire
function clearInputs() {
  firstInput.value = ""
  firstError.setAttribute('data-error-visible', 'false')
  lastInput.value = ""
  lastError.setAttribute('data-error-visible', 'false')
  emailInput.value = ""
  emailError.setAttribute('data-error-visible', 'false')
  birthdateInput.value = ""
  birthdayError.setAttribute('data-error-visible', 'false')
  quantityInput.value = ""
  quantityError.setAttribute('data-error-visible', 'false')
  locationInputs.forEach((locationInput) => {
    locationInput.checked = false
  })
  radioError.setAttribute('data-error-visible', 'false')
  checkboxInput.checked = false
  cguError.setAttribute('data-error-visible', 'false')
  checkboxInput2.checked = false
}

function closeModal() {
  content.forEach((allContents) => {
    allContents.classList.add("close-modal");
  })
  modalBg.forEach((bg) => {
    bg.classList.add("close-modal");
  })
  clearInputs()
}

// ---- validation du formulaire : vérification des données entrées
// --------prénom
function isValidFirstname(input) {
  const firstnameRegexp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
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
closeBtnSecond.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

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