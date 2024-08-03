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
const formData              = document.querySelectorAll(".formData");
const firstInput            = document.getElementById("first");
const firstInputError       = document.getElementById("error-message-first");
const lastInput             = document.getElementById("last");
const lastInputError        = document.getElementById("error-message-last");
const emailInput            = document.getElementById("email");
const emailInputError       = document.getElementById("error-message-email");
const birthdateInput        = document.getElementById("birthdate");
const birthdateInputError   = document.getElementById("error-message-birthdate");
const quantityInput         = document.getElementById("quantity");
const quantityInputError    = document.getElementById("error-message-quantity");
const locationInputs        = document.querySelectorAll('input[name="location"]');
const locationInputsSpan    = document.querySelectorAll('.checkbox-icon')
const locationInputsError   = document.getElementById("error-message-location");
const checkboxInput         = document.getElementById("checkbox1");
const checkboxInputError    = document.getElementById("error-message-checkbox");
const checkboxInput2        = document.getElementById("checkbox2");


// ---- deuxième modale : ouverture / fermeture
const modalBgConfirm  = document.querySelector(".bground-modal");
const contentConfirm  = document.querySelector(".modal-content");
const closeBtnSecond  = document.querySelector(".modalsecond-close-btn");
const closeModalBtn   = document.querySelector(".btn-close");



//FONCTIONS 

// ---- Ouverture de la première modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

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

closeBtnFirst.addEventListener("click", closeModal);

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
closeBtnSecond.addEventListener("click", closeSecondModal);
closeModalBtn.addEventListener("click", closeSecondModal);

function closeSecondModal() {
  contentConfirm.classList.add("close-modal");
  modalBgConfirm.style.display = 'none'
}


// ---- validation du formulaire : vérification des données entrées
// --------prénom
function isValidFirstname(input, error) {
  const firstnameRegexp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
  if (!firstnameRegexp.test(input.value) || input ==="") {
    error.style.display = "block";
    input.classList.add("erreur-input");
    console.log("false prénom")
    return false;
  } else {
    error.style.display = "none";
    input.classList.remove("erreur-input");
    console.log('true prénom')
    return true;
  }
}

// --------nom

function isValidLastname(input, error) {
  const lastnameRegexp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,}$/;
  if (!lastnameRegexp.test(input.value) || input ==="") {
    error.style.display = "block";
    input.classList.add("erreur-input");
    console.log("false nom")
    return false;
  } else {
    error.style.display = "none";
    input.classList.remove("erreur-input");
    console.log('true nom')
    return true;
  }
}

// --------email

function isValidEmail(input, error) {
  const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegexp.test(input.value) || input ==="") {
    error.style.display = "block";
    input.classList.add("erreur-input");
    console.log("false email")
    return false;
  } else {
    error.style.display = "none";
    input.classList.remove("erreur-input");
    console.log('true email')
    return true;
  }
}

// --------date
function isValidDateOfBirth(input, error) {

  const dateRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const dateOfBirth = new Date(input.value);
  const today = new Date();

  if (!dateRegex.test(input.value) || dateOfBirth >= today || input === "") {
    error.style.display = "block";
    input.classList.add("erreur-input");
    console.log("false regex, futur ou vide")
    return false;
  }

  console.log('true date')
  error.style.display = "none";
  input.classList.remove("erreur-input");
  return true;
}

// --------Quantité

function isValidQuantity(input, error) {
  const numberRegexp = /^(?:[0-9]|[1-9][0-9])$/; // le nombre doit être compris entre 0 et 99
  
  if(input==="" || isNaN(input.value) || !numberRegexp.test(input.value)) {
    error.style.display = "block";
    input.classList.add("erreur-input");
    console.log("false quantité")
    return false;
  } else {
    error.style.display = "none";
    input.classList.remove("erreur-input");
    console.log('true quantité')
    return true;
  }
}

// --------Radios

function isRadioSelected(locationInputs, error) {
  console.log(locationInputs)
    for(let i = 0; i< locationInputs.length; i++) {
      if(locationInputs[i].checked) {
        error.style.display = "none";
        console.log('true radio')
        return true;
      } 
    }

    error.style.display = "block";
    console.log("false radio")
    return false;
}

// --------Checkbox

function isCheckboxChecked(input, error) {
  if(!input.checked) {
    error.style.display = "block";
    input.classList.add("erreur-input");  
    console.log("false checkbox")
    return false
  }
  error.style.display = "none";
  input.classList.remove("erreur-input");
  console.log("true checkbox")
  return true;  
  
}

// ---- validation du formulaire : les eventlistener

firstInput.addEventListener("change", function() {
  isValidFirstname(firstInput, firstInputError);
});

lastInput.addEventListener("change", function() {
  isValidLastname(lastInput, lastInputError);
});

emailInput.addEventListener("change", function() {
  isValidEmail(emailInput, emailInputError);
});

birthdateInput.addEventListener("change", function() {
  isValidDateOfBirth(birthdateInput, birthdateInputError);
});

quantityInput.addEventListener("change", function() {
  isValidQuantity(quantityInput, quantityInputError);
});

locationInputs.forEach((locationInput) =>{
  locationInput.addEventListener("change", function() {
    isRadioSelected(locationInputs, locationInputsError);
  })
});

checkboxInput.addEventListener("change", function() {
  isCheckboxChecked(checkboxInput, checkboxInputError);
});

// ---- validation du formulaire

function validate() {
  const validFirstname   = isValidFirstname(firstInput, firstInputError);
  const validLastname    = isValidLastname(lastInput, lastInputError);
  const validEmail       = isValidEmail(emailInput, emailInputError);
  const validDateOfBirth = isValidDateOfBirth(birthdateInput, birthdateInputError);
  const validQuantity    = isValidQuantity(quantityInput, quantityInputError);
  const selectedRadio    = isRadioSelected(locationInputs, locationInputsError);
  const checkedCheckbox  = isCheckboxChecked(checkboxInput, checkboxInputError);

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
