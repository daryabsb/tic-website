<template>
    <ParalaxSlide>
        <Tweenmax :slide-data="slideData" />
    </ParalaxSlide>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const Tweenmax = defineAsyncComponent(() => import('~/components/tweenmax/index.vue'))
const slideData = [
    {
        title: "Vehicle COC",
        href: '/industries/1',
        description: "We provide quick and efficient vehicle inspections which guarantee environmental and roadworthy vehicles entering the country by implementing international quality standard guidelines and processes.",
        img:
            "/img/hero-vehicle-02.jpg",
        btn: "Upcoming event",
    },
    {
        title: "Agriculture Inspections & Testing",
        href: "/industries/4",
        description: "We help support the agriculture industry to maintain good environmental practice, sustainable growth, and a safe model.",
        img:
            "/img/hero-agriculture-01.jpg",
        btn: "Upcoming event",
    },
    {
        title: "Oil and Gas",
        href: "/industries/2",
        description: "We help Oil and Gas customers identify, eliminate, control, and monitor the reliability of their production, transportation and storage infrastructure.",
        img: "/img/hero-oil-01.webp",
        btn: "Upcoming event",
    }
];
</script>

<style>
home {}
</style>