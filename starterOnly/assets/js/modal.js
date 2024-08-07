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
// --------Regex
const firstnameRegexp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
const lastnameRegexp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,}$/;
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const dateRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const numberRegexp = /^(?:[0-9]|[1-9][0-9])$/; // le nombre doit être compris entre 0 et 99

// --------prénom, nom, email
function isValidInput(regex,input,error) {
  if (!regex.test(input.value) || input ==="") {
    error.setAttribute('data-error-visible', 'true')
    return false;
  } else {
    error.setAttribute('data-error-visible', 'false')
    return true;
  }
}

// --------date
function isValidDateOfBirth(regex,input,error) {
  const dateOfBirth = new Date(input.value);
  const today = new Date();
  if (!regex.test(input.value) || dateOfBirth >= today || input === "") {
    error.setAttribute('data-error-visible', 'true')
    return false;
  }
  error.setAttribute('data-error-visible', 'false')
  return true;
}

// --------Quantité
function isValidQuantity(regex,input,error) {
  if(input==="" || isNaN(input.value) || !regex.test(input.value)) {
    error.setAttribute('data-error-visible', 'true')
    return false;
  } else {
    error.setAttribute('data-error-visible', 'false')
    return true;
  }
}

// --------Radios
function isRadioSelected(inputs,error) {
    for(let i = 0; i< inputs.length; i++) {
      if(inputs[i].checked) {
        error.setAttribute('data-error-visible', 'false')
        return {
          "prop_1": true,
          "prop_2": inputs[i].value
        };
      } 
    }
    error.setAttribute('data-error-visible', 'true')
    return false;
}

// --------Checkbox
function isCheckboxChecked(input,error) {
  if(!input.checked) {
    error.setAttribute('data-error-visible', 'true')
    return false
  }
  error.setAttribute('data-error-visible', 'false')
  return true;  
  
}

// ---- validation du formulaire
function validate() {
  const validFirstname   = isValidInput(firstnameRegexp,firstInput,firstError);
  const validLastname    = isValidInput(lastnameRegexp,lastInput,lastError);
  const validEmail       = isValidInput(emailRegexp,emailInput,emailError);
  const validDateOfBirth = isValidDateOfBirth(dateRegex,birthdateInput,birthdayError);
  const validQuantity    = isValidQuantity(numberRegexp,quantityInput,quantityError);
  const selectedRadio    = isRadioSelected(locationInputs,radioError);
  const checkedCheckbox  = isCheckboxChecked(checkboxInput,cguError);

  function isValidForm() {
    if(validFirstname && validLastname && validEmail && validDateOfBirth && validQuantity && selectedRadio && checkedCheckbox) {
      return true
    } else {
      return false
    }
  }

  const validForm = isValidForm();

  if(validForm) {
    let val = selectedRadio
    console.log(
      "Prénom : " + firstInput.value + " / ", 
      "Nom : " + lastInput.value + " / ", 
      "Email : " + emailInput.value + " / ", 
      "Date de naissance : " + birthdateInput.value + " / ",
      "Nombre de tournoi : " + quantityInput.value + " / ",
      "Choix ville : " + val.prop_2 + " / ",
      "Validation CGU : " + checkedCheckbox + " / ",
      "Inscription newsletter : " + checkboxInput2.checked
    )

    closeModal()
    event.preventDefault()
    displaySecondModal()
    
    return true
  } else {
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
  isValidInput(firstnameRegexp,firstInput,firstError);
});
lastInput.addEventListener("change", function() {
  isValidInput(lastnameRegexp,lastInput,lastError);
});
emailInput.addEventListener("change", function() {
  isValidInput(emailRegexp,emailInput,emailError);
});
birthdateInput.addEventListener("change", function() {
  isValidDateOfBirth(dateRegex,birthdateInput,birthdayError);
});
quantityInput.addEventListener("change", function() {
  isValidQuantity(numberRegexp,quantityInput,quantityError);
});
locationInputs.forEach((locationInput) =>{
  locationInput.addEventListener("change", function() {
    isRadioSelected(locationInputs,radioError);
  })
});
checkboxInput.addEventListener("change", function() {
  isCheckboxChecked(checkboxInput,cguError);
});