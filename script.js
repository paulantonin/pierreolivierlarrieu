// Overlay menu show once, hide on first scroll
const overlayMenu = document.querySelector('.overlay-menu');
let overlayHidden = false; // pour s'assurer qu'on cache une seule fois

window.addEventListener('scroll', () => {
  if (overlayMenu && !overlayHidden) {
    overlayMenu.classList.add('hidden'); // applique la disparition
    overlayHidden = true; // ne plus jamais réafficher
  }
});

// === MODALE PORTFOLIO ===
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  if (!modal) return;

  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalCounter = document.getElementById("modalCounter");
  const closeBtn = modal.querySelector(".modal-close"); // ta croix existante
  const modalContent = modal.querySelector(".modal-content");

  const prevProject = document.getElementById("prevProject");
  const nextProject = document.getElementById("nextProject");
  const prevImage = document.getElementById("prevImage");
  const nextImage = document.getElementById("nextImage");

  const portfolioItems = Array.from(document.querySelectorAll(".portfolio-item"));
  let currentProject = 0;
  let currentImage = 0;
  let gallery = [];

  // === Affichage de la modale ===
  function showModal(projectIndex, imageIndex = 0) {
    currentProject = projectIndex;
    gallery = portfolioItems[currentProject].dataset.gallery.split(",");
    currentImage = imageIndex;

    modalImg.src = gallery[currentImage];
    modalTitle.textContent = portfolioItems[currentProject].dataset.title;
    modalDescription.textContent = portfolioItems[currentProject].dataset.description;
    modalCounter.textContent = `${currentImage + 1} / ${gallery.length}`;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // empêche le scroll derrière
  }

  // === Fermeture ===
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // === Navigation ===
  function nextProjectFunc() { 
    currentProject = (currentProject + 1) % portfolioItems.length; 
    showModal(currentProject, 0); 
  }
  function prevProjectFunc() { 
    currentProject = (currentProject - 1 + portfolioItems.length) % portfolioItems.length; 
    showModal(currentProject, 0); 
  }
  function nextImageFunc() { 
    currentImage = (currentImage + 1) % gallery.length; 
    showModal(currentProject, currentImage); 
  }
  function prevImageFunc() { 
    currentImage = (currentImage - 1 + gallery.length) % gallery.length; 
    showModal(currentProject, currentImage); 
  }

  // === Événements ===
  portfolioItems.forEach((item, index) => 
    item.addEventListener("click", () => showModal(index))
  );

  if (closeBtn) closeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // évite fermeture double
    closeModal();
  });

  // clic hors contenu → fermer
  modal.addEventListener("click", (e) => {
    if (!modalContent.contains(e.target)) {
      closeModal();
    }
  });

  // navigation
  prevProject?.addEventListener("click", prevProjectFunc);
  nextProject?.addEventListener("click", nextProjectFunc);
  prevImage?.addEventListener("click", prevImageFunc);
  nextImage?.addEventListener("click", nextImageFunc);
});

const burger = document.getElementById('burger');
const navLinks = document.querySelector('.navbar ul');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('show'); // montre ou cache le menu
  burger.classList.toggle('open');   // optionnel pour animation du burger
});

