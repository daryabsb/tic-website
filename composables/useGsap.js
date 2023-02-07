import { ref } from "vue";
// import gsap from "gsap"
import { TweenMax } from "gsap/TweenMax";
var slideshowDuration = ref(4000);

function indexInParent(node) {
  var children = node.parentNode.childNodes;
  var num = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i] == node) return num;
    if (children[i].nodeType == 1) num++;
  }
  return -1;
}

export function slideshowPrev(manual, auto) {
  let prevSlide = activeSlide.value - 1;
  if (prevSlide < 0) {
    prevSlide = slides.value.length - 1;
  }
  slideshowSwitch(prevSlide, auto);
}

export function slideshowNext(slideshow, previous, auto) {
  var slide = slideshow.value.querySelectorAll(".slide");
  var activeSlide = slideshow.value.querySelector(".is-active");

  var newSlide = null;

  if (previous) {
    newSlide = activeSlide.previousElementSibling;
    if (newSlide.length === 0) {
      newSlide = slide.last();
    }
  } else {
    newSlide = activeSlide.nextElementSibling;
    if (!activeSlide.nextElementSibling) newSlide = slide[0];
  }
  slideshowSwitch(slideshow, indexInParent(newSlide), auto);
}

export function slideshowSwitch(slideshow, index, auto) {
  //   if (slideshow.value.dataset.wait) return;

  // activeSlide.value = index;
  var slide = slideshow.value.querySelectorAll(".slide");
  var activeSlide = slideshow.value.querySelector(".is-active");
  var activeSlideImage = activeSlide.querySelector(".image-container");
  var newSlide = slide[index];
  const newSlideImage = newSlide.querySelector(".image-container");
  const newSlideContent = newSlide.querySelector(".slide-content");
  const newSlideElements = newSlide.querySelectorAll(".caption > *");
  if (activeSlide == newSlide) return;

  newSlide.classList.add("is-new");
  var timeout = slideshow.value.dataset.timeout;
  clearTimeout(timeout);

  //   slideshow.value.dataset.wait = true;

  // console.log("newSlideImage", newSlideImage);
  var transition = slideshow.value.dataset.transition;
  //   var transition = "other";

  if (transition == "fade") {
    newSlide.style.display = "block";
    newSlide.style.zIndex = 20;
    newSlideImage.style.opacity = 0;

    TweenMax.to(newSlideImage, 1, {
      alpha: 1,
      onComplete: function () {
        newSlide.classList.add("is-active");
        newSlide.classList.remove("is-new");
        activeSlide.classList.remove("is-active");
        newSlide.style.cssText = "display: ''; zIndex: ''";
        newSlideImage.style.cssText = "opacity: ''";
        // slideshow.value
        //   .querySelector(".pagination")
        //   .dispatchEvent(new Event("check"));
        slideshow.value.dataset.wait = false;
        if (auto) {
          var timeout = setTimeout(function () {
            slideshowNext(slideshow, false, true);
          }, slideshowDuration.value);

          slideshow.value.dataset.timeout = timeout;
        }
      },
    });
  } else {
    // console.log('index', index > activeSlide.value);
    if (index > indexInParent(activeSlide)) {
      var newSlideRight = 0;
      var newSlideLeft = "auto";
      var newSlideImageRight = -slideshow.value.offsetWidth / 8;
      var newSlideImageLeft = "auto";
      var newSlideImageToRight = 0;
      var newSlideImageToLeft = "auto";
      var newSlideContentLeft = "auto";
      var newSlideContentRight = 0;
      var activeSlideImageLeft = -slideshow.value.offsetWidth / 4;
    } else {
      var newSlideRight = "";
      var newSlideLeft = 0;
      var newSlideImageRight = "auto";
      var newSlideImageLeft = -slideshow.value.offsetWidth / 8;
      var newSlideImageToRight = "";
      var newSlideImageToLeft = 0;
      var newSlideContentLeft = 0;
      var newSlideContentRight = "auto";
      var activeSlideImageLeft = slideshow.value.offsetWidth / 4;
    }
    newSlide.style.display = "block";
    newSlide.style.width = 0;
    newSlide.style.right = newSlideRight;
    newSlide.style.left = newSlideLeft;
    newSlide.style.zIndex = 2;

    newSlideImage.style.display = "block";
    newSlideImage.style.width = slideshow.value.offsetWidth;
    newSlideImage.style.right = newSlideImageRight;
    newSlideImage.style.left = newSlideImageLeft;
    newSlideImage.style.zIndex = 2;

    newSlideContent.style.width = slideshow.value.offsetWidth;
    newSlideContent.style.right = newSlideContentRight;
    newSlideContent.style.left = newSlideContentLeft;
    newSlideContent.style.zIndex = 200;

    activeSlideImage.style.left = 0;

    TweenMax.set(newSlideElements, { y: 20, force3D: true });
    TweenMax.to(activeSlideImage, 1, {
      left: activeSlideImageLeft,
      ease: Power3.easeInOut,
    });
    TweenMax.to(newSlide, 1, {
      width: slideshow.value.offsetWidth,
      ease: Power3.easeInOut,
    });

    TweenMax.to(newSlideImage, 1, {
      right: newSlideImageToRight,
      left: newSlideImageToLeft,
      ease: Power3.easeInOut,
    });
    TweenMax.staggerFromTo(
      newSlideElements,
      0.8,
      { alpha: 0, y: 60 },
      { alpha: 1, y: 0, ease: Power3.easeOut, force3D: true, delay: 0.6 },
      0.1,
      function () {
        newSlide.classList.add("is-active");
        newSlide.classList.remove("is-new");
        activeSlide.classList.remove("is-active");
        newSlide.style.display = "";
        newSlide.style.width = "";
        newSlide.style.left = "";
        newSlide.style.zIndex = "";

        newSlideImage.style.width = "";
        newSlideImage.style.right = "";
        newSlideImage.style.left = "";

        newSlideContent.style.width = "";
        newSlideContent.style.left = "";

        // newSlideEls.style.cssText= cssText = "opacity: ''; transform: ''";
        newSlideElements.forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
        });
        // newSlideEls.style.transform = "";

        activeSlideImage.style.left = "";

        // check()

        slideshow.value.dataset.wait = false;
        if (auto) {
          timeout = setTimeout(() => {
            slideshowNext(slideshow, false, true);
          }, slideshowDuration.value);
          slideshow.value.dataset.timeout = timeout;
        }
      }
    );
  }
}

