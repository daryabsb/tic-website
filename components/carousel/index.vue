<template>
    <ParalaxSlide>
        <div>
            <div class="carousel-item" v-for="(item, index) in images" :key="index" ref="carouselItems" />
            <div class="carousel-dot" v-for="(item, index) in images" :key="index" ref="carouselDots" />
        </div>
    </ParalaxSlide>
</template>

<script setup>
import useCarousel from './script'
// import useCarousel from './useCarousel'
import { ref, computed, onMounted } from 'vue'
import gsap from "gsap";


const images = [
    { image: '"https://assets.codepen.io/9556641/img-22.webp', alt: 'Image 1' },
    { image: 'https://assets.codepen.io/9556641/img-11.webp', alt: 'Image 2' },
    { image: 'https://assets.codepen.io/9556641/img-6.webp', alt: 'Image 3' },
]
const carouselItems = ref(null)
const carouselDots = ref(null)

const { targets } = useCarousel({ carouselItems, carouselDots })

const items = computed(() => {
    return targets.map(target => {
        return {
            target
        }
    })
})

</script>

<style scoped>
* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
}

body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.carousel {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.carousel .carousel-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: white;
    font-weight: 600;
}

.carousel .carousel-dot-wrapper {
    position: absolute;
    z-index: 10;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 15px 8px;
}

.carousel .carousel-dot {
    border-radius: 9999px;
    width: 12px;
    height: 12px;
    background-color: #818cf8;
    cursor: pointer;
    transition: 0.3s;
}

.carousel .carousel-dot:hover,
.carousel .carousel-dot.active {
    background-color: #a78bfa;
    outline: 2px solid #a78bfa;
}

.carousel .carousel-dot.active {
    outline-offset: 2px;
}
</style>