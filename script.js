// Loading Screen
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.style.overflow = "visible";
  }, 1500);
});

// Custom Cursor
const cursor = document.getElementById("customCursor");
let mouseX = 0,
  mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursor.style.left = mouseX - 10 + "px";
  cursor.style.top = mouseY - 10 + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effects for cursor
document
  .querySelectorAll("a, button, .project-card, .skill-item")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });

// Scroll Progress
window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scrollProgress");
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  scrollProgress.style.width = scrolled + "%";
});

// Navigation
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active nav link
  const sections = document.querySelectorAll("section");
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Smooth scrolling
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Reveal animations
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right"
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Animated counters
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ""));
    const increment = target / 50;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent =
          Math.floor(current) + (counter.textContent.includes("+") ? "+" : "");
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = counter.textContent;
      }
    };

    updateCounter();
  });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats-grid");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Testimonials carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");

const showTestimonial = (index) => {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle("active", i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
};

// Auto-rotate testimonials
const rotateTestimonials = () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
};

setInterval(rotateTestimonials, 5000);

// Manual testimonial navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Show success message
  const submitButton = contactForm.querySelector(".form-submit");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Message Sent!";
  submitButton.style.background = "var(--success)";

  setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.style.background = "var(--gradient-primary)";
    contactForm.reset();
  }, 3000);
});

// Particle system
const createParticles = () => {
  const particleCount = 50;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = "2px";
    particle.style.height = "2px";
    particle.style.background = "rgba(99, 102, 241, 0.3)";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "-1";

    particles.push({
      element: particle,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    });

    document.body.appendChild(particle);
  }

  const animateParticles = () => {
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

      particle.element.style.left = particle.x + "px";
      particle.element.style.top = particle.y + "px";
      particle.element.style.opacity = particle.opacity;
    });

    requestAnimationFrame(animateParticles);
  };

  animateParticles();
};

// Initialize particles (optional - can be resource intensive)
// createParticles();

// Typing animation for hero subtitle
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = "";

  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  type();
};

// Initialize typing animation after page load
setTimeout(() => {
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    typeWriter(heroSubtitle, originalText, 100);
  }
}, 2000);

// Skills hover effects
document.querySelectorAll(".skill-item").forEach((skill) => {
  skill.addEventListener("mouseenter", () => {
    skill.style.transform = "translateY(-10px) scale(1.05) rotateY(5deg)";
  });

  skill.addEventListener("mouseleave", () => {
    skill.style.transform = "translateY(0) scale(1) rotateY(0deg)";
  });
});

// Project cards 3D tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
  });
});

// Parallax scrolling effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-element");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });
});

// Smooth reveal animations with stagger
const revealElementsWithStagger = document.querySelectorAll(
  ".project-card, .service-card, .skill-item"
);
const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  },
  { threshold: 0.1 }
);

revealElementsWithStagger.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 0.6s ease";
  staggerObserver.observe(el);
});

// Interactive background gradient
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  document.querySelector(".bg-overlay").style.background = `
                radial-gradient(circle at ${x}% ${y}%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                radial-gradient(circle at ${100 - x}% ${
    100 - y
  }%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)
            `;
});

// Add scroll-to-top button
const createScrollToTop = () => {
  const button = document.createElement("button");
  button.innerHTML = "↑";
  button.className = "scroll-to-top";
  button.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--gradient-primary);
                color: white;
                border: none;
                font-size: 20px;
                cursor: pointer;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: var(--shadow-lg);
            `;

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      button.style.opacity = "1";
      button.style.transform = "translateY(0)";
    } else {
      button.style.opacity = "0";
      button.style.transform = "translateY(20px)";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-5px) scale(1.1)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0) scale(1)";
  });
};

createScrollToTop();

// Initialize all animations and effects
setTimeout(() => {
  document.body.classList.add("loaded");
}, 1000);

console.log("Portfolio website loaded successfully!");
