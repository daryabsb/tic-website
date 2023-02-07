<template>
    <ParalaxSlide>


        <main>
            <div>
                <!-- Hero card -->
                <div class="relative">
                    <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
                    <div class="mx-auto">
                        <div class="relative shadow-xl sm:overflow-hidden sm:rounded-sm">
                            <div class="absolute inset-0">
                                <video class="min-w-full min-h-full absolute object-cover"
                                    src="~/assets/img/accenture-red.mp4" type="video/mp4" autoplay muted loop></video>
                                <!-- <img class="h-full w-full object-cover"
                                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                                    alt="People working on laptops" /> -->
                                <!-- <div class="absolute inset-0 bg-indigo-700 mix-blend-multiply" /> -->
                            </div>
                            <div class="relative py-12 px-6 sm:py-32 lg:py-40 lg:px-8">
                                <h1 class="text-center text-4xl font-montserrat tracking-tight sm:text-5xl lg:text-6xl">
                                    <span class="block text-white text-6xl">TIC QUALITY CONTROL</span>
                                    <span class="block text-zinc-300">Inspection Services & Industries</span>
                                </h1>
                                <p class="mx-auto mt-6 max-w-lg text-center text-xl text-zinc-200 sm:max-w-3xl">Anim
                                    aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                                    Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
                                <div class="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                                    <div
                                        class="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                                        <a href="#"
                                            class="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blood shadow-sm hover:bg-indigo-50 sm:px-8">Get
                                            started</a>
                                        <a href="#"
                                            class="flex items-center justify-center rounded-md border border-transparent bg-blood bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8">Live
                                            demo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Logo cloud -->
                <!-- <div class="bg-gray-100">
                    <div class="mx-auto max-w-7xl py-12 px-6 lg:px-8">
                        <p class="text-center text-base font-semibold text-gray-500">Trusted by over 5 very average
                            small businesses</p>
                        <div class="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                            <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                <img class="h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                                    alt="Tuple" />
                            </div>
                            <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                <img class="h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
                                    alt="Mirage" />
                            </div>
                            <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                <img class="h-12" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                                    alt="StaticKit" />
                            </div>
                            <div class="col-spn-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                                <img class="h-12" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                                    alt="Transistor" />
                            </div>

                        </div>
                    </div>
                </div> -->
            </div>

            <!-- More main page content here... -->
        </main>
    </ParalaxSlide>
</template>

<script setup>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import {
    Bars3Icon,
    ChatBubbleBottomCenterTextIcon,
    ChatBubbleLeftRightIcon,
    InboxIcon,
    QuestionMarkCircleIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const solutions = [
    {
        name: 'Inbox',
        description: 'Get a better understanding of where your traffic is coming from.',
        href: '#',
        icon: InboxIcon,
    },
    {
        name: 'Messaging',
        description: 'Speak directly to your customers in a more meaningful way.',
        href: '#',
        icon: ChatBubbleBottomCenterTextIcon,
    },
    {
        name: 'Live Chat',
        description: "Your customers' data will be safe and secure.",
        href: '#',
        icon: ChatBubbleLeftRightIcon,
    },
    {
        name: 'Knowledge Base',
        description: "Connect with third-party tools that you're already using.",
        href: '#',
        icon: QuestionMarkCircleIcon,
    },
]
const navigation = [
    { name: 'Pricing', href: '#' },
    { name: 'Partners', href: '#' },
    { name: 'Company', href: '#' },
]
</script>