import _sfc_main$1 from './header.01e51ad3.mjs';
import _sfc_main$2 from './footer.708c07f4.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import './tic-logo-01.c552b047.mjs';
import '@heroicons/vue/24/outline';
import '@headlessui/vue';

const _sfc_main = {
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    const faqs = [
      {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadersHeader = _sfc_main$1;
      const _component_HeadersFooter = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_HeadersHeader, null, null, _parent));
      _push(`<div class="bg-white relative"><div class="mx-auto max-w-7xl divide-y divide-gray-900/10 px-6 py-24 sm:py-32 lg:py-40 lg:px-8"><h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2><dl class="mt-10 space-y-8 divide-y divide-gray-900/10"><!--[-->`);
      ssrRenderList(faqs, (faq) => {
        _push(`<div class="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"><dt class="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">${ssrInterpolate(faq.question)}</dt><dd class="mt-4 lg:col-span-7 lg:mt-0"><p class="text-base leading-7 text-gray-600">${ssrInterpolate(faq.answer)}</p></dd></div>`);
      });
      _push(`<!--]--></dl></div></div>`);
      _push(ssrRenderComponent(_component_HeadersFooter, { class: "absolute bottom-0 w-full" }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=faq.6e6d338a.mjs.map
