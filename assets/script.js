const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Decorative particles. They are intentionally subtle and do not block interaction.
const particleLayer = document.querySelector(".particles");
if (particleLayer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  for (let i = 0; i < 34; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${12 + Math.random() * 20}s`;
    particle.style.animationDelay = `${-Math.random() * 25}s`;
    const size = Math.random() > 0.8 ? 3 : 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particleLayer.appendChild(particle);
  }
}

// Reveal sections as they enter the viewport.
const revealTargets = document.querySelectorAll(
  ".section-label, .about-layout, .stat-strip, .section-heading, .feature-card, .updates-heading, .update-placeholder, .play-content"
);
revealTargets.forEach((item) => item.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((item) => observer.observe(item));
} else {
  revealTargets.forEach((item) => item.classList.add("visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();

// Replace the placeholder with your Roblox experience URL before publishing.
const robloxGameUrl = "";
const robloxLink = document.getElementById("roblox-link");
const linkReminder = document.getElementById("link-reminder");
if (robloxGameUrl.trim()) {
  robloxLink.href = robloxGameUrl;
  robloxLink.target = "_blank";
  robloxLink.rel = "noopener noreferrer";
  linkReminder.textContent = "Opens the Roblox experience in a new tab.";
} else {
  robloxLink.addEventListener("click", (event) => {
    event.preventDefault();
    linkReminder.textContent = "The Roblox link has not been configured yet. Add your game URL in script.js.";
    linkReminder.classList.add("reminder-active");
  });
}

// Highlight the active section in the navigation.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}
