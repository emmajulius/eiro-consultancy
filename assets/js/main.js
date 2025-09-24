// ================= Full Updated JS (Dropdowns fixed) =================
document.addEventListener("DOMContentLoaded", function () {

  // ================= Navbar shrink on scroll =================
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
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

  // ================= Smooth background zoom for hero sections =================
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".hero-section, .page-hero").forEach((hero) => {
      const offset = window.scrollY * 0.2;
      hero.style.backgroundSize = `calc(100% + ${offset}px) auto`;
    });
  });

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



/* js for prject page*/

// Lightbox
    const lightbox = new SimpleLightbox('.gallery a', {});

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        projectCards.forEach(card => {
          if(filter === 'all' || card.getAttribute('data-category') === filter){
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
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
