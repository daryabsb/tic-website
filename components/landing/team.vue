<template>
    <slide class="">
        <div class=" -mt-12 lg:grid lg:grid-cols-12 lg:gap-8 p-6 z-10">
            <div class="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
                <h1
                    class="text-4xl font-montserrat font-normal tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                    <!-- <span
                        class="block text-base font-montserrat font-semibold text-gray-500 sm:text-lg lg:text-base xl:text-lg">Coming
                        soon</span> -->
                    <span class="inline">Contact</span>
                    {{ " " }}
                    <span class="text-blood inline"> Us</span>

                </h1>
                <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    For more information on our products and services and to request a free quotation, please get in
                    touch using the below form and our team will be in touch. 
                </p>
                <div class="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                    <!-- <p class="text-base font-medium text-gray-900">
                        Sign up to get notified when it’s ready.
                    </p> -->
                    <form action="#" method="POST" class="mt-3 sm:flex sm:flex-col space-y-3">
                        <label for="name" class="sr-only">Name</label>
                        <input type="text" name="name" id="name"
                            class=" pl-2 block w-full  border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1"
                            placeholder="Enter your name" />
                        <label for="phone" class="sr-only">Phone</label>
                        <input type="text" name="phone" id="phone"
                            class=" pl-2 block w-full  border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1"
                            placeholder="Contact number" />
                        <label for="email" class="sr-only">Email</label>
                        <input type="email" name="email" id="email"
                            class=" pl-2 block w-full  border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1"
                            placeholder="Enter your email" />
                        <button type="submit" class=" mt-3  border 
                            border-transparent 
                            bg-zinc-800 px-6 py-3 
                            text-base font-medium 
                            text-white shadow-sm 
                            hover:bg-gray-900 focus:outline-none 
                            focus:ring-2 focus:ring-indigo-500 
                            focus:ring-offset-2 sm:mt-0 sm:inline-flex 
                            w-fit sm:flex-shrink-0 sm:items-center">
                            Send me free quotation
                        </button>
                    </form>
                </div>
            </div>
            <div
                class="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
                <div class="block lg:hidden relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                    <button type="button"
                        class="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <div class="abolute inset-0 bg-zinc-900 bg-opacity-20 z-10" />

                        <img class="w-full overlay" src="/img/sectionteam.jpg" alt="" />

                    </button>
                </div>
            </div>
        </div>
        <div class="hidden lg:block absolute top-0">
            <img src="/img/sectionteam.jpg" alt="" class="h-screen w-screen object-cover" />
        </div>
    </slide>
</template>
<script setup>
import slide from '~/components/Paralax/slide.vue';

</script>