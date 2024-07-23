function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
// ---- première modale

const modalBtn = document.querySelectorAll(".btn-signup");
const modalBg = document.querySelector(".bground");
const content = document.querySelector(".content");
const closeBtnFirst = document.querySelector(".modalfirst-close-btn");
const formData = document.querySelectorAll(".formData");

// ---- deuxième modale
const modalBgConfirm = document.querySelector(".bground-modal");
const contentConfirm = document.querySelector(".modal-content");
const closeBtnSecond = document.querySelector(".modalsecond-close-btn");
const closeModalBtn = document.querySelector(".btn-close");


// Ouverture de la première modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalBg.style.display = "block";
  content.classList.remove("close-modal");
}

// Fermeture de la première modale

closeBtnFirst.addEventListener("click", closeModal);

function closeModal() {
  content.classList.add("close-modal");
  modalBg.style.display = 'none'
}

// validation du formulaire


