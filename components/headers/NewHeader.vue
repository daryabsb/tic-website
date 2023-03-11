<template>
    <div>

        <TransitionRoot as="template" :show="open">
            <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                    leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel
                            class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-zinc-900 bg-opacity-80 pb-12 shadow-xl">
                            <div class="flex px-4 pt-5 pb-2">
                                <button type="button"
                                    class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
                                    @click="open = false">
                                    <span class="sr-only">Close menu</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <!-- Links -->
                            <TabGroup as="div" class="mt-12 ">
                                <div class="border-b border-gray-200 ">
                                    <TabList class="-mb-px flex space-x-8 px-4">
                                        <Tab as="template" v-for="category in navigation.categories" :key="category.name"
                                            v-slot="{ selected }">
                                            <button
                                                :class="[selected ? 'text-blood border-blood' : 'text-white border-transparent', 'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium']">{{
                                                    category.name
                                                }}</button>
                                        </Tab>
                                    </TabList>
                                </div>
                                <TabPanels as="template">
                                    <TabPanel v-for="category in navigation.categories" :key="category.name"
                                        class="space-y-12 px-4 py-6">
                                        <div class="grid grid-cols-2 gap-x-4 gap-y-10">
                                            <div v-for="item in category.featured.slice(0, 4)" :key="item.id"
                                                class="group relative">
                                                <div
                                                    class="h-32 w-full  overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                    <img :src="item.image"
                                                        class="h-full w-full object-cover object-center" />
                                                </div>
                                                <a :href="category.name === 'Industries' ? `/industries/${item.id}` : `/services/${item.id}`"
                                                    class="mt-6 block text-sm font-medium text-white">
                                                    <span class="absolute inset-0 z-10" aria-hidden="true" />
                                                    {{ item.title }}
                                                </a>
                                                <p aria-hidden="true" class="mt-1 text-sm text-white">Shop now</p>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>

                            <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                                    <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name
                                    }}</a>
                                </div>
                            </div>


                            <div class="space-y-6 border-t border-gray-200 py-6 px-4">

                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
        <header class="fixed top-0 h-28 z-50 w-full global bg-zinc-900 bg-opacity-60">

            <nav class="flex mx-4 md:mx-32 xl:mx-64 xl:py-2 items-center justify-around">
                <!-- Logo (lg+) -->
                <div class="hidden lg:flex lg:flex-1 lg:items-center xl:my-3">
                    <a href="/">
                        <span class="sr-only">Your Company</span>
                        <img class="sm:h-16 xl:h-20 w-auto" src="~/assets/logo/tic-logo-01.svg" alt="" />
                    </a>
                </div>
                <div class="hidden h-full lg:flex ">
                    <PopoverGroup as="div" class="inset-x-0 bottom-0 px-2 ">
                        <div class="flex h-full justify-center space-x-6 mr-32">
                            <Popover v-for="category in navigation.categories" :key="category.name" class="flex"
                                v-slot="{ open }">
                                <div class="relative flex">
                                    <PopoverButton :class="[
                                        open
                                            ? 'border-sky-400 text-sky-400'
                                            : ' border-transparent text-white hover:text-sky-400',
                                        'relative z-10 -mb-px flex items-center border-b-4 pt-px text-lg focus:outline-none ',
                                        'uppercase transition-colors duration-200 ease-out'
                                    ]">
                                        {{ category.name }}</PopoverButton>
                                </div>

                                <transition enter-active-class="transition ease-out duration-200"
                                    enter-from-class="opacity-0" enter-to-class="opacity-100"
                                    leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100"
                                    leave-to-class="opacity-0">
                                    <PopoverPanel class="absolute inset-x-0 top-full text-sm text-gray-500">
                                        <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                        <div class="relative bg-white">
                                            <div class="mx-auto max-w-7xl px-8">
                                                <div class="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                                    <div v-for="item in category.featured.slice(0, 4)" :key="item.name"
                                                        class="group relative">
                                                        <div
                                                            class="h-32 w-full  overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75 object-cover">
                                                            <img :src="item.image" class="h-full w-full object-cover " />
                                                        </div>
                                                        <a :href="`/${category.name.toLocaleLowerCase()}/${item.id}`"
                                                            class="mt-4 block  font-medium text-white">
                                                            <span class="absolute text-white inset-0 z-10"
                                                                aria-hidden="true" />
                                                            {{ item.title }}
                                                        </a>
                                                        <p aria-hidden="true" class="mt-1">Contact now</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverPanel>
                                </transition>
                            </Popover>

                            <a v-for="page in navigation.pages" :key="page.name" :href="page.href"
                                class="transition-colors duration-200 ease-out uppercase border-transparent text-white hover:text-sky-400 -mb-px flex items-center border-b-4 pt-px text-lg focus:outline-none">{{
                                    page.name
                                }}</a>
                        </div>
                    </PopoverGroup>
                </div>
                <!-- Mobile menu and search (lg-) -->
                <div class="flex flex-1 items-center lg:hidden mx-4">
                    <button type="button" class="-ml-2 h-8 w-8 text-lg rounded-md  p-4 text-zinc-900-400"
                        @click="open = true">
                        <span class="sr-only">Open menu</span>
                        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                    </button>

                    <!-- Search -->
                    <a href="#" class="ml-2 p-2 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Search</span>
                        <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                    </a>
                </div>
                <!-- Logo (lg-) -->
                <a href="/" class="lg:hidden">
                    <span class="sr-only">Your Company</span>
                    <img src="~/assets/logo/tic-logo-01.svg" alt="" class="h-12 w-auto" />
                </a>
                <div class="flex flex-1 items-center justify-end lg:hidden">
                    <!-- <a href="#" class="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">Search</a> -->

                    <div class="flex items-center lg:ml-8">
                        <!-- Help -->
                        <a href="#" class="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                            <span class="sr-only">Help</span>
                            <QuestionMarkCircleIcon class="h-6 w-6" aria-hidden="true" />
                        </a>
                        <!-- <a href="#" class="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">Help</a> -->
                    </div>
                </div>

                <!-- <ul class="flex list-none w-full items-center justify-center" role="menubar">
                                    <li v-for="item in navItems" :key="item.title" role="none" class="mx-4 p-4">
                                        <button aria-expanded="true" aria-haspopup="true" class="
                                                                                    uppercase text-[#f4f4f4]
                                                                                    hover:text-sky-400
                                                                                    " role="menuitem" tabindex="0"
                                            type="button" style="--focus-color-bg:#eff0ff;">{{
                                                item.title }}</button>
                                    </li>

                                </ul> -->



            </nav>


        </header>
    </div>
</template>

<script setup>


import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import data from "~/server/api/staticData"
// import navigation from "~/data/db"
// const data = await $fetch('/api/data')
const navigation = ref(data);

const navItems = [
    { title: "Services", href: "/services" },
    { title: "industries", href: "/industries" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/services" },
];

const open = ref(false)

</script>

<style>
.global:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #ffc627;
    background: -webkit-gradient(linear, left top, right top, from(rgba(165, 9, 9, 0.493)), to(rgba(136, 18, 18, 0.767)));
    background: linear-gradient(90deg, rgba(165, 9, 9, 0.493) 0%, rgba(136, 18, 18, 0.767) 100%);
}
</style>