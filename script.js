// Global variable to track carousel position
let isShowingFirstSet = true; // true = showing 1-5, false = showing 6-10
let currentPosition = 0;
const slideWidth = 1060; // Kaydırma mesafesi

// Global function for carousel movement - called by onclick
function moveTrendingCarousel(direction) {
  const track = document.getElementById("trendingTrack");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  if (direction === "next" && currentPosition === 0) {
    // Sağa kaydır (1-5'ten 6-10'a)
    currentPosition = -slideWidth;
    track.style.transform = `translateX(${currentPosition}px)`;
    prevButton.style.display = "flex";
    nextButton.style.display = "none";
  } else if (direction === "prev" && currentPosition === -slideWidth) {
    // Sola kaydır (6-10'dan 1-5'e)
    currentPosition = 0;
    track.style.transform = `translateX(${currentPosition}px)`;
    prevButton.style.display = "none";
    nextButton.style.display = "flex";
  }
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initFAQ();
  initForms();
  initScrollAnimations();

  // Set initial carousel position - start at 0 to show posters 1-5
  const track = document.getElementById("trendingTrack");
  if (track) {
    track.style.transition = "none";
    track.style.setProperty("transform", "translateX(0px)", "important");

    setTimeout(() => {
      track.style.transition =
        "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    }, 100);

    isShowingFirstSet = true;
    console.log("Carousel initialized - showing items 1-5 at position 0");
  }

  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  // Başlangıç durumu
  prevButton.style.display = "none"; // Sol ok başlangıçta gizli
  nextButton.style.display = "flex"; // Sağ ok başlangıçta görünür

  // Ok tıklama olayları
  nextButton.addEventListener("click", () => moveTrendingCarousel("next"));
  prevButton.addEventListener("click", () => moveTrendingCarousel("prev"));
});

// FAQ Functionality
function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqIndex = this.getAttribute("data-faq");
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains("active");

      // Close all other FAQ items
      faqQuestions.forEach((q) => {
        if (q !== this) {
          q.classList.remove("active");
          q.nextElementSibling.classList.remove("active");
        }
      });

      // Toggle current FAQ item
      if (!isActive) {
        this.classList.add("active");
        answer.classList.add("active");
      } else {
        this.classList.remove("active");
        answer.classList.remove("active");
      }
    });
  });
}

// Form Validation and Handling
function initForms() {
  const heroForm = document.getElementById("heroForm");
  const ctaForm = document.getElementById("ctaForm");

  if (heroForm) {
    heroForm.addEventListener("submit", handleFormSubmit);
  }

  if (ctaForm) {
    ctaForm.addEventListener("submit", handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const emailInput = e.target.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  // Remove any existing error messages
  removeErrorMessage(emailInput);
  emailInput.classList.remove("error");

  if (!email) {
    showError(emailInput, "E-posta adresi gereklidir.");
    return;
  }

  if (!isValidEmail(email)) {
    showError(emailInput, "Geçerli bir e-posta adresi girin.");
    return;
  }

  // Simulate form submission
  showSuccess(emailInput);

  // Reset form after 2 seconds
  setTimeout(() => {
    emailInput.value = "";
    removeSuccessMessage(emailInput);
  }, 2000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(input, message) {
  input.classList.add("error");

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message show";
  errorDiv.textContent = message;

  const formGroup = input.closest(".form-group, .form-group-left");
  formGroup.appendChild(errorDiv);

  // Focus on the input
  input.focus();
}

function showSuccess(input) {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.style.color = "#46d369";
  successDiv.style.fontSize = "14px";
  successDiv.style.marginTop = "8px";
  successDiv.textContent = "Başarılı! Yönlendiriliyorsunuz...";

  const formGroup = input.closest(".form-group, .form-group-left");
  formGroup.appendChild(successDiv);
}

function removeErrorMessage(input) {
  const formGroup = input.closest(".form-group, .form-group-left");
  const errorMessage = formGroup.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function removeSuccessMessage(input) {
  const formGroup = input.closest(".form-group, .form-group-left");
  const successMessage = formGroup.querySelector(".success-message");
  if (successMessage) {
    successMessage.remove();
  }
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add fade-in class to sections and observe them
  const sections = document.querySelectorAll(
    ".trending-section, .features-section, .faq-section",
  );
  sections.forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });

  // Stagger animation for feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.style.background = "rgba(0,0,0,0.9)";
  } else {
    header.style.background =
      "linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent)";
  }
});

// Language selector functionality
document.querySelectorAll("select").forEach((select) => {
  select.addEventListener("change", function () {
    // In a real application, this would handle language switching
    console.log("Language changed to:", this.value);

    // Store preference in localStorage
    localStorage.setItem("netflix-language", this.value);
  });
});

// Load saved language preference
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("netflix-language");
  if (savedLanguage) {
    document.querySelectorAll("select").forEach((select) => {
      select.value = savedLanguage;
    });
  }
});

// Utility function to detect if user prefers reduced motion
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Disable animations if user prefers reduced motion
if (prefersReducedMotion()) {
  document.documentElement.style.setProperty("--animation-duration", "0s");
  document.documentElement.style.setProperty("--transition-duration", "0s");
}

// Error handling for failed image loads
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", function () {
      // Replace with a placeholder or fallback image
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5Hw7Byc2VsIEjFj2xhbmF6PC90ZXh0Pgo8L3N2Zz4K";
      this.alt = "Görsel Yüklenemedi";
    });
  });
});

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Console easter egg for developers
console.log(`
███╗   ██╗███████╗████████╗███████╗██╗     ██╗██╗  ██╗
████╗  ██║██╔════╝╚══██╔══╝██╔════╝██║     ██║╚██╗██╔╝
██╔██╗ ██║█████╗     ██║   █████╗  ██║     ██║ ╚███╔╝
██║╚██╗██║██╔══╝     ██║   ██╔══╝  ██║     ██║ ██╔██╗
██║ ╚████║███████╗   ██║   ██║     ███████╗██║██╔╝ ██╗
╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝     ╚══════╝╚═╝╚═╝  ╚═╝

Netflix Clone - Sadece HTML, CSS ve JavaScript ile yapıldı!
GitHub: Bu bir demo projedir.
`);
