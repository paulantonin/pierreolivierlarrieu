// Overlay menu show once, hide on first scroll
const overlayMenu = document.querySelector('.overlay-menu');
let overlayHidden = false; // pour s'assurer qu'on cache une seule fois

window.addEventListener('scroll', () => {
  if (overlayMenu && !overlayHidden) {
    overlayMenu.classList.add('hidden'); // applique la disparition
    overlayHidden = true; // ne plus jamais réafficher
  }
});

// Modale script pour portfolio
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  if (!modal) return;

  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalCounter = document.getElementById("modalCounter");
  const closeBtn = document.querySelector(".modal-close");

  const prevProject = document.getElementById("prevProject");
  const nextProject = document.getElementById("nextProject");
  const prevImage = document.getElementById("prevImage");
  const nextImage = document.getElementById("nextImage");

  const portfolioItems = Array.from(document.querySelectorAll(".portfolio-item"));
  let currentProject = 0;
  let currentImage = 0;
  let gallery = [];

  function showModal(projectIndex, imageIndex = 0) {
    currentProject = projectIndex;
    gallery = portfolioItems[currentProject].dataset.gallery.split(",");
    currentImage = imageIndex;

    modalImg.src = gallery[currentImage];
    modalTitle.textContent = portfolioItems[currentProject].dataset.title;
    modalDescription.textContent = portfolioItems[currentProject].dataset.description;
    modalCounter.textContent = `${currentImage + 1} / ${gallery.length}`;

    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

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

  portfolioItems.forEach((item, index) => item.addEventListener("click", () => showModal(index)));
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  prevProject?.addEventListener("click", prevProjectFunc);
  nextProject?.addEventListener("click", nextProjectFunc);
  prevImage?.addEventListener("click", prevImageFunc);
  nextImage?.addEventListener("click", nextImageFunc);
});

