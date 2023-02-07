import { ref, computed, watch } from "vue";

export default function useNavigation() {
  const ticking = ref(false);
  const isFirefox = computed(
    () => navigator.userAgent.toLowerCase().indexOf("firefox") > -1
  );
  const isIe = computed(
    () =>
      navigator.userAgent.toLowerCase().indexOf("msie") > -1 ||
      navigator.userAgent.toLowerCase().indexOf("trident") > -1
  );
  const scrollSensitivitySetting = ref(30);
  const slideDurationSetting = ref(600);
  const currentSlideNumber = ref(0);
  const slides = ref([]);
  const totalSlideNumber = computed(() => slides.value.length);

  function navigate(direction) {
    if (ticking.value) return;
    ticking.value = true;

    if (direction === "next") {
      if (currentSlideNumber.value !== totalSlideNumber.value - 1) {
        currentSlideNumber.value++;
        nextItem();
      }
    } else {
      if (currentSlideNumber.value !== 0) {
        currentSlideNumber.value--;
        previousItem();
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

  watch(
    () => currentSlideNumber.value,
    () => {
      var mousewheelEvent = isFirefox.value ? "DOMMouseScroll" : "wheel";
      window.addEventListener(mousewheelEvent, parallaxScroll, false);
    },
    { immediate: true }
  );

  return {
    navigate,
    slideDurationTimeout,
    nextItem,
    previousItem,
    ticking,
    isFirefox,
    isIe,
    scrollSensitivitySetting,
    slideDurationSetting,
    currentSlideNumber,
    totalSlideNumber,
  };
}
