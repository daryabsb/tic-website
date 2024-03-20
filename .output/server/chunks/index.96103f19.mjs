import _sfc_main$1 from './header.01e51ad3.mjs';
import _sfc_main$2 from './footer.708c07f4.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { d as data } from './tic-logo-01.c552b047.mjs';
import '@headlessui/vue';
import '@heroicons/vue/24/outline';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const services = ref(data.categories[1]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadersHeader = _sfc_main$1;
      const _component_HeadersFooter = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white relative" }, _attrs))}><div class="fixed z-50 w-full">`);
      _push(ssrRenderComponent(_component_HeadersHeader, null, null, _parent));
      _push(`</div><main id="maincontent" role="main" class="mx-auto max-w-2xl py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8"><div class="border-b border-gray-200 pb-5 sticky mt-3"><h3 class="text-3xl font-montserrat font-thin leading-6 text-blood">${ssrInterpolate(unref(services).name)}</h3></div><div class="mt-16 space-y-16"><!--[-->`);
      ssrRenderList(unref(services).featured, (service, index) => {
        _push(`<div class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"><div class="${ssrRenderClass([index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-8 xl:col-start-9", "mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4"])}" data-aos="slide-up"><h3 class="text-2xl font-medium text-blood">${ssrInterpolate(service.title)}</h3><p class="mt-2 text-sm text-gray-500">${ssrInterpolate(service.text)}</p><div class="mt-10 flex items-center justify-start gap-x-6"><a${ssrRenderAttr("href", `/services/${service.id}`)} class="text-base font-thin leading-7 text-blood">Learn more <span aria-hidden="true">\u2192</span></a></div></div><div class="${ssrRenderClass([index % 2 === 0 ? "lg:col-start-6 xl:col-start-5" : "lg:col-start-1", "flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8"])}"><div class="aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-gray-100"><img${ssrRenderAttr("src", service.image)} class="object-cover object-center"></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_HeadersFooter, null, null, _parent));
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.96103f19.mjs.map
