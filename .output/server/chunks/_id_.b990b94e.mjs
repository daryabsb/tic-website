import _sfc_main$1 from './header.01e51ad3.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { a as useRoute } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { CameraIcon } from '@heroicons/vue/20/solid';
import { d as data } from './tic-logo-01.c552b047.mjs';
import '@headlessui/vue';
import '@heroicons/vue/24/outline';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'defu';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'unified';
import 'mdast-util-to-string';
import 'micromark/lib/preprocess.js';
import 'micromark/lib/postprocess.js';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'remark-emoji';
import 'rehype-slug';
import 'remark-squeeze-paragraphs';
import 'rehype-external-links';
import 'remark-gfm';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'remark-mdc';
import 'remark-parse';
import 'remark-rehype';
import 'mdast-util-to-hast';
import 'detab';
import 'unist-builder';
import 'mdurl';
import 'slugify';
import 'unist-util-position';
import 'unist-util-visit';
import 'shiki-es';
import 'unenv/runtime/npm/consola';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const industries = ref(data.categories[0]);
    const routes = useRoute();
    const id = routes.params.id;
    const industry = industries.value.featured.find((i) => i.id == id);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadersHeader = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white relative w-full" }, _attrs))}><div class="fixed z-50 w-full">`);
      _push(ssrRenderComponent(_component_HeadersHeader, null, null, _parent));
      _push(`</div><div class="overflow-hidden bg-white pt-24"><div class="relative mx-auto max-w-7xl py-16 px-6 lg:px-8"><div class="absolute top-0 bottom-0 left-3/4 hidden w-screen bg-gray-50 lg:block"></div><div class="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8"><div><h2 class=""><a href="/industries" class="text-lg uppercase text-blood"> industries </a></h2><h3 class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">${ssrInterpolate(unref(industry).title)}</h3></div></div><div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8"><div class="relative lg:col-start-2 lg:row-start-1"><svg class="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true"><defs><pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor"></rect></pattern></defs><rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"></rect></svg><div class="relative mx-auto max-w-prose text-base lg:max-w-none"><figure><div class="aspect-w-12 aspect-h-7 lg:aspect-none"><img class="rounded-lg object-cover object-center shadow-lg"${ssrRenderAttr("src", unref(industry).image)} alt="Whitney leaning against a railing on a downtown street" width="1184" height="1376"></div><figcaption class="mt-3 flex text-sm text-gray-500">`);
      _push(ssrRenderComponent(unref(CameraIcon), {
        class: "h-5 w-5 flex-none text-gray-400",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="ml-2">${ssrInterpolate(unref(industry).text)}</span></figcaption></figure></div></div><div class="mt-8 lg:mt-0"><!--[-->`);
      ssrRenderList(unref(industry).details, (detail) => {
        _push(`<div class="prose prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none"><h3 class="text-sm font-medium text-gray-900">${ssrInterpolate(detail.title)}</h3><div>${detail.text}</div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/industries/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.b990b94e.mjs.map
