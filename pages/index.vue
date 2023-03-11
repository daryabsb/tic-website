<template>
    <div class="relative ">
        <!-- <GradientUnit /> -->
        <ParalaxParallax>
            <template #nav>
                <!-- <template v-slot:nav="{ navigate, currentSlideNumber }"> -->
                <!-- <div class="fixed px-6 lg:px-8 bg-white bg-opacity-70 z-50 w-full"> -->
                <!-- <MainHeader :active="currentSlideNumber + 1" @updateNav="navigate" /> -->
                <!-- <HeadersNav :active="currentSlideNumber + 1" @updateNav="navigate" /> -->
                <!-- <HeadersHeader /> -->
                <HeadersNewHeader />

            </template>
            <template #sections>
                <LandingHero id="section-1" />
                <LandingAbout id="section-2" />
                <LandingCategories id="section-4" />
                <LandingFetures id="section-3" />
                <LandingCreative id="section-5" />
                <LandingTeam id="section-6" />
                <LandingMap id="section-7" />
                <LandingNewsletter id="section-8" />
            </template>
        </ParalaxParallax>
        <HeadersFooter />
    </div>
</template>
<script setup>

</script>
