class Carousel {
  constructor(id, imageArray, {
    autoplay, aspectRatio, imageSize, transition, indicatorBar
  } = {}) {
    this.dom = {};
    this.imageArray = imageArray;

    this.settings = {
      autoplay: autoplay || null,
      aspectRatio: aspectRatio || '4:3',
      imageSize: imageSize || 'contain',
      transition: transition || 'horizontal',
      indicatorBar: indicatorBar || 'interior'
    };

    this.state = {
      id,
      quantity: 0,
      slidesArr: [],
      isSliding: false,
      direction: '',
      currentImage: {},
      currentMarker: null,
    };

    this.viewport = {};

    this.touchCtrls = {
      slideOffset: {
        top: null,
        bottom: null,
        left: null,
        right: null
      },
      viewmasterFactor: null,
      startX: null,
      startY: null,
      distX: null,
      distY: null,
      startD: null,
      duration: null,
      slides: [],
      scheduledAnimationFrame: false
    };

    this.rafManager = this.rafManager.bind(this);

    this.init(this.imageArray);
  }

  init() {
    // inject carousel html into dom
    this.createCarouselElements();

    // cache carousel elements from dom
    this.dom.carousel = document.querySelector(`#${this.state.id}.carousel`);
    this.dom.leftControl = this.dom.carousel.querySelector('.carousel__controls--left');
    this.dom.rightControl = this.dom.carousel.querySelector('.carousel__controls--right');
    if (this.settings.indicatorBar !== 'off') {
      this.dom.indicatorBar = this.settings.indicatorBar === 'interior'
        ? this.dom.carousel.querySelector('.carousel__indicator-bar--interior')
        : this.dom.carousel.querySelector('.carousel__indicator-bar--exterior');
    }

    this.dom.viewport = this.dom.carousel.querySelector('.carousel__viewport');
    this.dom.viewportWrapper = this.dom.carousel.querySelector('.carousel__viewport-wrapper');

    // bind controller events
    this.dom.leftControl.addEventListener('mousedown', this.backward.bind(this));
    this.dom.rightControl.addEventListener('mousedown', this.forward.bind(this));
    this.dom.carousel.addEventListener('keydown', this.keyDownControls.bind(this));

    // bind touch events
    this.dom.viewportWrapper.addEventListener('touchstart', this.rafManager, false);
    this.dom.viewportWrapper.addEventListener('touchend', this.rafManager, false);

    if (this.imageArray) this.buildCarousel();
  }

  rafManager(e) {
    e.preventDefault();
    switch (e.type) {
      case 'touchmove':
        if (this.touchCtrls.scheduledAnimationFrame) return;
        this.touchCtrls.scheduledAnimationFrame = true;
        requestAnimationFrame(() => {
          this.touchMoveRenders(e);
        });
        break;
      case 'touchend':
        requestAnimationFrame(() => {
          this.touchEndRenders(e);
        });
        break;
      default:
        requestAnimationFrame(() => {
          this.touchStartRenders(e);
        });
    }
  }

  createCarouselElements() {
    const carouselElements = `
      <div class="carousel__viewport-wrapper">
        <button type="button" class="carousel__controls carousel__controls--left">
          <div class="carousel__focus-ring"></div>
          <div class="carousel__controls-background carousel__controls-background--arrow"></div>
          <svg class="carousel__icon-left" viewBox="0 0 62.826 169.29">
            <g transform="translate(370.32 -123.05)">
              <path
                d="m-312.54 287.28c-52.709-78.69-52.709-78.69-52.709-78.69m52.709-80.481c-52.747 80.11-52.747 80.11-52.747 80.11"
                style="fill:none;stroke-linecap:round;stroke-width:10"
              />
            </g>
          </svg>
        </button>
        <button type="button" class="carousel__controls carousel__controls--right">
          <div class="carousel__focus-ring"></div>
          <div class="carousel__controls-background carousel__controls-background--arrow"></div>
          <svg class="carousel__icon-right" viewBox="0 0 62.826 169.29">
            <g transform="translate(370.32 -123.05)">
              <path
                d="m-365.28 287.28c52.709-78.69 52.709-78.69 52.709-78.69m-52.709-80.481c52.747 80.11 52.747 80.11 52.747 80.11"
                style="fill:none;stroke-linecap:round;stroke-width:10"
              />
            </g>
          </svg>
        </button>
        ${this.settings.indicatorBar === 'interior' ? `
          <div class="carousel__indicator-bar carousel__indicator-bar--interior">
            <div class="carousel__controls-background carousel__controls-background--indicator"></div>
          </div>
        ` : ''}

        <div class="carousel__viewport"></div>
      </div>
        ${this.settings.indicatorBar === 'exterior' ? '<div class="carousel__indicator-bar carousel__indicator-bar--exterior"></div>' : ''}
    `;
    document.getElementById(this.state.id).innerHTML = carouselElements;
  }

  buildCarousel() {
    // update quantity
    this.state.quantity = this.imageArray.length;

    // clear and build slides
    while (this.dom.viewport.firstChild) {
      this.dom.viewport.removeChild(this.dom.viewport.firstChild);
    }
    this.buildSlides();

    // push img nodelist into slidesArr as objects with id and pos
    this.state.slidesArr = [];
    for (let i = 0; i < this.state.quantity; i++) {
      this.state.slidesArr.push({ id: i, pos: i });
    }

    // remove controls for single image display
    if (this.state.quantity === 1) {
      this.dom.leftControl.classList.add('hidden');
      this.dom.rightControl.classList.add('hidden');
      if (this.dom.indicatorBar) this.dom.indicatorBar.classList.add('hidden');
      return;
    }
    this.dom.leftControl.classList.remove('hidden');
    this.dom.rightControl.classList.remove('hidden');

    if (this.dom.indicatorBar) {
      this.dom.indicatorBar.classList.remove('hidden');

      // clear and build indicatorBar
      if (this.dom.indicatorBar.contains(document.querySelector('.carousel__indicator-wrapper'))) {
        this.dom.indicatorBar.removeChild(document.querySelector('.carousel__indicator-wrapper'));
      }
      this.buildindicatorBar();
    }

    // render default positioning
    this.initialRender();
  }

