(function () {
  const legacy = document.querySelector(".top-footer");
  if (!legacy || document.querySelector(".site-header")) return;

  const path = decodeURIComponent(window.location.pathname).replace(/\\/g, "/");
  const file = (path.split("/").pop() || "").toLowerCase();
  const inServices = /\/services\//i.test(path);
  const inCompany = /\/our_company\//i.test(path);
  const nested = inServices || inCompany;
  const asset = nested ? "../../" : "../";
  const up = nested ? "../" : "";
  const company = (page) => (inCompany ? page : up + "our_company/" + page);
  const service = (page) => (inServices ? page : up + "services/" + page);
  const top = (page) => up + page;
  const on = (name) => (file === name ? " active" : "");

  const companyLinks = [
    ["about.html", "About Us"],
    ["our_partners.html", "Our Partners"],
    ["core_values.html", "Core Values"],
    ["certification.html", "Certifications"]
  ].map(([page, label]) => `<li><a class="dropdown-item" href="${company(page)}">${label}</a></li>`).join("");

  const serviceLinks = [
    ["arbitration.html", "Arbitration"],
    ["architecture.html", "Architecture"],
    ["consulting.html", "Consulting"],
    ["contract_mngmnt.html", "Contract Management"],
    ["design&renovation.html", "Design & Renovation"],
    ["interior_design.html", "Interior Design"],
    ["landscape&architecture.html", "Landscape Architecture"],
    ["p_plning&feasibilitystudy.html", "Planning & Feasibility"],
    ["project_management.html", "Project Management"]
  ].map(([page, label]) => `<li><a class="dropdown-item" href="${service(page)}">${label}</a></li>`).join("");

  legacy.outerHTML = `
<header class="site-header" id="siteHeader">
  <div class="utility-bar">
    <div class="container">
      <div class="utility-left">
        <span><i class="bi bi-geo-alt"></i>Dar es Salaam, Tanzania</span>
        <a href="tel:+255762786987"><i class="bi bi-telephone"></i>+255 762 786 987</a>
        <a class="utility-mail" href="mailto:info@eiroconsultancy.co.tz"><i class="bi bi-envelope"></i>info@eiroconsultancy.co.tz</a>
      </div>
      <div class="utility-right">Mon – Fri &nbsp;·&nbsp; 08:00 – 17:00</div>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg navbar-light site-nav" aria-label="Primary">
    <div class="container">
      <a class="navbar-brand" href="${top("home.html")}">
        <img src="${asset}assets/images/logo/eiro.png" alt="" onerror="this.style.display='none'">
        <span class="brand-text"><strong>EIRO</strong><small>Consultancy Ltd</small></span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Open menu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item"><a class="nav-link${on("home.html")}" href="${top("home.html")}">Home</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle${inCompany ? " active" : ""}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Company</a>
            <ul class="dropdown-menu">${companyLinks}</ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle${inServices ? " active" : ""}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services</a>
            <ul class="dropdown-menu services-menu">${serviceLinks}</ul>
          </li>
          <li class="nav-item"><a class="nav-link${on("expertise.html")}" href="${top("expertise.html")}">Expertise</a></li>
          <li class="nav-item"><a class="nav-link${on("projects.html")}" href="${top("projects.html")}">Projects</a></li>
          <li class="nav-item"><a class="btn btn-contact${on("contact.html")}" href="${top("contact.html")}">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>
</header>`;

  if (!document.querySelector(".hero-section, .page-hero")) {
    const title = (document.title.split("-")[0] || "EIRO Consultancy").trim();
    document.querySelector(".site-header").insertAdjacentHTML("afterend", `
<header class="page-hero">
  <div class="container">
    <p class="eyebrow"><span class="dot"></span>EIRO Consultancy</p>
    <h1>${title}</h1>
    <p class="lead">Architectural and engineering consultancy</p>
  </div>
</header>`);
  }

  if (!document.querySelector('link[href*="Cormorant"]')) {
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect);
    const fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Manrope:wght@400;500;600;700&display=swap";
    document.head.appendChild(fonts);
  }
  if (!document.querySelector('link[href*="bootstrap-icons"]')) {
    const icons = document.createElement("link");
    icons.rel = "stylesheet";
    icons.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";
    document.head.appendChild(icons);
  }
})();

