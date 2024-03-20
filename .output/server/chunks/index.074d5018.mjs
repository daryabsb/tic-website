import { a as _sfc_main$9, b as _sfc_main$7, c as _sfc_main$3, d as __nuxt_component_3, e as _sfc_main$5, f as _sfc_main$4, g as _sfc_main$1, h as __nuxt_component_7, i as _sfc_main$1$1 } from './team.cb2fc7c3.mjs';
import _sfc_main$2 from './footer.708c07f4.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import './tic-logo-01.c552b047.mjs';
import '@heroicons/vue/24/outline';
import '@headlessui/vue';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ParalaxParallax = _sfc_main$9;
  const _component_HeadersNewHeader = _sfc_main$7;
  const _component_LandingHero = _sfc_main$3;
  const _component_LandingAbout = __nuxt_component_3;
  const _component_LandingCategories = _sfc_main$5;
  const _component_LandingFetures = _sfc_main$4;
  const _component_LandingTeam = _sfc_main$1;
  const _component_LandingMap = __nuxt_component_7;
  const _component_LandingNewsletter = _sfc_main$1$1;
  const _component_HeadersFooter = _sfc_main$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_ParalaxParallax, null, {
    nav: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HeadersNewHeader, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_HeadersNewHeader)
        ];
      }
    }),
    sections: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_LandingHero, { id: "section-1" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_LandingAbout, { id: "section-2" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_LandingCategories, { id: "section-4" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_LandingFetures, { id: "section-3" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_LandingTeam, { id: "section-5" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_LandingMap, { id: "section-6" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_LandingNewsletter, { id: "section-7" }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_LandingHero, { id: "section-1" }),
          createVNode(_component_LandingAbout, { id: "section-2" }),
          createVNode(_component_LandingCategories, { id: "section-4" }),
          createVNode(_component_LandingFetures, { id: "section-3" }),
          createVNode(_component_LandingTeam, { id: "section-5" }),
          createVNode(_component_LandingMap, { id: "section-6" }),
          createVNode(_component_LandingNewsletter, { id: "section-7" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_HeadersFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index.074d5018.mjs.map
