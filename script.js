// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle")
  const navMenu = document.getElementById("navMenu")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Close menu when a link is clicked
  const navLinks = navMenu ? navMenu.querySelectorAll("a") : []
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Set active navigation link
  const currentLocation = location.href
  const menuItems = navMenu ? navMenu.querySelectorAll("a") : []
  menuItems.forEach((item) => {
    if (item.href === currentLocation) {
      item.classList.add("active")
    } else {
      item.classList.remove("active")
    }
  })
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const company = document.getElementById("company").value.trim()
    const service = document.getElementById("service").value
    const message = document.getElementById("message").value.trim()
    const privacy = document.getElementById("privacy").checked

    // Validation
    if (!name || !email || !service || !message) {
      showFormMessage("Please fill in all required fields", "error")
      return
    }

    if (!validateEmail(email)) {
      showFormMessage("Please enter a valid email address", "error")
      return
    }

    if (!privacy) {
      showFormMessage("Please agree to the privacy policy", "error")
      return
    }

    // Simulate form submission
    showFormMessage("Thank you for your message! We will get back to you soon.", "success")

    // Reset form
    contactForm.reset()

    // In a real application, you would send this data to a backend server
    console.log({
      name,
      email,
      company,
      service,
      message,
      timestamp: new Date().toISOString(),
    })
  })
}

// Helper function to validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper function to show form messages
function showFormMessage(message, type) {
  const formMessage = document.getElementById("formMessage")
  if (formMessage) {
    formMessage.textContent = message
    formMessage.className = `form-message ${type}`

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.className = "form-message"
    }, 5000)
  }
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault()
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe service cards, portfolio items, and team members
document.querySelectorAll(".service-card, .portfolio-item, .team-member, .reason-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  const start = 0
  const increment = target / (duration / 16)
  let current = start

  const counter = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target
      clearInterval(counter)
    } else {
      element.textContent = Math.floor(current)
    }
  }, 16)
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".stats")
if (statsSection) {
  let animated = false
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true
      document.querySelectorAll(".stat-number").forEach((stat) => {
        const target = Number.parseInt(stat.textContent)
        animateCounter(stat, target)
      })
      statsObserver.unobserve(statsSection)
    }
  })
  statsObserver.observe(statsSection)
}

// Scroll to top button
const scrollTopBtn = document.createElement("button")
scrollTopBtn.innerHTML = "↑"
scrollTopBtn.className = "scroll-top-btn"
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--primary-color);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    font-size: 24px;
    font-weight: bold;
    transition: all 0.3s ease;
    z-index: 99;
`

document.body.appendChild(scrollTopBtn)

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = "block"
  } else {
    scrollTopBtn.style.display = "none"
  }
})

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

scrollTopBtn.addEventListener("mouseenter", () => {
  scrollTopBtn.style.background = "var(--secondary-color)"
  scrollTopBtn.style.transform = "scale(1.1)"
})

scrollTopBtn.addEventListener("mouseleave", () => {
  scrollTopBtn.style.background = "var(--primary-color)"
  scrollTopBtn.style.transform = "scale(1)"
})
