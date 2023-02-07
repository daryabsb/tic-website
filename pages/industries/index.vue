<template>
    <div class="bg-white relative">
        <div class="fixed z-50 w-full">


            <HeadersHeader />

        </div>




        <!-- <header class="global-header fixed menu-item-color-black bg-white border-b py-2" id="global-header">
            <div class="global-header__container">
                <h1 class="global-header__logo" role="banner">
                    <a class="global-header__logo-link" href="/" rel="home">
                        <img src="~/assets/logo/tic-logo-01.svg" class="h-12 md:h-16" alt="">
                    </a>
                </h1>
                <nav id="nav-main" class="global-header__nav" role="navigation">
                    <input type="checkbox" aria-label="menu">

                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>

                    <nav class="global-header__nav-menu" id="menu">
                        <ul>
                            <li class=" menu-item menu-item-type-post_type menu-item-object-page menu-item-4885">
                                <a target="" href="https://golin.com/about/">About</a>
                            </li>
                            <li class=" menu-item menu-item-type-post_type menu-item-object-page menu-item-4886">
                                <a target="" href="https://golin.com/work/">Work</a>
                            </li>
                            <li
                                class=" menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-119 current_page_item menu-item-4887">
                                <a target="" href="https://golin.com/careers/">Careers</a>
                            </li>
                            <li class=" menu-item menu-item-type-post_type menu-item-object-page menu-item-4888">
                                <a target="" href="https://golin.com/news/">News</a>
                            </li>
                            <li class=" menu-item menu-item-type-post_type menu-item-object-page menu-item-4889">
                                <a target="" href="https://golin.com/contact/">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </nav>
            </div>
        </header> -->
        <main id="maincontent" role="main" class="mx-auto max-w-2xl py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
            <div class=" border-b border-gray-200 pb-5 sticky mt-3">
                <h3 class="text-3xl font-montserrat font-thin leading-6 text-blood">{{ industries.name }}</h3>
            </div>
            <div class="mt-16 space-y-16">
                <div v-for="(industry, featureIdx) in industries.featured" :key="featureIdx"
                    class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
                    <div :class="[featureIdx % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 xl:col-start-9', 'mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4']"
                        data-aos="slide-up">
                        <h3 class="text-2xl font-medium text-blood">{{ industry.title }}</h3>
                        <p class="mt-2 text-sm text-gray-500">{{ industry.text }}</p>
                        <div class="mt-10 flex items-center justify-start gap-x-6">

                            <a :href="`/industries/${industry.id}`"
                                class="text-base font-thin leading-7 text-blood">Learn more
                                <span aria-hidden="true">→</span></a>
                        </div>
                    </div>
                    <div
                        :class="[featureIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1', 'flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8']">
                        <div class="aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
                            <img :src="industry.image" class="object-cover object-center" />
                        </div>
                    </div>
                </div>
            </div>




            <HeadersFooter />
        </main>
    </div>
</template>
<script setup>
// import data from "~/data/db"
const categories = await $fetch('/api/data')
// var wpcf7 = { "api": { "root": "https:\/\/golin.com\/wp-json\/", "namespace": "contact-form-7\/v1" } };
const industries = ref(categories.api.categories[0])

</script>
