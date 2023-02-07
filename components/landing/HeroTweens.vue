
<template>
    <ParalaxSlide>
        <div class="relative overflow-hidden">
            <div class="relative" ref="carousel" style="position: absolute; width: 100%;">
        <HeadlessTransitionRoot :show="true">
          <div v-for="(slide, index) in slides" :key="index" class="absolute inset-0 w-96 h-96 bg-black">
            <HeadlessTransitionChild :show="currentSlide === index">
              <img :src="slide.image" alt="Slide Image" class=" z-50 w-96 h-96 object-cover" />
              <div class="absolute inset-0 flex flex-col justify-center text-6xl items-center p-4">
                  <h1 class="text-4xl text-center">{{ slide.title }}</h1>
                <button class="bg-blue-500 text-white py-2 px-4 rounded-lg">For more</button>
            </div>
        </HeadlessTransitionChild>
    </div>
</HeadlessTransitionRoot>
</div>
<div class="absolute bottom-0 left-0 right-0 p-2 flex justify-center">
    <button
    v-for="n in slides.length"
          :key="n"
          @click="goToSlide(n-1)"
          :class="{ 'bg-blue-500': n-1 === currentSlide }"
          class="w-4 h-4 rounded-full mx-1"
        ></button>
    </div>
</div>
</ParalaxSlide>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  
  export default {
    setup() {
      const carousel = ref(null);
      const slides = ref([
      {image: '/img/section-img-02.jpg', title: 'Title 1'},
      {image: '/img/section-img-03.jpg', title: 'Title 2'},
      {image: '/img/section-img-04.jpg', title: 'Title 3'},
]);
      const currentSlide = ref(0);
      const goToSlide = (index) => {
        currentSlide.value = index;
      }
  
      onMounted(() => {
        carousel.value.style.width = `${slides.value.length * 100}%`;
      })
      return {
        carousel,
        slides,
        currentSlide,
        goToSlide
        }
    }
  }
  </script>
  

<!-- style="background-image:url(https://68.media.tumblr.com/57836ee52bc9355ad7c5fed5abf91ccc/tumblr_oiboo6MaRS1slhhf0o1_1280.jpg);"> -->
<style lang="scss">
/*
$font-family-primary: 'Montserrat', sans-serif;
$font-family-secondary: 'Roboto Slab', serif;

body {
    background-color: #000;
}

.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, transparentize(#0E1D33, 0.2), transparentize(#0E1D33, 0.8));
}

.hero-slider {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .carousel-cell {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        .inner {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            text-align: center;

            .subtitle {
                font-family: $font-family-secondary;
                font-size: 2.2rem;
                line-height: 1.2em;
                font-weight: 200;
                font-style: italic;
                letter-spacing: 3px;
                color: rgba(255, 255, 255, 0.5);
                margin-bottom: 5px;
            }

            .title {
                font-family: $font-family-primary;
                font-size: 3rem;
                line-height: 1.2em;
                text-transform: uppercase;
                letter-spacing: 3px;
                margin-bottom: 40px;
            }

            .btn {
                border: 1px solid #fff;
                padding: 14px 18px;
                text-transform: uppercase;
                font-family: $font-family-primary;
                font-size: 0.8rem;
                letter-spacing: 3px;
                color: #fff;
                text-decoration: none;
                transition: all .2s ease;

                &:hover {
                    background: #fff;
                    color: #000;
                }
            }
        }
    }

    .flickity-prev-next-button {
        width: 80px;
        height: 80px;
        background: transparent;

        &:hover {
            background: transparent;
        }

        .arrow {
            fill: white;
        }
    }

    .flickity-page-dots {
        bottom: 30px;

        .dot {
            width: 30px;
            height: 4px;
            opacity: 1;
            background: rgba(255, 255, 255, 0.5);
            border: 0 solid white;
            border-radius: 0;

            &.is-selected {
                background: #ff0000;
                border: 0 solid #ff0000;
            }
        }
    }
}
*/
</style>

<!---->