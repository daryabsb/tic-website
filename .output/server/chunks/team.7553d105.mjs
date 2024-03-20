import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { d as data } from './tic-logo-01.c552b047.mjs';
import '@heroicons/vue/24/outline';

const _imports_0$1 = "" + globalThis.__publicAssetsURL("img/about/compliance.jpg");
const _sfc_main$1 = {
  __name: "compliance",
  __ssrInlineRender: true,
  setup(__props) {
    const compliance2 = ref(data.about.compliance);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-32 overflow-hidden sm:mt-40" }, _attrs))}><div class="mx-auto max-w-7xl px-3 lg:flex lg:px-4"><div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-4 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8"><h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">${ssrInterpolate(unref(compliance2).title)}</h2><div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8"><!--[-->`);
      ssrRenderList(unref(compliance2).text_p, (content) => {
        _push(`<p class="mt-6 text-xl leading-8 text-gray-600">${ssrInterpolate(content)}</p>`);
      });
      _push(`<!--]--></div><div class="flex flex-wrap items-center justify-end gap-6 sm:gap-8 lg:contents"><div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-center"><img${ssrRenderAttr("src", _imports_0$1)}${ssrRenderAttr("alt", unref(compliance2).title)} class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-contain"></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about/compliance.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const compliance = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _imports_0 = "" + globalThis.__publicAssetsURL("img/about/team-meeting.jpg");
const _sfc_main = {
  __name: "team",
  __ssrInlineRender: true,
  setup(__props) {
    const team2 = ref(data.about.team);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden bg-white py-24 sm:py-32" }, _attrs))}><div class="mx-auto max-w-7xl px-6 lg:px-8"><div class="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"><div class="lg:pr-8 lg:pt-4"><div class="lg:max-w-lg"><p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">${ssrInterpolate(unref(team2).title)}</p><p class="mt-6 text-lg leading-8 text-gray-600">${ssrInterpolate(unref(team2).text)}</p><!--[-->`);
      ssrRenderList(unref(team2).values, (feature) => {
        _push(`<div class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"><h3 class="text-2xl font-semibold text-blood">${ssrInterpolate(feature.title)}</h3><div class="ml-4">${feature.text}</div></div>`);
      });
      _push(`<!--]--></div></div><img${ssrRenderAttr("src", _imports_0)} alt="Product screenshot" class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442"></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about/team.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const team = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));

export { _sfc_main$1 as _, _sfc_main as a, compliance as c, team as t };
//# sourceMappingURL=team.7553d105.mjs.map
