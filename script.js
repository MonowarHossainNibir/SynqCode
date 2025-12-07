// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Vanta NET effect
  const VANTA = window.VANTA; // Declare the VANTA variable
  VANTA.NET({
    el: "#hero-vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: window.innerHeight,
    /* Set minHeight to full viewport height */
    minWidth: window.innerWidth,
    /* Set minWidth to full viewport width */
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x3b82f6,
    backgroundColor: 0x0f172a,
    points: 5.0,
    maxDistance: 20.0,
    spacing: 15.0,
  });

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = navMenu ? navMenu.querySelectorAll(".nav-link") : [];

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close menu and update active link when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");

      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Set initial active link based on scroll position
  updateActiveNavLink();
});

function updateActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

const portfolioCarousel = (() => {
  const container = document.querySelector(".carousel-container");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicatorsContainer = document.getElementById("indicators");
  let currentIndex = 0;
  let autoPlayInterval = null;

  // Create indicators
  items.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = `indicator ${index === 0 ? "active" : ""}`;
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.toggle("active", index === currentIndex);
    });

    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }
function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 6000); // 6 seconds 
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  container.addEventListener("mouseenter", stopAutoPlay);
  container.addEventListener("mouseleave", startAutoPlay);

  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopAutoPlay();
    startAutoPlay(); 
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopAutoPlay();
    startAutoPlay();
  });

  // Start auto-play on load
  startAutoPlay();

  // Public methods (optional)
  return {
    next: nextSlide,
    prev: prevSlide,
    goTo: goToSlide
  };
})();

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const company = document.getElementById("company").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();
    const privacy = document.getElementById("privacy").checked;

    if (!name || !email || !service || !message) {
      showFormMessage("Please fill in all required fields", "error");
      return;
    }

    if (!validateEmail(email)) {
      showFormMessage("Please enter a valid email address", "error");
      return;
    }

    if (!privacy) {
      showFormMessage("Please agree to the privacy policy", "error");
      return;
    }

    showFormMessage(
      "Thank you for your message! We will get back to you soon.",
      "success"
    );

    contactForm.reset();

    console.log({
      name,
      email,
      company,
      service,
      message,
      timestamp: new Date().toISOString(),
    });
  });
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormMessage(message, type) {
  const formMessage = document.getElementById("formMessage");
  if (formMessage) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    setTimeout(() => {
      formMessage.className = "form-message";
    }, 5000);
  }
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".service-card, .team-member, .value-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

const statsSection = document.querySelector(".stats");
if (statsSection) {
  let animated = false;
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      document.querySelectorAll(".stat-number").forEach((stat) => {
        const target = Number.parseInt(stat.textContent);
        animateCounter(stat, target);
      });
      statsObserver.unobserve(statsSection);
    }
  });
  statsObserver.observe(statsSection);
}

// Scroll to top button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerHTML = "↑";
scrollTopBtn.className = "scroll-top-btn";
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
