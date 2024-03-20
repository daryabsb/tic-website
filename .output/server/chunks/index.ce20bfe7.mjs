import _sfc_main$1 from './header.01e51ad3.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './team.7553d105.mjs';
import _sfc_main$3 from './footer.708c07f4.mjs';
import { ref, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { d as data } from './tic-logo-01.c552b047.mjs';
import '@headlessui/vue';
import '@heroicons/vue/24/outline';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const company = ref(data.about.company);
    const values = ref(data.about.values);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadersHeader = _sfc_main$1;
      const _component_AboutCompliance = _sfc_main$1$1;
      const _component_AboutTeam = _sfc_main$2;
      const _component_HeadersFooter = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_HeadersHeader, { class: "z-50" }, null, _parent));
      _push(`<div class="relative bg-gray-800 pb-32"><div class="absolute inset-0"><img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1920&amp;q=60&amp;&amp;sat=-100" alt=""><div class="absolute inset-0 bg-gray-800 mix-blend-multiply" aria-hidden="true"></div></div><div class="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8"><h1 class="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">About</h1><div class="mt-6 max-w-full text-md text-gray-300">${unref(company)}</div></div></div><section class="relative z-10 mx-auto -mt-32 max-w-7xl px-6 pb-16 lg:px-8" aria-labelledby="contact-heading"><h2 class="sr-only" id="contact-heading">Contact us</h2><div class="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8"><!--[-->`);
      ssrRenderList(unref(values), (val) => {
        _push(`<div class="flex flex-col rounded-2xl bg-white shadow-xl"><div class="relative flex-1 px-6 pt-16 pb-4 md:px-8"><div class="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-red-600 p-5 shadow-lg">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(val.icon), {
          class: "h-6 w-6 text-white",
          "aria-hidden": "true"
        }, null), _parent);
        _push(`</div><h3 class="text-xl font-medium text-gray-900">${ssrInterpolate(val.title)}</h3><p class="mt-4 text-base text-gray-500">${ssrInterpolate(val.text)}</p></div><div class="rounded-bl-2xl rounded-br-2xl bg-gray-50 p-6 md:px-8"><a href="/contact" class="text-base font-medium text-red-700 hover:text-red-600">Contact us<span aria-hidden="true"> \u2192</span></a></div></div>`);
      });
      _push(`<!--]--></div></section><section class="relative z-10 mx-auto max-w-7xl px-6 pb-32 lg:px-8" aria-labelledby="contact-heading">`);
      _push(ssrRenderComponent(_component_AboutCompliance, null, null, _parent));
      _push(`</section><section class="relative z-10 mx-auto max-w-7xl px-6 pb-32 lg:px-8" aria-labelledby="contact-heading">`);
      _push(ssrRenderComponent(_component_AboutTeam, null, null, _parent));
      _push(`</section>`);
      _push(ssrRenderComponent(_component_HeadersFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.ce20bfe7.mjs.map