  buildSlides() {
    let imageReel = '';
    this.imageArray.forEach((el) => {
      const attribution = el.auth ? `<span class="carousel__image-attribution">Photo by <a href="${el.profile}?utm_source=deluxe_image_carousel&utm_medium=referral">${el.auth}</a> on <a href="https://unsplash.com/?utm_source=deluxe_image_carousel&utm_medium=referral">Unsplash</a></span>` : ''; // FILTER_ATTRIBUTION
      const slideString = `
      <div class="carousel__slide-container">
        ${attribution} ${'' /* FILTER_ATTRIBUTION */}
        <div class="carousel__slide-wrapper">
          <img class="carousel__slide" src="${el.url}" alt="${el.alt}">
          <div class="carousel__slide-overlay"></div>
        </div>
      </div>
      `;
      imageReel += slideString;
    });
    this.dom.viewport.insertAdjacentHTML(
      'beforeend',
      imageReel,
    );

    this.dom.slideContainers = [...this.dom.carousel.querySelectorAll('.carousel__slide-container')];

    this.dom.slides = this.dom.slideContainers.map(val => ({
      wrapper: val.querySelector('.carousel__slide-wrapper'),
      img: val.querySelector('.carousel__slide')
    }));

    this.dom.slides.forEach((val) => {
      const poll = setInterval(() => {
        if (val.img.naturalWidth) {
          clearInterval(poll);
          this.addOrientationStyles(val);
        }
      }, 10);
    });
  }

  addOrientationStyles(slide) {
    const imgAspectRatioQuotient = (slide.img.naturalWidth / slide.img.naturalHeight).toFixed(2);
    const viewAspectRatioQuotient = (() => {
      const [x, y] = this.settings.aspectRatio.split(':').map(el => parseInt(el, 10));
      return (x / y).toFixed(2);
    })();

    if (this.settings.imageSize === 'contain') {
      if (imgAspectRatioQuotient > viewAspectRatioQuotient) {
        slide.wrapper.classList.add('carousel__slide-wrapper--landscape');
        const wrapperHeight = (viewAspectRatioQuotient / imgAspectRatioQuotient) * 100;
        slide.wrapper.style.height = `${wrapperHeight}%`;
      } else if (imgAspectRatioQuotient < viewAspectRatioQuotient) {
        slide.wrapper.classList.add('carousel__slide-wrapper--portrait');
        const wrapperWidth = (imgAspectRatioQuotient / viewAspectRatioQuotient) * 100;
        slide.wrapper.style.width = `${wrapperWidth}%`
      } else {
        slide.wrapper.classList.add('carousel__slide-wrapper--landscape', 'carousel__slide-wrapper--portrait');
      }
    } else if (imgAspectRatioQuotient > viewAspectRatioQuotient) {
      slide.wrapper.classList.add('carousel__slide-wrapper--portrait');
      const wrapperWidth = (imgAspectRatioQuotient / viewAspectRatioQuotient) * 100;
      slide.wrapper.style.width = `${wrapperWidth}%`
    } else if (imgAspectRatioQuotient < viewAspectRatioQuotient) {
      slide.wrapper.classList.add('carousel__slide-wrapper--landscape');

      const wrapperHeight = (viewAspectRatioQuotient / imgAspectRatioQuotient) * 100;
      slide.wrapper.style.height = `${wrapperHeight}%`;
    } else {
      slide.wrapper.classList.add('carousel__slide-wrapper--landscape', 'carousel__slide-wrapper--portrait');
    }
  }

  buildindicatorBar() {
    const indicatorMarker = '<div class="carousel__indicator-marker"></div>';
    let indicatorString = '';
    for (let i = 0; i < this.state.quantity; i++) {
      indicatorString += indicatorMarker;
    }
    const indicatorWrapper = `
      <div class="carousel__indicator-wrapper">
        ${indicatorString}
      </div>`;
    this.dom.indicatorBar.insertAdjacentHTML(
      'beforeend',
      indicatorWrapper,
    );
    document.querySelector('.carousel__indicator-wrapper').addEventListener('click', this.jumpToMarker.bind(this));
    this.dom.indicatorMarkers = [...document.querySelectorAll('.carousel__indicator-marker')];
  }

  updateindicatorBar() {
    if (this.state.currentMarker) {
      this.state.currentMarker.classList.remove('carousel__indicator-marker--active');
    }
    this.state.currentMarker = this.dom.indicatorMarkers[this.state.slidesArr[1].id];
    this.state.currentMarker.classList.add('carousel__indicator-marker--active');
  }

  initialRender() {
    this.state.slidesArr.forEach((el) => {
      el.pos === this.state.quantity - 1 ? el.pos = 0 : el.pos += 1;
    });
    this.sortImageArray();
    this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('prev');
    this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('hide');
    if (this.state.quantity > 2) {
      for (let i = 2; i < this.state.quantity; i++) {
        this.dom.slideContainers[this.state.slidesArr[i].id].classList.add('hide');
        this.dom.slideContainers[this.state.slidesArr[i].id].classList.add('queue');
      }
    }
    if (this.dom.indicatorBar) this.updateindicatorBar();

    if (this.settings.autoplay) {
      this.initializeAutoplay();
    }
  }

