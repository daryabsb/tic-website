<template>
    <div class="bg-white relative">
        <div class="fixed z-50 w-full">


            <HeadersHeader />

        </div>

        <main id="maincontent" role="main" class="mx-auto max-w-2xl py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
            <div class=" border-b border-gray-200 pb-5 sticky mt-3">
                <h3 class="text-3xl font-montserrat font-thin leading-6 text-blood">{{ services.name }}</h3>
            </div>
            <div class="mt-16 space-y-16">
                <div v-for="(service, index) in services.featured" :key="index"
                    class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
                    <div :class="[index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 xl:col-start-9', 'mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4']"
                        data-aos="slide-up">
                        <h3 class="text-2xl font-medium text-blood">{{ service.title }}</h3>
                        <p class="mt-2 text-sm text-gray-500">{{ service.text }}</p>
                        <div class="mt-10 flex items-center justify-start gap-x-6">

                            <a :href="`/services/${service.id}`" class="text-base font-thin leading-7 text-blood">Learn
                                more
                                <span aria-hidden="true">→</span></a>
                        </div>
                    </div>
                    <div
                        :class="[index % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1', 'flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8']">
                        <div class="aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
                            <img :src="service.image" class="object-cover object-center" />
                        </div>
                    </div>
                </div>
            </div>
            <HeadersFooter />
        </main>
    </div>
</template>
<script setup>
import data from "~/server/api/staticData"
// import navigation from "~/data/db"
// const data = await $fetch('/api/data')
// const categories = await $fetch('/api/data')
const services = ref(data.categories[1])

</script>

