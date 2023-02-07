<template>
    <div class="overflow-hidden bg-white py-12 sm:py-24 h-full w-full">
        <div class="h-full relative bg-white">
            <div class="absolute inset-0">
                <div class="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
            </div>
            <div class="relative mx-auto max-w-7xl lg:grid lg:grid-cols-6">
                <div class="bg-zinc-100 py-8 px-8 lg:col-span-2 lg:px-4 lg:py-24 xl:pr-4">
                    <div class="mx-auto max-w-lg">
                        <h2 class="text-2xl font-thin tracking-tight font-montserrat text-blood uppercase sm:text-3xl">
                            Global
                            representation
                        </h2>
                        <p class="mt-3 text-lg leading-6 text-gray-500">Nullam risus blandit ac aliquam justo ipsum.
                            Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.</p>
                        <dl class="mt-8 text-base text-gray-500">
                            <div>
                                <dt class="sr-only">Postal address</dt>
                                <dd>
                                    <p>742 Evergreen Terrace</p>
                                    <p>Springfield, OR 12345</p>
                                </dd>
                            </div>
                            <div class="mt-6">
                                <dt class="sr-only">Phone number</dt>
                                <dd class="flex">
                                    <PhoneIcon class="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <span class="ml-3">+1 (555) 123-4567</span>
                                </dd>
                            </div>
                            <div class="mt-3">
                                <dt class="sr-only">Email</dt>
                                <dd class="flex">
                                    <EnvelopeIcon class="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <span class="ml-3">support@example.com</span>
                                </dd>
                            </div>
                        </dl>
                        <p class="mt-6 text-base text-gray-500">
                            Looking for careers?
                            {{ ' ' }}
                            <a href="#" class="font-medium text-gray-700 underline">View all job openings</a>.
                        </p>
                    </div>
                </div>
                <div class="bg-white py-2 px-2 lg:col-span-4 lg:py-24 lg:px-4 xl:pl-6">
                    <div class="mx-auto max-w-lg lg:max-w-none">
                        <div class="map-container pl-0 xl-pl-24 w-full overflow-hidden">
                            <!-- <img src="~/assets/img/map.png"
                                    class="object-right object-cover -mb-12 w-[57rem] max-w-none" /> -->
                            <img src="~/assets/img/map.png" class=" object-cover">
                            <div class="point dubai tippy pulse" title="Dubai"></div>
                            <div class="point abudhabi tippy" title="Abu Dhabi"></div>
                            <div class="point sulaimani tippy" title="Iraq"></div>
                            <div class="point cairo tippy" title="Egypt"></div>
                            <div class="point delhi tippy" title="India"></div>
                            <div class="point japan tippy" title="Japan"></div>
                            <div class="point south-africa tippy" title="South Africa"></div>
                            <div class="point kenya tippy" title="Kenya"></div>
                            <div class="point london tippy" title="United Kingdom"></div>
                            <div class="point nairobi tippy" title="Nairobi"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {
    CloudArrowUpIcon,
    LockClosedIcon,
    ServerIcon,
} from "@heroicons/vue/20/solid";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/vue/24/outline";
const features = [
    {
        name: "Push to deploy.",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
        icon: CloudArrowUpIcon,
    },
    {
        name: "SSL certificates.",
        description:
            "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
        icon: LockClosedIcon,
    },
];
</script>

<style lang="scss" scoped>
$primary: #c10000;

.map-container {
    position: relative;

    .point {
        cursor: pointer;
        position: absolute;
        width: 1.4rem;
        height: 1.4rem;
        background-color: $primary;
        border-radius: 50%;
        transition: all 0.3s ease;
        will-change: transform, box-shadow;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 0 rgba($primary, 0.4);
        animation: pulse 3s infinite;

        &:hover {
            animation: none;
            transform: translate(-50%, -50%) scale3D(1.35, 1.35, 1);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        }
    }

    .dubai {
        top: 41%;
        left: 62%;
    }

    .south-africa {
        top: 76%;
        left: 51%;
    }

    .kenya {
        top: 57%;
        left: 57%;
    }

    .london {
        top: 27%;
        left: 45%;
    }

    .abudhabi {
        top: 45%;
        left: 62%;
    }

    .nairobi {
        top: 54%;
        left: 53%;
    }

    .cairo {
        top: 40%;
        left: 53%;
    }

    .sulaimani {
        top: 34%;
        left: 58%;
    }

    .delhi {
        top: 45%;
        left: 68%;
    }

    .japan {
        top: 34%;
        left: 86%;
    }
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba($primary, 0.5);
    }

    70% {
        box-shadow: 0 0 0 25px rgba($primary, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba($primary, 0);
    }
}
</style>