document.addEventListener("DOMContentLoaded", function () {

  // ================= Header shadow on scroll =================
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ================= Fade-in / Appear elements on scroll =================
  const fadeElements = document.querySelectorAll(
    ".fade-in, .fade-in-up, section, .team-member, .service-card"
  );
  const appearObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  fadeElements.forEach((el) => appearObserver.observe(el));

  // ================= Team hover animation =================
  document.querySelectorAll(".team-member").forEach((member) => {
    member.addEventListener("mouseenter", () =>
      member.classList.add("hovered")
    );
    member.addEventListener("mouseleave", () =>
      member.classList.remove("hovered")
    );
  });

  // ================= Hero text animation on page load =================
  const heroEls = document.querySelectorAll(
    ".hero-section h1, .hero-section p, .page-hero h1, .page-hero p"
  );
  heroEls.forEach((el) => el.classList.add("appear"));

  // ================= Clients slider pause on hover =================
  const clientsTrack = document.querySelector(".clients-track");
  if (clientsTrack) {
    clientsTrack.addEventListener(
      "mouseenter",
      () => (clientsTrack.style.animationPlayState = "paused")
    );
    clientsTrack.addEventListener(
      "mouseleave",
      () => (clientsTrack.style.animationPlayState = "running")
    );
  }

  // ================= Navbar Dropdown Hover (DISABLED, force click) =================
  // Tumeondoa hover behavior kwa desktop, dropdown zote zinafunguka kwa click tu.

  // ================= Footer Company Submenu (click only) =================
  document.querySelectorAll(".dropdown-submenu > .dropdown-toggle").forEach(
    (toggle) => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const parent = this.parentElement;

        // Funga submenu zingine
        parent.parentElement.querySelectorAll(".dropdown-submenu.show").forEach(function (openSub) {
          if (openSub !== parent) {
            openSub.classList.remove("show");
          }
        });

        // Toggle hii submenu
        parent.classList.toggle("show");
      });
    }
  );

  // ================= Reset submenus wakati dropdown kuu inafungwa =================
  document.querySelectorAll(".dropdown").forEach(function (dd) {
    dd.addEventListener("hidden.bs.dropdown", function () {
      dd.querySelectorAll(".dropdown-submenu").forEach(function (sub) {
        sub.classList.remove("show");
      });
    });
  });

  // ================= Close submenu ukibofya nje =================
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document
        .querySelectorAll(".dropdown-submenu")
        .forEach((sub) => sub.classList.remove("show"));
    }
  });

});



/* js for project page */

