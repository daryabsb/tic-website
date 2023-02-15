import { ref, reactive, onMounted, toRefs } from "vue";
import gsap from "gsap";

export default function useCarousel({ carouselItems, carouselDots }) {
  const targets = reactive([]);

  const state = reactive({
    duration: 2.5,
    pause: 5.5,
    stagger: 0,
    // targets: [],
    numberOfTargets: 0,
    repeatDelay: 0,
  });

  onMounted(() => {
    state.stagger = state.duration + state.pause;
    targets.splice(
      0,
      targets.length,
      ...Array.from(document.querySelectorAll(".carousel-item"))
    );
    state.numberOfTargets = targets.length;
    state.repeatDelay =
      state.stagger * (state.numberOfTargets - 1) + state.pause;

    document.querySelectorAll(".carousel-dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        document
          .querySelectorAll(".carousel-dot")
          .forEach((d) => d.classList.remove("active"));
        e.target.classList.add("active");
      });
    });

    init();
  });

  const init = () => {
    const items = gsap.utils.toArray(".carousel-item");
    const tl = gsap.timeline({
      onComplete() {
        this.restart();
      },
    });
    gsap.set(items, {
      backgroundColor: gsap.utils.wrap([
        "#f87171",
        "#fb923c",
        "#fbbf24",
        "#facc15",
        "#a3e635",
      ]),
      xPercent: 100,
    });
    gsap.to(items[0], { xPercent: 0, duration: state.duration });
    items.forEach((item, i) => {
      if (i) {
        tl.to(
          item,
          { xPercent: 0, duration: state.duration },
          `+=${state.pause}`
        ).to(items[i - 1], { xPercent: -100, duration: state.duration }, "<");
      }
    });
    tl.fromTo(
      items[0],
      { xPercent: 100, immediateRender: false },
      { xPercent: 0 },
      `+=${state.pause}`
    ).to(
      items[items.length - 1],
      { xPercent: -100, duration: state.duration },
      "<"
    );
  };

  return { ...toRefs(state), targets };
}
