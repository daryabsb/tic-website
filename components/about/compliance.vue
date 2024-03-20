<template>
    <div class="mt-32 overflow-hidden sm:mt-40">
        <div class="mx-auto max-w-7xl px-3 lg:flex lg:px-4">
            <div
                class="mx-auto grid max-w-2xl grid-cols-1 gap-x-4 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ compliance.title }}</h2>
                <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                    <p v-for="content in compliance.text_p" :key="content" class="mt-6 text-xl leading-8 text-gray-600">
                        {{ content }}</p>
                </div>
                <div class="flex flex-wrap items-center justify-end gap-6 sm:gap-8 lg:contents">
                    <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-center">
                        <img src="/img/about/compliance.jpg" :alt="compliance.title"
                            class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-contain">
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/vue/20/solid'
import data from "~/server/api/staticData"
// import navigation from "~/data/db"
// const data = await $fetch('/api/data')
// const data = await $fetch('/api/data')
const compliance = ref(data.about.compliance)

</script>