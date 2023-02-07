<template>
    <slide>
        <div class="mx-auto w-full max-w-7xl pt-16 pb-20 text-left lg:py-48 lg:text-left z-50">
            <div class="px-6 sm:px-8 lg:w-1/2 xl:pr-12">
                <h1
                    class="text-4xl capitalize font-montserrat font-normal tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                    <span class="block xl:inline">the cruicial role of</span>
                    {{ " " }}
                    <span class="block text-blood xl:inline">oil and gas</span>
                    {{ " " }}
                    <span class="block xl:inline"> sector.</span>
                </h1>
                <p class="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                    Maintaining the integrity of Oil and Gas equipment help support safer working practice, and
                    efficient process flow.
                </p>
                <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
                    <div class="rounded-md shadow">
                        <a href="/industries/2"
                            class="flex w-full items-center justify-center rounded-md border border-transparent bg-blood px-8 py-3 text-base font-medium text-white hover:bg-blood md:py-4 md:px-10 md:text-lg">
                            Read more</a>
                    </div>
                    <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                        <a href="/services"
                            class="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-blood hover:bg-gray-50 md:py-4 md:px-10 md:text-lg">
                            Services</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
            <img class="absolute inset-0 h-full w-full object-cover" src="~/assets/img/Oil-0-2.jpg" alt="" />
        </div>
    </slide>
</template>

<script setup>
import slide from '~/components/Paralax/slide.vue';

</script>