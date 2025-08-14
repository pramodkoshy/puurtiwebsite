// Puurti Website JavaScript
// Version 1.0

// =============================================
// Mobile Menu Toggle
// =============================================
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  if (navMenu) {
      navMenu.classList.toggle('active');
  }
}

// =============================================
// Document Ready
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  
  // ---------------------------------------------
  // Active Page Highlighting
  // ---------------------------------------------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
          link.classList.add('active');
      }
  });
  
  // ---------------------------------------------
  // Smooth Scroll for Anchor Links
  // ---------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId && targetId !== '#') {
              const target = document.querySelector(targetId);
              if (target) {
                  target.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
              }
          }
      });
  });
  
  // ---------------------------------------------
  // Close mobile menu when clicking outside
  // ---------------------------------------------
  document.addEventListener('click', function(event) {
      const navMenu = document.getElementById('navMenu');
      const mobileToggle = document.querySelector('.mobile-toggle');
      
      if (navMenu && mobileToggle) {
          if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
              navMenu.classList.remove('active');
          }
      }
  });
  
  // ---------------------------------------------
  // Animation on Scroll (using Intersection Observer)
  // ---------------------------------------------
  if ('IntersectionObserver' in window) {
      const animateElements = document.querySelectorAll('.feature-card, .module-card, .pricing-card, .benefit-card, .process-step');
      
      const animateOnScroll = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.style.opacity = '0';
                  entry.target.style.transform = 'translateY(20px)';
                  
                  setTimeout(() => {
                      entry.target.style.transition = 'all 0.5s ease';
                      entry.target.style.opacity = '1';
                      entry.target.style.transform = 'translateY(0)';
                  }, 100);
                  
                  animateOnScroll.unobserve(entry.target);
              }
          });
      }, { 
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
      });
      
      animateElements.forEach(element => {
          animateOnScroll.observe(element);
      });
  }
  
  // ---------------------------------------------
  // Sticky Navigation Shadow
  // ---------------------------------------------
  const navbar = document.querySelector('.navbar');
  if (navbar) {
      window.addEventListener('scroll', function() {
          if (window.scrollY > 50) {
              navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          } else {
              navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }
      });
  }
});

// =============================================
// Form Validation
// =============================================
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return true;
  
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;
  let firstInvalidInput = null;
  
  inputs.forEach(input => {
      const value = input.value.trim();
      
      // Remove previous error states
      input.classList.remove('error');
      const errorMsg = input.parentElement.querySelector('.error-message');
      if (errorMsg) {
          errorMsg.remove();
      }
      
      // Check if field is empty
      if (!value) {
          input.classList.add('error');
          input.style.borderColor = '#e53e3e';
          
          // Add error message
          const error = document.createElement('span');
          error.className = 'error-message';
          error.style.color = '#e53e3e';
          error.style.fontSize = '0.875rem';
          error.style.marginTop = '0.25rem';
          error.style.display = 'block';
          error.textContent = 'This field is required';
          input.parentElement.appendChild(error);
          
          if (!firstInvalidInput) {
              firstInvalidInput = input;
          }
          isValid = false;
      } else {
          input.style.borderColor = '#e2e8f0';
          
          // Validate email format
          if (input.type === 'email') {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                  input.classList.add('error');
                  input.style.borderColor = '#e53e3e';
                  
                  const error = document.createElement('span');
                  error.className = 'error-message';
                  error.style.color = '#e53e3e';
                  error.style.fontSize = '0.875rem';
                  error.style.marginTop = '0.25rem';
                  error.style.display = 'block';
                  error.textContent = 'Please enter a valid email address';
                  input.parentElement.appendChild(error);
                  
                  if (!firstInvalidInput) {
                      firstInvalidInput = input;
                  }
                  isValid = false;
              }
          }
          
          // Validate phone format (optional)
          if (input.type === 'tel' && value) {
              const phoneRegex = /^[\d\s\-\+\(\)]+$/;
              if (!phoneRegex.test(value)) {
                  input.classList.add('error');
                  input.style.borderColor = '#e53e3e';
                  
                  const error = document.createElement('span');
                  error.className = 'error-message';
                  error.style.color = '#e53e3e';
                  error.style.fontSize = '0.875rem';
                  error.style.marginTop = '0.25rem';
                  error.style.display = 'block';
                  error.textContent = 'Please enter a valid phone number';
                  input.parentElement.appendChild(error);
                  
                  if (!firstInvalidInput) {
                      firstInvalidInput = input;
                  }
                  isValid = false;
              }
          }
      }
  });
  
  // Focus on first invalid input
  if (!isValid && firstInvalidInput) {
      firstInvalidInput.focus();
  }
  
  return isValid;
}

// =============================================
// Contact Form Handler
// =============================================
function handleContactForm(event) {
  event.preventDefault();
  
  if (!validateForm('contactForm')) {
      return;
  }
  
  // Get form data
  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });
  
  // Show loading state
  const submitButton = event.target.querySelector('.btn-submit');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
      // Show success message
      showNotification('success', 'Thank you for your inquiry! We will get back to you within 24 hours.');
      
      // Reset form
      document.getElementById('contactForm').reset();
      
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
  }, 1500);
}

// =============================================
// Notification System
// =============================================
function showNotification(type, message) {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
      existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#48bb78' : '#e53e3e'};
      color: white;
      border-radius: 4px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 9999;
      animation: slideIn 0.3s ease;
      max-width: 400px;
  `;
  notification.textContent = message;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
          notification.remove();
      }, 300);
  }, 5000);
}

// =============================================
// Add CSS for animations
// =============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
      from {
          transform: translateX(100%);
          opacity: 0;
      }
      to {
          transform: translateX(0);
          opacity: 1;
      }
  }
  
  @keyframes slideOut {
      from {
          transform: translateX(0);
          opacity: 1;
      }
      to {
          transform: translateX(100%);
          opacity: 0;
      }
  }
  
  input.error,
  textarea.error,
  select.error {
      border-color: #e53e3e !important;
  }
`;
document.head.appendChild(style);

// =============================================
// Pricing Toggle (Monthly/Yearly)
// =============================================
function togglePricing() {
  const toggle = document.getElementById('pricingToggle');
  const prices = document.querySelectorAll('.price[data-monthly]');
  
  if (toggle && prices.length > 0) {
      if (toggle.checked) {
          // Show yearly prices (with 10% discount)
          prices.forEach(price => {
              const monthly = parseInt(price.dataset.monthly);
              const yearly = monthly * 12 * 0.9; // 10% discount
              price.innerHTML = `$${Math.round(yearly)}<span class="price-unit">/year</span>`;
          });
      } else {
          // Show monthly prices
          prices.forEach(price => {
              const monthly = price.dataset.monthly;
              price.innerHTML = `$${monthly}<span class="price-unit">/month</span>`;
          });
      }
  }
}

// =============================================
// Lazy Load Images (if needed)
// =============================================
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const img = entry.target;
                  img.src = img.dataset.src;
                  img.removeAttribute('data-src');
                  imageObserver.unobserve(img);
              }
          });
      });
      
      images.forEach(img => imageObserver.observe(img));
  } else {
      // Fallback for browsers that don't support IntersectionObserver
      images.forEach(img => {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
      });
  }
}

// =============================================
// Initialize on page load
// =============================================
window.addEventListener('load', function() {
  lazyLoadImages();
});

// =============================================
// Export functions for global use
// =============================================
window.toggleMenu = toggleMenu;
window.handleContactForm = handleContactForm;
window.togglePricing = togglePricing;
window.showNotification = showNotification;