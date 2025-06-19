// Variables globales
const modal = document.getElementById("gallery-modal");
const currentImage = document.getElementById("current-image");
const closeBtn = document.getElementById("close-gallery");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const currentIndexSpan = document.getElementById("current-index");
const totalCountSpan = document.getElementById("total-count");

let images = [];
let currentIndex = 0;

// Funciones
function updateImage() {
  if (images.length === 0) return;
  
  // Animación de salida
  currentImage.classList.add('fade-out');
  
  setTimeout(() => {
    // Cambiar imagen
    currentImage.src = images[currentIndex];
    currentIndexSpan.textContent = currentIndex + 1;
    totalCountSpan.textContent = images.length;
    
    // Actualizar estado de botones
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === images.length - 1;
    
    // Animación de entrada
    currentImage.classList.remove('fade-out');
    currentImage.classList.add('fade-in');
    
    // Limpiar clase después de la animación
    setTimeout(() => {
      currentImage.classList.remove('fade-in');
    }, 400);
  }, 200);
}

function showPrevious() {
  if (currentIndex > 0) {
    currentIndex--;
    updateImage();
  }
}

function showNext() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateImage();
  }
}

function openGallery(imageArray) {
  images = imageArray;
  currentIndex = 0;
  
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  
  // Configuración inicial sin animación
  currentImage.src = images[currentIndex];
  currentIndexSpan.textContent = currentIndex + 1;
  totalCountSpan.textContent = images.length;
  
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === images.length - 1;
  
  // Animación de entrada inicial
  currentImage.classList.add('fade-in');
  setTimeout(() => {
    currentImage.classList.remove('fade-in');
  }, 400);
}

function closeGallery() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

// Event listeners
document.querySelectorAll("[data-gallery-button]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const galleryImages = JSON.parse(btn.dataset.gallery || "[]");
    openGallery(galleryImages);
  });
});

closeBtn.addEventListener("click", closeGallery);
prevBtn.addEventListener("click", showPrevious);
nextBtn.addEventListener("click", showNext);

// Cerrar al hacer clic fuera de la imagen
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeGallery();
  }
});