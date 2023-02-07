<!--
This example requires some changes to your config:

```
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    // ...
    require('@tailwindcss/typography'),
  ],
}
```
-->
<template>
    <div class="bg-white relative w-full">
        <div class="fixed z-50 w-full">


            <HeadersHeader />

        </div>

        <div class="overflow-hidden bg-white pt-24">
            <div class="relative mx-auto max-w-7xl py-16 px-6 lg:px-8">
                <div class="absolute top-0 bottom-0 left-3/4 hidden w-screen bg-gray-50 lg:block" />
                <div class="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
                    <div>
                        <h2 class="">
                            <a href="/industries" class="text-lg uppercase text-blood">
                                industries
                            </a>
                        </h2>
                        <h3 class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                            {{ industry.title }}
                        </h3>
                    </div>
                </div>
                <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                    <div class="relative lg:col-start-2 lg:row-start-1">
                        <svg class="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block" width="404" height="384"
                            fill="none" viewBox="0 0 404 384" aria-hidden="true">
                            <defs>
                                <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20"
                                    patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
                        </svg>
                        <div class="relative mx-auto max-w-prose text-base lg:max-w-none">
                            <figure>
                                <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
                                    <img class="rounded-lg object-cover object-center shadow-lg" :src="industry.image"
                                        alt="Whitney leaning against a railing on a downtown street" width="1184"
                                        height="1376" />
                                </div>
                                <figcaption class="mt-3 flex text-sm text-gray-500">
                                    <CameraIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                    <span class="ml-2">{{ industry.text }}</span>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div class="mt-8 lg:mt-0">
                        <div v-for="detail in industry.details" :key="detail.id"
                            class="prose prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
                            <h3 class="text-sm font-medium text-gray-900">{{ detail.title }}</h3>

                            <div v-html="detail.text" />
                        </div>

                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script setup>
import { CameraIcon } from '@heroicons/vue/20/solid'
const categories = await $fetch('/api/data')
const industries = ref(categories.api.categories[0])
const routes = useRoute()
const id = routes.params.id

const industry = industries.value.featured.find(i => i.id == id)

</script>