export function homeSlideshowParallax() {
  var scrollTop = window.pageYOffset;
  if (scrollTop > window.innerHeight) return;
  var inner = document.querySelector(".slideshow-inner");
  var newHeight = window.innerHeight - scrollTop / 2;
  var newTop = scrollTop * 0.8;

  inner.style.transform = "translateY(" + newTop + "px)";
  inner.style.height = newHeight + "px";
}

export const slideData = [
  {
    title: "GSAP SLIDE 001",
    description: "This is an automatic slideshow",
    img:
      "https://www.alixbdanthenay.fr/wp-content/uploads/2015/07/Indispensable-1.jpg",
    btn: "Upcoming event",
  },
  {
    title: "GSAP SLIDE 002",
    description: "This is an automatic slideshow",
    img:
      "https://www.alixbdanthenay.fr/wp-content/uploads/2015/07/Indispensable-4-1.jpg",
    btn: "Upcoming event",
  },
  {
    title: "GSAP SLIDE 003",
    description: "This is an automatic slideshow",
    img: "https://www.alixbdanthenay.fr/wp-content/uploads/2016/11/11.jpg",
    btn: "Upcoming event",
  },
  {
    title: "GSAP SLIDE 004",
    description: "This is an automatic slideshow",
    img:
      "https://www.alixbdanthenay.fr/wp-content/uploads/2016/11/20mars17-sans-typo.jpg",
    btn: "Upcoming event",
  },
];
