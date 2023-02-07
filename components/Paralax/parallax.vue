<template>
    <div class="relative">
        <div class="fixed z-50 w-full">
            <slot name="nav" :navigate="navigate" :currentSlideNumber="currentSlideNumber" />
        </div>
        <div class="">
            <slot name="sections" />
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
// import { defineComponent, h } from "vue";
var touchY = reactive({ value: 0 });
const ticking = ref(false);
const currentSection = ref(1);
const isFirefox = ref(
    typeof navigator !== "undefined"
        ? navigator.userAgent.toLowerCase().indexOf("firefox") > -1
        : false
);
const isIe = ref(
    typeof navigator !== "undefined"
        ? navigator.userAgent.toLowerCase().indexOf("msie") > -1 ||
        navigator.userAgent.toLowerCase().indexOf("trident") > -1
        : false
);

const scrollSensitivitySetting = ref(30);
const slideDurationSetting = ref(600);
const currentSlideNumber = ref(0);
const slides = ref([]);
const totalSlideNumber = computed(() => slides.value.length);

function navigate(section) {
    if (section > currentSection.value) {
        while (currentSection.value !== section) {
            if (currentSlideNumber.value !== totalSlideNumber.value - 1) {
                currentSlideNumber.value++;
                nextItem();
                currentSection.value++;
            }
        }
    } else if (section < currentSection.value) {
        while (currentSection.value !== section) {
            if (currentSlideNumber.value !== 0) {
                currentSlideNumber.value--;
                previousItem();
                currentSection.value--;
            }
        }
    }
    slideDurationTimeout(slideDurationSetting.value);
}

function slideDurationTimeout(slideDuration) {
    setTimeout(() => {
        ticking.value = false;
    }, slideDuration);
}

function nextItem() {
    var previousSlide = slides.value[currentSlideNumber.value - 1];
    previousSlide.classList.remove("up-scroll");
    previousSlide.classList.add("down-scroll");
}

function previousItem() {
    var currentSlide = slides.value[currentSlideNumber.value];
    currentSlide.classList.remove("down-scroll");
    currentSlide.classList.add("up-scroll");
}
function parallaxScroll(evt) {
    var delta;
    switch (evt.type) {
        case "wheel":
            if (isFirefox.value) {
                delta = evt.detail * -120;
            } else if (isIe.value) {
                delta = -evt.deltaY;
            } else {
                delta = evt.wheelDelta;
            }
            break;
        case "keydown":
            if (evt.keyCode === 40) {
                //arrow down
                delta = -1;
            } else if (evt.keyCode === 38) {
                //arrow up
                delta = 1;
            }
            break;
        case "touchmove":
            if (evt.touches[0].clientY > touchY.value) {
                //touchmove down
                delta = -1;
                touchY.value = evt.touches[0].clientY;
            } else if (evt.touches[0].clientY < touchY.value) {
                //touchmove up
                delta = 1;
                touchY.value = evt.touches[0].clientY;
            }
            break;
    }
    if (ticking.value != true) {
        if (delta <= -1) {
            ticking.value = true;
            if (currentSlideNumber.value !== totalSlideNumber.value - 1) {
                currentSlideNumber.value++;
                nextItem();
            }
            slideDurationTimeout(slideDurationSetting.value);
        }
        if (delta >= 1) {
            ticking.value = true;
            if (currentSlideNumber.value !== 0) {
                currentSlideNumber.value--;
            }
            previousItem();
            slideDurationTimeout(slideDurationSetting.value);
        }
    }
}

onMounted(() => {

    slides.value = document.querySelectorAll(".background");
    if (typeof window !== "undefined") {
        var mousewheelEvent = isFirefox.value ? "DOMMouseScroll" : "wheel";
        window.addEventListener(
            mousewheelEvent,
            function (evt) {
                parallaxScroll(evt);
            },
            false
        );
    }
    window.addEventListener("keydown", function (event) {
        parallaxScroll(event);
    });

    window.addEventListener("touchmove", function (event) {
        parallaxScroll(event);
    });
});

watch(
    () => currentSection.value,
    (newValue) => {
        currentSlideNumber.value = newValue - 1;
        if (newValue > currentSection.value) {
            nextItem();
        } else {
            previousItem();
        }
    }
);
</script>
