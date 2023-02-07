<template>

    <div class="h-16">
        <nav class="flex h-full items-center justify-between" aria-label="Global">
            <div class="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                <a href="#" class="">
                    <span class="sr-only">Your Company</span>
                    <img class="h-12" src="../../assets/img/logo.svg" alt="" />
                </a>
            </div>
            <div class="flex lg:hidden">
                <button type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div class="hidden h-full lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:items-center ">
                <!-- <slot /> -->
                <div v-for="item in navigation" :key="item.id"
                    :class="[active == item.id
                    ? 'bg-white text-zinc-900'
                    : 'bg-transparent ',
                    'transition-all nav-link h-full flex justify-center items-center w-32 bg-opacity-75 hover:bg-zinc-300 ']"
                    @click="$emit('updateNav', item.id)">
                    <a :href="item.href" class="nav-item mx-auto font-semibold leading-7  text-blood">{{
                        item.name
                    }}</a>
                </div>

            </div>

        </nav>
        <Dialog as="div" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <DialogPanel focus="true" class="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                <div class="flex h-9 items-center justify-between">
                    <div class="flex">
                        <a href="#" class="-m-1.5 p-1.5">
                            <span class="sr-only">Your Company</span>
                            <img class="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="" />
                        </a>
                    </div>
                    <div class="flex">
                        <button type="button"
                            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            @click="mobileMenuOpen = false">
                            <span class="sr-only">Close menu</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <a v-for="item in navigation" :key="item.name" :href="item.id"
                                class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                @click="$emit('updateNav', item.id), mobileMenuOpen = false">{{ item.name }}</a>
                        </div>
                        <div class="py-6">
                            <a href="#"
                                class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10">Log
                                in</a>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </div>

</template>
                                <!-- >{{ -->
  
<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
defineProps({
    active: { type: Number, default: 1 }
})
const navigation = [
    { id: 1, name: 'Home', href: '#section-1' },
    { id: 2, name: 'Features', href: '#section-2' },
    { id: 3, name: 'Marketplace', href: '#section-3' },
    { id: 4, name: 'Company', href: '#section-4' },
]



const mobileMenuOpen = ref(false)

</script>