if (window.SimpleLightbox && document.querySelector(".gallery a")) {
  new SimpleLightbox(".gallery a", {});
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    projectCards.forEach((card) => {
      const show = filter === "all" || card.getAttribute("data-category") === filter;
      card.style.display = show ? "block" : "none";
    });
  });
});

    // Slideshow with fade + slide-up captions
    const slides = {
      residential: [
        {src: '../assets/images/projects/residential/RESIDENTIAL_KATAVI_MPANDA.jpg', caption: 'Residential Katavi Mpanda'},
        {src: '../assets/images/projects/residential/RESIDENTIAL_KISONGO_SUB_STATION.jpg', caption: 'Kisongo Sub Station, Arusha'},
        {src: '../assets/images/projects/residential/RESIDENTIAL_NGARAMTON2.png', caption: 'Residential Ngaramtoni, Arusha'},
        {src: '../assets/images/projects/residential/RESIDENTIAL_NGARAMTONI1.png', caption: 'Residential Ngara'},
        {src: '../assets/images/projects/residential/RESIDENTIAL_NJIRO_INT2.jpg', caption: 'Residential Njiro, Arusha'},
        {src: '../assets/images/projects/residential/RESIDENTIAL_NJIRO_INTERIOR1.jpg', caption: 'Residential Njiro Interior, Arusha'},
        
        {src: '../assets/images/projects/residential/RESIDENTIAL_NJIRO_INTERIOR2.jpg', caption: 'Residential Villa 7'},
        {src: '../assets/images/projects/residential/RESIDENTIAL_NJIRO.jpg', caption: 'Residential njiro, Arusha'}
      ],
      commercial: [
        {src: '../assets/images/projects/commercial/eco_lodge_open_bar2.jpg', caption: 'ECO Lodge Open Bar'},
        {src: '../assets/images/projects/commercial/eco_lodge_restaurant.jpg', caption: 'ECO Lodge Restaurant'},
        {src: '../assets/images/projects/commercial/eco_lodge_swimming.jpg', caption: 'ECO Lodge Swimming'},
        {src: '../assets/images/projects/commercial/eco_lodge_restaurant1.jpg', caption: 'ECO Lodge Restaurant'},
        {src: '../assets/images/projects/commercial/eco_lodge_swimming2.jpg', caption: 'ECO Lodge Swimming'},
        {src: '../assets/images/projects/commercial/hotel_tarime1.jpg', caption: 'Tarime Hotel'},
        
        
        {src: '../assets/images/projects/commercial/hotel_tarime2.jpg', caption: 'Tarime Hotel'},
        {src: '../assets/images/projects/commercial/hotel_tarime3.jpg', caption: 'Tarime Hotel'},
        {src: '../assets/images/projects/commercial/ndes_apartment_moshi.jpg', caption: 'NDES Apartment, Moshi'},
        {src: '../assets/images/projects/commercial/restaurant_karatu.jpg', caption: 'Karatu Restaurant'},
        {src: '../assets/images/projects/commercial/restaurant_karatu2.jpg', caption: 'Karatu Restaurant'},
        {src: '../assets/images/projects/commercial/restaurant_karatu3.jpg', caption: 'Karatu Restaurant'}
      ],
      institutional: [
        {src: '../assets/images/projects/institutional/ELCT_CHURCH_SASI1.jpg', caption: 'ELCT Church Sasi, Arusha'},
        {src: '../assets/images/projects/institutional/ELCT_CHURCH_SASI.jpg', caption: 'ELCT Church Sasi, Arusha'},
        {src: '../assets/images/projects/institutional/END_OF_TIME_REVIVAL_CHURCH.jpg', caption: 'End Of Time Revival Church'},
        {src: '../assets/images/projects/institutional/END_OF_TIME_REVIVAL_CHURCH1.jpg', caption: 'End Of Time Revival Church'},
        {src: '../assets/images/projects/institutional/SDA_CHURCH_KIJENGE.png', caption: 'SDA Church Kijenge, Arusha'},
       
        
        {src: '../assets/images/projects/institutional/SDA_CHURCH_KIJENGE1.png', caption: 'SDA Church Kijenge, Arusha'}
      
      ]
    };

   document.querySelectorAll('.project-card').forEach(card => {
  const category = card.getAttribute('data-category');
  const img = card.querySelector('.slide-img');
  const caption = card.querySelector('.slide-caption');
  let index = 0;

  if(slides[category]){
    let intervalId = setInterval(nextSlide, 4000); // store interval ID

    function nextSlide() {
      index = (index + 1) % slides[category].length;

      // hide image and caption
      img.style.opacity = 0;
      caption.classList.add('caption-hidden');

      setTimeout(() => {
        // update image and caption
        img.src = slides[category][index].src;
        caption.textContent = slides[category][index].caption;

        // show image and caption
        img.style.opacity = 1;
        caption.classList.remove('caption-hidden');
      }, 500);
    }

    // Pause on hover
    card.addEventListener('mouseenter', () => clearInterval(intervalId));
    card.addEventListener('mouseleave', () => intervalId = setInterval(nextSlide, 4000));
  }
});
