import { on, select, scrollto, onScroll } from "./utils/helpers.js";

/*
  #Sliders
---------------------------------*/
const brandSlider = new A11YSlider(select(".brand-slider"), {
  slidesToShow: 2,
  autoplay: true,
  arrows: false,
  dots: false,
  responsive: {
    576: {
      slidesToShow: 3,
    },
    768: {
      slidesToShow: 4,
    },
    992: {
      slidesToShow: 5,
    },
  },
});

const latestReleasesSlider = new A11YSlider(select(".releases-slider"), {
  slidesToShow: 1,
  autoplay: true,
  arrows: false,
  dots: false,
  responsive: {
    768: {
      slidesToShow: 2,
    },
    992: {
      slidesToShow: 3,
    },
  },
});

const featuredGamesSlider = new A11YSlider(select(".featured-slider"), {
  slidesToShow: 1,
  autoplay: true,
  centerMode: true,
  arrows: false,
  dots: false,

  responsive: {
    768: {
      slidesToShow: 2,
      arrows: false,
    },
    992: {
      slidesToShow: 3,
    },
  },
});

const shopSlider = new A11YSlider(select(".shop-slider"), {
  slidesToShow: 1,
  autoplay: true,
  centerMode: true,
  arrows: false,
  dots: false,

  responsive: {
    768: {
      slidesToShow: 2,
      arrows: false,
    },
    992: {
      slidesToShow: 3,
    },
  },
});

/*
  #Toggle is-scrolled class when scrolling
---------------------------------*/

on("scroll", window, () => {
  scrollY > 100
    ? document.body.classList.add("is-scrolled")
    : document.body.classList.remove("is-scrolled");
});

/*
  #Show/Hide navbar
---------------------------------*/

on("click", ".nav-toggler", function () {
  this.classList.toggle("is-active");
});

/*
  #Show/Hide search modal
---------------------------------*/

const searchBtn = select("[data-search-btn]");
const overlay = select("[data-overlay]");

on("click", searchBtn, function () {
  this.classList.add("is-active");
});

on("click", overlay, function () {
  searchBtn.classList.remove("is-active");
});

/*
  #Scroll to target section when click on a nav link
 ---------------------------------------------------*/

const navLinks = select("[data-nav-link]", true);
const headerOffset = select("[data-header]").offsetHeight;

on("click", navLinks, function (e) {
  e.preventDefault();

  const section = select(`#${this.dataset.scrollto}`);
  scrollto(section, headerOffset);
});

/*
  #Sync nav links with target sections when scrolling
---------------------------------*/
const sections = select("[data-section]", true);

const checkSection = (section) => {
  if (scrollY >= section.offsetTop - headerOffset) {
    const sectionId = section.id;
    navLinks.forEach((link) => {
      link.dataset.scrollto === sectionId
        ? link.classList.add("is-active")
        : link.classList.remove("is-active");
    });
  }
};
const syncLinks = () => {
  sections.forEach((section) => {
    checkSection(section);
  });
};

onScroll(window, syncLinks);

/*
  #Back to top button
---------------------------------*/
const backTopBtn = select("[data-back-top-btn]");

on("click", backTopBtn, () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