  initializeAutoplay() {
    let autoplay = setInterval(() => {
      this.forward();
    }, this.settings.autoplay);

    this.dom.viewportWrapper.addEventListener('mouseenter', () => {
      clearInterval(autoplay);
    });
    this.dom.viewportWrapper.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => {
        this.forward();
      }, this.settings.autoplay);
    });
    this.dom.viewportWrapper.addEventListener('touchstart', () => {
      clearInterval(autoplay);
    });
    this.dom.viewportWrapper.addEventListener('touchend', () => {
      autoplay = setInterval(() => {
        this.forward();
      }, this.settings.autoplay);
    });
  }

  jumpToMarker(e) {
    let jumpAmount;
    let jumpInterval;
    let jumpTicker = 1;
    if (e.target.classList.contains('carousel__indicator-marker')) {
      this.dom.slideContainers.forEach(el => el.classList.add('carousel__slide-container--jumper'));

      jumpAmount = this.dom.indicatorMarkers.indexOf(e.target) - this.dom.indicatorMarkers.indexOf(this.state.currentMarker);

      if (jumpAmount > 0) {
        this.forward(e);
        jumpInterval = setInterval(function () {
          if (jumpTicker === jumpAmount) {
            clearInterval(jumpInterval);
            this.dom.slideContainers.forEach(el => el.classList.remove('carousel__slide-container--jumper'));
            return;
          }
          this.forward(e);
          jumpTicker++;
        }.bind(this), 75);
      } else {
        jumpAmount = jumpAmount * -1;
        this.backward(e);
        jumpInterval = setInterval(function () {
          if (jumpTicker === jumpAmount) {
            clearInterval(jumpInterval);
            this.dom.slideContainers.forEach(el => el.classList.remove('carousel__slide-container--jumper'));
            return;
          }
          this.backward(e);
          jumpTicker++;
        }.bind(this), 75);
      }
    }
  }

  touchStartRenders(e) {
    this.viewport = this.dom.viewportWrapper.getBoundingClientRect();

    if (this.settings.transition === 'viewmaster' || this.settings.transition === 'horizontal') {
      this.touchCtrls.slideOffset.left = this.viewport.left - this.viewport.width;
      this.touchCtrls.slideOffset.right = this.viewport.left + this.viewport.width;
    }
    if (this.settings.transition === 'vertical') {
      this.touchCtrls.slideOffset.top = this.viewport.top - this.viewport.height;
      this.touchCtrls.slideOffset.bottom = this.viewport.top + this.viewport.height;
    }
    if (this.settings.transition === 'viewmaster') {
      this.touchCtrls.viewmasterFactor = (this.viewport.height / 2) / this.viewport.width;
    }
    this.touchCtrls.slides = [
      this.dom.slideContainers[this.state.slidesArr[0].id],
      this.dom.slideContainers[this.state.slidesArr[1].id],
      this.dom.slideContainers[this.state.slidesArr[2].id]
    ];
    const d = new Date();
    this.touchCtrls.startD = d.getTime();
    const touchobj = e.touches[0];
    this.touchCtrls.startX = parseInt(touchobj.clientX, 10);
    this.touchCtrls.startY = parseInt(touchobj.clientY, 10);
    if (this.settings.transition !== 'dissolve') {
      this.touchCtrls.slides.forEach((val) => {
        val.classList.add('carousel__slide-container--no-trans');
        val.classList.remove('hide');
      });
    }

    this.dom.viewportWrapper.addEventListener('touchmove', this.rafManager, false);
  }

  touchMoveRenders(e) {
    let viewportWidth; let viewportHeight;
    const touch = this.touchCtrls;
    const touchobj = e.touches[0];
    if (document.elementFromPoint(touchobj.clientX, touchobj.clientY) !== e.target) {
      touch.scheduledAnimationFrame = false;
      requestAnimationFrame(() => {
        this.touchEndRenders(e);
      });
      return;
    }
    if (this.viewport.width) {
      viewportWidth = parseFloat(this.viewport.width.toFixed(1));
    }
    if (this.viewport.height) {
      viewportHeight = parseFloat(this.viewport.height.toFixed(1));
    }
    if (this.settings.transition !== 'vertical') {
      touch.distX = parseInt(touchobj.clientX, 10) - touch.startX;
    }
    switch (this.settings.transition) {
      case 'viewmaster':
        if (touch.distX > 0) {
          touch.slides[1].style.transform = `translate(${touch.distX}px, ${touch.distX * touch.viewmasterFactor}px)`;
        } else {
          touch.slides[1].style.transform = `translate(${touch.distX}px, ${touch.distX * -touch.viewmasterFactor}px)`;
        }
        if (touch.slideOffset.left + touch.distX >= touch.slideOffset.left) {
          touch.slides[0].style.transform = `translate(${touch.distX - viewportWidth}px, ${(viewportHeight * 0.5) - (touch.distX * touch.viewmasterFactor)}px)`;
        } else {
          touch.slides[0].style.transform = null;
        }
        if (touch.slideOffset.right + touch.distX <= touch.slideOffset.right) {
          touch.slides[2].style.transform = `translate(${viewportWidth + touch.distX}px, ${(viewportHeight * 0.5) + (touch.distX * touch.viewmasterFactor)}px)`;
        } else {
          touch.slides[2].style.transform = null;
        }
        break;
      case 'vertical':
        touch.distY = parseInt(touchobj.clientY, 10) - touch.startY;
        touch.slides[1].style.transform = `translate(0, ${touch.distY}px)`;
        if (touch.slideOffset.top + touch.distY >= touch.slideOffset.top) {
          touch.slides[0].style.transform = `translate(0, ${touch.distY - viewportHeight}px)`;
        } else {
          touch.slides[0].style.transform = null;
        }
        if (touch.slideOffset.bottom + touch.distY <= touch.slideOffset.bottom) {
          touch.slides[2].style.transform = `translate(0, ${viewportHeight + touch.distY}px)`;
        } else {
          touch.slides[2].style.transform = null;
        }
        break;
      case 'dissolve':
        break;
      default:
        touch.slides[1].style.transform = `translate(${touch.distX}px, 0)`;
        if (touch.slideOffset.left + touch.distX >= touch.slideOffset.left) {
          touch.slides[0].style.transform = `translate(${touch.distX - viewportWidth}px, 0)`;
        } else {
          touch.slides[0].style.transform = null;
        }
        if (touch.slideOffset.right + touch.distX <= touch.slideOffset.right) {
          touch.slides[2].style.transform = `translate(${viewportWidth + touch.distX}px, 0)`;
        } else {
          touch.slides[2].style.transform = null;
        }
    }
    touch.scheduledAnimationFrame = false;
  }

  touchEndRenders(e) {
    this.dom.viewportWrapper.removeEventListener('touchmove', this.rafManager, false);

    const dist = this.settings.transition === 'vertical'
      ? this.touchCtrls.distY
      : this.touchCtrls.distX;
    const threshold = this.settings.transition === 'vertical'
      ? this.viewport.height * 0.4
      : this.viewport.width * 0.4;

    this.touchCtrls.slides.forEach((val) => {
      val.classList.remove('carousel__slide-container--no-trans');
      val.style.transform = null;
    });
    const d = new Date();
    this.touchCtrls.duration = d.getTime() - this.touchCtrls.startD;
    if (this.touchCtrls.duration < 200 && Math.abs(dist) > 70) {
      if (this.settings.transition !== 'dissolve') {
        this.touchCtrls.slides.forEach((val) => {
          val.classList.add('carousel__slide-container--flick-trans');
        });
      }
      if (dist > 0) this.backward(e);
      if (dist < 0) this.forward(e);
    } else if (Math.abs(dist) > threshold) {
      if (dist > 0) this.backward(e);
      if (dist < 0) this.forward(e);
    }

    // reset all touchCtrls
    this.touchCtrls.distX = null;
    this.touchCtrls.distY = null;
    [...Object.keys(this.touchCtrls.slideOffset)].forEach((val) => {
      this.touchCtrls.slideOffset[val] = null;
    });
  }

  backwardRender() {
    if (this.state.quantity === 2) {
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('queue');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.add('prev');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('queue');

      setTimeout(function () {
        this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('hide');
        this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('prev');
      }.bind(this), 1);
    } else {
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('hide');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('prev');

      this.dom.slideContainers[this.state.slidesArr[0].id].classList.remove('queue');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('hide');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('prev');
      this.dom.slideContainers[this.state.slidesArr[2].id].classList.add('queue');
    }
  }

  forwardRender() {
    if (this.state.quantity === 2) {
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('prev');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('prev');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.add('queue');

      setTimeout(function () {
        this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('hide');
        this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('queue');
      }.bind(this), 1);
    } else {
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('prev');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('hide');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('queue');
      this.dom.slideContainers[this.state.slidesArr[this.state.quantity - 1].id].classList.add('hide');
      this.dom.slideContainers[this.state.slidesArr[this.state.quantity - 1].id].classList.add('queue');
      this.dom.slideContainers[this.state.slidesArr[this.state.quantity - 1].id].classList.remove('prev');
    }
  }

  backward(e) {
    if (e) {
      if (!e.target.classList.contains('carousel__indicator-marker')) {
        if (e.type === 'mousedown' && e.buttons !== 1) return;
        e.preventDefault();
        if (this.state.isSliding) return;
        this.state.isSliding = true;
        this.state.direction = 'backward';
      }
    }

    // adding handler to current slide will disable controls during animation
    this.state.currentImage = this.dom.slideContainers[this.state.slidesArr[1].id];
    this.boundSliderTransitionend = this.sliderTransitionend.bind(this);
    this.state.currentImage.addEventListener('transitionend', this.boundSliderTransitionend);

    // update, sort, and render new positions
    this.state.slidesArr.forEach((el) => {
      el.pos === this.state.quantity - 1 ? el.pos = 0 : el.pos += 1;
    });
    this.sortImageArray();
    this.backwardRender();
  }

  forward(e) {
    if (e) {
      if (!e.target.classList.contains('carousel__indicator-marker')) {
        if (e.type === 'mousedown' && e.buttons !== 1) return;
        e.preventDefault();
        if (this.state.isSliding) { return; }
        this.state.isSliding = true;
        this.state.direction = 'forward';
      }
    }

    // adding handler to current slide will disable controls during animation
    this.state.currentImage = this.dom.slideContainers[this.state.slidesArr[1].id];
    this.boundSliderTransitionend = this.sliderTransitionend.bind(this);
    this.state.currentImage.addEventListener('transitionend', this.boundSliderTransitionend);

    // update, sort, and render new positions
    this.state.slidesArr.forEach((el) => {
      el.pos === 0 ? el.pos = this.state.quantity - 1 : el.pos -= 1;
    });
    this.sortImageArray();
    this.forwardRender();
  }

  sliderTransitionend() {
    this.state.isSliding = false;
    if (this.state.quantity === 2 && this.state.direction === 'backward') {
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('hide');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.remove('queue');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('prev');
    }
    if (this.state.quantity === 2 && this.state.direction === 'forward') {
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('hide');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.remove('prev');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('queue');
    }
    this.touchCtrls.slides.forEach(val => val.classList.remove('carousel__slide-container--flick-trans'));
    if (this.dom.indicatorBar) this.updateindicatorBar();
    this.state.currentImage.removeEventListener('transitionend', this.boundSliderTransitionend);
  }

  keyDownControls(e) {
    if (!e.target.classList.contains('carousel__controls')) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (e.target.classList.contains('carousel__controls--left')) {
        this.backward(e);
      } else {
        this.forward(e);
      }
    }
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
      this.dom.leftControl.focus();
      this.backward(e);
    }
    if (e.key === 'ArrowRight' || e.key === 'Right') {
      this.dom.rightControl.focus();
      this.forward(e);
    }
  }

  sortImageArray() {
    function compare(a, b) {
      if (a.pos < b.pos) return -1;
      if (a.pos > b.pos) return 1;
      return 0;
    }
    this.state.slidesArr.sort(compare);
  }
}

