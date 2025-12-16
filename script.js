// MM Brothers Musiri - Complete Production Script
// All features: Language, Products, Filters, Slider, Forms, Mobile Menu

const currentLang = localStorage.getItem("lang") || "en";
document.documentElement.lang = currentLang;

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  initLanguage();
  initMobileMenu();
  initProducts();
  initSlider();
  initContactForm();
  initSmoothScroll();
});

function initLanguage() {
  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.value = currentLang;
    updateLanguage(currentLang);

    langSelect.addEventListener("change", (e) => {
      const newLang = e.target.value;
      updateLanguage(newLang);
      localStorage.setItem("lang", newLang);
    });
  }
}

function updateLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll("[data-en-placeholder]").forEach((el) => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
  });

  window.currentLang = lang; // Global for products
  document.documentElement.lang = lang;

  // Refresh products with new language
  if (document.getElementById("product-grid")) {
    renderProducts();
  }
}

// Mobile hamburger menu
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
}

// PRODUCTS - MM Brothers Rice & Eggs (Musiri Prices)
const products = [
  {
    id: 1,
    name: { en: "Seeraga Samba Rice", ta: "சீரக சம்பா அரிசி" },
    price: "₹68/kg",
    category: "rice",
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2ad?w=400&h=200&fit=crop",
    desc: { en: "Premium aromatic rice", ta: "மென்மையான வாசனை அரிசி" },
  },
  {
    id: 2,
    name: { en: "Ponni Rice", ta: "பொன்னி அரிசி" },
    price: "₹58/kg",
    category: "rice",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=200&fit=crop",
    desc: { en: "Daily cooking rice", ta: "தினசரி சமையல் அரிசி" },
  },
  {
    id: 3,
    name: { en: "Country Eggs", ta: "நாட்டு முட்டை" },
    price: "₹11/dozen",
    category: "eggs",
    img: "https://images.unsplash.com/photo-1603048297194-9bef1f845cf5?w=400&h=200&fit=crop",
    desc: { en: "Farm fresh daily", ta: "ஃபார்ம் புதியது தினசரி" },
  },
  {
    id: 4,
    name: { en: "White Eggs", ta: "வெள்ளை முட்டை" },
    price: "₹8/dozen",
    category: "eggs",
    img: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=200&fit=crop",
    desc: { en: "White layer eggs", ta: "வெள்ளை முட்டை" },
  },
  {
    id: 5,
    name: { en: "Kuruvai Rice", ta: "குறுவை அரிசி" },
    price: "₹72/kg",
    category: "rice",
    img: "https://images.unsplash.com/photo-1511699656952-34342bb7c2f2?w=400&h=200&fit=crop",
    desc: { en: "Traditional variety", ta: "பாரம்பரிய அரிசி" },
  },
];

function initProducts() {
  if (document.getElementById("product-grid")) {
    renderProducts(products);
    initFilters();
    initSearch();
  }
}

function renderProducts(productsToShow = products) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const lang = window.currentLang || "en";

  grid.innerHTML = productsToShow
    .map(
      (product) => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.img}" 
                 alt="${product.name.en}" 
                 loading="lazy" 
                 onerror="this.src='https://via.placeholder.com/400x200/28a745/fff?text=${encodeURIComponent(
                   product.name.en
                 )}'">
            <div class="product-info">
                <h3>${product.name[lang]}</h3>
                <div class="price">${product.price}</div>
                <p class="desc">${product.desc[lang]}</p>
                <a href="https://wa.me/917667424736?text=${encodeURIComponent(
                  `${product.name[lang]} x1 - ${product.price} - Musiri Main Market`
                )}" 
                   class="btn-order" target="_blank">
                    ${lang === "ta" ? "இப்போது ஆர்டர்" : "Order Now"}
                </a>
            </div>
        </div>
    `
    )
    .join("");
}

function initFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Update active button
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");

      const filter = e.target.dataset.filter;
      let filtered =
        filter === "all"
          ? products
          : products.filter((p) => p.category === filter);
      renderProducts(filtered);
    });
  });
}

function initSearch() {
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.en.toLowerCase().includes(query) ||
          p.name.ta.toLowerCase().includes(query) ||
          p.desc.en.toLowerCase().includes(query) ||
          p.desc.ta.toLowerCase().includes(query)
      );
      renderProducts(filtered);
    });
  }
}

// Hero Slider
function initSlider() {
  let slideIndex = 1;

  function showSlides(n) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".nav-dot");

    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    if (slides[n - 1]) slides[n - 1].classList.add("active");
    if (dots[n - 1]) dots[n - 1].classList.add("active");
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function nextSlide() {
    slideIndex =
      slideIndex >= document.querySelectorAll(".slide").length
        ? 1
        : slideIndex + 1;
    showSlides(slideIndex);
  }

  showSlides(slideIndex);
  setInterval(nextSlide, 5000);

  // Make functions global for onclick
  window.currentSlide = currentSlide;
  window.showSlides = showSlides;
}

// Contact Form
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button");
      const originalText = btn.textContent;
      const lang = window.currentLang || "en";

      btn.textContent = lang === "ta" ? "அனுப்புகிறோம்..." : "Sending...";
      btn.disabled = true;

      setTimeout(() => {
        alert(
          lang === "ta"
            ? "நன்றி! 30 நிமிடங்களுக்குள் போன் செய்கிறோம்."
            : "Thank you! We will call you within 30 minutes."
        );
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }
}

// Smooth scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}
