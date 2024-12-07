const slider=document.querySelector('.slideImages')
const slides=document.querySelectorAll('.each-image')
const prevBtn = document.querySelector('.fa-arrow-left');
const nextBtn = document.querySelector('.fa-arrow-right');
const dots = document.querySelectorAll('.fa-minus');
const sliderContainer = document.querySelector('.slide-container');

let currentIndex = 0; // Tracks the current slide index
let autoSlideInterval; // Will hold the interval ID for auto-sliding

function updateDots() {
  dots.forEach((dot, index) => {
      if (index === currentIndex) {
          dot.classList.add('active');
      } else {
          dot.classList.remove('active');
      }
  });
}
function showSlides(index) {
  if (index >= slides.length) {
      currentIndex = 0; // Reset to first slide if at the end
  } else if (index < 0) {
      currentIndex = slides.length - 1; // Go to last slide if at the beginning
  } else {
      currentIndex = index; // Otherwise, set to the provided index
  }
  slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide transition
  updateDots(); // Update the dots to reflect the current slide
}

// Function to move to the next slide
function nextSlide() {
  showSlides(currentIndex + 1);

}

// Function to move to the previous slide
function prevSlide() {
  showSlides(currentIndex - 1);
  
}

// Start the automatic sliding of images
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000); // Slide every 4 seconds
}

// Stop the automatic sliding
function stopAutoSlide() {
  clearInterval(autoSlideInterval); // Clear the interval
}

// Add click event listeners to dots for direct slide navigation
dots.forEach(dot => {
  dot.addEventListener('click', () => {
      stopAutoSlide(); // Stop auto-slide when manually selecting a slide
      showSlides(parseInt(dot.dataset.index)); // Show the selected slide
      startAutoSlide(); // Restart auto-slide
  });
});

// Add event listeners for navigation buttons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Stop auto-slide when the mouse enters the slider container
sliderContainer.addEventListener('mouseover', stopAutoSlide);

// Restart auto-slide when the mouse leaves the slider container
sliderContainer.addEventListener('mouseout', startAutoSlide);

// Start auto-slide when the page loads
sliderContainer.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

// Touch move (optional, if you want live feedback)
sliderContainer.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  endX = touch.clientX;
  endY = touch.clientY;
});
sliderContainer.addEventListener('touchend', () => {
  const diffX = endX - startX;
  const diffY = endY - startY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horizontal Swipe
    if (diffX > 50) {
      showSlides(currentIndex - 1);
    } else if (diffX < -50) {
      showSlides(currentIndex + 1);
    }
  }
})
startAutoSlide();
updateDots(); // Initialize the dots
