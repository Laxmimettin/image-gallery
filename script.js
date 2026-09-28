const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const previewImage = document.getElementById("previewImage");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const imageNumber = document.getElementById("imageNumber");
const imageTitle = document.getElementById("imageTitle");
const imageDescription = document.getElementById("imageDescription");

const galleryCount = document.getElementById("galleryCount");

let currentIndex = 0;

// Store all gallery images
const images = Array.from(galleryItems).map((item) => {
const img = item.querySelector("img");
const title = item.querySelector(".image-overlay span");

return {
    src: img.src,
    alt: img.alt,
    title: title.textContent
};


});

galleryCount.textContent = images.length;

// Open lightbox
function openLightbox(index) {
currentIndex = index;


const image = images[currentIndex];

previewImage.src = image.src;
previewImage.alt = image.alt;

imageTitle.textContent = image.title;

imageNumber.textContent =
    `${String(currentIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

imageDescription.textContent =
    `${image.title} — Explore this beautiful moment from the Visualia collection.`;

lightbox.classList.add("active");

document.body.style.overflow = "hidden";


}

// Close lightbox
function closeLightbox() {
lightbox.classList.remove("active");


document.body.style.overflow = "";


}

// Next image
function showNext() {
currentIndex++;


if (currentIndex >= images.length) {
    currentIndex = 0;
}

updatePreview();


}

// Previous image
function showPrevious() {
currentIndex--;


if (currentIndex < 0) {
    currentIndex = images.length - 1;
}

updatePreview();


}

// Update preview
function updatePreview() {


const image = images[currentIndex];

previewImage.style.animation = "none";

// Force browser to restart animation
void previewImage.offsetWidth;

previewImage.style.animation = "previewIn 0.35s ease";

previewImage.src = image.src;
previewImage.alt = image.alt;

imageTitle.textContent = image.title;

imageNumber.textContent =
    `${String(currentIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

imageDescription.textContent =
    `${image.title} — Explore this beautiful moment from the Visualia collection.`;


}

// Gallery image click
galleryItems.forEach((item, index) => {


item.addEventListener("click", () => {
    openLightbox(index);
});


});

// Close button
closeBtn.addEventListener("click", closeLightbox);

// Previous button
prevBtn.addEventListener("click", showPrevious);

// Next button
nextBtn.addEventListener("click", showNext);

// Close when clicking outside image
lightbox.addEventListener("click", (event) => {


if (event.target === lightbox) {
    closeLightbox();
}


});

// Keyboard controls
document.addEventListener("keydown", (event) => {


if (!lightbox.classList.contains("active")) {
    return;
}

if (event.key === "Escape") {
    closeLightbox();
}

if (event.key === "ArrowRight") {
    showNext();
}

if (event.key === "ArrowLeft") {
    showPrevious();
}


});