const tabItems = [...document.querySelectorAll('.tab-nav__item')];
const tabBtns = [...document.querySelectorAll('.tab-nav__btn')];
const contentPanels = [...document.querySelectorAll('.content-panel')];

document.querySelector('.tab-nav__list').addEventListener('click', (e) => {
  if (e.target.classList.contains('tab-nav__btn')) {
    tabItems.forEach(el => el.classList.remove('tab-nav__item--active'));
    tabBtns.forEach(el => el.classList.remove('tab-nav__btn--active'));
    e.target.parentNode.classList.add('tab-nav__item--active');
    e.target.classList.add('tab-nav__btn--active');

    tabBtns.forEach((val) => {
      val.setAttribute('aria-selected', 'false');
    });
    e.target.setAttribute('aria-selected', 'true');

    contentPanels.forEach((val) => {
      val.classList.add('removed');
    });

    document.querySelector(`#${e.target.getAttribute('aria-controls')}`).classList.remove('removed');
  }
});

const settings = {
  dom: [],

  stylesheet: [],
  cssRulePairs: [],
  cssRules: {},

  instanceOptions: {},
  filteredClass: Carousel.toString().split('\n').filter(val => !val.includes('FILTER_ATTRIBUTION')).join('\n'),
  imageSources: [],
  carouselNamespace: 'my-carousel',
  carouselAutoplay: false,
  autoplayDuration: 5,
  percentWidth: '85',
  pixelWidth: '',
  widthUnits: '%',
  aspectRatio: '4:3',
  aspectRatioX: '4',
  aspectRatioY: '3',
  viewportBorder: false,
  viewportBorderColor: '#000000',
  viewportBorderThickness: '1',
  viewportRounding: '3',
  roundingUnits: 'px',
  imageSize: 'contain',
  endCapColor: '#000000',
  imageOverlay: false,
  imageOverlayColor: '#000000',
  imageOverlayOpacity: '20',
  transitionStyle: 'horizontal',
  arrowColor: '#ffffff',
  arrowOpacity: '70',
  indicatorBar: true,
  indicatorBarLocation: 'interior',
  indicatorBarOpacity: '60',
  indicatorBarStyle: '1',
  indicatorActiveColor: '#ffffff',
  indicatorInactiveColor: '#ffffff',
  arrowBackground: true,
  arrowBackgroundVisibility: 'viewport',
  indicatorBackground: true,
  indicatorBackgroundVisibility: 'local',
  controlsBackgroundColor: '#000000',
  controlsBackgroundOpacity: '50',
  controlsBackgroundFeather: true,

  init() {
    this.unsplashAPICall({
      query: this.randomizeQuery(),
      per_page: 5,
    });

    const viewportRange = document.querySelector('.settings__width-range');
    const viewportInput = document.getElementById('viewport-width');
    
    this.dom.settingsList = document.querySelector('.settings__list');
    this.dom.search = document.querySelector('.preview__search-form');
    
    this.dom.search.addEventListener('submit', this.formSubmit.bind(this));

    viewportInput.addEventListener('input', (e) => {
      if (this.widthUnits === '%') viewportRange.value = e.target.value;
    });
    viewportRange.addEventListener('input', (e) => {
      viewportInput.value = e.target.value;
    });

    window.addEventListener('resize', this.updateAspectRatio.bind(this));

    document.getElementById('width-units').addEventListener('change', (e) => {
      switch (e.target.value) {
        case 'px':
          viewportInput.type = 'text';
          viewportInput.value = this.pixelWidth;
          viewportInput.name = 'pixelWidth';
          viewportRange.disabled = true;
          viewportRange.classList.add('disabled');
          break;
        default:
          viewportInput.type = 'number';
          viewportInput.value = this.percentWidth;
          viewportInput.name = 'percentWidth';
          viewportRange.disabled = false;
          viewportRange.classList.remove('disabled');
      }
      viewportInput.focus();
    });

    [...document.querySelectorAll('input[type="checkbox"]')].forEach((val) => {
      val.addEventListener('change', this.toggleDisabled);
    });
    
    this.dom.settingsList.addEventListener('input', this.updateSettings.bind(this));
    this.dom.settingsList.addEventListener('click', this.toggleAccordion.bind(this));

    this.getStylesheet();
    this.cacheAdjustableStyles();

    this.dom.carousel = document.querySelector(`#${this.carouselNamespace}.carousel`);

    this.updateControlBackgrounds();
    this.updateSourceCode();

    // Adjust HTML form default values for carousel width and rounded corners on mobile
    if (window.innerWidth <= 600) {
      [viewportRange, viewportInput].forEach((val) => {
        val.value = '100'
      });
      document.getElementById('viewport-rounding').value = '0';
      this.percentWidth = '100';
      this.viewportRounding = '0';
      this.updateViewportWidth();
    }
  },

  getStylesheet() {
    const [stylesheet] = [...document.styleSheets].filter(val => val.title === 'carousel');
    this.stylesheet = [...stylesheet.cssRules || stylesheet.rules];
  },

  cacheAdjustableStyles() {
    this.cssRulePairs = [
      { name: 'carousel', dom: '.carousel' },
      { name: 'viewportWrapper', dom: ' .carousel__viewport-wrapper' },
      { name: 'viewportArrowHover', dom: ' .carousel__viewport-wrapper:hover .carousel__controls-background--arrow' },
      { name: 'viewportIndicatorHover', dom: ' .carousel__viewport-wrapper:hover .carousel__controls-background--indicator' },
      { name: 'viewport', dom: ' .carousel__viewport' },
      { name: 'slideContainer', dom: ' .carousel__slide-container' },
      { name: 'slideOverlay', dom: ' .carousel__slide-overlay' },
      { name: 'slidePrev', dom: '.carousel .prev' },
      { name: 'slideQueue', dom: '.carousel .queue' },
      { name: 'arrowSvg', dom: ' .carousel__controls svg' },
      { name: 'arrowPath', dom: ' .carousel__controls path' },
      { name: 'indicatorBar', dom: ' .carousel__indicator-bar' },
      { name: 'localIndicatorHover', dom: ' .carousel__indicator-bar--interior:hover .carousel__controls-background--indicator' },
      { name: 'indicatorMarker', dom: ' .carousel__indicator-marker' },
      { name: 'indicatorActive', dom: ' .carousel__indicator-marker--active' },
      { name: 'controlsBackground1', dom: ' .carousel__controls-background' },
      { name: 'controlsBackground2', dom: ' .carousel__controls-background::after' },
      { name: 'arrowBackground', dom: ' .carousel__controls-background--arrow' },
      { name: 'indicatorBackground', dom: ' .carousel__controls-background--indicator' },
    ];

    this.cssRulePairs.forEach((val) => {
      [this.cssRules[val.name]] = this.stylesheet.filter(el => el.selectorText === `#${this.carouselNamespace}${val.dom}`);
    });
  },

  updateSourceCode() {
    document.getElementById('sourcecode-html').innerText = `<div id="${this.carouselNamespace}" class="carousel"></div>`;
    document.getElementById('sourcecode-instance').innerText = this.updateInstanceCode();
    document.getElementById('sourcecode-custom-css').innerText = this.formatCssRules(`#${this.carouselNamespace}`);
    document.getElementById('sourcecode-class').innerText = this.filteredClass;
    document.getElementById('sourcecode-static-css').innerText = this.formatCssRules('.carousel');
  },

  formatCssRules(selector) {
    const rawCssRules = this.stylesheet.filter((val) => {
      if (val.selectorText) {
        return val.selectorText.startsWith(selector);
      }
      if (val.cssRules) {
        return val.cssRules[0].selectorText.startsWith(selector);
      }
    });

    const formattedCssRules = rawCssRules.map((val) => {
      if (val.media) {
        const splitRule = val.cssText.split('\n');
        splitRule[1] = `\t${splitRule[1].trim().replace(/{ /g, '{\n\t\t').replace(/; (?!})/g, ';\n\t\t').replace(/ }/g, '\n\t}')}`;
        return `${splitRule.slice(0, -1).join('\n')}\n${splitRule[splitRule.length - 1]}`;
      }
      return val.cssText.replace(/{ /g, '{\n\t').replace(/; (?!})/g, ';\n\t').replace(/ }/g, '\n}');
    }).join('\n\n');

    return formattedCssRules;
  },

  updateStylesheetNamespace() {
    this.cssRulePairs.forEach((val) => {
      this.cssRules[val.name].selectorText = `#${this.carouselNamespace}${val.dom}`;
    });
  },

  updateInstanceCode() {
    this.updateInstanceOptions();

    if (Object.keys(this.instanceOptions).length > 0) {
      const stringEntries = Object.entries(this.instanceOptions).map(val => `${val[0]}: '${val[1]}'`).join(', ');
      return `new Carousel(\n\t${this.carouselNamespace},\n\t[yourImageArrayHere],\n\t{ ${stringEntries} }\n)`;
    }
    return `new Carousel(${this.carouselNamespace}, [yourImageArrayHere])`;
  },

  updateInstanceOptions() {
    this.instanceOptions = {};
    if (this.carouselAutoplay === true) this.instanceOptions.autoplay = this.autoplayDuration * 1000;
    if (this.aspectRatio !== '4:3') this.instanceOptions.aspectRatio = this.aspectRatio;
    if (this.imageSize !== 'contain') this.instanceOptions.imageSize = this.imageSize;
    if (this.transitionStyle !== 'horizontal') this.instanceOptions.transition = this.transitionStyle;
    if (this.indicatorBar === true && this.indicatorBarLocation !== 'interior') {
      this.instanceOptions.indicatorBar = this.indicatorBarLocation;
    } else if (this.indicatorBar === false) {
      this.instanceOptions.indicatorBar = 'off';
    }
  },

  toggleAccordion(e) {
    let collapseItem; let collapseTarget; let collapseBtn;

    if (e.target.classList.contains('settings__collapse-btn')) {
      collapseItem = e.target;
      while (!collapseItem.classList.contains('settings__item')) {
        collapseItem = collapseItem.parentNode;
      }
      collapseTarget = collapseItem.querySelector('.settings__collapse-container');
      collapseBtn = collapseItem.querySelector('.settings__collapse-btn');

      if (!collapseTarget.classList.contains('settings__collapse-container--collapsed')) {
        collapseTarget.setAttribute('aria-hidden', 'true');
        [...collapseTarget.querySelectorAll('input, select')].forEach((val) => { val.setAttribute('tabindex', '-1'); });
        collapseBtn.innerHTML = '+';
        collapseBtn.setAttribute('aria-expanded', 'false');
      } else {
        collapseTarget.removeAttribute('aria-hidden');
        [...collapseTarget.querySelectorAll('input, select')].forEach((val) => { val.setAttribute('tabindex', '0'); });
        collapseBtn.innerHTML = '&minus;';
        collapseBtn.setAttribute('aria-expanded', 'true');
      }

      collapseTarget.classList.toggle('settings__collapse-container--collapsed');
    }
  },

  toggleDisabled(e) {
    const disableGroup = [...document.querySelectorAll(`.${e.currentTarget.getAttribute('data-target')}`)];
    let disableTargets = [];

    disableGroup.forEach((val) => {
      disableTargets = [...disableTargets, ...val.querySelectorAll('input, select')];
    });

    if (e.target.checked) {
      disableGroup.forEach((val) => { val.classList.remove('disabled'); });
      disableTargets.forEach((val) => { val.disabled = false; });
    } else {
      disableGroup.forEach((val) => { val.classList.add('disabled'); });
      disableTargets.forEach((val) => { val.disabled = true; });
    }
  },

  formSubmit(e) {
    e.preventDefault();
    const dataPost = {
      query: this.dom.search.querySelector('input').value,
      per_page: parseInt(this.dom.search.querySelector('select').value, 10),
    };
    this.dom.search.querySelector('input').value = '';
    this.unsplashAPICall(dataPost);
  },

  unsplashAPICall(dataVals) {
    axios({
      method: 'GET',
      url: 'https://feverdreamdesigns.com/api-call.php',
      params: dataVals
    })
      .then(function (res) {
        let searchResults = res.data.results;
        settings.imageSources = searchResults.map(el => {
          return {
            url: el.urls.regular,
            alt: el.description,
            auth: el.user.name,
            profile: el.user.links.html
          };
        });
        // Carousel.buildCarousel(imageSources);
        const carousel = new Carousel(settings.carouselNamespace, settings.imageSources);
        settings.awaitImageLoading();
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  randomizeQuery() {
    const queryArr = ['puppies', 'kittens', 'parrots', 'ocean', 'mountains', 'tropical', 'sailboat'];
    const randomize = Math.floor(Math.random() * queryArr.length);
    return queryArr[randomize];
  },

  updateSettings(e) {
    if (!e.target.matches('input:not([type="text"]), select, #carousel-namespace, #viewport-width')) return;
    if (e.target.type === 'checkbox') {
      this[e.target.name] = e.target.checked;
    } else {
      this[e.target.name] = e.target.value;
    }
    switch (e.target.name) {
      case 'carouselNamespace':
        this.updateNamespace();
        break;
      case 'carouselAutoplay':
      case 'autoplayDuration':
        this.updateAutoplay();
        break;
      case 'percentWidth':
      case 'pixelWidth':
      case 'widthUnits':
        this.updateViewportWidth(e);
        break;
      case 'aspectRatio':
        [this.aspectRatioX, this.aspectRatioY] = this.aspectRatio.split(':').map(el => parseInt(el, 10));
        this.updateAspectRatio();
        break;
      case 'viewportBorder':
      case 'viewportBorderColor':
      case 'viewportBorderThickness':
        this.updateViewportBorder();
        break;
      case 'roundingUnits':
      case 'viewportRounding':
        this.updateViewportRounding();
        break;
      case 'imageSize':
        this.awaitImageLoading();
        break;
      case 'endCapColor':
        this.updateEndCaps();
        break;
      case 'imageOverlay':
      case 'imageOverlayColor':
      case 'imageOverlayOpacity':
        this.updateImageOverlay();
        break;
      case 'transitionStyle':
        this.updateTransitionStyle();
        break;
      case 'arrowColor':
      case 'arrowOpacity':
        this.updateArrows();
        break;
      case 'indicatorBar':
      case 'indicatorBarLocation':
      case 'indicatorBarOpacity':
      case 'indicatorBarStyle':
      case 'indicatorActiveColor':
      case 'indicatorInactiveColor':
        if (this.indicatorBarStyle === '1') {
          document.getElementById('indicator-inactive-color').parentNode.classList.add('removed');
        } else {
          document.getElementById('indicator-inactive-color').parentNode.classList.remove('removed');
        }
        this.updateIndicatorBar();
        break;
      case 'arrowBackground':
      case 'arrowBackgroundVisibility':
      case 'indicatorBackground':
      case 'indicatorBackgroundVisibility':
      case 'controlsBackgroundColor':
      case 'controlsBackgroundOpacity':
      case 'controlsBackgroundFeather':
        this.updateControlBackgrounds();
        break;
      default:
    }

    this.updateSourceCode();
  },

  updateNamespace() {
    if (!this.carouselNamespace) {
      this.carouselNamespace = 'my-carousel';
    } else {
      this.carouselNamespace = this.carouselNamespace.match(/[\w-]/g).join('').replace(/^[0-9-]+/, '');
      if (this.carouselNamespace === '') this.carouselNamespace = 'my-carousel';
    }
    console.log(this.carouselNamespace)
    this.dom.carousel.id = this.carouselNamespace;

    this.updateStylesheetNamespace();
    this.cacheAdjustableStyles();
  },

  updateAutoplay() {
    if (this.carouselAutoplay) {
      const duration = this.autoplayDuration * 1000;
      const carousel = new Carousel(this.carouselNamespace, this.imageSources, { ...this.instanceOptions, autoplay: duration });
    } else {
      const carousel = new Carousel(settings.carouselNamespace, settings.imageSources, { ...this.instanceOptions, autoplay: null });
    }
  },

  updateViewportWidth() {
    const currentWidth = this.widthUnits === '%' ? this.percentWidth : this.pixelWidth;
    this.cssRules.carousel.style.width = `${currentWidth}${this.widthUnits}`;
    this.updateAspectRatio();
  },

  updateAspectRatio() {
    this.cssRules.viewport.style.paddingBottom = `${parseFloat(((100 * this.aspectRatioY) / this.aspectRatioX).toFixed(2), 10)}%`;
    setTimeout(() => {
      this.awaitImageLoading();
      this.updateViewportRounding();
    }, 1);
  },

  updateViewportBorder() {
    if (this.viewportBorder) {
      this.cssRules.viewportWrapper.style.border = `${this.viewportBorderThickness}px solid ${this.viewportBorderColor}`;
    } else {
      this.cssRules.viewportWrapper.style.border = 'none';
    }
  },

  updateViewportRounding() {
    const [x, y] = [this.aspectRatioX, this.aspectRatioY];
    if (this.widthUnits === 'px') {
      if (this.roundingUnits === 'px') {
        const shortLength = x > y ? (this.pixelWidth * y) / x : (this.pixelWidth * x) / y;
        const roundingValue = (shortLength * (this.viewportRounding / 100)).toFixed(2);
        this.cssRules.viewportWrapper.style.borderRadius = `${roundingValue}px`;
      } else {
        this.cssRules.viewportWrapper.style.borderRadius = `${this.viewportRounding}%`;
      }
    } else if (this.roundingUnits === 'px') {
      const shortRound = x > y ? (this.viewportRounding * y) / x : (this.viewportRounding * x) / y;
      const roundingValue = x > y ? `${shortRound}%/${this.viewportRounding}%` : `${this.viewportRounding}%/${shortRound}%`;
      this.cssRules.viewportWrapper.style.borderRadius = roundingValue;
    } else {
      this.cssRules.viewportWrapper.style.borderRadius = `${this.viewportRounding}%`;
    }
  },

  awaitImageLoading() {
    const viewportAspectRatio = (this.aspectRatioX / this.aspectRatioY).toFixed(2);
    this.dom.slideWrappers = [...this.dom.carousel.querySelectorAll('.carousel__slide-wrapper')];
    this.dom.slideWrappers.forEach((val) => {
      const img = val.querySelector('.carousel__slide');
      const poll = setInterval(() => {
        if (img.naturalWidth) {
          clearInterval(poll);
          this.updateImageSize(val, img, viewportAspectRatio);
        }
      }, 10);
    });
  },

  updateImageSize(wrapper, img, viewportAspectRatio) {
    this.dom.viewport = this.dom.carousel.querySelector('.carousel__viewport');
    const imageAspectRatio = (img.naturalWidth / img.naturalHeight).toFixed(2);
    wrapper.className = 'carousel__slide-wrapper';
    wrapper.style.width = null;
    wrapper.style.height = null;

    if (this.imageSize === 'contain') {
      if (imageAspectRatio > viewportAspectRatio) {
        wrapper.classList.add('carousel__slide-wrapper--landscape');
        const wrapperHeight = (viewportAspectRatio / imageAspectRatio) * 100;
        wrapper.style.height = `${wrapperHeight}%`;
      } else if (imageAspectRatio < viewportAspectRatio) {
        wrapper.classList.add('carousel__slide-wrapper--portrait');
        const wrapperWidth = (imageAspectRatio / viewportAspectRatio) * 100;
        wrapper.style.width = `${wrapperWidth}%`;
      } else {
        wrapper.classList.add('carousel__slide-wrapper--landscape', 'carousel__slide-wrapper--portrait');
        img.classList.add('carousel__slide--landscape-contain', 'carousel__slide--portrait-contain');
      }
    } else if (imageAspectRatio > viewportAspectRatio) {
      wrapper.classList.add('carousel__slide-wrapper--portrait');
      const wrapperWidth = (imageAspectRatio / viewportAspectRatio) * 100;
      wrapper.style.width = `${wrapperWidth}%`;
    } else if (imageAspectRatio < viewportAspectRatio) {
      wrapper.classList.add('carousel__slide-wrapper--landscape');
      const wrapperHeight = (viewportAspectRatio / imageAspectRatio) * 100;
      wrapper.style.height = `${wrapperHeight}%`;
    } else {
      wrapper.classList.add('carousel__slide-wrapper--landscape', 'carousel__slide-wrapper--portrait');
      img.classList.add('carousel__slide--landscape-contain', 'carousel__slide--portrait-contain');
    }
  },

  updateEndCaps() {
    this.cssRules.slideContainer.style.backgroundColor = this.endCapColor;
  },

  updateImageOverlay() {
    if (this.imageOverlay) {
      this.cssRules.slideOverlay.style.display = 'block';
      this.cssRules.slideOverlay.style.backgroundColor = this.imageOverlayColor;
      this.cssRules.slideOverlay.style.opacity = `${this.imageOverlayOpacity / 100}`;
    } else {
      this.cssRules.slideOverlay.style.display = 'none';
    }
  },

  updateTransitionStyle() {
    switch (this.transitionStyle) {
      case 'viewmaster':
        this.cssRules.slideContainer.style.transition = 'transform 0.3s ease-in';
        this.cssRules.slidePrev.style.transform = 'translate(-100%, 50%)';
        this.cssRules.slideQueue.style.transform = 'translate(100%, 50%)';
        this.cssRules.slidePrev.style.opacity = '';
        this.cssRules.slideQueue.style.opacity = '';
        break;
      case 'vertical':
        this.cssRules.slideContainer.style.transition = 'transform 0.3s ease-in';
        this.cssRules.slidePrev.style.transform = 'translate(0, -100%)';
        this.cssRules.slideQueue.style.transform = 'translate(0, 100%)';
        this.cssRules.slidePrev.style.opacity = '';
        this.cssRules.slideQueue.style.opacity = '';
        break;
      case 'dissolve':
        this.cssRules.slideContainer.style.transition = 'opacity 0.4s ease-in-out';
        this.cssRules.slidePrev.style.transform = 'translate(0, 0)';
        this.cssRules.slidePrev.style.opacity = '0';
        this.cssRules.slideQueue.style.transform = 'translate(0, 0)';
        this.cssRules.slideQueue.style.opacity = '0';
        break;
      default:
        this.cssRules.slideContainer.style.transition = 'transform 0.3s ease-in';
        this.cssRules.slidePrev.style.transform = 'translate(-100%, 0)';
        this.cssRules.slideQueue.style.transform = 'translate(100%, 0)';
        this.cssRules.slidePrev.style.opacity = '';
        this.cssRules.slideQueue.style.opacity = '';
    }
    const carousel = new Carousel(
      this.carouselNamespace,
      this.imageSources,
      { ...this.instanceOptions, transition: this.transitionStyle }
    );
  },

  updateArrows() {
    this.cssRules.arrowSvg.style.opacity = `${this.arrowOpacity / 100}`;
    this.cssRules.arrowPath.style.stroke = this.arrowColor;
  },


  updateIndicatorBar() {
    if (document.querySelector('.carousel__indicator-bar--exterior') === null) {
      this.dom.carousel.insertAdjacentHTML('beforeend', '<div class="carousel__indicator-bar carousel__indicator-bar--exterior"></div>');
    }

    this.dom.indicatorBarInterior = document.querySelector('.carousel__indicator-bar--interior');
    this.dom.indicatorBarExterior = document.querySelector('.carousel__indicator-bar--exterior');
    this.dom.indicatorWrapper = document.querySelector('.carousel__indicator-wrapper');

    if (this.indicatorBar) {
      this.cssRules.indicatorBar.style.visibility = 'visible';
    } else {
      this.cssRules.indicatorBar.style.visibility = 'hidden';
    }

    if (this.indicatorBarLocation === 'interior') {
      this.dom.indicatorBarInterior.appendChild(this.dom.indicatorWrapper);
      this.dom.indicatorBarInterior.style.visibility = '';
    } else {
      this.dom.indicatorBarExterior.appendChild(this.dom.indicatorWrapper);
      this.dom.indicatorBarInterior.style.visibility = 'hidden';
    }

    this.cssRules.indicatorActive.style.backgroundColor = this.indicatorActiveColor;
    this.cssRules.indicatorActive.style.boxShadow = `0 0 5px 0 ${this.indicatorActiveColor}`;
    this.cssRules.indicatorActive.style.border = `1px solid ${this.indicatorActiveColor}`;
    this.cssRules.indicatorMarker.style.opacity = `${this.indicatorBarOpacity / 100}`;

    if (this.indicatorBarStyle === '1') {
      this.cssRules.indicatorMarker.style.border = `1px solid ${this.indicatorActiveColor}`;
      this.cssRules.indicatorMarker.style.backgroundColor = 'transparent';
    } else {
      this.cssRules.indicatorMarker.style.border = `1px solid ${this.indicatorInactiveColor}`;
      this.cssRules.indicatorMarker.style.backgroundColor = this.indicatorInactiveColor;
    }
  },

  updateControlBackgrounds() {
    if (this.arrowBackground) {
      this.cssRules.arrowBackground.style.display = 'block';
    } else {
      this.cssRules.arrowBackground.style.display = 'none';
    }

    if (this.indicatorBackground) {
      this.cssRules.indicatorBackground.style.display = 'block';
    } else {
      this.cssRules.indicatorBackground.style.display = 'none';
    }

    if (this.arrowBackgroundVisibility === 'viewport') {
      this.cssRules.viewportArrowHover.style.opacity = `${this.controlsBackgroundOpacity / 100}`;
      this.cssRules.arrowBackground.style.opacity = '0';
    } else {
      this.cssRules.viewportArrowHover.style.opacity = '';
      this.cssRules.arrowBackground.style.opacity = `${this.controlsBackgroundOpacity / 100}`;
    }

    if (this.indicatorBackgroundVisibility === 'viewport') {
      this.cssRules.viewportIndicatorHover.style.opacity = `${this.controlsBackgroundOpacity / 100}`;
      this.cssRules.indicatorBackground.style.opacity = '0';
      this.cssRules.localIndicatorHover.style.opacity = '';
    } else if (this.indicatorBackgroundVisibility === 'local') {
      this.cssRules.indicatorBackground.style.opacity = '0';
      this.cssRules.viewportIndicatorHover.style.opacity = '';
      this.cssRules.localIndicatorHover.style.opacity = `${this.controlsBackgroundOpacity / 100}`;
    } else {
      this.cssRules.viewportIndicatorHover.style.opacity = '';
      this.cssRules.localIndicatorHover.style.opacity = '';
      this.cssRules.indicatorBackground.style.opacity = `${this.controlsBackgroundOpacity / 100}`;
    }

    this.cssRules.controlsBackground1.style.backgroundColor = this.controlsBackgroundColor;
    this.cssRules.controlsBackground2.style.backgroundColor = this.controlsBackgroundColor;

    if (this.controlsBackgroundFeather) {
      this.cssRules.arrowBackground.style.boxShadow = `${this.controlsBackgroundColor} 0px 0px 8px 9px`;
      this.cssRules.indicatorBackground.style.boxShadow = `${this.controlsBackgroundColor} 0px 0px 8px 9px`;
    } else {
      this.cssRules.arrowBackground.style.boxShadow = `${this.controlsBackgroundColor} 0px 0px 0px 6px`;
      this.cssRules.indicatorBackground.style.boxShadow = `${this.controlsBackgroundColor} 0px 0px 0px 3px`;
    }
  },
};

settings.init();