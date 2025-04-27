// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const gallerySlider = document.querySelector('.gallery-slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const galleryDots = document.querySelector('.gallery-dots');

// Sticky Header
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  if (hamburger.classList.contains('active')) {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.backgroundColor = '#000';
    navLinks.style.padding = '20px';
    
    document.querySelectorAll('.nav-links li').forEach(item => {
      item.style.margin = '10px 0';
    });
  } else {
    navLinks.style.display = '';
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links li a').forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger.classList.contains('active')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      navLinks.style.display = '';
    }
  });
});

// Gallery Slider
let currentSlide = 0;

// Create dots for gallery
function createDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    galleryDots.appendChild(dot);
  });
}

// Initialize gallery
function initGallery() {
  createDots();
  
  // Set up event listeners for gallery controls
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);
}

// Go to specific slide
function goToSlide(slideIndex) {
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    document.querySelectorAll('.gallery-dots .dot')[index].classList.remove('active');
  });
  
  slides[slideIndex].classList.add('active');
  document.querySelectorAll('.gallery-dots .dot')[slideIndex].classList.add('active');
  currentSlide = slideIndex;
}

// Go to previous slide
function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  goToSlide(currentSlide);
}

// Go to next slide
function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  goToSlide(currentSlide);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for header
        behavior: 'smooth'
      });
    }
  });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formValues = Object.fromEntries(formData.entries());
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formValues);
    
    // Show success message
    this.innerHTML = '<div style="text-align: center; padding: 40px;"><i class="fas fa-check-circle" style="font-size: 48px; color: #ff0000; margin-bottom: 20px;"></i><h3>Message Sent!</h3><p>We\'ll get back to you as soon as possible.</p></div>';
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
});