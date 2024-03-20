import { b as useNuxtApp, d as useState, u as useRuntimeConfig, _ as _export_sfc, e as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, onErrorCaptured, createElementBlock, h as h$1, computed, toRaw, provide, onMounted, watch, Fragment, watchEffect, onUnmounted, nextTick, inject, Teleport, reactive, unref, shallowRef, normalizeClass, defineAsyncComponent, toRefs, useSlots, useSSRContext, cloneVNode, mergeProps, withCtx, createVNode, openBlock, createBlock, renderList, createElementVNode } from 'vue';
import { a as useAsyncData, q as queryContent, e as encodeQueryParams, j as jsonStringify, u as useCookie } from './ContentQuery.33f4cc5b.mjs';
import { hash } from 'ohash';
import { b as useContentDisabled, w as withContentBase, a as addPrerenderPath, s as shouldUseClientDB } from './utils.730db65a.mjs';
import { _ as _imports_0$3, s as slide } from './team.cb2fc7c3.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';
import { _ as _imports_0 } from './tic-logo-01.c552b047.mjs';
import { u as useHead } from './composables.cb8baa95.mjs';
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
import 'cookie-es';
import '@headlessui/vue';
import './footer.708c07f4.mjs';

const fetchContentNavigation = async (queryBuilder) => {
  const { content } = useRuntimeConfig().public;
  if (typeof (queryBuilder == null ? void 0 : queryBuilder.params) !== "function") {
    queryBuilder = queryContent(queryBuilder);
  }
  const params = queryBuilder.params();
  const apiPath = content.experimental.stripQueryParameters ? withContentBase(`/navigation/${`${hash(params)}.${content.integrity}`}/${encodeQueryParams(params)}.json`) : withContentBase(`/navigation/${hash(params)}.${content.integrity}.json`);
  {
    addPrerenderPath(apiPath);
  }
  if (shouldUseClientDB()) {
    const generateNavigation = await import('./client-db.2c3ffd17.mjs').then((m2) => m2.generateNavigation);
    return generateNavigation(params);
  }
  const data = await $fetch(apiPath, {
    method: "GET",
    responseType: "json",
    params: content.experimental.stripQueryParameters ? void 0 : {
      _params: jsonStringify(params),
      previewToken: useCookie("previewToken").value
    }
  });
  if (typeof data === "string" && data.startsWith("<!DOCTYPE html>")) {
    throw new Error("Not found");
  }
  return data;
};
const _sfc_main$4 = {
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden bg-white py-12 sm:py-24 h-full w-full" }, _attrs))} data-v-614fd48a><div class="h-full relative bg-white" data-v-614fd48a><div class="absolute inset-0" data-v-614fd48a><div class="absolute inset-y-0 left-0 w-1/2 bg-gray-50" data-v-614fd48a></div></div><div class="relative mx-auto max-w-7xl lg:grid lg:grid-cols-6" data-v-614fd48a><div class="bg-zinc-100 py-8 px-8 lg:col-span-2 lg:px-4 lg:py-24 xl:pr-4" data-v-614fd48a><div class="mx-auto max-w-lg" data-v-614fd48a><h2 class="text-2xl font-thin tracking-tight font-montserrat text-blood uppercase sm:text-3xl" data-v-614fd48a> Global representation </h2><p class="mt-3 text-lg leading-6 text-gray-500" data-v-614fd48a>Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.</p><dl class="mt-8 text-base text-gray-500" data-v-614fd48a><div data-v-614fd48a><dt class="sr-only" data-v-614fd48a>Postal address</dt><dd data-v-614fd48a><p data-v-614fd48a>742 Evergreen Terrace</p><p data-v-614fd48a>Springfield, OR 12345</p></dd></div><div class="mt-6" data-v-614fd48a><dt class="sr-only" data-v-614fd48a>Phone number</dt><dd class="flex" data-v-614fd48a>`);
      _push(ssrRenderComponent(unref(PhoneIcon), {
        class: "h-6 w-6 flex-shrink-0 text-gray-400",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="ml-3" data-v-614fd48a>+1 (555) 123-4567</span></dd></div><div class="mt-3" data-v-614fd48a><dt class="sr-only" data-v-614fd48a>Email</dt><dd class="flex" data-v-614fd48a>`);
      _push(ssrRenderComponent(unref(EnvelopeIcon), {
        class: "h-6 w-6 flex-shrink-0 text-gray-400",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="ml-3" data-v-614fd48a>support@example.com</span></dd></div></dl><p class="mt-6 text-base text-gray-500" data-v-614fd48a> Looking for careers? ${ssrInterpolate(" ")} <a href="#" class="font-medium text-gray-700 underline" data-v-614fd48a>View all job openings</a>. </p></div></div><div class="bg-white py-2 px-2 lg:col-span-4 lg:py-24 lg:px-4 xl:pl-6" data-v-614fd48a><div class="mx-auto max-w-lg lg:max-w-none" data-v-614fd48a><div class="map-container pl-0 xl-pl-24 w-full overflow-hidden" data-v-614fd48a><img${ssrRenderAttr("src", _imports_0$3)} class="object-cover" data-v-614fd48a><div class="point dubai tippy pulse" title="Dubai" data-v-614fd48a></div><div class="point abudhabi tippy" title="Abu Dhabi" data-v-614fd48a></div><div class="point sulaimani tippy" title="Iraq" data-v-614fd48a></div><div class="point cairo tippy" title="Egypt" data-v-614fd48a></div><div class="point delhi tippy" title="India" data-v-614fd48a></div><div class="point japan tippy" title="Japan" data-v-614fd48a></div><div class="point south-africa tippy" title="South Africa" data-v-614fd48a></div><div class="point kenya tippy" title="Kenya" data-v-614fd48a></div><div class="point london tippy" title="United Kingdom" data-v-614fd48a></div><div class="point nairobi tippy" title="Nairobi" data-v-614fd48a></div></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about/contact.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-614fd48a"]]);
const contact$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact
}, Symbol.toStringTag, { value: "Module" }));
function useCarousel({ carouselItems, carouselDots }) {
  const targets = reactive([]);
  const state = reactive({
    duration: 2.5,
    pause: 5.5,
    stagger: 0,
    numberOfTargets: 0,
    repeatDelay: 0
  });
  return { ...toRefs(state), targets };
}
const script = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: useCarousel
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const images = [
      { image: '"https://assets.codepen.io/9556641/img-22.webp', alt: "Image 1" },
      { image: "https://assets.codepen.io/9556641/img-11.webp", alt: "Image 2" },
      { image: "https://assets.codepen.io/9556641/img-6.webp", alt: "Image 3" }
    ];
    const carouselItems = ref(null);
    const carouselDots = ref(null);
    const { targets } = useCarousel({ carouselItems, carouselDots });
    computed(() => {
      return targets.map((target) => {
        return {
          target
        };
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ParalaxSlide = slide;
      _push(ssrRenderComponent(_component_ParalaxSlide, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-c8254b50${_scopeId}><!--[-->`);
            ssrRenderList(images, (item, index2) => {
              _push2(`<div class="carousel-item" data-v-c8254b50${_scopeId}></div>`);
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(images, (item, index2) => {
              _push2(`<div class="carousel-dot" data-v-c8254b50${_scopeId}></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", null, [
                (openBlock(), createBlock(Fragment, null, renderList(images, (item, index2) => {
                  return createVNode("div", {
                    class: "carousel-item",
                    key: index2,
                    ref_for: true,
                    ref_key: "carouselItems",
                    ref: carouselItems
                  });
                }), 64)),
                (openBlock(), createBlock(Fragment, null, renderList(images, (item, index2) => {
                  return createVNode("div", {
                    class: "carousel-dot",
                    key: index2,
                    ref_for: true,
                    ref_key: "carouselDots",
                    ref: carouselDots
                  });
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carousel/index.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c8254b50"]]);
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const _imports_1 = "" + globalThis.__buildAssetsURL("vessell-0-2.2fb1d721.jpg");
const _sfc_main$2 = {
  __name: "creative",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(slide, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-16 lg:py-24 z-20"${_scopeId}><div class="py-24 px-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-16"${_scopeId}><div class="relative lg:col-span-1"${_scopeId}><img class="h-24 mr-auto w-auto"${ssrRenderAttr("src", _imports_0)} alt=""${_scopeId}><blockquote class="drop-shadow mt-6 font-semibold text-zinc-900"${_scopeId}><p class="text-xl capitalize font-medium sm:text-2xl"${_scopeId}>This company has completely transformed how we interact with customers. We&#39;ve seen record bookings, higher customer satisfaction, and reduced churn.</p><footer class="mt-6"${_scopeId}><p class="flex flex-col text-blood font-medium"${_scopeId}><span class=""${_scopeId}>Rand Khalifa</span><span${_scopeId}>CEO, Tic Quality Control</span></p></footer></blockquote></div></div><div class="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center"${_scopeId}><div class="block lg:hidden relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"${_scopeId}><button type="button" class="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"${_scopeId}><span class="sr-only"${_scopeId}>Watch our video to learn more</span><img class="w-full"${ssrRenderAttr("src", _imports_1)} alt=""${_scopeId}></button></div></div></div><div class="hidden lg:block absolute top-0"${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="" class="h-screen w-screen object-cover"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "py-16 lg:py-24 z-20" }, [
                createVNode("div", { class: "py-24 px-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-16" }, [
                  createVNode("div", { class: "relative lg:col-span-1" }, [
                    createVNode("img", {
                      class: "h-24 mr-auto w-auto",
                      src: _imports_0,
                      alt: ""
                    }),
                    createVNode("blockquote", { class: "drop-shadow mt-6 font-semibold text-zinc-900" }, [
                      createVNode("p", { class: "text-xl capitalize font-medium sm:text-2xl" }, "This company has completely transformed how we interact with customers. We've seen record bookings, higher customer satisfaction, and reduced churn."),
                      createVNode("footer", { class: "mt-6" }, [
                        createVNode("p", { class: "flex flex-col text-blood font-medium" }, [
                          createVNode("span", { class: "" }, "Rand Khalifa"),
                          createVNode("span", null, "CEO, Tic Quality Control")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center" }, [
                  createVNode("div", { class: "block lg:hidden relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md" }, [
                    createVNode("button", {
                      type: "button",
                      class: "relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }, [
                      createVNode("span", { class: "sr-only" }, "Watch our video to learn more"),
                      createVNode("img", {
                        class: "w-full",
                        src: _imports_1,
                        alt: ""
                      })
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "hidden lg:block absolute top-0" }, [
                createVNode("img", {
                  src: _imports_1,
                  alt: "",
                  class: "h-screen w-screen object-cover"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/creative.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const creative = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "welcome",
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "Welcome to Nuxt!"
    },
    readDocs: {
      type: String,
      default: "We highly recommend you take a look at the Nuxt documentation, whether you are new or have previous experience with the framework."
    },
    followTwitter: {
      type: String,
      default: "Follow the Nuxt Twitter account to get latest news about releases, new modules, tutorials and tips."
    },
    starGitHub: {
      type: String,
      default: "Nuxt is open source and the code is available on GitHub, feel free to star it, participate in discussions or dive into the source."
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.title}`,
      script: [],
      style: [
        {
          children: `@property --gradient-angle{syntax:'<angle>';inherits:false;initial-value:180deg}@keyframes gradient-rotate{0%{--gradient-angle:0deg}100%{--gradient-angle:360deg}}*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e0e0e0}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p,h2,h3{margin:0}h1,h2,h3{font-size:inherit;font-weight:inherit}img{border-style:solid;max-width:100%;height:auto}svg,img{display:block;vertical-align:middle}ul{list-style:none;margin:0;padding:0}`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen place-content-center flex flex-col items-center justify-center text-sm sm:text-base" }, _attrs))} data-v-a75d3b4d><div class="flex-1 flex flex-col gap-y-16 py-14" data-v-a75d3b4d><div class="flex flex-col gap-y-4 items-center justify-center" data-v-a75d3b4d><a href="https://nuxt.com" target="_blank" data-v-a75d3b4d><svg width="61" height="42" viewBox="0 0 61 42" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a75d3b4d><path d="M33.9869 41.2211H56.412C57.1243 41.2212 57.824 41.0336 58.4408 40.6772C59.0576 40.3209 59.5698 39.8083 59.9258 39.191C60.2818 38.5737 60.469 37.8736 60.4687 37.1609C60.4684 36.4482 60.2805 35.7482 59.924 35.1313L44.864 9.03129C44.508 8.41416 43.996 7.90168 43.3793 7.54537C42.7626 7.18906 42.063 7.00147 41.3509 7.00147C40.6387 7.00147 39.9391 7.18906 39.3225 7.54537C38.7058 7.90168 38.1937 8.41416 37.8377 9.03129L33.9869 15.7093L26.458 2.65061C26.1018 2.03354 25.5895 1.52113 24.9726 1.16489C24.3557 0.808639 23.656 0.621094 22.9438 0.621094C22.2316 0.621094 21.5318 0.808639 20.915 1.16489C20.2981 1.52113 19.7858 2.03354 19.4296 2.65061L0.689224 35.1313C0.332704 35.7482 0.144842 36.4482 0.144532 37.1609C0.144222 37.8736 0.331476 38.5737 0.687459 39.191C1.04344 39.8083 1.5556 40.3209 2.17243 40.6772C2.78925 41.0336 3.48899 41.2212 4.20126 41.2211H18.2778C23.8551 41.2211 27.9682 38.7699 30.7984 33.9876L37.6694 22.0813L41.3498 15.7093L52.3951 34.8492H37.6694L33.9869 41.2211ZM18.0484 34.8426L8.2247 34.8404L22.9504 9.32211L30.2979 22.0813L25.3784 30.6092C23.4989 33.7121 21.3637 34.8426 18.0484 34.8426Z" fill="#00DC82" data-v-a75d3b4d></path></svg></a><h1 class="text-black dark:text-white text-4xl sm:text-5xl font-semibold text-center" data-v-a75d3b4d>Welcome to Nuxt!</h1></div><div class="grid grid-cols-2 lg:grid-cols-10 gap-6 max-w-[960px] px-4" data-v-a75d3b4d><div class="col-span-2 lg:col-span-10 relative get-started-gradient-border" data-v-a75d3b4d><div class="get-started-gradient-left absolute left-0 inset-y-0 w-[20%] bg-gradient-to-r to-transparent from-green-400 rounded-xl z-1 transition-opacity duration-300" data-v-a75d3b4d></div><div class="get-started-gradient-right absolute right-0 inset-y-0 w-[20%] bg-gradient-to-l to-transparent from-blue-400 rounded-xl z-1 transition-opacity duration-300" data-v-a75d3b4d></div><div class="w-full absolute inset-x-0 flex justify-center -top-[58px]" data-v-a75d3b4d><img src="data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22105%22%20height%3D%22116%22%20fill%3D%22none%22%3E%3Cg%20filter%3D%22url(%23a)%22%20shape-rendering%3D%22geometricPrecision%22%3E%3Cpath%20fill%3D%22%2318181B%22%20d%3D%22M17.203%2033.223%2046.9%2014.286a8.416%208.416%200%200%201%208.64-.18L87.38%2031.97c2.68%201.527%204.365%204.409%204.428%207.571l.191%2034.944c.063%203.151-1.491%206.104-4.091%207.776l-30.143%2019.383a8.417%208.417%200%200%201-8.75.251l-31.126-17.73C15.135%2082.595%2012.98%2079.6%2013%2076.35V40.828c.02-3.111%201.614-5.994%204.203-7.605Z%22%2F%3E%3Cpath%20stroke%3D%22url(%23b)%22%20stroke-width%3D%222%22%20d%3D%22M46.9%2014.286%2017.202%2033.223c-2.59%201.61-4.183%204.494-4.203%207.605V76.35m33.9-62.064a8.416%208.416%200%200%201%208.64-.18m-8.64.18a8.435%208.435%200%200%201%208.64-.18M13%2076.35c-.02%203.25%202.135%206.246%204.888%207.814M13%2076.35c-.02%203.233%202.136%206.247%204.888%207.814m0%200%2031.126%2017.731m0%200a8.417%208.417%200%200%200%208.75-.251m-8.75.251a8.438%208.438%200%200%200%208.75-.251m0%200%2030.143-19.383m0%200c2.598-1.67%204.154-4.627%204.091-7.776m-4.091%207.776c2.6-1.672%204.154-4.625%204.091-7.776m0%200-.19-34.944m0%200c-.064-3.162-1.75-6.044-4.43-7.571m4.43%207.571c-.063-3.147-1.75-6.045-4.43-7.571m0%200L55.54%2014.105%22%2F%3E%3C%2Fg%3E%3Cpath%20fill%3D%22url(%23c)%22%20d%3D%22M48.669%2067.696c-.886%202.69-3.02%204.659-6.153%205.709-1.41.465-2.88.72-4.364.755a1.313%201.313%200%200%201-1.312-1.313c.035-1.484.29-2.954.754-4.364%201.05-3.133%203.02-5.266%205.71-6.152a1.312%201.312%200%201%201%20.836%202.477c-3.232%201.083-4.232%204.577-4.544%206.595%202.018-.311%205.512-1.312%206.595-4.544a1.313%201.313%200%200%201%202.477.837Zm16.39-12.486-1.46%201.477v10.057a2.657%202.657%200%200%201-.772%201.854l-5.316%205.3a2.559%202.559%200%200%201-1.853.77%202.413%202.413%200%200%201-.755-.115%202.624%202.624%200%200%201-1.821-2.001l-1.296-6.48-6.858-6.858-6.48-1.297a2.625%202.625%200%200%201-2.002-1.82%202.609%202.609%200%200%201%20.656-2.61l5.3-5.315a2.658%202.658%200%200%201%201.853-.771h10.057l1.477-1.46c4.692-4.692%209.499-4.561%2011.353-4.282a2.576%202.576%200%200%201%202.198%202.198c.28%201.854.41%206.661-4.282%2011.353Zm-26.103.132%206.185%201.23%206.546-6.546h-7.432l-5.299%205.316Zm8.482%202.657L53%2063.561l10.205-10.205c1.28-1.28%204.2-4.724%203.543-9.105-4.38-.656-7.826%202.264-9.105%203.544L47.438%2057.999Zm13.535%201.313-6.546%206.546%201.23%206.185%205.316-5.299v-7.432Z%22%20shape-rendering%3D%22geometricPrecision%22%2F%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22b%22%20x1%3D%2257.994%22%20x2%3D%2292%22%20y1%3D%2258%22%20y2%3D%2258%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%2300DC82%22%2F%3E%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%231DE0B1%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2336E4DA%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22c%22%20x1%3D%2255.197%22%20x2%3D%2269.453%22%20y1%3D%2258.107%22%20y2%3D%2258.107%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%2300DC82%22%2F%3E%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%231DE0B1%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2336E4DA%22%2F%3E%3C%2FlinearGradient%3E%3Cfilter%20id%3D%22a%22%20width%3D%22104.897%22%20height%3D%22115.897%22%20x%3D%22.052%22%20y%3D%22.052%22%20color-interpolation-filters%3D%22sRGB%22%20filterUnits%3D%22userSpaceOnUse%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20result%3D%22hardAlpha%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%2F%3E%3CfeOffset%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%225.974%22%2F%3E%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%201%200%200%200%200%201%200%200%200%200%201%200%200%200%200.07%200%22%2F%3E%3CfeBlend%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_2724_4091%22%2F%3E%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_2724_4091%22%20result%3D%22shape%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E%0A" class="hidden dark:block" data-v-a75d3b4d> <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22105%22%20height%3D%22116%22%20fill%3D%22none%22%3E%3Cg%20filter%3D%22url(%23a)%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M17.203%2033.223%2046.9%2014.286a8.416%208.416%200%200%201%208.64-.18L87.38%2031.97c2.68%201.527%204.365%204.409%204.428%207.571l.191%2034.944c.063%203.151-1.491%206.104-4.091%207.776l-30.143%2019.383a8.417%208.417%200%200%201-8.75.251l-31.126-17.73C15.135%2082.595%2012.98%2079.6%2013%2076.35V40.828c.02-3.111%201.614-5.994%204.203-7.605Z%22%2F%3E%3Cpath%20stroke%3D%22url(%23b)%22%20stroke-width%3D%222%22%20d%3D%22M46.9%2014.286%2017.202%2033.223c-2.59%201.61-4.183%204.494-4.203%207.605V76.35m33.9-62.064a8.416%208.416%200%200%201%208.64-.18m-8.64.18a8.435%208.435%200%200%201%208.64-.18M13%2076.35c-.02%203.25%202.135%206.246%204.888%207.814M13%2076.35c-.02%203.233%202.136%206.247%204.888%207.814m0%200%2031.126%2017.731m0%200a8.417%208.417%200%200%200%208.75-.251m-8.75.251a8.438%208.438%200%200%200%208.75-.251m0%200%2030.143-19.383m0%200c2.598-1.67%204.154-4.627%204.091-7.776m-4.091%207.776c2.6-1.672%204.154-4.625%204.091-7.776m0%200-.19-34.944m0%200c-.064-3.162-1.75-6.044-4.43-7.571m4.43%207.571c-.063-3.147-1.75-6.045-4.43-7.571m0%200L55.54%2014.105%22%2F%3E%3C%2Fg%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M32%2037h42v42H32z%22%2F%3E%3Cpath%20fill%3D%22url(%23c)%22%20d%3D%22M48.669%2067.697c-.886%202.69-3.02%204.659-6.153%205.709-1.41.465-2.88.72-4.364.755a1.313%201.313%200%200%201-1.312-1.313c.035-1.484.29-2.954.754-4.364%201.05-3.134%203.02-5.266%205.71-6.152a1.314%201.314%200%201%201%20.836%202.477c-3.232%201.083-4.232%204.577-4.544%206.595%202.018-.311%205.512-1.312%206.595-4.544a1.313%201.313%200%200%201%202.477.837Zm16.39-12.486-1.46%201.477v10.057a2.657%202.657%200%200%201-.772%201.854l-5.316%205.3a2.559%202.559%200%200%201-1.853.77%202.413%202.413%200%200%201-.755-.115%202.626%202.626%200%200%201-1.821-2.001l-1.296-6.48-6.858-6.858-6.48-1.297a2.625%202.625%200%200%201-2.002-1.82%202.609%202.609%200%200%201%20.656-2.61l5.3-5.315a2.658%202.658%200%200%201%201.853-.771h10.057l1.477-1.46c4.692-4.692%209.499-4.561%2011.353-4.282a2.576%202.576%200%200%201%202.198%202.198c.28%201.854.41%206.661-4.282%2011.353Zm-26.103.132%206.185%201.23%206.546-6.546h-7.432l-5.299%205.316ZM47.438%2058%2053%2063.562l10.205-10.204c1.28-1.28%204.2-4.725%203.543-9.106-4.38-.656-7.826%202.264-9.105%203.544L47.438%2058Zm13.535%201.313-6.546%206.546%201.23%206.185%205.316-5.299v-7.432Z%22%2F%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22b%22%20x1%3D%2257.994%22%20x2%3D%2292%22%20y1%3D%2258%22%20y2%3D%2258%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%2300DC82%22%2F%3E%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%231DE0B1%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2336E4DA%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22c%22%20x1%3D%2255.197%22%20x2%3D%2269.453%22%20y1%3D%2258.108%22%20y2%3D%2258.108%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%2300DC82%22%2F%3E%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%231DE0B1%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2336E4DA%22%2F%3E%3C%2FlinearGradient%3E%3Cfilter%20id%3D%22a%22%20width%3D%22104.897%22%20height%3D%22115.897%22%20x%3D%22.052%22%20y%3D%22.052%22%20color-interpolation-filters%3D%22sRGB%22%20filterUnits%3D%22userSpaceOnUse%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20result%3D%22hardAlpha%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%2F%3E%3CfeOffset%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%225.974%22%2F%3E%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%201%200%200%200%200%201%200%200%200%200%201%200%200%200%200.07%200%22%2F%3E%3CfeBlend%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_2726_4054%22%2F%3E%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_2726_4054%22%20result%3D%22shape%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E%0A" class="dark:hidden" data-v-a75d3b4d></div><div class="flex flex-col rounded-xl items-center gap-y-4 pt-[58px] px-4 sm:px-28 pb-6 z-10" data-v-a75d3b4d><h2 class="font-semibold text-2xl text-black dark:text-white" data-v-a75d3b4d>Get started</h2><p class="mb-2 text-center" data-v-a75d3b4d>Remove this welcome page by replacing <a class="bg-gray-100 dark:bg-white/10 rounded font-mono p-1 font-bold" data-v-a75d3b4d>&lt;NuxtWelcome /&gt;</a> in <a href="https://nuxt.com/docs/directory-structure/app" target="_blank" rel="noopener" class="bg-gray-100 dark:bg-white/10 rounded font-mono p-1 font-bold" data-v-a75d3b4d>app.vue</a> with your own code.</p></div></div><div class="lg:min-h-min sm:min-h-[220px] md:min-h-[180px] col-span-2 sm:col-span-1 lg:col-span-6 text-black dark:text-white rounded-xl modules-container relative items-center justify-center border border-gray-200 dark:border-transparent hover:border-transparent" data-v-a75d3b4d><div class="gradient-border gradient-border-modules gradient-border-rect" data-v-a75d3b4d></div><div class="modules-gradient-right absolute right-0 inset-y-0 w-[20%] bg-gradient-to-l to-transparent from-yellow-400 rounded-xl z-1 transition-opacity duration-300" data-v-a75d3b4d></div><a href="https://nuxt.com/modules" target="_blank" class="py-6 px-5 rounded-xl flex items-center justify-center gap-x-4 dark:border-none bg-white dark:bg-gray-900 sm:min-h-[220px] md:min-h-[180px] lg:min-h-min" data-v-a75d3b4d><img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2253%22%20height%3D%2258%22%20viewBox%3D%220%200%2053%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2613_3853)%22%3E%0A%3Cpath%20d%3D%22M51.1519%2039.8821C51.154%2039.9844%2051.1527%2040.0863%2051.148%2040.1877C51.0782%2041.7091%2050.2566%2043.1165%2048.9325%2043.9357L29.0918%2056.2117C27.6504%2057.1035%2025.8212%2057.1564%2024.3387%2056.3439L3.85107%2045.1148C2.27157%2044.2491%201.14238%2042.6366%201.15291%2041.0494L1.15293%2041.0427L1.153%2018.552C1.15301%2018.5509%201.15302%2018.5499%201.15302%2018.5488C1.16485%2016.9324%202.02611%2015.4289%203.43319%2014.5869L3.43322%2014.587L3.44269%2014.5812L22.9844%202.59084C24.4169%201.73583%2026.2139%201.69824%2027.6729%202.49791L27.6729%202.49792L27.6784%202.50094L48.6303%2013.8121C48.6313%2013.8126%2048.6322%2013.8131%2048.6331%2013.8136C50.0797%2014.6078%2050.9898%2016.1132%2051.026%2017.7438L51.1517%2039.8672L51.1517%2039.8746L51.1519%2039.8821Z%22%20fill%3D%22white%22%20stroke%3D%22url(%23paint0_linear_2613_3853)%22%20stroke-width%3D%222%22%2F%3E%0A%3Cpath%20d%3D%22M33.8193%2042.2552H17.8193C16.7585%2042.2552%2015.7411%2041.8337%2014.9909%2041.0836C14.2408%2040.3334%2013.8193%2039.316%2013.8193%2038.2552V24.9218C13.8193%2023.861%2014.2408%2022.8435%2014.9909%2022.0934C15.7411%2021.3433%2016.7585%2020.9218%2017.8193%2020.9218H19.1527C19.1751%2019.792%2019.5558%2018.6985%2020.2399%2017.7991C20.924%2016.8996%2021.8761%2016.2407%2022.9589%2015.9173C24.0416%2015.594%2025.1992%2015.6229%2026.2644%2016C27.3297%2016.377%2028.2477%2017.0827%2028.886%2018.0152C29.4839%2018.8674%2029.8094%2019.8808%2029.8193%2020.9218H33.8193C34.173%2020.9218%2034.5121%2021.0623%2034.7621%2021.3124C35.0122%2021.5624%2035.1527%2021.9015%2035.1527%2022.2552V26.2552C36.2825%2026.2776%2037.376%2026.6583%2038.2754%2027.3424C39.1749%2028.0265%2039.8338%2028.9786%2040.1572%2030.0613C40.4805%2031.1441%2040.4516%2032.3016%2040.0745%2033.3669C39.6975%2034.4322%2038.9918%2035.3502%2038.0593%2035.9885C37.2071%2036.5864%2036.1937%2036.9118%2035.1527%2036.9218V36.9218V40.9218C35.1527%2041.2755%2035.0122%2041.6146%2034.7621%2041.8646C34.5121%2042.1147%2034.173%2042.2552%2033.8193%2042.2552ZM17.8193%2023.5885C17.4657%2023.5885%2017.1266%2023.729%2016.8765%2023.979C16.6265%2024.2291%2016.486%2024.5682%2016.486%2024.9218V38.2552C16.486%2038.6088%2016.6265%2038.9479%2016.8765%2039.198C17.1266%2039.448%2017.4657%2039.5885%2017.8193%2039.5885H32.486V35.3485C32.4849%2035.1347%2032.5351%2034.9238%2032.6326%2034.7335C32.7301%2034.5432%2032.8718%2034.3792%2033.046%2034.2552C33.2196%2034.1313%2033.4204%2034.051%2033.6316%2034.0208C33.8427%2033.9907%2034.058%2034.0116%2034.2593%2034.0818C34.6393%2034.2368%2035.0532%2034.2901%2035.46%2034.2363C35.8669%2034.1825%2036.2527%2034.0236%2036.5793%2033.7752C36.9045%2033.5769%2037.1834%2033.3113%2037.3973%2032.9962C37.6111%2032.6811%2037.7551%2032.3239%2037.8193%2031.9485C37.8708%2031.5699%2037.8402%2031.1847%2037.7298%2030.8189C37.6194%2030.4532%2037.4317%2030.1154%2037.1793%2029.8285C36.8381%2029.414%2036.3734%2029.1193%2035.8529%2028.9874C35.3325%2028.8555%2034.7835%2028.8932%2034.286%2029.0952C34.0846%2029.1654%2033.8694%2029.1863%2033.6582%2029.1562C33.4471%2029.126%2033.2463%2029.0457%2033.0727%2028.9218C32.8985%2028.7978%2032.7567%2028.6338%2032.6593%2028.4435C32.5618%2028.2532%2032.5115%2028.0423%2032.5127%2027.8285V23.5885H28.246C28.0269%2023.6009%2027.8081%2023.559%2027.609%2023.4666C27.4099%2023.3742%2027.2368%2023.234%2027.1049%2023.0586C26.973%2022.8832%2026.8864%2022.6779%2026.8529%2022.461C26.8194%2022.2441%2026.8399%2022.0222%2026.9127%2021.8152C27.0677%2021.4352%2027.1209%2021.0213%2027.0671%2020.6145C27.0134%2020.2076%2026.8544%2019.8218%2026.606%2019.4952C26.4091%2019.1607%2026.1395%2018.8749%2025.8172%2018.6588C25.4948%2018.4427%2025.128%2018.3019%2024.7438%2018.2468C24.3597%2018.1917%2023.9681%2018.2238%2023.598%2018.3407C23.2279%2018.4575%2022.8889%2018.6561%2022.606%2018.9218C22.3433%2019.1824%2022.1377%2019.4948%2022.0023%2019.8391C21.8668%2020.1834%2021.8045%2020.5521%2021.8193%2020.9218C21.8224%2021.2277%2021.8812%2021.5304%2021.9927%2021.8152C22.0632%2022.0168%2022.0842%2022.2324%2022.054%2022.4438C22.0237%2022.6553%2021.9432%2022.8564%2021.819%2023.0302C21.6949%2023.204%2021.5308%2023.3454%2021.3406%2023.4426C21.1504%2023.5397%2020.9396%2023.5898%2020.726%2023.5885H17.8193Z%22%20fill%3D%22url(%23paint1_linear_2613_3853)%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2613_3853%22%20x1%3D%220.662695%22%20y1%3D%2218.4025%22%20x2%3D%2251.7209%22%20y2%3D%2244.2212%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23F7D14C%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23A38108%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2613_3853%22%20x1%3D%2213.7453%22%20y1%3D%2221.3705%22%20x2%3D%2240.3876%22%20y2%3D%2235.7024%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23F7D14C%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23A38108%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3CclipPath%20id%3D%22clip0_2613_3853%22%3E%0A%3Crect%20width%3D%2252%22%20height%3D%2257%22%20fill%3D%22white%22%20transform%3D%22translate(0.152832%200.920898)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="modules icon" class="modules-image-color-light" data-v-a75d3b4d> <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2253%22%20height%3D%2258%22%20viewBox%3D%220%200%2053%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.43319%2014.5869L3.43322%2014.587L3.44269%2014.5812L22.9844%202.59084C24.4246%201.73116%2026.2124%201.69742%2027.6729%202.49791L27.6729%202.49792L27.6784%202.50094L48.6303%2013.8121C48.6313%2013.8126%2048.6322%2013.8131%2048.6331%2013.8137C50.0812%2014.6086%2050.9896%2016.1043%2051.026%2017.7437L51.1517%2039.8672L51.1517%2039.8746L51.1519%2039.8821C51.1856%2041.5204%2050.346%2043.0611%2048.9325%2043.9357L29.0918%2056.2117C27.6424%2057.1085%2025.8227%2057.1572%2024.3387%2056.3439L3.85107%2045.1148C2.26984%2044.2481%201.14232%2042.646%201.15293%2041.0494V41.0427L1.153%2018.552C1.15301%2018.5509%201.15302%2018.5499%201.15302%2018.5488C1.16485%2016.9324%202.02611%2015.4289%203.43319%2014.5869Z%22%20fill%3D%22%2318181B%22%20stroke%3D%22url(%23paint0_linear_2595_7337)%22%20stroke-width%3D%222%22%2F%3E%0A%3Cpath%20d%3D%22M33.8193%2042.2542H17.8193C16.7585%2042.2542%2015.7411%2041.8328%2014.9909%2041.0826C14.2408%2040.3325%2013.8193%2039.3151%2013.8193%2038.2542V24.9209C13.8193%2023.86%2014.2408%2022.8426%2014.9909%2022.0924C15.7411%2021.3423%2016.7585%2020.9209%2017.8193%2020.9209H19.1527C19.1751%2019.791%2019.5558%2018.6975%2020.2399%2017.7981C20.924%2016.8986%2021.8761%2016.2397%2022.9589%2015.9164C24.0416%2015.593%2025.1992%2015.6219%2026.2644%2015.999C27.3297%2016.376%2028.2477%2017.0817%2028.886%2018.0142C29.4839%2018.8664%2029.8094%2019.8799%2029.8193%2020.9209H33.8193C34.173%2020.9209%2034.5121%2021.0613%2034.7621%2021.3114C35.0122%2021.5614%2035.1527%2021.9006%2035.1527%2022.2542V26.2542C36.2825%2026.2766%2037.376%2026.6573%2038.2754%2027.3414C39.1749%2028.0255%2039.8338%2028.9776%2040.1572%2030.0604C40.4805%2031.1432%2040.4516%2032.3007%2040.0745%2033.366C39.6975%2034.4312%2038.9918%2035.3492%2038.0593%2035.9875C37.2071%2036.5854%2036.1937%2036.9109%2035.1527%2036.9209V40.9209C35.1527%2041.2745%2035.0122%2041.6136%2034.7621%2041.8637C34.5121%2042.1137%2034.173%2042.2542%2033.8193%2042.2542ZM17.8193%2023.5875C17.4657%2023.5875%2017.1266%2023.728%2016.8765%2023.978C16.6265%2024.2281%2016.486%2024.5672%2016.486%2024.9209V38.2542C16.486%2038.6078%2016.6265%2038.9469%2016.8765%2039.197C17.1266%2039.447%2017.4657%2039.5875%2017.8193%2039.5875H32.486V35.3475C32.4849%2035.1337%2032.5351%2034.9228%2032.6326%2034.7325C32.7301%2034.5422%2032.8718%2034.3782%2033.046%2034.2542C33.2196%2034.1304%2033.4205%2034.05%2033.6316%2034.0198C33.8427%2033.9897%2034.058%2034.0106%2034.2593%2034.0809C34.6393%2034.2359%2035.0532%2034.2891%2035.46%2034.2353C35.8669%2034.1816%2036.2527%2034.0226%2036.5793%2033.7742C36.9045%2033.5759%2037.1834%2033.3103%2037.3973%2032.9952C37.6111%2032.6801%2037.7551%2032.3229%2037.8193%2031.9475C37.8708%2031.5689%2037.8402%2031.1837%2037.7298%2030.8179C37.6194%2030.4522%2037.4317%2030.1144%2037.1793%2029.8275C36.8381%2029.413%2036.3734%2029.1183%2035.8529%2028.9864C35.3325%2028.8545%2034.7835%2028.8923%2034.286%2029.0942C34.0846%2029.1644%2033.8694%2029.1854%2033.6582%2029.1552C33.4471%2029.125%2033.2463%2029.0447%2033.0727%2028.9209C32.8985%2028.7969%2032.7567%2028.6328%2032.6593%2028.4425C32.5618%2028.2522%2032.5115%2028.0413%2032.5127%2027.8275V23.5875H28.246C28.0269%2023.5999%2027.8081%2023.5581%2027.609%2023.4656C27.4099%2023.3732%2027.2368%2023.233%2027.1049%2023.0576C26.973%2022.8822%2026.8864%2022.6769%2026.8529%2022.46C26.8194%2022.2431%2026.8399%2022.0213%2026.9127%2021.8142C27.0677%2021.4342%2027.1209%2021.0204%2027.0671%2020.6135C27.0134%2020.2066%2026.8544%2019.8208%2026.606%2019.4942C26.4091%2019.1597%2026.1395%2018.8739%2025.8172%2018.6578C25.4948%2018.4417%2025.128%2018.3009%2024.7438%2018.2458C24.3597%2018.1908%2023.9681%2018.2228%2023.598%2018.3397C23.2279%2018.4565%2022.8889%2018.6552%2022.606%2018.9209C22.3433%2019.1814%2022.1377%2019.4938%2022.0023%2019.8381C21.8668%2020.1824%2021.8045%2020.5512%2021.8193%2020.9209C21.8224%2021.2267%2021.8812%2021.5294%2021.9927%2021.8142C22.0632%2022.0158%2022.0842%2022.2314%2022.054%2022.4429C22.0237%2022.6543%2021.9432%2022.8554%2021.819%2023.0292C21.6949%2023.203%2021.5308%2023.3444%2021.3406%2023.4416C21.1504%2023.5388%2020.9396%2023.5888%2020.726%2023.5875H17.8193Z%22%20fill%3D%22url(%23paint1_linear_2595_7337)%22%2F%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2595_7337%22%20x1%3D%220.662695%22%20y1%3D%2218.4025%22%20x2%3D%2251.7209%22%20y2%3D%2244.2212%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23F7D14C%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23A38108%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2595_7337%22%20x1%3D%2213.7453%22%20y1%3D%2221.3695%22%20x2%3D%2240.3876%22%20y2%3D%2235.7015%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23F7D14C%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23A38108%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="modules icon" class="modules-image-color-dark" data-v-a75d3b4d> <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2253%22%20height%3D%2258%22%20viewBox%3D%220%200%2053%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2691_4389)%22%3E%0A%3Cpath%20d%3D%22M51.1519%2039.8821C51.154%2039.9844%2051.1527%2040.0863%2051.148%2040.1877C51.0782%2041.7091%2050.2566%2043.1165%2048.9325%2043.9357L29.0918%2056.2117C27.6504%2057.1035%2025.8212%2057.1564%2024.3387%2056.3439L3.85107%2045.1148C2.27157%2044.2491%201.14238%2042.6366%201.15291%2041.0494L1.15293%2041.0427L1.153%2018.552C1.15301%2018.5509%201.15302%2018.5499%201.15302%2018.5488C1.16485%2016.9324%202.02611%2015.4289%203.43319%2014.5869L3.43322%2014.587L3.44269%2014.5812L22.9844%202.59084C24.4169%201.73583%2026.2139%201.69824%2027.6729%202.49791L27.6729%202.49792L27.6784%202.50094L48.6303%2013.8121C48.6313%2013.8126%2048.6322%2013.8131%2048.6331%2013.8136C50.0797%2014.6078%2050.9898%2016.1132%2051.026%2017.7438L51.1517%2039.8672L51.1517%2039.8746L51.1519%2039.8821Z%22%20fill%3D%22white%22%20stroke%3D%22url(%23paint0_linear_2691_4389)%22%20stroke-width%3D%222%22%2F%3E%0A%3Cpath%20d%3D%22M33.8193%2042.2542H17.8193C16.7585%2042.2542%2015.7411%2041.8328%2014.9909%2041.0826C14.2408%2040.3325%2013.8193%2039.3151%2013.8193%2038.2542V24.9209C13.8193%2023.86%2014.2408%2022.8426%2014.9909%2022.0924C15.7411%2021.3423%2016.7585%2020.9209%2017.8193%2020.9209H19.1527C19.1751%2019.791%2019.5558%2018.6975%2020.2399%2017.7981C20.924%2016.8986%2021.8761%2016.2397%2022.9589%2015.9164C24.0416%2015.593%2025.1992%2015.6219%2026.2644%2015.999C27.3297%2016.376%2028.2477%2017.0817%2028.886%2018.0142C29.4839%2018.8664%2029.8094%2019.8799%2029.8193%2020.9209H33.8193C34.173%2020.9209%2034.5121%2021.0613%2034.7621%2021.3114C35.0122%2021.5614%2035.1527%2021.9006%2035.1527%2022.2542V26.2542C36.2825%2026.2766%2037.376%2026.6573%2038.2754%2027.3414C39.1749%2028.0255%2039.8338%2028.9776%2040.1572%2030.0604C40.4805%2031.1432%2040.4516%2032.3007%2040.0745%2033.366C39.6975%2034.4312%2038.9918%2035.3492%2038.0593%2035.9875C37.2071%2036.5854%2036.1937%2036.9109%2035.1527%2036.9209V36.9209V40.9209C35.1527%2041.2745%2035.0122%2041.6136%2034.7621%2041.8637C34.5121%2042.1137%2034.173%2042.2542%2033.8193%2042.2542ZM17.8193%2023.5875C17.4657%2023.5875%2017.1266%2023.728%2016.8765%2023.978C16.6265%2024.2281%2016.486%2024.5672%2016.486%2024.9209V38.2542C16.486%2038.6078%2016.6265%2038.9469%2016.8765%2039.197C17.1266%2039.447%2017.4657%2039.5875%2017.8193%2039.5875H32.486V35.3475C32.4849%2035.1337%2032.5351%2034.9228%2032.6326%2034.7325C32.7301%2034.5422%2032.8718%2034.3782%2033.046%2034.2542C33.2196%2034.1304%2033.4204%2034.05%2033.6316%2034.0198C33.8427%2033.9897%2034.058%2034.0106%2034.2593%2034.0809C34.6393%2034.2359%2035.0532%2034.2891%2035.46%2034.2353C35.8669%2034.1816%2036.2527%2034.0226%2036.5793%2033.7742C36.9045%2033.5759%2037.1834%2033.3103%2037.3973%2032.9952C37.6111%2032.6801%2037.7551%2032.3229%2037.8193%2031.9475C37.8708%2031.5689%2037.8402%2031.1837%2037.7298%2030.8179C37.6194%2030.4522%2037.4317%2030.1144%2037.1793%2029.8275C36.8381%2029.413%2036.3734%2029.1183%2035.8529%2028.9864C35.3325%2028.8545%2034.7835%2028.8923%2034.286%2029.0942C34.0846%2029.1644%2033.8694%2029.1854%2033.6582%2029.1552C33.4471%2029.125%2033.2463%2029.0447%2033.0727%2028.9209C32.8985%2028.7969%2032.7567%2028.6328%2032.6593%2028.4425C32.5618%2028.2522%2032.5115%2028.0413%2032.5127%2027.8275V23.5875H28.246C28.0269%2023.5999%2027.8081%2023.5581%2027.609%2023.4656C27.4099%2023.3732%2027.2368%2023.233%2027.1049%2023.0576C26.973%2022.8822%2026.8864%2022.6769%2026.8529%2022.46C26.8194%2022.2431%2026.8399%2022.0213%2026.9127%2021.8142C27.0677%2021.4342%2027.1209%2021.0204%2027.0671%2020.6135C27.0134%2020.2066%2026.8544%2019.8208%2026.606%2019.4942C26.4091%2019.1597%2026.1395%2018.8739%2025.8172%2018.6578C25.4948%2018.4417%2025.128%2018.3009%2024.7438%2018.2458C24.3597%2018.1908%2023.9681%2018.2228%2023.598%2018.3397C23.2279%2018.4565%2022.8889%2018.6552%2022.606%2018.9209C22.3433%2019.1814%2022.1377%2019.4938%2022.0023%2019.8381C21.8668%2020.1824%2021.8045%2020.5512%2021.8193%2020.9209C21.8224%2021.2267%2021.8812%2021.5294%2021.9927%2021.8142C22.0632%2022.0158%2022.0842%2022.2314%2022.054%2022.4429C22.0237%2022.6543%2021.9432%2022.8554%2021.819%2023.0292C21.6949%2023.203%2021.5308%2023.3444%2021.3406%2023.4416C21.1504%2023.5388%2020.9396%2023.5888%2020.726%2023.5875H17.8193Z%22%20fill%3D%22url(%23paint1_linear_2691_4389)%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2691_4389%22%20x1%3D%220.662695%22%20y1%3D%2218.4025%22%20x2%3D%2251.7209%22%20y2%3D%2244.2212%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23D4D4D8%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2371717A%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2691_4389%22%20x1%3D%2213.7453%22%20y1%3D%2221.3695%22%20x2%3D%2240.3876%22%20y2%3D%2235.7015%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23D4D4D8%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2371717A%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3CclipPath%20id%3D%22clip0_2691_4389%22%3E%0A%3Crect%20width%3D%2252%22%20height%3D%2257%22%20fill%3D%22white%22%20transform%3D%22translate(0.152832%200.920898)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="modules icon" class="modules-image-light" data-v-a75d3b4d> <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2253%22%20height%3D%2258%22%20viewBox%3D%220%200%2053%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.43319%2014.5869L3.43322%2014.587L3.44269%2014.5812L22.9844%202.59084C24.4246%201.73116%2026.2124%201.69742%2027.6729%202.49791L27.6729%202.49792L27.6784%202.50094L48.6303%2013.8121C48.6313%2013.8126%2048.6322%2013.8131%2048.6331%2013.8137C50.0812%2014.6086%2050.9896%2016.1043%2051.026%2017.7437L51.1517%2039.8672L51.1517%2039.8746L51.1519%2039.8821C51.1856%2041.5203%2050.346%2043.0611%2048.9325%2043.9357L29.0918%2056.2117C27.6424%2057.1085%2025.8227%2057.1572%2024.3387%2056.3439L3.85107%2045.1148C2.26984%2044.2481%201.14232%2042.646%201.15293%2041.0494V41.0427L1.153%2018.552C1.15301%2018.5509%201.15302%2018.5499%201.15302%2018.5488C1.16485%2016.9324%202.02611%2015.4289%203.43319%2014.5869Z%22%20fill%3D%22%2318181B%22%20stroke%3D%22url(%23paint0_linear_2595_7175)%22%20stroke-width%3D%222%22%2F%3E%0A%3Cpath%20d%3D%22M33.8193%2042.2542H17.8193C16.7585%2042.2542%2015.7411%2041.8328%2014.9909%2041.0826C14.2408%2040.3325%2013.8193%2039.3151%2013.8193%2038.2542V24.9209C13.8193%2023.86%2014.2408%2022.8426%2014.9909%2022.0924C15.7411%2021.3423%2016.7585%2020.9209%2017.8193%2020.9209H19.1527C19.1751%2019.791%2019.5558%2018.6975%2020.2399%2017.7981C20.924%2016.8986%2021.8761%2016.2397%2022.9589%2015.9164C24.0416%2015.593%2025.1992%2015.6219%2026.2644%2015.999C27.3297%2016.376%2028.2477%2017.0817%2028.886%2018.0142C29.4839%2018.8664%2029.8094%2019.8799%2029.8193%2020.9209H33.8193C34.173%2020.9209%2034.5121%2021.0613%2034.7621%2021.3114C35.0122%2021.5614%2035.1527%2021.9006%2035.1527%2022.2542V26.2542C36.2825%2026.2766%2037.376%2026.6573%2038.2754%2027.3414C39.1749%2028.0255%2039.8338%2028.9776%2040.1572%2030.0604C40.4805%2031.1432%2040.4516%2032.3007%2040.0745%2033.366C39.6975%2034.4312%2038.9918%2035.3492%2038.0593%2035.9875C37.2071%2036.5854%2036.1937%2036.9109%2035.1527%2036.9209V40.9209C35.1527%2041.2745%2035.0122%2041.6136%2034.7621%2041.8637C34.5121%2042.1137%2034.173%2042.2542%2033.8193%2042.2542ZM17.8193%2023.5875C17.4657%2023.5875%2017.1266%2023.728%2016.8765%2023.978C16.6265%2024.2281%2016.486%2024.5672%2016.486%2024.9209V38.2542C16.486%2038.6078%2016.6265%2038.9469%2016.8765%2039.197C17.1266%2039.447%2017.4657%2039.5875%2017.8193%2039.5875H32.486V35.3475C32.4849%2035.1337%2032.5351%2034.9228%2032.6326%2034.7325C32.7301%2034.5422%2032.8718%2034.3782%2033.046%2034.2542C33.2196%2034.1304%2033.4205%2034.05%2033.6316%2034.0198C33.8427%2033.9897%2034.058%2034.0106%2034.2593%2034.0809C34.6393%2034.2359%2035.0532%2034.2891%2035.46%2034.2353C35.8669%2034.1816%2036.2527%2034.0226%2036.5793%2033.7742C36.9045%2033.5759%2037.1834%2033.3103%2037.3973%2032.9952C37.6111%2032.6801%2037.7551%2032.3229%2037.8193%2031.9475C37.8708%2031.5689%2037.8402%2031.1837%2037.7298%2030.8179C37.6194%2030.4522%2037.4317%2030.1144%2037.1793%2029.8275C36.8381%2029.413%2036.3734%2029.1183%2035.8529%2028.9864C35.3325%2028.8545%2034.7835%2028.8923%2034.286%2029.0942C34.0846%2029.1644%2033.8694%2029.1854%2033.6582%2029.1552C33.4471%2029.125%2033.2463%2029.0447%2033.0727%2028.9209C32.8985%2028.7969%2032.7567%2028.6328%2032.6593%2028.4425C32.5618%2028.2522%2032.5115%2028.0413%2032.5127%2027.8275V23.5875H28.246C28.0269%2023.5999%2027.8081%2023.5581%2027.609%2023.4656C27.4099%2023.3732%2027.2368%2023.233%2027.1049%2023.0576C26.973%2022.8822%2026.8864%2022.6769%2026.8529%2022.46C26.8194%2022.2431%2026.8399%2022.0213%2026.9127%2021.8142C27.0677%2021.4342%2027.1209%2021.0204%2027.0671%2020.6135C27.0134%2020.2066%2026.8544%2019.8208%2026.606%2019.4942C26.4091%2019.1597%2026.1395%2018.8739%2025.8172%2018.6578C25.4948%2018.4417%2025.128%2018.3009%2024.7438%2018.2458C24.3597%2018.1908%2023.9681%2018.2228%2023.598%2018.3397C23.2279%2018.4565%2022.8889%2018.6552%2022.606%2018.9209C22.3433%2019.1814%2022.1377%2019.4938%2022.0023%2019.8381C21.8668%2020.1824%2021.8045%2020.5512%2021.8193%2020.9209C21.8224%2021.2267%2021.8812%2021.5294%2021.9927%2021.8142C22.0632%2022.0158%2022.0842%2022.2314%2022.054%2022.4429C22.0237%2022.6543%2021.9432%2022.8554%2021.819%2023.0292C21.6949%2023.203%2021.5308%2023.3444%2021.3406%2023.4416C21.1504%2023.5388%2020.9396%2023.5888%2020.726%2023.5875H17.8193Z%22%20fill%3D%22url(%23paint1_linear_2595_7175)%22%2F%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2595_7175%22%20x1%3D%220.662695%22%20y1%3D%2218.4025%22%20x2%3D%2251.7209%22%20y2%3D%2244.2212%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2371717A%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2595_7175%22%20x1%3D%2213.7453%22%20y1%3D%2221.3695%22%20x2%3D%2240.3876%22%20y2%3D%2235.7015%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2371717A%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="modules icon" class="modules-image-dark" data-v-a75d3b4d><div class="flex flex-col space-y text-black dark:text-white" data-v-a75d3b4d><h3 class="font-semibold text-xl" data-v-a75d3b4d>Modules</h3><p class="text-gray-700 dark:text-gray-300" data-v-a75d3b4d>Discover our list of modules to supercharge your Nuxt project. Created by the Nuxt team and community.</p></div></a></div><div class="row-span-2 col-span-2 order-last lg:order-none lg:col-span-4 text-black dark:text-white documentation-container rounded-xl relative items-center justify-center border border-gray-200 dark:border-transparent hover:border-transparent" data-v-a75d3b4d><div class="gradient-border gradient-border-square gradient-border-documentation" data-v-a75d3b4d></div><a href="https://nuxt.com/docs" target="_blank" class="rounded-xl flex lg:flex-col items-center justify-center gap-y-4 bg-white dark:bg-gray-900" data-v-a75d3b4d><div class="py-6 lg:py-7 px-5 rounded-xl flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-y-2" data-v-a75d3b4d><div class="flex flex-col space-y text-black dark:text-white" data-v-a75d3b4d><h3 class="font-semibold text-xl" data-v-a75d3b4d>Documentation</h3><p class="text-gray-700 dark:text-gray-300" data-v-a75d3b4d>We highly recommend you take a look at the Nuxt documentation to level up.</p></div><img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22342%22%20height%3D%22165%22%20viewBox%3D%220%200%20342%20165%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2687_3947)%22%3E%0A%3Cpath%20d%3D%22M0.152832%20131.851H154.28%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M215.399%20107.359H349.153%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M0.152832%2077.2178L116.191%2077.2178%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M36.1528%20106.921L152.191%20106.921%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M202.153%2042.9209L317.305%2042.9209%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M218.153%2076.9209L345.305%2076.9209%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M285.947%208.45605V166.979%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M252.602%2016.8311V107.36%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M171.153%2016.9209V107.45%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M218.153%2016.9209V43.4501%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M122.153%2016.9211L327.45%2016.9209%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M1.92432%2043.3086H148.163%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M122.392%2016.4209V55.3659%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M36.084%200.920898L36.084%20176.921%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M75.4448%2043.249V175.152%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Ccircle%20opacity%3D%220.7%22%20cx%3D%2275.4448%22%20cy%3D%2277.2178%22%20r%3D%223.5%22%20fill%3D%22%2300DC82%22%2F%3E%0A%3Ccircle%20opacity%3D%220.7%22%20cx%3D%2236.1528%22%20cy%3D%22131.85%22%20r%3D%223.5%22%20fill%3D%22%2300DC82%22%2F%3E%0A%3Ccircle%20opacity%3D%220.7%22%20cx%3D%22285.947%22%20cy%3D%2242.9209%22%20r%3D%223.5%22%20fill%3D%22%2300DC82%22%2F%3E%0A%3Ccircle%20opacity%3D%220.7%22%20cx%3D%22252.602%22%20cy%3D%22107.359%22%20r%3D%223.5%22%20fill%3D%22%2300DC82%22%2F%3E%0A%3Cg%20filter%3D%22url(%23filter0_d_2687_3947)%22%3E%0A%3Cpath%20d%3D%22M122.846%2050.7109L163.067%2026.0929C166.656%2023.9507%20171.117%2023.8611%20174.77%2025.8579L217.894%2049.0819C221.524%2051.0665%20223.807%2054.8133%20223.892%2058.9246L224.15%20104.352C224.235%20108.448%20222.13%20112.287%20218.609%20114.46L177.783%20139.658C174.174%20141.886%20169.638%20142.011%20165.931%20139.984L123.774%20116.935C120.045%20114.896%20117.125%20111.001%20117.153%20106.776L117.153%2060.5974C117.18%2056.5529%20119.338%2052.8048%20122.846%2050.7109Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M222.151%20104.393C222.22%20107.764%20220.487%20110.944%20217.571%20112.75C217.567%20112.753%20217.563%20112.755%20217.559%20112.758L176.733%20137.956C173.748%20139.798%20169.96%20139.907%20166.89%20138.229L124.733%20115.18C121.469%20113.395%20119.131%20110.069%20119.153%20106.79L119.153%20106.776L119.153%2060.6107C119.153%2060.6086%20119.153%2060.6065%20119.153%2060.6044C119.178%2057.2703%20120.958%2054.1669%20123.871%2052.4282L123.881%2052.4225L123.89%2052.4167L164.101%2027.8047C164.101%2027.8047%20164.101%2027.8047%20164.101%2027.8047C164.106%2027.8022%20164.11%2027.7997%20164.114%2027.7972C167.078%2026.0385%20170.793%2025.9632%20173.81%2027.6128L173.81%2027.6128L173.821%2027.6188L216.934%2050.8367C216.936%2050.8377%20216.938%2050.8387%20216.94%2050.8397C219.935%2052.4801%20221.817%2055.5878%20221.892%2058.9515L222.15%20104.363L222.15%20104.378L222.151%20104.393Z%22%20stroke%3D%22url(%23paint0_linear_2687_3947)%22%20stroke-width%3D%224%22%2F%3E%0A%3C%2Fg%3E%0A%3Cpath%20d%3D%22M192.349%2096.9158L190.63%2090.5186L183.778%2064.9088C183.55%2064.0605%20182.994%2063.3375%20182.233%2062.8988C181.472%2062.4601%20180.568%2062.3416%20179.72%2062.5693L173.323%2064.2877L173.116%2064.3498C172.807%2063.945%20172.409%2063.6168%20171.953%2063.3906C171.497%2063.1644%20170.995%2063.0463%20170.486%2063.0455H163.861C163.279%2063.0471%20162.707%2063.2043%20162.205%2063.501C161.703%2063.2043%20161.132%2063.0471%20160.549%2063.0455H153.924C153.045%2063.0455%20152.203%2063.3945%20151.582%2064.0157C150.96%2064.6369%20150.611%2065.4795%20150.611%2066.358V99.483C150.611%20100.362%20150.96%20101.204%20151.582%20101.825C152.203%20102.447%20153.045%20102.796%20153.924%20102.796H160.549C161.132%20102.794%20161.703%20102.637%20162.205%20102.34C162.707%20102.637%20163.279%20102.794%20163.861%20102.796H170.486C171.365%20102.796%20172.207%20102.447%20172.829%20101.825C173.45%20101.204%20173.799%20100.362%20173.799%2099.483V78.8627L177.836%2093.9346L179.554%20100.332C179.742%20101.039%20180.158%20101.665%20180.739%20102.11C181.32%20102.556%20182.031%20102.797%20182.763%20102.796C183.049%20102.791%20183.334%20102.756%20183.612%20102.692L190.009%20100.974C190.43%20100.861%20190.824%20100.665%20191.169%20100.399C191.514%20100.132%20191.802%2099.7997%20192.018%2099.4209C192.238%2099.047%20192.381%2098.6325%20192.438%2098.2021C192.495%2097.7717%20192.465%2097.3342%20192.349%2096.9158V96.9158ZM176.325%2075.4881L182.722%2073.7697L187.007%2089.7732L180.61%2091.4916L176.325%2075.4881ZM180.569%2065.7783L181.873%2070.5607L175.476%2072.2791L174.171%2067.4967L180.569%2065.7783ZM170.486%2066.358V91.2018H163.861V66.358H170.486ZM160.549%2066.358V71.3268H153.924V66.358H160.549ZM153.924%2099.483V74.6393H160.549V99.483H153.924ZM170.486%2099.483H163.861V94.5143H170.486V99.483ZM189.161%2097.7646L182.763%2099.483L181.459%2094.6799L187.877%2092.9615L189.161%2097.7646V97.7646Z%22%20fill%3D%22url(%23paint1_linear_2687_3947)%22%2F%3E%0A%3Crect%20x%3D%222.15283%22%20y%3D%22-3.0791%22%20width%3D%22327%22%20height%3D%2223%22%20fill%3D%22url(%23paint2_linear_2687_3947)%22%2F%3E%0A%3Crect%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22matrix(1%200%200%20-1%202.15283%20166.921)%22%20fill%3D%22url(%23paint3_linear_2687_3947)%22%2F%3E%0A%3Crect%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22matrix(0%201%201%200%200.152832%20-17.0791)%22%20fill%3D%22url(%23paint4_linear_2687_3947)%22%2F%3E%0A%3Crect%20x%3D%22342.153%22%20y%3D%22-17.0791%22%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22rotate(90%20342.153%20-17.0791)%22%20fill%3D%22url(%23paint5_linear_2687_3947)%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_d_2687_3947%22%20x%3D%2286.1528%22%20y%3D%22-6.5791%22%20width%3D%22169%22%20height%3D%22179%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%0A%3CfeOffset%2F%3E%0A%3CfeGaussianBlur%20stdDeviation%3D%2215.5%22%2F%3E%0A%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%0A%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%200%200%200%200%201%200%200%200%200%201%200%200%200%200.07%200%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_2687_3947%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_2687_3947%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2687_3947%22%20x1%3D%22118.202%22%20y1%3D%2260.3042%22%20x2%3D%22223.159%22%20y2%3D%22113.509%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2300DC82%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23003F25%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2687_3947%22%20x1%3D%22150.495%22%20y1%3D%2271.0767%22%20x2%3D%22191.769%22%20y2%3D%2294.1139%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2300DC82%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23003F25%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint2_linear_2687_3947%22%20x1%3D%22165.653%22%20y1%3D%22-3.0791%22%20x2%3D%22166.153%22%20y2%3D%2219.9209%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint3_linear_2687_3947%22%20x1%3D%22163.5%22%20y1%3D%22-2.30278e-07%22%20x2%3D%22164.091%22%20y2%3D%2224.9979%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint4_linear_2687_3947%22%20x1%3D%22163.5%22%20y1%3D%22-2.30278e-07%22%20x2%3D%22164.091%22%20y2%3D%2224.9979%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint5_linear_2687_3947%22%20x1%3D%22505.653%22%20y1%3D%22-17.0791%22%20x2%3D%22506.244%22%20y2%3D%227.91876%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3CclipPath%20id%3D%22clip0_2687_3947%22%3E%0A%3Crect%20width%3D%22341%22%20height%3D%22164%22%20fill%3D%22white%22%20transform%3D%22translate(0.152832%200.920898)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="documentation icon" class="documentation-image-color-light h-32 sm:h-34" data-v-a75d3b4d> <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22342%22%20height%3D%22165%22%20viewBox%3D%220%200%20342%20165%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2595_7273)%22%3E%0A%3Cpath%20d%3D%22M0.152832%20131.851H154.28%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M215.399%20107.359H349.153%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M0.152832%2077.2178L116.191%2077.2178%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M36.1528%20106.921L152.191%20106.921%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M202.153%2042.9209L317.305%2042.9209%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M218.153%2076.9209L345.305%2076.9209%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M285.947%208.45605V166.979%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M252.602%2016.8311V107.36%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M171.153%2016.9209V107.45%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M218.153%2016.9209V43.4501%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M122.153%2016.9211L327.45%2016.9209%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M1.92432%2043.3086H148.163%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M122.392%2016.4209V55.3659%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M36.084%200.920898L36.084%20176.921%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M75.4448%2043.249V175.152%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Ccircle%20opacity%3D%220.14%22%20cx%3D%2275.4448%22%20cy%3D%2277.2178%22%20r%3D%223.5%22%20fill%3D%22%2300DC82%22%2F%3E%0A%3Ccircle%20opacity%3D%220.14%22%20cx%3D%2236.1528%22%20cy%3D%22131.85%22%20r%3D%223.5%22%20fill%3D%22%2300DC82%22%2F%3E%0A%3Ccircle%20opacity%3D%220.14%22%20cx%3D%22285.947%22%20cy%3D%2242.9209%22%20r%3D%223.5%22%20fill%3D%22%2300DC82%22%2F%3E%0A%3Ccircle%20opacity%3D%220.14%22%20cx%3D%22252.602%22%20cy%3D%22107.359%22%20r%3D%223.5%22%20fill%3D%22%2300DC82%22%2F%3E%0A%3Cg%20filter%3D%22url(%23filter0_d_2595_7273)%22%3E%0A%3Cpath%20d%3D%22M122.846%2050.7109L163.067%2026.0929C166.656%2023.9507%20171.117%2023.8611%20174.77%2025.8579L217.894%2049.0819C221.524%2051.0665%20223.807%2054.8133%20223.892%2058.9246L224.15%20104.352C224.235%20108.448%20222.13%20112.287%20218.609%20114.46L177.783%20139.658C174.174%20141.886%20169.638%20142.011%20165.931%20139.984L123.774%20116.935C120.045%20114.896%20117.125%20111.001%20117.153%20106.776L117.153%2060.5974C117.18%2056.5529%20119.338%2052.8048%20122.846%2050.7109Z%22%20fill%3D%22%2318181B%22%2F%3E%0A%3Cpath%20d%3D%22M123.871%2052.4282L123.881%2052.4225L123.89%2052.4167L164.101%2027.8047C167.083%2026.0291%20170.786%2025.9592%20173.81%2027.6128L173.81%2027.6128L173.821%2027.6188L216.934%2050.8367C216.936%2050.8376%20216.938%2050.8386%20216.939%2050.8395C219.938%2052.4814%20221.817%2055.5694%20221.892%2058.9515L222.15%20104.363L222.15%20104.378L222.151%20104.393C222.221%20107.772%20220.485%20110.952%20217.559%20112.758L176.733%20137.956C173.732%20139.808%20169.963%20139.909%20166.89%20138.229L124.733%20115.18C121.465%20113.393%20119.131%20110.089%20119.153%20106.79L119.153%20106.776L119.153%2060.6107C119.153%2060.6086%20119.153%2060.6065%20119.153%2060.6044C119.178%2057.2703%20120.958%2054.1669%20123.871%2052.4282Z%22%20stroke%3D%22url(%23paint0_linear_2595_7273)%22%20stroke-width%3D%224%22%2F%3E%0A%3C%2Fg%3E%0A%3Cpath%20d%3D%22M192.349%2096.9158L190.63%2090.5186L183.778%2064.9088C183.55%2064.0605%20182.994%2063.3375%20182.233%2062.8988C181.472%2062.4601%20180.568%2062.3416%20179.72%2062.5693L173.323%2064.2877L173.116%2064.3498C172.807%2063.945%20172.409%2063.6168%20171.953%2063.3906C171.497%2063.1644%20170.995%2063.0463%20170.486%2063.0455H163.861C163.279%2063.0471%20162.707%2063.2043%20162.205%2063.501C161.703%2063.2043%20161.132%2063.0471%20160.549%2063.0455H153.924C153.045%2063.0455%20152.203%2063.3945%20151.582%2064.0157C150.96%2064.6369%20150.611%2065.4795%20150.611%2066.358V99.483C150.611%20100.362%20150.96%20101.204%20151.582%20101.825C152.203%20102.447%20153.045%20102.796%20153.924%20102.796H160.549C161.132%20102.794%20161.703%20102.637%20162.205%20102.34C162.707%20102.637%20163.279%20102.794%20163.861%20102.796H170.486C171.365%20102.796%20172.207%20102.447%20172.829%20101.825C173.45%20101.204%20173.799%20100.362%20173.799%2099.483V78.8627L177.836%2093.9346L179.554%20100.332C179.742%20101.039%20180.158%20101.665%20180.739%20102.11C181.32%20102.556%20182.031%20102.797%20182.763%20102.796C183.049%20102.791%20183.334%20102.756%20183.612%20102.692L190.009%20100.974C190.43%20100.861%20190.824%20100.665%20191.169%20100.399C191.514%20100.132%20191.802%2099.7998%20192.018%2099.4209C192.238%2099.047%20192.381%2098.6325%20192.438%2098.2021C192.495%2097.7717%20192.465%2097.3342%20192.349%2096.9158ZM176.325%2075.4881L182.722%2073.7697L187.007%2089.7732L180.61%2091.4916L176.325%2075.4881ZM180.569%2065.7783L181.873%2070.5607L175.476%2072.2791L174.171%2067.4967L180.569%2065.7783ZM170.486%2066.358V91.2018H163.861V66.358H170.486ZM160.549%2066.358V71.3268H153.924V66.358H160.549ZM153.924%2099.483V74.6393H160.549V99.483H153.924ZM170.486%2099.483H163.861V94.5143H170.486V99.483ZM189.161%2097.7646L182.763%2099.483L181.459%2094.6799L187.877%2092.9615L189.161%2097.7646Z%22%20fill%3D%22url(%23paint1_linear_2595_7273)%22%2F%3E%0A%3Crect%20x%3D%222.15283%22%20y%3D%22-3.0791%22%20width%3D%22327%22%20height%3D%2223%22%20fill%3D%22url(%23paint2_linear_2595_7273)%22%2F%3E%0A%3Crect%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22matrix(1%200%200%20-1%202.15283%20166.921)%22%20fill%3D%22url(%23paint3_linear_2595_7273)%22%2F%3E%0A%3Crect%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22matrix(0%201%201%200%200.152832%20-17.0791)%22%20fill%3D%22url(%23paint4_linear_2595_7273)%22%2F%3E%0A%3Crect%20x%3D%22342.153%22%20y%3D%22-17.0791%22%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22rotate(90%20342.153%20-17.0791)%22%20fill%3D%22url(%23paint5_linear_2595_7273)%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_d_2595_7273%22%20x%3D%2286.1528%22%20y%3D%22-6.5791%22%20width%3D%22169%22%20height%3D%22179%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%0A%3CfeOffset%2F%3E%0A%3CfeGaussianBlur%20stdDeviation%3D%2215.5%22%2F%3E%0A%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%0A%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%200%200%200%200%201%200%200%200%200%201%200%200%200%200.07%200%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_2595_7273%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_2595_7273%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2595_7273%22%20x1%3D%22118.202%22%20y1%3D%2260.3042%22%20x2%3D%22223.159%22%20y2%3D%22113.509%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2300DC82%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23003F25%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2595_7273%22%20x1%3D%22150.495%22%20y1%3D%2271.0767%22%20x2%3D%22191.769%22%20y2%3D%2294.1139%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2300DC82%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23003F25%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint2_linear_2595_7273%22%20x1%3D%22165.653%22%20y1%3D%22-3.0791%22%20x2%3D%22166.153%22%20y2%3D%2219.9209%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2318181B%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2318181B%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint3_linear_2595_7273%22%20x1%3D%22163.5%22%20y1%3D%22-2.30278e-07%22%20x2%3D%22164.091%22%20y2%3D%2224.9979%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2318181B%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2318181B%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint4_linear_2595_7273%22%20x1%3D%22163.5%22%20y1%3D%22-2.30278e-07%22%20x2%3D%22164.091%22%20y2%3D%2224.9979%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2318181B%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2318181B%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint5_linear_2595_7273%22%20x1%3D%22505.653%22%20y1%3D%22-17.0791%22%20x2%3D%22506.244%22%20y2%3D%227.91876%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2318181B%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2318181B%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3CclipPath%20id%3D%22clip0_2595_7273%22%3E%0A%3Crect%20width%3D%22341%22%20height%3D%22164%22%20fill%3D%22white%22%20transform%3D%22translate(0.152832%200.920898)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="documentation icon" class="documentation-image-color-dark h-32 sm:h-34" data-v-a75d3b4d> <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22342%22%20height%3D%22165%22%20viewBox%3D%220%200%20342%20165%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2687_3977)%22%3E%0A%3Cpath%20d%3D%22M0.152832%20131.851H154.28%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M215.399%20107.359H349.153%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M0.152832%2077.2178L116.191%2077.2178%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M36.1528%20106.921L152.191%20106.921%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M202.153%2042.9209L317.305%2042.9209%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M218.153%2076.9209L345.305%2076.9209%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M285.947%208.45605V166.979%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M252.602%2016.8311V107.36%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M171.153%2016.9209V107.45%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M218.153%2016.9209V43.4501%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M122.153%2016.9211L327.45%2016.9209%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M1.92432%2043.3086H148.163%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M122.392%2016.4209V55.3659%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M36.084%200.920898L36.084%20176.921%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Cpath%20d%3D%22M75.4448%2043.249V175.152%22%20stroke%3D%22%23E4E4E7%22%2F%3E%0A%3Ccircle%20opacity%3D%220.7%22%20cx%3D%2275.4448%22%20cy%3D%2277.2178%22%20r%3D%223.5%22%20fill%3D%22%23A1A1AA%22%2F%3E%0A%3Ccircle%20opacity%3D%220.7%22%20cx%3D%2236.1528%22%20cy%3D%22131.85%22%20r%3D%223.5%22%20fill%3D%22%23A1A1AA%22%2F%3E%0A%3Ccircle%20opacity%3D%220.7%22%20cx%3D%22285.947%22%20cy%3D%2242.9209%22%20r%3D%223.5%22%20fill%3D%22%23A1A1AA%22%2F%3E%0A%3Ccircle%20opacity%3D%220.7%22%20cx%3D%22252.602%22%20cy%3D%22107.359%22%20r%3D%223.5%22%20fill%3D%22%23A1A1AA%22%2F%3E%0A%3Cg%20filter%3D%22url(%23filter0_d_2687_3977)%22%3E%0A%3Cpath%20d%3D%22M122.846%2050.7109L163.067%2026.0929C166.656%2023.9507%20171.117%2023.8611%20174.77%2025.8579L217.894%2049.0819C221.524%2051.0665%20223.807%2054.8133%20223.892%2058.9246L224.15%20104.352C224.235%20108.448%20222.13%20112.287%20218.609%20114.46L177.783%20139.658C174.174%20141.886%20169.638%20142.011%20165.931%20139.984L123.774%20116.935C120.045%20114.896%20117.125%20111.001%20117.153%20106.776L117.153%2060.5974C117.18%2056.5529%20119.338%2052.8048%20122.846%2050.7109Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M222.151%20104.393C222.22%20107.764%20220.487%20110.944%20217.571%20112.75C217.567%20112.753%20217.563%20112.755%20217.559%20112.758L176.733%20137.956C173.748%20139.798%20169.96%20139.907%20166.89%20138.229L124.733%20115.18C121.469%20113.395%20119.131%20110.069%20119.153%20106.79L119.153%20106.776L119.153%2060.6107C119.153%2060.6086%20119.153%2060.6065%20119.153%2060.6044C119.178%2057.2703%20120.958%2054.1669%20123.871%2052.4282L123.881%2052.4225L123.89%2052.4167L164.101%2027.8047C164.101%2027.8047%20164.101%2027.8047%20164.101%2027.8047C164.106%2027.8022%20164.11%2027.7997%20164.114%2027.7972C167.078%2026.0385%20170.793%2025.9632%20173.81%2027.6128L173.81%2027.6128L173.821%2027.6188L216.934%2050.8367C216.936%2050.8377%20216.938%2050.8387%20216.94%2050.8397C219.935%2052.4801%20221.817%2055.5878%20221.892%2058.9515L222.15%20104.363L222.15%20104.378L222.151%20104.393Z%22%20stroke%3D%22url(%23paint0_linear_2687_3977)%22%20stroke-width%3D%224%22%2F%3E%0A%3C%2Fg%3E%0A%3Cpath%20d%3D%22M192.349%2096.9158L190.63%2090.5186L183.778%2064.9088C183.55%2064.0605%20182.994%2063.3375%20182.233%2062.8988C181.472%2062.4601%20180.568%2062.3416%20179.72%2062.5693L173.323%2064.2877L173.116%2064.3498C172.807%2063.945%20172.409%2063.6168%20171.953%2063.3906C171.497%2063.1644%20170.995%2063.0463%20170.486%2063.0455H163.861C163.279%2063.0471%20162.707%2063.2043%20162.205%2063.501C161.703%2063.2043%20161.132%2063.0471%20160.549%2063.0455H153.924C153.045%2063.0455%20152.203%2063.3945%20151.582%2064.0157C150.96%2064.6369%20150.611%2065.4795%20150.611%2066.358V99.483C150.611%20100.362%20150.96%20101.204%20151.582%20101.825C152.203%20102.447%20153.045%20102.796%20153.924%20102.796H160.549C161.132%20102.794%20161.703%20102.637%20162.205%20102.34C162.707%20102.637%20163.279%20102.794%20163.861%20102.796H170.486C171.365%20102.796%20172.207%20102.447%20172.829%20101.825C173.45%20101.204%20173.799%20100.362%20173.799%2099.483V78.8627L177.836%2093.9346L179.554%20100.332C179.742%20101.039%20180.158%20101.665%20180.739%20102.11C181.32%20102.556%20182.031%20102.797%20182.763%20102.796C183.049%20102.791%20183.334%20102.756%20183.612%20102.692L190.009%20100.974C190.43%20100.861%20190.824%20100.665%20191.169%20100.399C191.514%20100.132%20191.802%2099.7997%20192.018%2099.4209C192.238%2099.047%20192.381%2098.6325%20192.438%2098.2021C192.495%2097.7717%20192.465%2097.3342%20192.349%2096.9158V96.9158ZM176.325%2075.4881L182.722%2073.7697L187.007%2089.7732L180.61%2091.4916L176.325%2075.4881ZM180.569%2065.7783L181.873%2070.5607L175.476%2072.2791L174.171%2067.4967L180.569%2065.7783ZM170.486%2066.358V91.2018H163.861V66.358H170.486ZM160.549%2066.358V71.3268H153.924V66.358H160.549ZM153.924%2099.483V74.6393H160.549V99.483H153.924ZM170.486%2099.483H163.861V94.5143H170.486V99.483ZM189.161%2097.7646L182.763%2099.483L181.459%2094.6799L187.877%2092.9615L189.161%2097.7646V97.7646Z%22%20fill%3D%22url(%23paint1_linear_2687_3977)%22%2F%3E%0A%3Crect%20x%3D%222.15283%22%20y%3D%22-3.0791%22%20width%3D%22327%22%20height%3D%2223%22%20fill%3D%22url(%23paint2_linear_2687_3977)%22%2F%3E%0A%3Crect%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22matrix(1%200%200%20-1%202.15283%20166.921)%22%20fill%3D%22url(%23paint3_linear_2687_3977)%22%2F%3E%0A%3Crect%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22matrix(0%201%201%200%200.152832%20-17.0791)%22%20fill%3D%22url(%23paint4_linear_2687_3977)%22%2F%3E%0A%3Crect%20x%3D%22342.153%22%20y%3D%22-17.0791%22%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22rotate(90%20342.153%20-17.0791)%22%20fill%3D%22url(%23paint5_linear_2687_3977)%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_d_2687_3977%22%20x%3D%2286.1528%22%20y%3D%22-6.5791%22%20width%3D%22169%22%20height%3D%22179%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%0A%3CfeOffset%2F%3E%0A%3CfeGaussianBlur%20stdDeviation%3D%2215.5%22%2F%3E%0A%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%0A%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200.831373%200%200%200%200%200.831373%200%200%200%200%200.847059%200%200%200%200.07%200%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_2687_3977%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_2687_3977%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2687_3977%22%20x1%3D%22118.202%22%20y1%3D%2260.3042%22%20x2%3D%22223.159%22%20y2%3D%22113.509%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23D4D4D8%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F3F46%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2687_3977%22%20x1%3D%22150.495%22%20y1%3D%2271.0767%22%20x2%3D%22191.769%22%20y2%3D%2294.1139%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23D4D4D8%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233F3F46%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint2_linear_2687_3977%22%20x1%3D%22165.653%22%20y1%3D%22-3.0791%22%20x2%3D%22166.153%22%20y2%3D%2219.9209%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint3_linear_2687_3977%22%20x1%3D%22163.5%22%20y1%3D%22-2.30278e-07%22%20x2%3D%22164.091%22%20y2%3D%2224.9979%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint4_linear_2687_3977%22%20x1%3D%22163.5%22%20y1%3D%22-2.30278e-07%22%20x2%3D%22164.091%22%20y2%3D%2224.9979%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint5_linear_2687_3977%22%20x1%3D%22505.653%22%20y1%3D%22-17.0791%22%20x2%3D%22506.244%22%20y2%3D%227.91876%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3CclipPath%20id%3D%22clip0_2687_3977%22%3E%0A%3Crect%20width%3D%22341%22%20height%3D%22164%22%20fill%3D%22white%22%20transform%3D%22translate(0.152832%200.920898)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="documentation icon" class="documentation-image-light h-32 sm:h-34" data-v-a75d3b4d> <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22342%22%20height%3D%22165%22%20viewBox%3D%220%200%20342%20165%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2595_7193)%22%3E%0A%3Cpath%20d%3D%22M0.152832%20131.851H154.28%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M215.399%20107.359H349.153%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M0.152832%2077.2178L116.191%2077.2178%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M36.1528%20106.921L152.191%20106.921%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M202.153%2042.9209L317.305%2042.9209%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M218.153%2076.9209L345.305%2076.9209%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M285.947%208.45605V166.979%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M252.602%2016.8311V107.36%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M171.153%2016.9209V107.45%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M218.153%2016.9209V43.4501%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M122.153%2016.9211L327.45%2016.9209%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M1.92432%2043.3086H148.163%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M122.392%2016.4209V55.3659%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M36.084%200.920898L36.084%20176.921%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Cpath%20d%3D%22M75.4448%2043.249V175.152%22%20stroke%3D%22%2327272A%22%2F%3E%0A%3Ccircle%20opacity%3D%220.14%22%20cx%3D%2275.4448%22%20cy%3D%2277.2178%22%20r%3D%223.5%22%20fill%3D%22white%22%2F%3E%0A%3Ccircle%20opacity%3D%220.14%22%20cx%3D%2236.1528%22%20cy%3D%22131.85%22%20r%3D%223.5%22%20fill%3D%22white%22%2F%3E%0A%3Ccircle%20opacity%3D%220.14%22%20cx%3D%22285.947%22%20cy%3D%2242.9209%22%20r%3D%223.5%22%20fill%3D%22white%22%2F%3E%0A%3Ccircle%20opacity%3D%220.14%22%20cx%3D%22252.602%22%20cy%3D%22107.359%22%20r%3D%223.5%22%20fill%3D%22white%22%2F%3E%0A%3Cg%20filter%3D%22url(%23filter0_d_2595_7193)%22%3E%0A%3Cpath%20d%3D%22M122.846%2050.7109L163.067%2026.0929C166.656%2023.9507%20171.117%2023.8611%20174.77%2025.8579L217.894%2049.0819C221.524%2051.0665%20223.807%2054.8133%20223.892%2058.9246L224.15%20104.352C224.235%20108.448%20222.13%20112.287%20218.609%20114.46L177.783%20139.658C174.174%20141.886%20169.638%20142.011%20165.931%20139.984L123.774%20116.935C120.045%20114.896%20117.125%20111.001%20117.153%20106.776L117.153%2060.5974C117.18%2056.5529%20119.338%2052.8048%20122.846%2050.7109Z%22%20fill%3D%22%2318181B%22%2F%3E%0A%3Cpath%20d%3D%22M123.871%2052.4282L123.881%2052.4225L123.89%2052.4167L164.101%2027.8047C167.083%2026.0291%20170.786%2025.9592%20173.81%2027.6128L173.81%2027.6128L173.821%2027.6188L216.934%2050.8367C216.936%2050.8376%20216.938%2050.8386%20216.939%2050.8395C219.938%2052.4814%20221.817%2055.5694%20221.892%2058.9515L222.15%20104.363L222.15%20104.378L222.151%20104.393C222.221%20107.772%20220.485%20110.952%20217.559%20112.758L176.733%20137.956C173.732%20139.808%20169.963%20139.909%20166.89%20138.229L124.733%20115.18C121.465%20113.393%20119.131%20110.089%20119.153%20106.79L119.153%20106.776L119.153%2060.6107C119.153%2060.6086%20119.153%2060.6065%20119.153%2060.6044C119.178%2057.2703%20120.958%2054.1669%20123.871%2052.4282Z%22%20stroke%3D%22url(%23paint0_linear_2595_7193)%22%20stroke-width%3D%224%22%2F%3E%0A%3C%2Fg%3E%0A%3Cpath%20d%3D%22M192.349%2096.9158L190.63%2090.5186L183.778%2064.9088C183.55%2064.0605%20182.994%2063.3375%20182.233%2062.8988C181.472%2062.4601%20180.568%2062.3416%20179.72%2062.5693L173.323%2064.2877L173.116%2064.3498C172.807%2063.945%20172.409%2063.6168%20171.953%2063.3906C171.497%2063.1644%20170.995%2063.0463%20170.486%2063.0455H163.861C163.279%2063.0471%20162.707%2063.2043%20162.205%2063.501C161.703%2063.2043%20161.132%2063.0471%20160.549%2063.0455H153.924C153.045%2063.0455%20152.203%2063.3945%20151.582%2064.0157C150.96%2064.6369%20150.611%2065.4795%20150.611%2066.358V99.483C150.611%20100.362%20150.96%20101.204%20151.582%20101.825C152.203%20102.447%20153.045%20102.796%20153.924%20102.796H160.549C161.132%20102.794%20161.703%20102.637%20162.205%20102.34C162.707%20102.637%20163.279%20102.794%20163.861%20102.796H170.486C171.365%20102.796%20172.207%20102.447%20172.829%20101.825C173.45%20101.204%20173.799%20100.362%20173.799%2099.483V78.8627L177.836%2093.9346L179.554%20100.332C179.742%20101.039%20180.158%20101.665%20180.739%20102.11C181.32%20102.556%20182.031%20102.797%20182.763%20102.796C183.049%20102.791%20183.334%20102.756%20183.612%20102.692L190.009%20100.974C190.43%20100.861%20190.824%20100.665%20191.169%20100.399C191.514%20100.132%20191.802%2099.7998%20192.018%2099.4209C192.238%2099.047%20192.381%2098.6325%20192.438%2098.2021C192.495%2097.7717%20192.465%2097.3342%20192.349%2096.9158ZM176.325%2075.4881L182.722%2073.7697L187.007%2089.7732L180.61%2091.4916L176.325%2075.4881ZM180.569%2065.7783L181.873%2070.5607L175.476%2072.2791L174.171%2067.4967L180.569%2065.7783ZM170.486%2066.358V91.2018H163.861V66.358H170.486ZM160.549%2066.358V71.3268H153.924V66.358H160.549ZM153.924%2099.483V74.6393H160.549V99.483H153.924ZM170.486%2099.483H163.861V94.5143H170.486V99.483ZM189.161%2097.7646L182.763%2099.483L181.459%2094.6799L187.877%2092.9615L189.161%2097.7646Z%22%20fill%3D%22url(%23paint1_linear_2595_7193)%22%2F%3E%0A%3Crect%20x%3D%222.15283%22%20y%3D%22-3.0791%22%20width%3D%22327%22%20height%3D%2223%22%20fill%3D%22url(%23paint2_linear_2595_7193)%22%2F%3E%0A%3Crect%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22matrix(1%200%200%20-1%202.15283%20166.921)%22%20fill%3D%22url(%23paint3_linear_2595_7193)%22%2F%3E%0A%3Crect%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22matrix(0%201%201%200%200.152832%20-17.0791)%22%20fill%3D%22url(%23paint4_linear_2595_7193)%22%2F%3E%0A%3Crect%20x%3D%22342.153%22%20y%3D%22-17.0791%22%20width%3D%22327%22%20height%3D%2225%22%20transform%3D%22rotate(90%20342.153%20-17.0791)%22%20fill%3D%22url(%23paint5_linear_2595_7193)%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_d_2595_7193%22%20x%3D%2286.1528%22%20y%3D%22-6.5791%22%20width%3D%22169%22%20height%3D%22179%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%0A%3CfeOffset%2F%3E%0A%3CfeGaussianBlur%20stdDeviation%3D%2215.5%22%2F%3E%0A%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%0A%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%200%200%200%200%201%200%200%200%200%201%200%200%200%200.07%200%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_2595_7193%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_2595_7193%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2595_7193%22%20x1%3D%22118.202%22%20y1%3D%2260.3042%22%20x2%3D%22223.159%22%20y2%3D%22113.509%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2371717A%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2595_7193%22%20x1%3D%22150.495%22%20y1%3D%2271.0767%22%20x2%3D%22191.769%22%20y2%3D%2294.1139%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2371717A%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint2_linear_2595_7193%22%20x1%3D%22165.653%22%20y1%3D%22-3.0791%22%20x2%3D%22166.153%22%20y2%3D%2219.9209%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2318181B%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2318181B%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint3_linear_2595_7193%22%20x1%3D%22163.5%22%20y1%3D%22-2.30278e-07%22%20x2%3D%22164.091%22%20y2%3D%2224.9979%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2318181B%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2318181B%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint4_linear_2595_7193%22%20x1%3D%22163.5%22%20y1%3D%22-2.30278e-07%22%20x2%3D%22164.091%22%20y2%3D%2224.9979%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2318181B%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2318181B%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint5_linear_2595_7193%22%20x1%3D%22505.653%22%20y1%3D%22-17.0791%22%20x2%3D%22506.244%22%20y2%3D%227.91876%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%2318181B%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2318181B%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3CclipPath%20id%3D%22clip0_2595_7193%22%3E%0A%3Crect%20width%3D%22341%22%20height%3D%22164%22%20fill%3D%22white%22%20transform%3D%22translate(0.152832%200.920898)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="documentation icon" class="documentation-image-dark h-32 sm:h-34" data-v-a75d3b4d></div></a></div><div class="lg:min-h-min sm:min-h-[220px] md:min-h-[180px] col-span-2 sm:col-span-1 lg:col-span-6 text-black dark:text-white rounded-xl examples-container relative items-center justify-center border border-gray-200 dark:border-transparent hover:border-transparent" data-v-a75d3b4d><div class="gradient-border gradient-border-examples gradient-border-rect" data-v-a75d3b4d></div><div class="examples-gradient-right absolute right-0 inset-y-0 w-[20%] bg-gradient-to-l to-transparent from-blue-400 rounded-xl z-1 transition-opacity duration-300" data-v-a75d3b4d></div><a href="https://nuxt.com/docs/examples" target="_blank" class="py-6 px-5 rounded-xl flex items-center justify-center gap-x-4 bg-white dark:bg-gray-900 sm:min-h-[220px] md:min-h-[180px] lg:min-h-min" data-v-a75d3b4d><img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2253%22%20height%3D%2258%22%20viewBox%3D%220%200%2053%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M49.1971%2043.7595C49.1113%2043.8209%2049.0231%2043.8796%2048.9325%2043.9357L29.0918%2056.2117C27.6504%2057.1035%2025.8212%2057.1564%2024.3387%2056.3439L3.85107%2045.1148C2.27157%2044.2491%201.14238%2042.6366%201.15291%2041.0494L1.15293%2041.0427L1.153%2018.552C1.15301%2018.5509%201.15302%2018.5499%201.15302%2018.5488C1.16485%2016.9324%202.02611%2015.4289%203.43319%2014.5869L3.43322%2014.587L3.44269%2014.5812L22.9844%202.59084C24.4169%201.73583%2026.2139%201.69824%2027.6729%202.49791L27.6729%202.49792L27.6784%202.50094L48.6303%2013.8121C48.6313%2013.8126%2048.6322%2013.8131%2048.6331%2013.8136C50.0797%2014.6078%2050.9898%2016.1132%2051.026%2017.7438L51.1517%2039.8672L51.1517%2039.8746L51.1519%2039.8821C51.1834%2041.4138%2050.4491%2042.8635%2049.1971%2043.7595Z%22%20fill%3D%22white%22%20stroke%3D%22url(%23paint0_linear_2613_3941)%22%20stroke-width%3D%222%22%2F%3E%0A%3Cpath%20d%3D%22M37.1528%2017.9209H15.1528C14.6224%2017.9209%2014.1137%2018.1316%2013.7386%2018.5067C13.3635%2018.8818%2013.1528%2019.3905%2013.1528%2019.9209V37.9209C13.1528%2038.4513%2013.3635%2038.96%2013.7386%2039.3351C14.1137%2039.7102%2014.6224%2039.9209%2015.1528%2039.9209H37.1528C37.6833%2039.9209%2038.192%2039.7102%2038.567%2039.3351C38.9421%2038.96%2039.1528%2038.4513%2039.1528%2037.9209V19.9209C39.1528%2019.3905%2038.9421%2018.8818%2038.567%2018.5067C38.192%2018.1316%2037.6833%2017.9209%2037.1528%2017.9209V17.9209ZM15.1528%2019.9209H37.1528V24.9209H15.1528V19.9209ZM15.1528%2026.9209H22.1528V37.9209H15.1528V26.9209ZM37.1528%2037.9209H24.1528V26.9209H37.1528V37.9209Z%22%20fill%3D%22url(%23paint1_linear_2613_3941)%22%2F%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2613_3941%22%20x1%3D%220.662695%22%20y1%3D%2218.4025%22%20x2%3D%2251.7209%22%20y2%3D%2244.2212%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%238DEAFF%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23008AA9%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2613_3941%22%20x1%3D%2213.0804%22%20y1%3D%2222.6224%22%20x2%3D%2237.028%22%20y2%3D%2237.847%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%238DEAFF%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23008AA9%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="examples icon" class="examples-image-color-light" data-v-a75d3b4d> <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2253%22%20height%3D%2258%22%20viewBox%3D%220%200%2053%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.43319%2014.5869L3.43322%2014.587L3.44269%2014.5812L22.9844%202.59084C24.4246%201.73116%2026.2124%201.69742%2027.6729%202.49791L27.6729%202.49792L27.6784%202.50094L48.6303%2013.8121C48.6313%2013.8126%2048.6322%2013.8131%2048.6331%2013.8137C50.0812%2014.6086%2050.9896%2016.1043%2051.026%2017.7437L51.1517%2039.8672L51.1517%2039.8746L51.1519%2039.8821C51.1856%2041.5203%2050.346%2043.0611%2048.9325%2043.9357L29.0918%2056.2117C27.6424%2057.1085%2025.8227%2057.1572%2024.3387%2056.3439L3.85107%2045.1148C2.26984%2044.2481%201.14232%2042.646%201.15293%2041.0494V41.0427L1.153%2018.552C1.15301%2018.5509%201.15302%2018.5499%201.15302%2018.5488C1.16485%2016.9324%202.02611%2015.4289%203.43319%2014.5869Z%22%20fill%3D%22%2318181B%22%20stroke%3D%22url(%23paint0_linear_2595_7426)%22%20stroke-width%3D%222%22%2F%3E%0A%3Cpath%20d%3D%22M37.1528%2017.9209H15.1528C14.6224%2017.9209%2014.1137%2018.1316%2013.7386%2018.5067C13.3635%2018.8818%2013.1528%2019.3905%2013.1528%2019.9209V37.9209C13.1528%2038.4513%2013.3635%2038.96%2013.7386%2039.3351C14.1137%2039.7102%2014.6224%2039.9209%2015.1528%2039.9209H37.1528C37.6833%2039.9209%2038.192%2039.7102%2038.567%2039.3351C38.9421%2038.96%2039.1528%2038.4513%2039.1528%2037.9209V19.9209C39.1528%2019.3905%2038.9421%2018.8818%2038.567%2018.5067C38.192%2018.1316%2037.6833%2017.9209%2037.1528%2017.9209ZM15.1528%2019.9209H37.1528V24.9209H15.1528V19.9209ZM15.1528%2026.9209H22.1528V37.9209H15.1528V26.9209ZM37.1528%2037.9209H24.1528V26.9209H37.1528V37.9209Z%22%20fill%3D%22url(%23paint1_linear_2595_7426)%22%2F%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2595_7426%22%20x1%3D%220.662695%22%20y1%3D%2218.4025%22%20x2%3D%2251.7209%22%20y2%3D%2244.2212%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%238DEAFF%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23008AA9%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2595_7426%22%20x1%3D%2213.0804%22%20y1%3D%2222.6224%22%20x2%3D%2237.028%22%20y2%3D%2237.847%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%238DEAFF%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23008AA9%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="examples icon" class="examples-image-color-dark" data-v-a75d3b4d> <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2253%22%20height%3D%2258%22%20viewBox%3D%220%200%2053%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M49.1971%2043.7595C49.1113%2043.8209%2049.0231%2043.8796%2048.9325%2043.9357L29.0918%2056.2117C27.6504%2057.1035%2025.8212%2057.1564%2024.3387%2056.3439L3.85107%2045.1148C2.27157%2044.2491%201.14238%2042.6366%201.15291%2041.0494L1.15293%2041.0427L1.153%2018.552C1.15301%2018.5509%201.15302%2018.5499%201.15302%2018.5488C1.16485%2016.9324%202.02611%2015.4289%203.43319%2014.5869L3.43322%2014.587L3.44269%2014.5812L22.9844%202.59084C24.4169%201.73583%2026.2139%201.69824%2027.6729%202.49791L27.6729%202.49792L27.6784%202.50094L48.6303%2013.8121C48.6313%2013.8126%2048.6322%2013.8131%2048.6331%2013.8136C50.0797%2014.6078%2050.9898%2016.1132%2051.026%2017.7438L51.1517%2039.8672L51.1517%2039.8746L51.1519%2039.8821C51.1834%2041.4138%2050.4491%2042.8635%2049.1971%2043.7595Z%22%20fill%3D%22white%22%20stroke%3D%22url(%23paint0_linear_2691_4397)%22%20stroke-width%3D%222%22%2F%3E%0A%3Cpath%20d%3D%22M37.1528%2017.9209H15.1528C14.6224%2017.9209%2014.1137%2018.1316%2013.7386%2018.5067C13.3635%2018.8818%2013.1528%2019.3905%2013.1528%2019.9209V37.9209C13.1528%2038.4513%2013.3635%2038.96%2013.7386%2039.3351C14.1137%2039.7102%2014.6224%2039.9209%2015.1528%2039.9209H37.1528C37.6833%2039.9209%2038.192%2039.7102%2038.567%2039.3351C38.9421%2038.96%2039.1528%2038.4513%2039.1528%2037.9209V19.9209C39.1528%2019.3905%2038.9421%2018.8818%2038.567%2018.5067C38.192%2018.1316%2037.6833%2017.9209%2037.1528%2017.9209V17.9209ZM15.1528%2019.9209H37.1528V24.9209H15.1528V19.9209ZM15.1528%2026.9209H22.1528V37.9209H15.1528V26.9209ZM37.1528%2037.9209H24.1528V26.9209H37.1528V37.9209Z%22%20fill%3D%22url(%23paint1_linear_2691_4397)%22%2F%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2691_4397%22%20x1%3D%220.662695%22%20y1%3D%2218.4025%22%20x2%3D%2251.7209%22%20y2%3D%2244.2212%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23D4D4D8%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2371717A%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2691_4397%22%20x1%3D%2213.0804%22%20y1%3D%2222.6224%22%20x2%3D%2237.028%22%20y2%3D%2237.847%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23D4D4D8%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2371717A%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="examples icon" class="examples-image-light" data-v-a75d3b4d> <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2253%22%20height%3D%2258%22%20viewBox%3D%220%200%2053%2058%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.43319%2014.5869L3.43322%2014.587L3.44269%2014.5812L22.9844%202.59084C24.4246%201.73116%2026.2124%201.69742%2027.6729%202.49791L27.6729%202.49792L27.6784%202.50094L48.6303%2013.8121C48.6313%2013.8126%2048.6322%2013.8131%2048.6331%2013.8137C50.0812%2014.6086%2050.9896%2016.1043%2051.026%2017.7437L51.1517%2039.8672L51.1517%2039.8746L51.1519%2039.8821C51.1856%2041.5203%2050.346%2043.0611%2048.9325%2043.9357L29.0918%2056.2117C27.6424%2057.1085%2025.8227%2057.1572%2024.3387%2056.3439L3.85107%2045.1148C2.26984%2044.2481%201.14232%2042.646%201.15293%2041.0494V41.0427L1.153%2018.552C1.15301%2018.5509%201.15302%2018.5499%201.15302%2018.5488C1.16485%2016.9324%202.02611%2015.4289%203.43319%2014.5869Z%22%20fill%3D%22%2318181B%22%20stroke%3D%22url(%23paint0_linear_2595_7182)%22%20stroke-width%3D%222%22%2F%3E%0A%3Cpath%20d%3D%22M37.1528%2017.9209H15.1528C14.6224%2017.9209%2014.1137%2018.1316%2013.7386%2018.5067C13.3635%2018.8818%2013.1528%2019.3905%2013.1528%2019.9209V37.9209C13.1528%2038.4513%2013.3635%2038.96%2013.7386%2039.3351C14.1137%2039.7102%2014.6224%2039.9209%2015.1528%2039.9209H37.1528C37.6833%2039.9209%2038.192%2039.7102%2038.567%2039.3351C38.9421%2038.96%2039.1528%2038.4513%2039.1528%2037.9209V19.9209C39.1528%2019.3905%2038.9421%2018.8818%2038.567%2018.5067C38.192%2018.1316%2037.6833%2017.9209%2037.1528%2017.9209ZM15.1528%2019.9209H37.1528V24.9209H15.1528V19.9209ZM15.1528%2026.9209H22.1528V37.9209H15.1528V26.9209ZM37.1528%2037.9209H24.1528V26.9209H37.1528V37.9209Z%22%20fill%3D%22url(%23paint1_linear_2595_7182)%22%2F%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2595_7182%22%20x1%3D%220.662695%22%20y1%3D%2218.4025%22%20x2%3D%2251.7209%22%20y2%3D%2244.2212%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2371717A%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2595_7182%22%20x1%3D%2213.0804%22%20y1%3D%2222.6224%22%20x2%3D%2237.028%22%20y2%3D%2237.847%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2371717A%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A" alt="examples icon" class="examples-image-dark" data-v-a75d3b4d><div class="flex flex-col space-y text-black dark:text-white" data-v-a75d3b4d><h3 class="font-semibold text-xl" data-v-a75d3b4d>Examples</h3><p class="text-gray-700 dark:text-gray-300" data-v-a75d3b4d>Explore different way of using Nuxt features and get inspired with our list of examples.</p></div></a></div></div></div><footer class="relative border-t bg-white dark:bg-black border-gray-200 dark:border-gray-900 w-full h-[70px] flex items-center" data-v-a75d3b4d><div class="absolute inset-x-0 flex items-center justify-center -top-3" data-v-a75d3b4d><a href="https://nuxt.com" target="_blank" data-v-a75d3b4d><svg width="70" height="20" viewBox="0 0 70 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a75d3b4d><ellipse cx="34.6528" cy="10.4209" rx="34.5" ry="9.5" fill="white" class="dark:hidden" data-v-a75d3b4d></ellipse><ellipse cx="34.6528" cy="10.4209" rx="34.5" ry="9.5" fill="black" class="hidden dark:block" data-v-a75d3b4d></ellipse><path d="M36.0605 15.9209H42.6256C42.8341 15.9209 43.0389 15.8655 43.2195 15.7602C43.4001 15.6548 43.55 15.5033 43.6543 15.3209C43.7585 15.1384 43.8133 14.9315 43.8132 14.7208C43.8131 14.5102 43.7581 14.3033 43.6537 14.1209L39.2448 6.40667C39.1406 6.22427 38.9907 6.0728 38.8101 5.96748C38.6296 5.86217 38.4248 5.80672 38.2163 5.80672C38.0078 5.80672 37.803 5.86217 37.6225 5.96748C37.4419 6.0728 37.292 6.22427 37.1878 6.40667L36.0605 8.38048L33.8563 4.52076C33.752 4.33837 33.602 4.18692 33.4214 4.08163C33.2409 3.97633 33.036 3.9209 32.8275 3.9209C32.619 3.9209 32.4141 3.97633 32.2335 4.08163C32.053 4.18692 31.903 4.33837 31.7987 4.52076L26.3123 14.1209C26.2079 14.3033 26.1529 14.5102 26.1528 14.7208C26.1527 14.9315 26.2076 15.1384 26.3118 15.3209C26.416 15.5033 26.5659 15.6548 26.7465 15.7602C26.9271 15.8655 27.1319 15.9209 27.3405 15.9209H31.4615C33.0943 15.9209 34.2984 15.1964 35.127 13.7829L37.1385 10.2638L38.216 8.38048L41.4496 14.0376H37.1385L36.0605 15.9209ZM31.3943 14.0356L28.5184 14.035L32.8294 6.49263L34.9805 10.2638L33.5402 12.7844C32.99 13.7015 32.3649 14.0356 31.3943 14.0356Z" fill="#00DC82" data-v-a75d3b4d></path></svg></a></div><div class="mx-auto sm:px-6 lg:px-8 px-4 w-full" data-v-a75d3b4d><div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-between" data-v-a75d3b4d><div class="flex flex-col-reverse items-center gap-3 sm:flex-row" data-v-a75d3b4d><span class="text-sm text-gray-700 dark:text-gray-300" data-v-a75d3b4d>\xA9 2022-${ssrInterpolate(new Date().getFullYear())} Nuxt - MIT License</span></div><ul class="flex items-center justify-end gap-3" data-v-a75d3b4d><li data-v-a75d3b4d><a href="https://chat.nuxt.dev" target="_blank" class="focus-visible:ring-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" data-v-a75d3b4d><svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a75d3b4d><path d="M13.3705 1.07322C13.3663 1.06497 13.3594 1.05851 13.351 1.05499C12.3785 0.599487 11.3522 0.274675 10.2978 0.0886873C10.2882 0.0868693 10.2783 0.0881809 10.2695 0.0924354C10.2607 0.0966899 10.2534 0.103671 10.2487 0.112385C10.109 0.371315 9.98212 0.637279 9.86863 0.909263C8.73205 0.733138 7.57595 0.733138 6.43938 0.909263C6.32514 0.636589 6.19624 0.370559 6.05328 0.112385C6.04838 0.10386 6.04107 0.0970401 6.03232 0.0928132C6.02356 0.0885863 6.01377 0.0871486 6.0042 0.0886873C4.9497 0.274285 3.92333 0.599121 2.95092 1.05502C2.9426 1.05862 2.93558 1.06477 2.93082 1.07262C0.986197 4.03716 0.453491 6.92881 0.714819 9.78465C0.715554 9.79165 0.71766 9.79843 0.721013 9.80458C0.724365 9.81073 0.728896 9.81613 0.734334 9.82046C1.86667 10.6763 3.1332 11.3296 4.47988 11.7525C4.48937 11.7554 4.49949 11.7552 4.5089 11.7521C4.51831 11.7489 4.52655 11.7429 4.53251 11.7349C4.82175 11.3331 5.07803 10.9077 5.29876 10.4629C5.3018 10.4568 5.30353 10.4501 5.30384 10.4433C5.30416 10.4365 5.30305 10.4296 5.3006 10.4233C5.29814 10.4169 5.29439 10.4111 5.2896 10.4064C5.2848 10.4016 5.27906 10.3979 5.27277 10.3955C4.86862 10.2377 4.47736 10.0474 4.10266 9.82645C4.09586 9.82236 4.09014 9.81663 4.08602 9.80976C4.0819 9.80288 4.0795 9.79508 4.07903 9.78703C4.07856 9.77899 4.08004 9.77095 4.08334 9.76362C4.08664 9.7563 4.09166 9.74992 4.09794 9.74504C4.17657 9.68491 4.25524 9.62236 4.33032 9.55918C4.33699 9.55358 4.34506 9.54998 4.35362 9.5488C4.36218 9.54762 4.3709 9.54891 4.37879 9.55252C6.83362 10.6962 9.4913 10.6962 11.9171 9.55252C11.925 9.54868 11.9338 9.54721 11.9425 9.54829C11.9512 9.54936 11.9594 9.55293 11.9662 9.55858C12.0413 9.62176 12.1199 9.68491 12.1991 9.74504C12.2054 9.74987 12.2105 9.75621 12.2138 9.7635C12.2172 9.7708 12.2187 9.77882 12.2183 9.78687C12.2179 9.79492 12.2156 9.80274 12.2115 9.80964C12.2074 9.81654 12.2018 9.82232 12.195 9.82645C11.8211 10.0492 11.4295 10.2394 11.0243 10.3949C11.018 10.3974 11.0123 10.4012 11.0075 10.406C11.0028 10.4109 10.9991 10.4167 10.9967 10.4231C10.9943 10.4295 10.9932 10.4364 10.9936 10.4433C10.9939 10.4501 10.9957 10.4568 10.9988 10.4629C11.2232 10.9052 11.4791 11.3301 11.7645 11.7342C11.7703 11.7425 11.7785 11.7487 11.7879 11.7519C11.7974 11.7552 11.8076 11.7554 11.8171 11.7524C13.1662 11.331 14.4349 10.6776 15.5687 9.82046C15.5742 9.81635 15.5788 9.81108 15.5822 9.80501C15.5855 9.79893 15.5876 9.7922 15.5882 9.78525C15.9011 6.4836 15.0644 3.61565 13.3705 1.07322ZM5.66537 8.04574C4.92629 8.04574 4.31731 7.35337 4.31731 6.50305C4.31731 5.65274 4.91448 4.96032 5.66537 4.96032C6.42213 4.96032 7.02522 5.65875 7.01341 6.503C7.01341 7.35337 6.41622 8.04574 5.66537 8.04574ZM10.6496 8.04574C9.91051 8.04574 9.30153 7.35337 9.30153 6.50305C9.30153 5.65274 9.8987 4.96032 10.6496 4.96032C11.4064 4.96032 12.0094 5.65875 11.9976 6.503C11.9976 7.35337 11.4064 8.04574 10.6496 8.04574Z" fill="currentColor" data-v-a75d3b4d></path></svg></a></li><li data-v-a75d3b4d><a href="https://twitter.nuxt.dev" target="_blank" class="focus-visible:ring-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" data-v-a75d3b4d><svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a75d3b4d><path d="M17.486 1.75441C16.8596 2.02615 16.1972 2.20579 15.5193 2.28774C16.2345 1.86051 16.7704 1.18839 17.0277 0.396073C16.3556 0.796126 15.62 1.07799 14.8527 1.22941C14.3398 0.673216 13.6568 0.302987 12.9108 0.176783C12.1649 0.0505786 11.3981 0.175539 10.7308 0.532064C10.0635 0.88859 9.53345 1.45652 9.2237 2.14677C8.91396 2.83702 8.84208 3.61056 9.01934 4.34607C7.66053 4.27734 6.33137 3.92353 5.11822 3.30762C3.90506 2.69171 2.83504 1.82748 1.97767 0.771073C1.67695 1.29621 1.51894 1.89093 1.51934 2.49607C1.51827 3.05806 1.65618 3.61159 1.9208 4.10738C2.18541 4.60317 2.56852 5.02583 3.036 5.33774C2.49265 5.32296 1.96091 5.17716 1.486 4.91274V4.95441C1.49008 5.74182 1.766 6.50365 2.2671 7.11104C2.7682 7.71844 3.46372 8.13411 4.236 8.28774C3.93872 8.37821 3.63007 8.42591 3.31934 8.42941C3.10424 8.42689 2.88969 8.40739 2.67767 8.37107C2.89759 9.04842 3.32319 9.64036 3.89523 10.0645C4.46728 10.4887 5.15732 10.724 5.86934 10.7377C4.66701 11.6838 3.18257 12.2001 1.65267 12.2044C1.37412 12.2053 1.09578 12.1886 0.819336 12.1544C2.38136 13.163 4.20168 13.6983 6.061 13.6961C7.34408 13.7094 8.61695 13.4669 9.80527 12.9828C10.9936 12.4987 12.0735 11.7826 12.982 10.8765C13.8905 9.97033 14.6093 8.89223 15.0965 7.70516C15.5836 6.51809 15.8294 5.24585 15.8193 3.96274C15.8193 3.82107 15.8193 3.67107 15.8193 3.52107C16.4732 3.03342 17.0372 2.43559 17.486 1.75441Z" fill="currentColor" data-v-a75d3b4d></path></svg></a></li><li data-v-a75d3b4d><a href="https://github.nuxt.dev" target="_blank" class="focus-visible:ring-2 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white" data-v-a75d3b4d><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a75d3b4d><path d="M9.15269 0.792969C7.17392 0.793051 5.25974 1.49723 3.75266 2.77951C2.24558 4.06179 1.24394 5.83849 0.92697 7.7917C0.609997 9.74492 0.998373 11.7472 2.02261 13.4403C3.04684 15.1333 4.6401 16.4067 6.51729 17.0325C6.93396 17.1055 7.09021 16.8555 7.09021 16.6367C7.09021 16.4388 7.07978 15.7825 7.07978 15.0846C4.98603 15.47 4.44436 14.5742 4.27769 14.1055C4.09276 13.6496 3.79959 13.2456 3.42353 12.9284C3.13186 12.7721 2.71519 12.3867 3.4131 12.3763C3.67959 12.4052 3.93518 12.498 4.15822 12.6467C4.38125 12.7953 4.56516 12.9956 4.69436 13.2305C4.80833 13.4352 4.96159 13.6155 5.14535 13.7609C5.32911 13.9063 5.53975 14.014 5.76522 14.0779C5.99068 14.1418 6.22653 14.1605 6.45926 14.1331C6.69198 14.1056 6.917 14.0325 7.12143 13.918C7.1575 13.4943 7.34631 13.0982 7.65269 12.8034C5.79853 12.5951 3.86103 11.8763 3.86103 8.68883C3.84931 7.86062 4.15493 7.05931 4.71519 6.44924C4.46043 5.72943 4.49024 4.93948 4.79853 4.24091C4.79853 4.24091 5.49642 4.02215 7.09019 5.09508C8.45376 4.72005 9.89328 4.72005 11.2569 5.09508C12.8506 4.01174 13.5485 4.24091 13.5485 4.24091C13.8569 4.93947 13.8867 5.72943 13.6319 6.44924C14.1938 7.05826 14.4997 7.86027 14.486 8.68883C14.486 11.8867 12.5381 12.5951 10.6839 12.8034C10.8828 13.005 11.036 13.247 11.133 13.513C11.2301 13.779 11.2688 14.0628 11.2464 14.3451C11.2464 15.4597 11.236 16.3555 11.236 16.6367C11.236 16.8555 11.3923 17.1159 11.8089 17.0326C13.6828 16.4016 15.2715 15.1253 16.2914 13.4313C17.3112 11.7374 17.6959 9.73616 17.3768 7.78483C17.0576 5.83351 16.0553 4.05911 14.5489 2.77839C13.0425 1.49768 11.1299 0.793998 9.15269 0.792969Z" fill="currentColor" data-v-a75d3b4d></path></svg></a></li></ul></div></div></footer></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-templates/dist/templates/welcome.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const welcome = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a75d3b4d"]]);
const welcome$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: welcome
}, Symbol.toStringTag, { value: "Module" }));
const nuxtErrorBoundary = defineComponent({
  emits: {
    error(_error) {
      return true;
    }
  },
  setup(_props, { slots, emit }) {
    const error = ref(null);
    useNuxtApp();
    onErrorCaptured((err) => {
    });
    return () => {
      var _a, _b;
      return error.value ? (_a = slots.error) == null ? void 0 : _a.call(slots, { error }) : (_b = slots.default) == null ? void 0 : _b.call(slots);
    };
  }
});
const nuxtErrorBoundary$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nuxtErrorBoundary
}, Symbol.toStringTag, { value: "Module" }));
const clientOnly = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_2, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const cache = /* @__PURE__ */ new WeakMap();
function createClientOnly(component) {
  if (cache.has(component)) {
    return cache.get(component);
  }
  const clone = { ...component };
  if (clone.render) {
    clone.render = (ctx, ...args) => {
      var _a;
      if (ctx.mounted$) {
        const res = component.render(ctx, ...args);
        return res.children === null || typeof res.children === "string" ? createElementVNode(res.type, res.props, res.children, res.patchFlag, res.dynamicProps, res.shapeFlag) : h$1(res);
      } else {
        return h$1("div", (_a = ctx.$attrs) != null ? _a : ctx._.attrs);
      }
    };
  } else if (clone.template) {
    clone.template = `
      <template v-if="mounted$">${component.template}</template>
      <template v-else><div></div></template>
    `;
  }
  clone.setup = (props, ctx) => {
    var _a;
    const mounted$ = ref(false);
    return Promise.resolve(((_a = component.setup) == null ? void 0 : _a.call(component, props, ctx)) || {}).then((setupState) => {
      return typeof setupState !== "function" ? { ...setupState, mounted$ } : (...args) => {
        if (mounted$.value) {
          const res = setupState(...args);
          return res.children === null || typeof res.children === "string" ? createElementVNode(res.type, res.props, res.children, res.patchFlag, res.dynamicProps, res.shapeFlag) : h$1(res);
        } else {
          return h$1("div", ctx.attrs);
        }
      };
    });
  };
  cache.set(component, clone);
  return clone;
}
const clientOnly$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: clientOnly,
  createClientOnly
}, Symbol.toStringTag, { value: "Module" }));
const devOnly = defineComponent({
  name: "DevOnly",
  setup(_2, props) {
    return () => null;
  }
});
const devOnly$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: devOnly
}, Symbol.toStringTag, { value: "Module" }));
const serverPlaceholder = defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const serverPlaceholder$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: serverPlaceholder
}, Symbol.toStringTag, { value: "Module" }));
const nuxtLoadingIndicator = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: String,
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    }
  },
  setup(props, { slots }) {
    const indicator = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle
    });
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", indicator.start);
    nuxtApp.hook("page:finish", indicator.finish);
    return () => h$1("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: `${indicator.progress.value}%`,
        height: `${props.height}px`,
        opacity: indicator.isLoading.value ? 1 : 0,
        background: props.color,
        backgroundSize: `${100 / indicator.progress.value * 100}% auto`,
        transition: "width 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
function useLoadingIndicator(opts) {
  const progress = ref(0);
  const isLoading = ref(false);
  computed(() => 1e4 / opts.duration);
  let _timer = null;
  let _throttle = null;
  function start() {
    clear();
    progress.value = 0;
    isLoading.value = true;
    if (opts.throttle)
      ;
  }
  function finish() {
    progress.value = 100;
    _hide();
  }
  function clear() {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  }
  function _hide() {
    clear();
  }
  return {
    progress,
    isLoading,
    start,
    finish,
    clear
  };
}
const nuxtLoadingIndicator$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nuxtLoadingIndicator
}, Symbol.toStringTag, { value: "Module" }));
function u$5(r2, n2, ...a2) {
  if (r2 in n2) {
    let e2 = n2[r2];
    return typeof e2 == "function" ? e2(...a2) : e2;
  }
  let t2 = new Error(`Tried to handle "${r2}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e2) => `"${e2}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t2, u$5), t2;
}
var N$1 = ((o2) => (o2[o2.None = 0] = "None", o2[o2.RenderStrategy = 1] = "RenderStrategy", o2[o2.Static = 2] = "Static", o2))(N$1 || {}), S$3 = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(S$3 || {});
function H$1({ visible: r2 = true, features: t2 = 0, ourProps: e2, theirProps: o2, ...i2 }) {
  var a2;
  let n2 = j$3(o2, e2), l2 = Object.assign(i2, { props: n2 });
  if (r2 || t2 & 2 && n2.static)
    return y$1(l2);
  if (t2 & 1) {
    let d2 = (a2 = n2.unmount) == null || a2 ? 0 : 1;
    return u$5(d2, { [0]() {
      return null;
    }, [1]() {
      return y$1({ ...i2, props: { ...n2, hidden: true, style: { display: "none" } } });
    } });
  }
  return y$1(l2);
}
function y$1({ props: r2, attrs: t2, slots: e2, slot: o2, name: i2 }) {
  var m2, h2;
  let { as: n2, ...l2 } = T$2(r2, ["unmount", "static"]), a2 = (m2 = e2.default) == null ? void 0 : m2.call(e2, o2), d2 = {};
  if (o2) {
    let u2 = false, c2 = [];
    for (let [p2, f2] of Object.entries(o2))
      typeof f2 == "boolean" && (u2 = true), f2 === true && c2.push(p2);
    u2 && (d2["data-headlessui-state"] = c2.join(" "));
  }
  if (n2 === "template") {
    if (a2 = b$2(a2 != null ? a2 : []), Object.keys(l2).length > 0 || Object.keys(t2).length > 0) {
      let [u2, ...c2] = a2 != null ? a2 : [];
      if (!v$2(u2) || c2.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${i2} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(l2).concat(Object.keys(t2)).map((s2) => s2.trim()).filter((s2, g2, R2) => R2.indexOf(s2) === g2).sort((s2, g2) => s2.localeCompare(g2)).map((s2) => `  - ${s2}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((s2) => `  - ${s2}`).join(`
`)].join(`
`));
      let p2 = j$3((h2 = u2.props) != null ? h2 : {}, l2), f2 = cloneVNode(u2, p2);
      for (let s2 in p2)
        s2.startsWith("on") && (f2.props || (f2.props = {}), f2.props[s2] = p2[s2]);
      return f2;
    }
    return Array.isArray(a2) && a2.length === 1 ? a2[0] : a2;
  }
  return h$1(n2, Object.assign({}, l2, d2), { default: () => a2 });
}
function b$2(r2) {
  return r2.flatMap((t2) => t2.type === Fragment ? b$2(t2.children) : [t2]);
}
function j$3(...r2) {
  if (r2.length === 0)
    return {};
  if (r2.length === 1)
    return r2[0];
  let t2 = {}, e2 = {};
  for (let i2 of r2)
    for (let n2 in i2)
      n2.startsWith("on") && typeof i2[n2] == "function" ? (e2[n2] != null || (e2[n2] = []), e2[n2].push(i2[n2])) : t2[n2] = i2[n2];
  if (t2.disabled || t2["aria-disabled"])
    return Object.assign(t2, Object.fromEntries(Object.keys(e2).map((i2) => [i2, void 0])));
  for (let i2 in e2)
    Object.assign(t2, { [i2](n2, ...l2) {
      let a2 = e2[i2];
      for (let d2 of a2) {
        if (n2 instanceof Event && n2.defaultPrevented)
          return;
        d2(n2, ...l2);
      }
    } });
  return t2;
}
function K$1(r2) {
  let t2 = Object.assign({}, r2);
  for (let e2 in t2)
    t2[e2] === void 0 && delete t2[e2];
  return t2;
}
function T$2(r2, t2 = []) {
  let e2 = Object.assign({}, r2);
  for (let o2 of t2)
    o2 in e2 && delete e2[o2];
  return e2;
}
function v$2(r2) {
  return r2 == null ? false : typeof r2.type == "string" || typeof r2.type == "object" || typeof r2.type == "function";
}
let e$2 = 0;
function n$3() {
  return ++e$2;
}
function t$2() {
  return n$3();
}
var o$3 = ((r2) => (r2.Space = " ", r2.Enter = "Enter", r2.Escape = "Escape", r2.Backspace = "Backspace", r2.Delete = "Delete", r2.ArrowLeft = "ArrowLeft", r2.ArrowUp = "ArrowUp", r2.ArrowRight = "ArrowRight", r2.ArrowDown = "ArrowDown", r2.Home = "Home", r2.End = "End", r2.PageUp = "PageUp", r2.PageDown = "PageDown", r2.Tab = "Tab", r2))(o$3 || {});
function f$4(r2) {
  throw new Error("Unexpected object: " + r2);
}
var a$4 = ((e2) => (e2[e2.First = 0] = "First", e2[e2.Previous = 1] = "Previous", e2[e2.Next = 2] = "Next", e2[e2.Last = 3] = "Last", e2[e2.Specific = 4] = "Specific", e2[e2.Nothing = 5] = "Nothing", e2))(a$4 || {});
function x$2(r2, n2) {
  let t2 = n2.resolveItems();
  if (t2.length <= 0)
    return null;
  let l2 = n2.resolveActiveIndex(), s2 = l2 != null ? l2 : -1, d2 = (() => {
    switch (r2.focus) {
      case 0:
        return t2.findIndex((e2) => !n2.resolveDisabled(e2));
      case 1: {
        let e2 = t2.slice().reverse().findIndex((i2, c2, u2) => s2 !== -1 && u2.length - c2 - 1 >= s2 ? false : !n2.resolveDisabled(i2));
        return e2 === -1 ? e2 : t2.length - 1 - e2;
      }
      case 2:
        return t2.findIndex((e2, i2) => i2 <= s2 ? false : !n2.resolveDisabled(e2));
      case 3: {
        let e2 = t2.slice().reverse().findIndex((i2) => !n2.resolveDisabled(i2));
        return e2 === -1 ? e2 : t2.length - 1 - e2;
      }
      case 4:
        return t2.findIndex((e2) => n2.resolveId(e2) === r2.id);
      case 5:
        return null;
      default:
        f$4(r2);
    }
  })();
  return d2 === -1 ? l2 : d2;
}
function o$2(n2) {
  var l2;
  return n2 == null || n2.value == null ? null : (l2 = n2.value.$el) != null ? l2 : n2.value;
}
let n$2 = Symbol("Context");
var l$3 = ((e2) => (e2[e2.Open = 0] = "Open", e2[e2.Closed = 1] = "Closed", e2))(l$3 || {});
function f$3() {
  return p$5() !== null;
}
function p$5() {
  return inject(n$2, null);
}
function c$2(o2) {
  provide(n$2, o2);
}
function r$2(t2, e2) {
  if (t2)
    return t2;
  let n2 = e2 != null ? e2 : "button";
  if (typeof n2 == "string" && n2.toLowerCase() === "button")
    return "button";
}
function b$1(t2, e2) {
  let n2 = ref(r$2(t2.value.type, t2.value.as));
  return onMounted(() => {
    n2.value = r$2(t2.value.type, t2.value.as);
  }), watchEffect(() => {
    var o2;
    n2.value || !o$2(e2) || o$2(e2) instanceof HTMLButtonElement && !((o2 = o$2(e2)) != null && o2.hasAttribute("type")) && (n2.value = "button");
  }), n2;
}
class t$1 {
  constructor() {
    this.current = this.detect();
    this.currentId = 0;
  }
  set(e2) {
    this.current !== e2 && (this.currentId = 0, this.current = e2);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return "server";
  }
}
let n$1 = new t$1();
function m$3(r2) {
  if (n$1.isServer)
    return null;
  if (r2 instanceof Node)
    return r2.ownerDocument;
  if (r2 != null && r2.hasOwnProperty("value")) {
    let n2 = o$2(r2);
    if (n2)
      return n2.ownerDocument;
  }
  return document;
}
function p$4({ container: e2, accept: t2, walk: d2, enabled: o2 }) {
  watchEffect(() => {
    let r2 = e2.value;
    if (!r2 || o2 !== void 0 && !o2.value)
      return;
    let l2 = m$3(e2);
    if (!l2)
      return;
    let c2 = Object.assign((f2) => t2(f2), { acceptNode: t2 }), n2 = l2.createTreeWalker(r2, NodeFilter.SHOW_ELEMENT, c2, false);
    for (; n2.nextNode(); )
      d2(n2.currentNode);
  });
}
let f$2 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e2) => `${e2}:not([tabindex='-1'])`).join(",");
var N = ((r2) => (r2[r2.First = 1] = "First", r2[r2.Previous = 2] = "Previous", r2[r2.Next = 4] = "Next", r2[r2.Last = 8] = "Last", r2[r2.WrapAround = 16] = "WrapAround", r2[r2.NoScroll = 32] = "NoScroll", r2))(N || {}), T$1 = ((o2) => (o2[o2.Error = 0] = "Error", o2[o2.Overflow = 1] = "Overflow", o2[o2.Success = 2] = "Success", o2[o2.Underflow = 3] = "Underflow", o2))(T$1 || {}), h = ((n2) => (n2[n2.Previous = -1] = "Previous", n2[n2.Next = 1] = "Next", n2))(h || {});
function d$7(e2 = document.body) {
  return e2 == null ? [] : Array.from(e2.querySelectorAll(f$2)).sort((t2, n2) => Math.sign((t2.tabIndex || Number.MAX_SAFE_INTEGER) - (n2.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var F$2 = ((n2) => (n2[n2.Strict = 0] = "Strict", n2[n2.Loose = 1] = "Loose", n2))(F$2 || {});
function S$2(e2, t2 = 0) {
  var n2;
  return e2 === ((n2 = m$3(e2)) == null ? void 0 : n2.body) ? false : u$5(t2, { [0]() {
    return e2.matches(f$2);
  }, [1]() {
    let l2 = e2;
    for (; l2 !== null; ) {
      if (l2.matches(f$2))
        return true;
      l2 = l2.parentElement;
    }
    return false;
  } });
}
function v$1(e2) {
  let t2 = m$3(e2);
  nextTick(() => {
    t2 && !S$2(t2.activeElement, 0) && H(e2);
  });
}
function H(e2) {
  e2 == null || e2.focus({ preventScroll: true });
}
let w$1 = ["textarea", "input"].join(",");
function A$1(e2) {
  var t2, n2;
  return (n2 = (t2 = e2 == null ? void 0 : e2.matches) == null ? void 0 : t2.call(e2, w$1)) != null ? n2 : false;
}
function I(e2, t2 = (n2) => n2) {
  return e2.slice().sort((n2, l2) => {
    let o2 = t2(n2), i2 = t2(l2);
    if (o2 === null || i2 === null)
      return 0;
    let r2 = o2.compareDocumentPosition(i2);
    return r2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : r2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function D$1(e2, t2) {
  return O(d$7(), t2, { relativeTo: e2 });
}
function O(e2, t2, { sorted: n2 = true, relativeTo: l2 = null, skipElements: o2 = [] } = {}) {
  var m2;
  let i2 = (m2 = Array.isArray(e2) ? e2.length > 0 ? e2[0].ownerDocument : document : e2 == null ? void 0 : e2.ownerDocument) != null ? m2 : document, r2 = Array.isArray(e2) ? n2 ? I(e2) : e2 : d$7(e2);
  o2.length > 0 && r2.length > 1 && (r2 = r2.filter((s2) => !o2.includes(s2))), l2 = l2 != null ? l2 : i2.activeElement;
  let x2 = (() => {
    if (t2 & 5)
      return 1;
    if (t2 & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p2 = (() => {
    if (t2 & 1)
      return 0;
    if (t2 & 2)
      return Math.max(0, r2.indexOf(l2)) - 1;
    if (t2 & 4)
      return Math.max(0, r2.indexOf(l2)) + 1;
    if (t2 & 8)
      return r2.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), M2 = t2 & 32 ? { preventScroll: true } : {}, c2 = 0, a2 = r2.length, u2;
  do {
    if (c2 >= a2 || c2 + a2 <= 0)
      return 0;
    let s2 = p2 + c2;
    if (t2 & 16)
      s2 = (s2 + a2) % a2;
    else {
      if (s2 < 0)
        return 3;
      if (s2 >= a2)
        return 1;
    }
    u2 = r2[s2], u2 == null || u2.focus(M2), c2 += x2;
  } while (u2 !== i2.activeElement);
  return t2 & 6 && A$1(u2) && u2.select(), u2.hasAttribute("tabindex") || u2.setAttribute("tabindex", "0"), 2;
}
function u$4(e2, t2, n2) {
  n$1.isServer || watchEffect((o2) => {
    document.addEventListener(e2, t2, n2), o2(() => document.removeEventListener(e2, t2, n2));
  });
}
function y(f2, m2, i2 = computed(() => true)) {
  function a2(e2, u2) {
    if (!i2.value || e2.defaultPrevented)
      return;
    let n2 = u2(e2);
    if (n2 === null || !n2.getRootNode().contains(n2))
      return;
    let c2 = function o2(t2) {
      return typeof t2 == "function" ? o2(t2()) : Array.isArray(t2) || t2 instanceof Set ? t2 : [t2];
    }(f2);
    for (let o2 of c2) {
      if (o2 === null)
        continue;
      let t2 = o2 instanceof HTMLElement ? o2 : o$2(o2);
      if (t2 != null && t2.contains(n2) || e2.composed && e2.composedPath().includes(t2))
        return;
    }
    return !S$2(n2, F$2.Loose) && n2.tabIndex !== -1 && e2.preventDefault(), m2(e2, n2);
  }
  let r2 = ref(null);
  u$4("mousedown", (e2) => {
    var u2, n2;
    i2.value && (r2.value = ((n2 = (u2 = e2.composedPath) == null ? void 0 : u2.call(e2)) == null ? void 0 : n2[0]) || e2.target);
  }, true), u$4("click", (e2) => {
    !r2.value || (a2(e2, () => r2.value), r2.value = null);
  }, true), u$4("blur", (e2) => a2(e2, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), true);
}
var a$3 = ((e2) => (e2[e2.None = 1] = "None", e2[e2.Focusable = 2] = "Focusable", e2[e2.Hidden = 4] = "Hidden", e2))(a$3 || {});
let f$1 = defineComponent({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(r2, { slots: t2, attrs: d2 }) {
  return () => {
    let { features: e2, ...o2 } = r2, n2 = { "aria-hidden": (e2 & 2) === 2 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(e2 & 4) === 4 && (e2 & 2) !== 2 && { display: "none" } } };
    return H$1({ ourProps: n2, theirProps: o2, slot: {}, attrs: d2, slots: t2, name: "Hidden" });
  };
} });
function e$1(n2 = {}, r2 = null, t2 = []) {
  for (let [i2, o2] of Object.entries(n2))
    f(t2, s$1(r2, i2), o2);
  return t2;
}
function s$1(n2, r2) {
  return n2 ? n2 + "[" + r2 + "]" : r2;
}
function f(n2, r2, t2) {
  if (Array.isArray(t2))
    for (let [i2, o2] of t2.entries())
      f(n2, s$1(r2, i2.toString()), o2);
  else
    t2 instanceof Date ? n2.push([r2, t2.toISOString()]) : typeof t2 == "boolean" ? n2.push([r2, t2 ? "1" : "0"]) : typeof t2 == "string" ? n2.push([r2, t2]) : typeof t2 == "number" ? n2.push([r2, `${t2}`]) : t2 == null ? n2.push([r2, ""]) : e$1(t2, r2, n2);
}
function p$3(n2) {
  var t2;
  let r2 = (t2 = n2 == null ? void 0 : n2.form) != null ? t2 : n2.closest("form");
  if (!!r2) {
    for (let i2 of r2.elements)
      if (i2.tagName === "INPUT" && i2.type === "submit" || i2.tagName === "BUTTON" && i2.type === "submit" || i2.nodeName === "INPUT" && i2.type === "image") {
        i2.click();
        return;
      }
  }
}
function d$6(u2, e2, r2) {
  let i2 = ref(r2 == null ? void 0 : r2.value), f2 = computed(() => u2.value !== void 0);
  return [computed(() => f2.value ? u2.value : i2.value), function(t2) {
    return f2.value || (i2.value = t2), e2 == null ? void 0 : e2(t2);
  }];
}
function r$1(e2) {
  return [e2.screenX, e2.screenY];
}
function u$3() {
  let e2 = ref([-1, -1]);
  return { wasMoved(n2) {
    let t2 = r$1(n2);
    return e2.value[0] === t2[0] && e2.value[1] === t2[1] ? false : (e2.value = t2, true);
  }, update(n2) {
    e2.value = r$1(n2);
  } };
}
function fe$2(l2, O2) {
  return l2 === O2;
}
var be$1 = ((r2) => (r2[r2.Open = 0] = "Open", r2[r2.Closed = 1] = "Closed", r2))(be$1 || {}), ve$1 = ((r2) => (r2[r2.Single = 0] = "Single", r2[r2.Multi = 1] = "Multi", r2))(ve$1 || {}), ce$2 = ((r2) => (r2[r2.Pointer = 0] = "Pointer", r2[r2.Other = 1] = "Other", r2))(ce$2 || {});
let G = Symbol("ComboboxContext");
function B$3(l2) {
  let O2 = inject(G, null);
  if (O2 === null) {
    let r2 = new Error(`<${l2} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r2, B$3), r2;
  }
  return O2;
}
let je$2 = defineComponent({ name: "Combobox", emits: { "update:modelValue": (l2) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], default: () => fe$2 }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, name: { type: String }, nullable: { type: Boolean, default: false }, multiple: { type: [Boolean], default: false } }, inheritAttrs: false, setup(l2, { slots: O2, attrs: r2, emit: I$1 }) {
  let e2 = ref(1), t2 = ref(null), p2 = ref(null), h2 = ref(null), s2 = ref(null), b2 = ref({ static: false, hold: false }), x2 = ref([]), S2 = ref(null), g2 = ref(1), T2 = ref(false);
  function A2(n2 = (a2) => a2) {
    let a2 = S2.value !== null ? x2.value[S2.value] : null, u2 = I(n2(x2.value.slice()), (f2) => o$2(f2.dataRef.domRef)), i2 = a2 ? u2.indexOf(a2) : null;
    return i2 === -1 && (i2 = null), { options: u2, activeOptionIndex: i2 };
  }
  let M2 = computed(() => l2.multiple ? 1 : 0), o2 = computed(() => l2.nullable), [v2, c2] = d$6(computed(() => l2.modelValue === void 0 ? u$5(M2.value, { [1]: [], [0]: void 0 }) : l2.modelValue), (n2) => I$1("update:modelValue", n2), computed(() => l2.defaultValue)), d2 = { comboboxState: e2, value: v2, mode: M2, compare(n2, a2) {
    if (typeof l2.by == "string") {
      let u2 = l2.by;
      return (n2 == null ? void 0 : n2[u2]) === (a2 == null ? void 0 : a2[u2]);
    }
    return l2.by(n2, a2);
  }, defaultValue: computed(() => l2.defaultValue), nullable: o2, inputRef: p2, labelRef: t2, buttonRef: h2, optionsRef: s2, disabled: computed(() => l2.disabled), options: x2, change(n2) {
    c2(n2);
  }, activeOptionIndex: computed(() => {
    if (T2.value && S2.value === null && x2.value.length > 0) {
      let n2 = x2.value.findIndex((a2) => !a2.dataRef.disabled);
      if (n2 !== -1)
        return n2;
    }
    return S2.value;
  }), activationTrigger: g2, optionsPropsRef: b2, closeCombobox() {
    T2.value = false, !l2.disabled && e2.value !== 1 && (e2.value = 1, S2.value = null);
  }, openCombobox() {
    if (T2.value = true, l2.disabled || e2.value === 0)
      return;
    let n2 = x2.value.findIndex((a2) => {
      let u2 = toRaw(a2.dataRef.value);
      return u$5(M2.value, { [0]: () => d2.compare(toRaw(d2.value.value), toRaw(u2)), [1]: () => toRaw(d2.value.value).some((f2) => d2.compare(toRaw(f2), toRaw(u2))) });
    });
    n2 !== -1 && (S2.value = n2), e2.value = 0;
  }, goToOption(n2, a2, u2) {
    if (T2.value = false, l2.disabled || s2.value && !b2.value.static && e2.value === 1)
      return;
    let i2 = A2();
    if (i2.activeOptionIndex === null) {
      let P2 = i2.options.findIndex((H2) => !H2.dataRef.disabled);
      P2 !== -1 && (i2.activeOptionIndex = P2);
    }
    let f2 = x$2(n2 === a$4.Specific ? { focus: a$4.Specific, id: a2 } : { focus: n2 }, { resolveItems: () => i2.options, resolveActiveIndex: () => i2.activeOptionIndex, resolveId: (P2) => P2.id, resolveDisabled: (P2) => P2.dataRef.disabled });
    S2.value = f2, g2.value = u2 != null ? u2 : 1, x2.value = i2.options;
  }, selectOption(n2) {
    let a2 = x2.value.find((i2) => i2.id === n2);
    if (!a2)
      return;
    let { dataRef: u2 } = a2;
    c2(u$5(M2.value, { [0]: () => u2.value, [1]: () => {
      let i2 = toRaw(d2.value.value).slice(), f2 = toRaw(u2.value), P2 = i2.findIndex((H2) => d2.compare(f2, toRaw(H2)));
      return P2 === -1 ? i2.push(f2) : i2.splice(P2, 1), i2;
    } }));
  }, selectActiveOption() {
    if (d2.activeOptionIndex.value === null)
      return;
    let { dataRef: n2, id: a2 } = x2.value[d2.activeOptionIndex.value];
    c2(u$5(M2.value, { [0]: () => n2.value, [1]: () => {
      let u2 = toRaw(d2.value.value).slice(), i2 = toRaw(n2.value), f2 = u2.findIndex((P2) => d2.compare(i2, toRaw(P2)));
      return f2 === -1 ? u2.push(i2) : u2.splice(f2, 1), u2;
    } })), d2.goToOption(a$4.Specific, a2);
  }, registerOption(n2, a2) {
    let u2 = { id: n2, dataRef: a2 }, i2 = A2((f2) => [...f2, u2]);
    if (S2.value === null) {
      let f2 = a2.value.value;
      u$5(M2.value, { [0]: () => d2.compare(toRaw(d2.value.value), toRaw(f2)), [1]: () => toRaw(d2.value.value).some((H2) => d2.compare(toRaw(H2), toRaw(f2))) }) && (i2.activeOptionIndex = i2.options.indexOf(u2));
    }
    x2.value = i2.options, S2.value = i2.activeOptionIndex, g2.value = 1;
  }, unregisterOption(n2) {
    let a2 = A2((u2) => {
      let i2 = u2.findIndex((f2) => f2.id === n2);
      return i2 !== -1 && u2.splice(i2, 1), u2;
    });
    x2.value = a2.options, S2.value = a2.activeOptionIndex, g2.value = 1;
  } };
  y([p2, h2, s2], () => d2.closeCombobox(), computed(() => e2.value === 0)), provide(G, d2), c$2(computed(() => u$5(e2.value, { [0]: l$3.Open, [1]: l$3.Closed })));
  let D2 = computed(() => d2.activeOptionIndex.value === null ? null : x2.value[d2.activeOptionIndex.value].dataRef.value), k2 = computed(() => {
    var n2;
    return (n2 = o$2(p2)) == null ? void 0 : n2.closest("form");
  });
  return onMounted(() => {
    watch([k2], () => {
      if (!k2.value || l2.defaultValue === void 0)
        return;
      function n2() {
        d2.change(l2.defaultValue);
      }
      return k2.value.addEventListener("reset", n2), () => {
        var a2;
        (a2 = k2.value) == null || a2.removeEventListener("reset", n2);
      };
    }, { immediate: true });
  }), () => {
    let { name: n2, disabled: a2, ...u2 } = l2, i2 = { open: e2.value === 0, disabled: a2, activeIndex: d2.activeOptionIndex.value, activeOption: D2.value, value: v2.value };
    return h$1(Fragment, [...n2 != null && v2.value != null ? e$1({ [n2]: v2.value }).map(([f2, P2]) => h$1(f$1, K$1({ features: a$3.Hidden, key: f2, as: "input", type: "hidden", hidden: true, readOnly: true, name: f2, value: P2 }))) : [], H$1({ theirProps: { ...r2, ...T$2(u2, ["modelValue", "defaultValue", "nullable", "multiple", "onUpdate:modelValue", "by"]) }, ourProps: {}, slot: i2, slots: O2, attrs: r2, name: "Combobox" })]);
  };
} }), Be$3 = defineComponent({ name: "ComboboxLabel", props: { as: { type: [Object, String], default: "label" }, id: { type: String, default: () => `headlessui-combobox-label-${t$2()}` } }, setup(l2, { attrs: O2, slots: r2 }) {
  let I2 = B$3("ComboboxLabel");
  function e2() {
    var t2;
    (t2 = o$2(I2.inputRef)) == null || t2.focus({ preventScroll: true });
  }
  return () => {
    let t2 = { open: I2.comboboxState.value === 0, disabled: I2.disabled.value }, { id: p2, ...h2 } = l2, s2 = { id: p2, ref: I2.labelRef, onClick: e2 };
    return H$1({ ourProps: s2, theirProps: h2, slot: t2, attrs: O2, slots: r2, name: "ComboboxLabel" });
  };
} }), He$2 = defineComponent({ name: "ComboboxButton", props: { as: { type: [Object, String], default: "button" }, id: { type: String, default: () => `headlessui-combobox-button-${t$2()}` } }, setup(l2, { attrs: O2, slots: r2, expose: I2 }) {
  let e2 = B$3("ComboboxButton");
  I2({ el: e2.buttonRef, $el: e2.buttonRef });
  function t2(s2) {
    e2.disabled.value || (e2.comboboxState.value === 0 ? e2.closeCombobox() : (s2.preventDefault(), e2.openCombobox()), nextTick(() => {
      var b2;
      return (b2 = o$2(e2.inputRef)) == null ? void 0 : b2.focus({ preventScroll: true });
    }));
  }
  function p2(s2) {
    switch (s2.key) {
      case o$3.ArrowDown:
        s2.preventDefault(), s2.stopPropagation(), e2.comboboxState.value === 1 && e2.openCombobox(), nextTick(() => {
          var b2;
          return (b2 = e2.inputRef.value) == null ? void 0 : b2.focus({ preventScroll: true });
        });
        return;
      case o$3.ArrowUp:
        s2.preventDefault(), s2.stopPropagation(), e2.comboboxState.value === 1 && (e2.openCombobox(), nextTick(() => {
          e2.value.value || e2.goToOption(a$4.Last);
        })), nextTick(() => {
          var b2;
          return (b2 = e2.inputRef.value) == null ? void 0 : b2.focus({ preventScroll: true });
        });
        return;
      case o$3.Escape:
        if (e2.comboboxState.value !== 0)
          return;
        s2.preventDefault(), e2.optionsRef.value && !e2.optionsPropsRef.value.static && s2.stopPropagation(), e2.closeCombobox(), nextTick(() => {
          var b2;
          return (b2 = e2.inputRef.value) == null ? void 0 : b2.focus({ preventScroll: true });
        });
        return;
    }
  }
  let h2 = b$1(computed(() => ({ as: l2.as, type: O2.type })), e2.buttonRef);
  return () => {
    var g2, T2;
    let s2 = { open: e2.comboboxState.value === 0, disabled: e2.disabled.value, value: e2.value.value }, { id: b2, ...x2 } = l2, S2 = { ref: e2.buttonRef, id: b2, type: h2.value, tabindex: "-1", "aria-haspopup": "listbox", "aria-controls": (g2 = o$2(e2.optionsRef)) == null ? void 0 : g2.id, "aria-expanded": e2.disabled.value ? void 0 : e2.comboboxState.value === 0, "aria-labelledby": e2.labelRef.value ? [(T2 = o$2(e2.labelRef)) == null ? void 0 : T2.id, b2].join(" ") : void 0, disabled: e2.disabled.value === true ? true : void 0, onKeydown: p2, onClick: t2 };
    return H$1({ ourProps: S2, theirProps: x2, slot: s2, attrs: O2, slots: r2, name: "ComboboxButton" });
  };
} }), Ne$1 = defineComponent({ name: "ComboboxInput", props: { as: { type: [Object, String], default: "input" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, displayValue: { type: Function }, defaultValue: { type: String, default: void 0 }, id: { type: String, default: () => `headlessui-combobox-input-${t$2()}` } }, emits: { change: (l2) => true }, setup(l2, { emit: O2, attrs: r2, slots: I2, expose: e2 }) {
  let t2 = B$3("ComboboxInput"), p2 = { value: false };
  e2({ el: t2.inputRef, $el: t2.inputRef });
  let h2 = computed(() => {
    var v2;
    let o2 = t2.value.value;
    return o$2(t2.inputRef) ? typeof l2.displayValue != "undefined" && o2 !== void 0 ? (v2 = l2.displayValue(o2)) != null ? v2 : "" : typeof o2 == "string" ? o2 : "" : "";
  });
  onMounted(() => {
    watch([h2, t2.comboboxState], ([o2, v2], [c2, d2]) => {
      if (p2.value)
        return;
      let D2 = o$2(t2.inputRef);
      !D2 || (d2 === 0 && v2 === 1 || o2 !== c2) && (D2.value = o2);
    }, { immediate: true }), watch([t2.comboboxState], ([o2], [v2]) => {
      if (o2 === 0 && v2 === 1) {
        let c2 = o$2(t2.inputRef);
        if (!c2)
          return;
        let d2 = c2.value, { selectionStart: D2, selectionEnd: k2, selectionDirection: n2 } = c2;
        c2.value = "", c2.value = d2, n2 !== null ? c2.setSelectionRange(D2, k2, n2) : c2.setSelectionRange(D2, k2);
      }
    });
  });
  let s2 = ref(false);
  function b2() {
    s2.value = true;
  }
  function x2() {
    setTimeout(() => {
      s2.value = false;
    });
  }
  function S2(o2) {
    switch (p2.value = true, o2.key) {
      case o$3.Backspace:
      case o$3.Delete:
        if (t2.mode.value !== 0 || !t2.nullable.value)
          return;
        let v2 = o2.currentTarget;
        requestAnimationFrame(() => {
          if (v2.value === "") {
            t2.change(null);
            let c2 = o$2(t2.optionsRef);
            c2 && (c2.scrollTop = 0), t2.goToOption(a$4.Nothing);
          }
        });
        break;
      case o$3.Enter:
        if (p2.value = false, t2.comboboxState.value !== 0 || s2.value)
          return;
        if (o2.preventDefault(), o2.stopPropagation(), t2.activeOptionIndex.value === null) {
          t2.closeCombobox();
          return;
        }
        t2.selectActiveOption(), t2.mode.value === 0 && t2.closeCombobox();
        break;
      case o$3.ArrowDown:
        return p2.value = false, o2.preventDefault(), o2.stopPropagation(), u$5(t2.comboboxState.value, { [0]: () => t2.goToOption(a$4.Next), [1]: () => t2.openCombobox() });
      case o$3.ArrowUp:
        return p2.value = false, o2.preventDefault(), o2.stopPropagation(), u$5(t2.comboboxState.value, { [0]: () => t2.goToOption(a$4.Previous), [1]: () => {
          t2.openCombobox(), nextTick(() => {
            t2.value.value || t2.goToOption(a$4.Last);
          });
        } });
      case o$3.Home:
        if (o2.shiftKey)
          break;
        return p2.value = false, o2.preventDefault(), o2.stopPropagation(), t2.goToOption(a$4.First);
      case o$3.PageUp:
        return p2.value = false, o2.preventDefault(), o2.stopPropagation(), t2.goToOption(a$4.First);
      case o$3.End:
        if (o2.shiftKey)
          break;
        return p2.value = false, o2.preventDefault(), o2.stopPropagation(), t2.goToOption(a$4.Last);
      case o$3.PageDown:
        return p2.value = false, o2.preventDefault(), o2.stopPropagation(), t2.goToOption(a$4.Last);
      case o$3.Escape:
        if (p2.value = false, t2.comboboxState.value !== 0)
          return;
        o2.preventDefault(), t2.optionsRef.value && !t2.optionsPropsRef.value.static && o2.stopPropagation(), t2.closeCombobox();
        break;
      case o$3.Tab:
        if (p2.value = false, t2.comboboxState.value !== 0)
          return;
        t2.mode.value === 0 && t2.selectActiveOption(), t2.closeCombobox();
        break;
    }
  }
  function g2(o2) {
    O2("change", o2);
  }
  function T2(o2) {
    t2.openCombobox(), O2("change", o2);
  }
  function A2() {
    p2.value = false;
  }
  let M2 = computed(() => {
    var o2, v2, c2, d2;
    return (d2 = (c2 = (v2 = l2.defaultValue) != null ? v2 : t2.defaultValue.value !== void 0 ? (o2 = l2.displayValue) == null ? void 0 : o2.call(l2, t2.defaultValue.value) : null) != null ? c2 : t2.defaultValue.value) != null ? d2 : "";
  });
  return () => {
    var k2, n2, a2, u2, i2, f2;
    let o2 = { open: t2.comboboxState.value === 0 }, { id: v2, displayValue: c2, ...d2 } = l2, D2 = { "aria-controls": (k2 = t2.optionsRef.value) == null ? void 0 : k2.id, "aria-expanded": t2.disabled.value ? void 0 : t2.comboboxState.value === 0, "aria-activedescendant": t2.activeOptionIndex.value === null || (n2 = t2.options.value[t2.activeOptionIndex.value]) == null ? void 0 : n2.id, "aria-multiselectable": t2.mode.value === 1 ? true : void 0, "aria-labelledby": (i2 = (a2 = o$2(t2.labelRef)) == null ? void 0 : a2.id) != null ? i2 : (u2 = o$2(t2.buttonRef)) == null ? void 0 : u2.id, "aria-autocomplete": "list", id: v2, onCompositionstart: b2, onCompositionend: x2, onKeydown: S2, onChange: g2, onInput: T2, onBlur: A2, role: "combobox", type: (f2 = r2.type) != null ? f2 : "text", tabIndex: 0, ref: t2.inputRef, defaultValue: M2.value };
    return H$1({ ourProps: D2, theirProps: d2, slot: o2, attrs: r2, slots: I2, features: N$1.RenderStrategy | N$1.Static, name: "ComboboxInput" });
  };
} }), Ke$2 = defineComponent({ name: "ComboboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, hold: { type: [Boolean], default: false } }, setup(l2, { attrs: O2, slots: r2, expose: I2 }) {
  let e2 = B$3("ComboboxOptions"), t2 = `headlessui-combobox-options-${t$2()}`;
  I2({ el: e2.optionsRef, $el: e2.optionsRef }), watchEffect(() => {
    e2.optionsPropsRef.value.static = l2.static;
  }), watchEffect(() => {
    e2.optionsPropsRef.value.hold = l2.hold;
  });
  let p2 = p$5(), h2 = computed(() => p2 !== null ? p2.value === l$3.Open : e2.comboboxState.value === 0);
  return p$4({ container: computed(() => o$2(e2.optionsRef)), enabled: computed(() => e2.comboboxState.value === 0), accept(s2) {
    return s2.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : s2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(s2) {
    s2.setAttribute("role", "none");
  } }), () => {
    var S2, g2, T2;
    let s2 = { open: e2.comboboxState.value === 0 }, b2 = { "aria-labelledby": (T2 = (S2 = o$2(e2.labelRef)) == null ? void 0 : S2.id) != null ? T2 : (g2 = o$2(e2.buttonRef)) == null ? void 0 : g2.id, id: t2, ref: e2.optionsRef, role: "listbox" }, x2 = T$2(l2, ["hold"]);
    return H$1({ ourProps: b2, theirProps: x2, slot: s2, attrs: O2, slots: r2, features: N$1.RenderStrategy | N$1.Static, visible: h2.value, name: "ComboboxOptions" });
  };
} }), $e$1 = defineComponent({ name: "ComboboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false } }, setup(l2, { slots: O2, attrs: r2, expose: I2 }) {
  let e2 = B$3("ComboboxOption"), t2 = `headlessui-combobox-option-${t$2()}`, p2 = ref(null);
  I2({ el: p2, $el: p2 });
  let h2 = computed(() => e2.activeOptionIndex.value !== null ? e2.options.value[e2.activeOptionIndex.value].id === t2 : false), s2 = computed(() => u$5(e2.mode.value, { [0]: () => e2.compare(toRaw(e2.value.value), toRaw(l2.value)), [1]: () => toRaw(e2.value.value).some((o2) => e2.compare(toRaw(o2), toRaw(l2.value))) })), b2 = computed(() => ({ disabled: l2.disabled, value: l2.value, domRef: p2 }));
  onMounted(() => e2.registerOption(t2, b2)), onUnmounted(() => e2.unregisterOption(t2)), watchEffect(() => {
    e2.comboboxState.value === 0 && (!h2.value || e2.activationTrigger.value !== 0 && nextTick(() => {
      var o2, v2;
      return (v2 = (o2 = o$2(p2)) == null ? void 0 : o2.scrollIntoView) == null ? void 0 : v2.call(o2, { block: "nearest" });
    }));
  });
  function x2(o2) {
    if (l2.disabled)
      return o2.preventDefault();
    e2.selectOption(t2), e2.mode.value === 0 && e2.closeCombobox();
  }
  function S2() {
    if (l2.disabled)
      return e2.goToOption(a$4.Nothing);
    e2.goToOption(a$4.Specific, t2);
  }
  let g2 = u$3();
  function T2(o2) {
    g2.update(o2);
  }
  function A2(o2) {
    !g2.wasMoved(o2) || l2.disabled || h2.value || e2.goToOption(a$4.Specific, t2, 0);
  }
  function M2(o2) {
    !g2.wasMoved(o2) || l2.disabled || !h2.value || e2.optionsPropsRef.value.hold || e2.goToOption(a$4.Nothing);
  }
  return () => {
    let { disabled: o2 } = l2, v2 = { active: h2.value, selected: s2.value, disabled: o2 }, c2 = { id: t2, ref: p2, role: "option", tabIndex: o2 === true ? void 0 : -1, "aria-disabled": o2 === true ? true : void 0, "aria-selected": s2.value, disabled: void 0, onClick: x2, onFocus: S2, onPointerenter: T2, onMouseenter: T2, onPointermove: A2, onMousemove: A2, onPointerleave: M2, onMouseleave: M2 };
    return H$1({ ourProps: c2, theirProps: l2, slot: v2, attrs: r2, slots: O2, name: "ComboboxOption" });
  };
} });
const combobox = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Combobox: je$2,
  ComboboxButton: He$2,
  ComboboxInput: Ne$1,
  ComboboxLabel: Be$3,
  ComboboxOption: $e$1,
  ComboboxOptions: Ke$2
}, Symbol.toStringTag, { value: "Module" }));
function w(e2, n2, t2) {
  n$1.isServer || watchEffect((o2) => {
    window.addEventListener(e2, n2, t2), o2(() => window.removeEventListener(e2, n2, t2));
  });
}
var d$5 = ((r2) => (r2[r2.Forwards = 0] = "Forwards", r2[r2.Backwards = 1] = "Backwards", r2))(d$5 || {});
function n() {
  let o2 = ref(0);
  return w("keydown", (e2) => {
    e2.key === "Tab" && (o2.value = e2.shiftKey ? 1 : 0);
  }), o2;
}
function E$2(n2, e2, o2, r2) {
  n$1.isServer || watchEffect((t2) => {
    n2 = n2 != null ? n2 : window, n2.addEventListener(e2, o2, r2), t2(() => n2.removeEventListener(e2, o2, r2));
  });
}
function t(e2) {
  typeof queueMicrotask == "function" ? queueMicrotask(e2) : Promise.resolve().then(e2).catch((o2) => setTimeout(() => {
    throw o2;
  }));
}
var P$1 = ((e2) => (e2[e2.None = 1] = "None", e2[e2.InitialFocus = 2] = "InitialFocus", e2[e2.TabLock = 4] = "TabLock", e2[e2.FocusLock = 8] = "FocusLock", e2[e2.RestoreFocus = 16] = "RestoreFocus", e2[e2.All = 30] = "All", e2))(P$1 || {});
let le$2 = Object.assign(defineComponent({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: Object, default: ref(/* @__PURE__ */ new Set()) } }, inheritAttrs: false, setup(l2, { attrs: i2, slots: n$12, expose: r2 }) {
  let t2 = ref(null);
  r2({ el: t2, $el: t2 });
  let o2 = computed(() => m$3(t2));
  U$2({ ownerDocument: o2 }, computed(() => Boolean(l2.features & 16)));
  let e2 = _({ ownerDocument: o2, container: t2, initialFocus: computed(() => l2.initialFocus) }, computed(() => Boolean(l2.features & 2)));
  q({ ownerDocument: o2, container: t2, containers: l2.containers, previousActiveElement: e2 }, computed(() => Boolean(l2.features & 8)));
  let s2 = n();
  function c2(a2) {
    let m2 = o$2(t2);
    if (!m2)
      return;
    ((p2) => p2())(() => {
      u$5(s2.value, { [d$5.Forwards]: () => {
        O(m2, N.First, { skipElements: [a2.relatedTarget] });
      }, [d$5.Backwards]: () => {
        O(m2, N.Last, { skipElements: [a2.relatedTarget] });
      } });
    });
  }
  let u2 = ref(false);
  function f2(a2) {
    a2.key === "Tab" && (u2.value = true, requestAnimationFrame(() => {
      u2.value = false;
    }));
  }
  function L2(a2) {
    var p2;
    let m2 = new Set((p2 = l2.containers) == null ? void 0 : p2.value);
    m2.add(t2);
    let d2 = a2.relatedTarget;
    d2 instanceof HTMLElement && d2.dataset.headlessuiFocusGuard !== "true" && (B$2(m2, d2) || (u2.value ? O(o$2(t2), u$5(s2.value, { [d$5.Forwards]: () => N.Next, [d$5.Backwards]: () => N.Previous }) | N.WrapAround, { relativeTo: a2.target }) : a2.target instanceof HTMLElement && H(a2.target)));
  }
  return () => {
    let a2 = {}, m2 = { ref: t2, onKeydown: f2, onFocusout: L2 }, { features: d2, initialFocus: p2, containers: G2, ...S2 } = l2;
    return h$1(Fragment, [Boolean(d2 & 4) && h$1(f$1, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: c2, features: a$3.Focusable }), H$1({ ourProps: m2, theirProps: { ...i2, ...S2 }, slot: a2, attrs: i2, slots: n$12, name: "FocusTrap" }), Boolean(d2 & 4) && h$1(f$1, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: c2, features: a$3.Focusable })]);
  };
} }), { features: P$1 });
function U$2({ ownerDocument: l2 }, i2) {
  let n2 = ref(null);
  function r2() {
    var o2;
    n2.value || (n2.value = (o2 = l2.value) == null ? void 0 : o2.activeElement);
  }
  function t2() {
    !n2.value || (H(n2.value), n2.value = null);
  }
  onMounted(() => {
    watch(i2, (o2, e2) => {
      o2 !== e2 && (o2 ? r2() : t2());
    }, { immediate: true });
  }), onUnmounted(t2);
}
function _({ ownerDocument: l2, container: i2, initialFocus: n2 }, r2) {
  let t$12 = ref(null), o2 = ref(false);
  return onMounted(() => o2.value = true), onUnmounted(() => o2.value = false), onMounted(() => {
    watch([i2, n2, r2], (e2, s2) => {
      if (e2.every((u2, f2) => (s2 == null ? void 0 : s2[f2]) === u2) || !r2.value)
        return;
      let c2 = o$2(i2);
      !c2 || t(() => {
        var L2, a2;
        if (!o2.value)
          return;
        let u2 = o$2(n2), f2 = (L2 = l2.value) == null ? void 0 : L2.activeElement;
        if (u2) {
          if (u2 === f2) {
            t$12.value = f2;
            return;
          }
        } else if (c2.contains(f2)) {
          t$12.value = f2;
          return;
        }
        u2 ? H(u2) : O(c2, N.First | N.NoScroll) === T$1.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), t$12.value = (a2 = l2.value) == null ? void 0 : a2.activeElement;
      });
    }, { immediate: true, flush: "post" });
  }), t$12;
}
function q({ ownerDocument: l2, container: i2, containers: n2, previousActiveElement: r2 }, t2) {
  var o2;
  E$2((o2 = l2.value) == null ? void 0 : o2.defaultView, "focus", (e2) => {
    if (!t2.value)
      return;
    let s2 = new Set(n2 == null ? void 0 : n2.value);
    s2.add(i2);
    let c2 = r2.value;
    if (!c2)
      return;
    let u2 = e2.target;
    u2 && u2 instanceof HTMLElement ? B$2(s2, u2) ? (r2.value = u2, H(u2)) : (e2.preventDefault(), e2.stopPropagation(), H(c2)) : H(r2.value);
  }, true);
}
function B$2(l2, i2) {
  var n2;
  for (let r2 of l2)
    if ((n2 = r2.value) != null && n2.contains(i2))
      return true;
  return false;
}
const focusTrap = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FocusTrap: le$2
}, Symbol.toStringTag, { value: "Module" }));
let l$2 = "body > *", i = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
function u$2(t2) {
  t2.setAttribute("aria-hidden", "true"), t2.inert = true;
}
function s(t2) {
  let n2 = r.get(t2);
  !n2 || (n2["aria-hidden"] === null ? t2.removeAttribute("aria-hidden") : t2.setAttribute("aria-hidden", n2["aria-hidden"]), t2.inert = n2.inert);
}
function g$3(t2, n2 = ref(true)) {
  watchEffect((d2) => {
    if (!n2.value || !t2.value)
      return;
    let a2 = t2.value, o2 = m$3(a2);
    if (!!o2) {
      i.add(a2);
      for (let e2 of r.keys())
        e2.contains(a2) && (s(e2), r.delete(e2));
      o2.querySelectorAll(l$2).forEach((e2) => {
        if (e2 instanceof HTMLElement) {
          for (let f2 of i)
            if (e2.contains(f2))
              return;
          i.size === 1 && (r.set(e2, { "aria-hidden": e2.getAttribute("aria-hidden"), inert: e2.inert }), u$2(e2));
        }
      }), d2(() => {
        if (i.delete(a2), i.size > 0)
          o2.querySelectorAll(l$2).forEach((e2) => {
            if (e2 instanceof HTMLElement && !r.has(e2)) {
              for (let f2 of i)
                if (e2.contains(f2))
                  return;
              r.set(e2, { "aria-hidden": e2.getAttribute("aria-hidden"), inert: e2.inert }), u$2(e2);
            }
          });
        else
          for (let e2 of r.keys())
            s(e2), r.delete(e2);
      });
    }
  });
}
let e = Symbol("ForcePortalRootContext");
function u$1() {
  return inject(e, false);
}
let P = defineComponent({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: false } }, setup(o2, { slots: t2, attrs: r2 }) {
  return provide(e, o2.force), () => {
    let { force: f2, ...n2 } = o2;
    return H$1({ theirProps: n2, ourProps: {}, slot: {}, slots: t2, attrs: r2, name: "ForcePortalRoot" });
  };
} });
function c$1(t2) {
  let r2 = m$3(t2);
  if (!r2) {
    if (t2 === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${t2}`);
  }
  let o2 = r2.getElementById("headlessui-portal-root");
  if (o2)
    return o2;
  let e2 = r2.createElement("div");
  return e2.setAttribute("id", "headlessui-portal-root"), r2.body.appendChild(e2);
}
let R = defineComponent({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(t2, { slots: r2, attrs: o2 }) {
  let e2 = ref(null), p2 = computed(() => m$3(e2)), n2 = u$1(), u2 = inject(g$2, null), l2 = ref(n2 === true || u2 == null ? c$1(e2.value) : u2.resolveTarget());
  return watchEffect(() => {
    n2 || u2 != null && (l2.value = u2.resolveTarget());
  }), onUnmounted(() => {
    var i2, m2;
    let a2 = (i2 = p2.value) == null ? void 0 : i2.getElementById("headlessui-portal-root");
    !a2 || l2.value === a2 && l2.value.children.length <= 0 && ((m2 = l2.value.parentElement) == null || m2.removeChild(l2.value));
  }), () => {
    if (l2.value === null)
      return null;
    let a2 = { ref: e2, "data-headlessui-portal": "" };
    return h$1(Teleport, { to: l2.value }, H$1({ ourProps: a2, theirProps: t2, slot: {}, attrs: o2, slots: r2, name: "Portal" }));
  };
} }), g$2 = Symbol("PortalGroupContext"), L$2 = defineComponent({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(t2, { attrs: r2, slots: o2 }) {
  let e2 = reactive({ resolveTarget() {
    return t2.target;
  } });
  return provide(g$2, e2), () => {
    let { target: p2, ...n2 } = t2;
    return H$1({ theirProps: n2, ourProps: {}, slot: {}, attrs: r2, slots: o2, name: "PortalGroup" });
  };
} });
const portal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Portal: R,
  PortalGroup: L$2
}, Symbol.toStringTag, { value: "Module" }));
let u = Symbol("StackContext");
var p$2 = ((e2) => (e2[e2.Add = 0] = "Add", e2[e2.Remove = 1] = "Remove", e2))(p$2 || {});
function v() {
  return inject(u, () => {
  });
}
function S$1({ type: o2, enabled: r2, element: e2, onUpdate: i2 }) {
  let a2 = v();
  function t2(...n2) {
    i2 == null || i2(...n2), a2(...n2);
  }
  onMounted(() => {
    watch(r2, (n2, d2) => {
      n2 ? t2(0, o2, e2) : d2 === true && t2(1, o2, e2);
    }, { immediate: true, flush: "sync" });
  }), onUnmounted(() => {
    r2.value && t2(1, o2, e2);
  }), provide(u, t2);
}
let p$1 = Symbol("DescriptionContext");
function b() {
  let t2 = inject(p$1, null);
  if (t2 === null)
    throw new Error("Missing parent");
  return t2;
}
function M({ slot: t2 = ref({}), name: i2 = "Description", props: o2 = {} } = {}) {
  let e2 = ref([]);
  function s2(n2) {
    return e2.value.push(n2), () => {
      let r2 = e2.value.indexOf(n2);
      r2 !== -1 && e2.value.splice(r2, 1);
    };
  }
  return provide(p$1, { register: s2, slot: t2, name: i2, props: o2 }), computed(() => e2.value.length > 0 ? e2.value.join(" ") : void 0);
}
let E$1 = defineComponent({ name: "Description", props: { as: { type: [Object, String], default: "p" }, id: { type: String, default: () => `headlessui-description-${t$2()}` } }, setup(t2, { attrs: i2, slots: o2 }) {
  let e2 = b();
  return onMounted(() => onUnmounted(e2.register(t2.id))), () => {
    let { name: s2 = "Description", slot: n2 = ref({}), props: r2 = {} } = e2, { id: d2, ...l2 } = t2, c2 = { ...Object.entries(r2).reduce((f2, [a2, g2]) => Object.assign(f2, { [a2]: unref(g2) }), {}), id: d2 };
    return H$1({ ourProps: c2, theirProps: l2, slot: n2.value, attrs: i2, slots: o2, name: s2 });
  };
} });
function m$2(t2) {
  let e2 = shallowRef(t2.getSnapshot());
  return onUnmounted(t2.subscribe(() => {
    e2.value = t2.getSnapshot();
  })), e2;
}
function o$1() {
  let i2 = [], r2 = [], n2 = { enqueue(e2) {
    r2.push(e2);
  }, addEventListener(e2, t2, a2, s2) {
    return e2.addEventListener(t2, a2, s2), n2.add(() => e2.removeEventListener(t2, a2, s2));
  }, requestAnimationFrame(...e2) {
    let t2 = requestAnimationFrame(...e2);
    n2.add(() => cancelAnimationFrame(t2));
  }, nextFrame(...e2) {
    n2.requestAnimationFrame(() => {
      n2.requestAnimationFrame(...e2);
    });
  }, setTimeout(...e2) {
    let t2 = setTimeout(...e2);
    n2.add(() => clearTimeout(t2));
  }, add(e2) {
    i2.push(e2);
  }, style(e2, t2, a2) {
    let s2 = e2.style.getPropertyValue(t2);
    return Object.assign(e2.style, { [t2]: a2 }), this.add(() => {
      Object.assign(e2.style, { [t2]: s2 });
    });
  }, dispose() {
    for (let e2 of i2.splice(0))
      e2();
  }, async workQueue() {
    for (let e2 of r2.splice(0))
      await e2();
  } };
  return n2;
}
function a$2(o2, r2) {
  let t2 = o2(), n2 = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return t2;
  }, subscribe(e2) {
    return n2.add(e2), () => n2.delete(e2);
  }, dispatch(e2, ...s2) {
    let i2 = r2[e2].call(t2, ...s2);
    i2 && (t2 = i2, n2.forEach((c2) => c2()));
  } };
}
function c() {
  let o2;
  return { before({ doc: e2 }) {
    var l2;
    let n2 = e2.documentElement;
    o2 = ((l2 = e2.defaultView) != null ? l2 : window).innerWidth - n2.clientWidth;
  }, after({ doc: e2, d: n2 }) {
    let t2 = e2.documentElement, l2 = t2.clientWidth - t2.offsetWidth, r2 = o2 - l2;
    n2.style(t2, "paddingRight", `${r2}px`);
  } };
}
function o() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function p() {
  if (!o())
    return {};
  let o$12;
  return { before() {
    o$12 = window.pageYOffset;
  }, after({ doc: r2, d: l2, meta: s2 }) {
    function i2(e2) {
      return s2.containers.flatMap((t2) => t2()).some((t2) => t2.contains(e2));
    }
    l2.style(r2.body, "marginTop", `-${o$12}px`), window.scrollTo(0, 0);
    let n2 = null;
    l2.addEventListener(r2, "click", (e2) => {
      if (e2.target instanceof HTMLElement)
        try {
          let t2 = e2.target.closest("a");
          if (!t2)
            return;
          let { hash: c2 } = new URL(t2.href), a2 = r2.querySelector(c2);
          a2 && !i2(a2) && (n2 = a2);
        } catch {
        }
    }, true), l2.addEventListener(r2, "touchmove", (e2) => {
      e2.target instanceof HTMLElement && !i2(e2.target) && e2.preventDefault();
    }, { passive: false }), l2.add(() => {
      window.scrollTo(0, window.pageYOffset + o$12), n2 && n2.isConnected && (n2.scrollIntoView({ block: "nearest" }), n2 = null);
    });
  } };
}
function l$1() {
  return { before({ doc: e2, d: o2 }) {
    o2.style(e2.documentElement, "overflow", "hidden");
  } };
}
function m$1(e2) {
  let n2 = {};
  for (let t2 of e2)
    Object.assign(n2, t2(n2));
  return n2;
}
let a$1 = a$2(() => /* @__PURE__ */ new Map(), { PUSH(e2, n2) {
  var o2;
  let t2 = (o2 = this.get(e2)) != null ? o2 : { doc: e2, count: 0, d: o$1(), meta: /* @__PURE__ */ new Set() };
  return t2.count++, t2.meta.add(n2), this.set(e2, t2), this;
}, POP(e2, n2) {
  let t2 = this.get(e2);
  return t2 && (t2.count--, t2.meta.delete(n2)), this;
}, SCROLL_PREVENT({ doc: e2, d: n2, meta: t2 }) {
  let o2 = { doc: e2, d: n2, meta: m$1(t2) }, c$12 = [p(), c(), l$1()];
  c$12.forEach(({ before: r2 }) => r2 == null ? void 0 : r2(o2)), c$12.forEach(({ after: r2 }) => r2 == null ? void 0 : r2(o2));
}, SCROLL_ALLOW({ d: e2 }) {
  e2.dispose();
}, TEARDOWN({ doc: e2 }) {
  this.delete(e2);
} });
a$1.subscribe(() => {
  let e2 = a$1.getSnapshot(), n2 = /* @__PURE__ */ new Map();
  for (let [t2] of e2)
    n2.set(t2, t2.documentElement.style.overflow);
  for (let t2 of e2.values()) {
    let o2 = n2.get(t2.doc) === "hidden", c2 = t2.count !== 0;
    (c2 && !o2 || !c2 && o2) && a$1.dispatch(t2.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t2), t2.count === 0 && a$1.dispatch("TEARDOWN", t2);
  }
});
function d$4(t2, a2, n2) {
  let i2 = m$2(a$1), l2 = computed(() => {
    let e2 = t2.value ? i2.value.get(t2.value) : void 0;
    return e2 ? e2.count > 0 : false;
  });
  return watch([t2, a2], ([e2, m2], [r2], o2) => {
    if (!e2 || !m2)
      return;
    a$1.dispatch("PUSH", e2, n2);
    let f2 = false;
    o2(() => {
      f2 || (a$1.dispatch("POP", r2 != null ? r2 : e2, n2), f2 = true);
    });
  }, { immediate: true }), l2;
}
var pe$2 = ((e2) => (e2[e2.Open = 0] = "Open", e2[e2.Closed = 1] = "Closed", e2))(pe$2 || {});
let L$1 = Symbol("DialogContext");
function C(t2) {
  let r2 = inject(L$1, null);
  if (r2 === null) {
    let e2 = new Error(`<${t2} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(e2, C), e2;
  }
  return r2;
}
let k$1 = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", Be$2 = defineComponent({ name: "Dialog", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, open: { type: [Boolean, String], default: k$1 }, initialFocus: { type: Object, default: null }, id: { type: String, default: () => `headlessui-dialog-${t$2()}` } }, emits: { close: (t2) => true }, setup(t2, { emit: r2, attrs: e2, slots: i2, expose: n2 }) {
  var H2;
  let l2 = ref(false);
  onMounted(() => {
    l2.value = true;
  });
  let u2 = ref(0), g2 = p$5(), m2 = computed(() => t2.open === k$1 && g2 !== null ? u$5(g2.value, { [l$3.Open]: true, [l$3.Closed]: false }) : t2.open), E2 = ref(/* @__PURE__ */ new Set()), f2 = ref(null), A2 = ref(null), w2 = computed(() => m$3(f2));
  if (n2({ el: f2, $el: f2 }), !(t2.open !== k$1 || g2 !== null))
    throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof m2.value != "boolean")
    throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${m2.value === k$1 ? void 0 : t2.open}`);
  let c2 = computed(() => l2.value && m2.value ? 0 : 1), I2 = computed(() => c2.value === 0), R$1 = computed(() => u2.value > 1);
  inject(L$1, null) !== null;
  let Y2 = computed(() => R$1.value ? "parent" : "leaf");
  g$3(f2, computed(() => R$1.value ? I2.value : false)), S$1({ type: "Dialog", enabled: computed(() => c2.value === 0), element: f2, onUpdate: (o2, a2, p2) => {
    if (a2 === "Dialog")
      return u$5(o2, { [p$2.Add]() {
        E2.value.add(p2), u2.value += 1;
      }, [p$2.Remove]() {
        E2.value.delete(p2), u2.value -= 1;
      } });
  } });
  let q2 = M({ name: "DialogDescription", slot: computed(() => ({ open: m2.value })) }), T2 = ref(null), S2 = { titleId: T2, panelRef: ref(null), dialogState: c2, setTitleId(o2) {
    T2.value !== o2 && (T2.value = o2);
  }, close() {
    r2("close", false);
  } };
  provide(L$1, S2);
  function B2() {
    var a2, p2, h2;
    return [...Array.from((p2 = (a2 = w2.value) == null ? void 0 : a2.querySelectorAll("html > *, body > *, [data-headlessui-portal]")) != null ? p2 : []).filter((s2) => !(s2 === document.body || s2 === document.head || !(s2 instanceof HTMLElement) || s2.contains(o$2(A2)) || S2.panelRef.value && s2.contains(S2.panelRef.value))), (h2 = S2.panelRef.value) != null ? h2 : f2.value];
  }
  return y(() => B2(), (o2, a2) => {
    S2.close(), nextTick(() => a2 == null ? void 0 : a2.focus());
  }, computed(() => c2.value === 0 && !R$1.value)), E$2((H2 = w2.value) == null ? void 0 : H2.defaultView, "keydown", (o2) => {
    o2.defaultPrevented || o2.key === o$3.Escape && c2.value === 0 && (R$1.value || (o2.preventDefault(), o2.stopPropagation(), S2.close()));
  }), d$4(w2, I2, (o2) => {
    var a2;
    return { containers: [...(a2 = o2.containers) != null ? a2 : [], B2] };
  }), watchEffect((o2) => {
    if (c2.value !== 0)
      return;
    let a2 = o$2(f2);
    if (!a2)
      return;
    let p2 = new IntersectionObserver((h2) => {
      for (let s2 of h2)
        s2.boundingClientRect.x === 0 && s2.boundingClientRect.y === 0 && s2.boundingClientRect.width === 0 && s2.boundingClientRect.height === 0 && S2.close();
    });
    p2.observe(a2), o2(() => p2.disconnect());
  }), () => {
    let { id: o2, open: a2, initialFocus: p2, ...h2 } = t2, s2 = { ...e2, ref: f2, id: o2, role: "dialog", "aria-modal": c2.value === 0 ? true : void 0, "aria-labelledby": T2.value, "aria-describedby": q2.value }, G2 = { open: c2.value === 0 };
    return h$1(P, { force: true }, () => [h$1(R, () => h$1(L$2, { target: f2.value }, () => h$1(P, { force: false }, () => h$1(le$2, { initialFocus: p2, containers: E2, features: I2.value ? u$5(Y2.value, { parent: le$2.features.RestoreFocus, leaf: le$2.features.All & ~le$2.features.FocusLock }) : le$2.features.None }, () => H$1({ ourProps: s2, theirProps: h2, slot: G2, attrs: e2, slots: i2, visible: c2.value === 0, features: N$1.RenderStrategy | N$1.Static, name: "Dialog" }))))), h$1(f$1, { features: a$3.Hidden, ref: A2 })]);
  };
} }), He$1 = defineComponent({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: () => `headlessui-dialog-overlay-${t$2()}` } }, setup(t2, { attrs: r2, slots: e2 }) {
  let i2 = C("DialogOverlay");
  function n2(l2) {
    l2.target === l2.currentTarget && (l2.preventDefault(), l2.stopPropagation(), i2.close());
  }
  return () => {
    let { id: l2, ...u2 } = t2;
    return H$1({ ourProps: { id: l2, "aria-hidden": true, onClick: n2 }, theirProps: u2, slot: { open: i2.dialogState.value === 0 }, attrs: r2, slots: e2, name: "DialogOverlay" });
  };
} }), $e = defineComponent({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: () => `headlessui-dialog-backdrop-${t$2()}` } }, inheritAttrs: false, setup(t2, { attrs: r2, slots: e2, expose: i2 }) {
  let n2 = C("DialogBackdrop"), l2 = ref(null);
  return i2({ el: l2, $el: l2 }), onMounted(() => {
    if (n2.panelRef.value === null)
      throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let { id: u2, ...g2 } = t2, m2 = { id: u2, ref: l2, "aria-hidden": true };
    return h$1(P, { force: true }, () => h$1(R, () => H$1({ ourProps: m2, theirProps: { ...r2, ...g2 }, slot: { open: n2.dialogState.value === 0 }, attrs: r2, slots: e2, name: "DialogBackdrop" })));
  };
} }), je$1 = defineComponent({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: () => `headlessui-dialog-panel-${t$2()}` } }, setup(t2, { attrs: r2, slots: e2, expose: i2 }) {
  let n2 = C("DialogPanel");
  i2({ el: n2.panelRef, $el: n2.panelRef });
  function l2(u2) {
    u2.stopPropagation();
  }
  return () => {
    let { id: u2, ...g2 } = t2, m2 = { id: u2, ref: n2.panelRef, onClick: l2 };
    return H$1({ ourProps: m2, theirProps: g2, slot: { open: n2.dialogState.value === 0 }, attrs: r2, slots: e2, name: "DialogPanel" });
  };
} }), Ke$1 = defineComponent({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" }, id: { type: String, default: () => `headlessui-dialog-title-${t$2()}` } }, setup(t2, { attrs: r2, slots: e2 }) {
  let i2 = C("DialogTitle");
  return onMounted(() => {
    i2.setTitleId(t2.id), onUnmounted(() => i2.setTitleId(null));
  }), () => {
    let { id: n2, ...l2 } = t2;
    return H$1({ ourProps: { id: n2 }, theirProps: l2, slot: { open: i2.dialogState.value === 0 }, attrs: r2, slots: e2, name: "DialogTitle" });
  };
} }), Ne = E$1;
const dialog = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Dialog: Be$2,
  DialogBackdrop: $e,
  DialogDescription: Ne,
  DialogOverlay: He$1,
  DialogPanel: je$1,
  DialogTitle: Ke$1
}, Symbol.toStringTag, { value: "Module" }));
var j$2 = ((o2) => (o2[o2.Open = 0] = "Open", o2[o2.Closed = 1] = "Closed", o2))(j$2 || {});
let x$1 = Symbol("DisclosureContext");
function g$1(t2) {
  let r2 = inject(x$1, null);
  if (r2 === null) {
    let o2 = new Error(`<${t2} /> is missing a parent <Disclosure /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o2, g$1), o2;
  }
  return r2;
}
let B$1 = Symbol("DisclosurePanelContext");
function $$1() {
  return inject(B$1, null);
}
let Q = defineComponent({ name: "Disclosure", props: { as: { type: [Object, String], default: "template" }, defaultOpen: { type: [Boolean], default: false } }, setup(t2, { slots: r2, attrs: o2 }) {
  let u2 = ref(t2.defaultOpen ? 0 : 1), e2 = ref(null), i2 = ref(null), s2 = { buttonId: ref(null), panelId: ref(null), disclosureState: u2, panel: e2, button: i2, toggleDisclosure() {
    u2.value = u$5(u2.value, { [0]: 1, [1]: 0 });
  }, closeDisclosure() {
    u2.value !== 1 && (u2.value = 1);
  }, close(l2) {
    s2.closeDisclosure();
    let a2 = (() => l2 ? l2 instanceof HTMLElement ? l2 : l2.value instanceof HTMLElement ? o$2(l2) : o$2(s2.button) : o$2(s2.button))();
    a2 == null || a2.focus();
  } };
  return provide(x$1, s2), c$2(computed(() => u$5(u2.value, { [0]: l$3.Open, [1]: l$3.Closed }))), () => {
    let { defaultOpen: l2, ...a2 } = t2, c2 = { open: u2.value === 0, close: s2.close };
    return H$1({ theirProps: a2, ourProps: {}, slot: c2, slots: r2, attrs: o2, name: "Disclosure" });
  };
} }), V$1 = defineComponent({ name: "DisclosureButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: () => `headlessui-disclosure-button-${t$2()}` } }, setup(t2, { attrs: r2, slots: o2, expose: u2 }) {
  let e2 = g$1("DisclosureButton");
  onMounted(() => {
    e2.buttonId.value = t2.id;
  }), onUnmounted(() => {
    e2.buttonId.value = null;
  });
  let i2 = $$1(), s2 = computed(() => i2 === null ? false : i2.value === e2.panelId.value), l2 = ref(null);
  u2({ el: l2, $el: l2 }), s2.value || watchEffect(() => {
    e2.button.value = l2.value;
  });
  let a2 = b$1(computed(() => ({ as: t2.as, type: r2.type })), l2);
  function c2() {
    var n2;
    t2.disabled || (s2.value ? (e2.toggleDisclosure(), (n2 = o$2(e2.button)) == null || n2.focus()) : e2.toggleDisclosure());
  }
  function D2(n2) {
    var S2;
    if (!t2.disabled)
      if (s2.value)
        switch (n2.key) {
          case o$3.Space:
          case o$3.Enter:
            n2.preventDefault(), n2.stopPropagation(), e2.toggleDisclosure(), (S2 = o$2(e2.button)) == null || S2.focus();
            break;
        }
      else
        switch (n2.key) {
          case o$3.Space:
          case o$3.Enter:
            n2.preventDefault(), n2.stopPropagation(), e2.toggleDisclosure();
            break;
        }
  }
  function T2(n2) {
    switch (n2.key) {
      case o$3.Space:
        n2.preventDefault();
        break;
    }
  }
  return () => {
    let n2 = { open: e2.disclosureState.value === 0 }, { id: S2, ...k2 } = t2, K2 = s2.value ? { ref: l2, type: a2.value, onClick: c2, onKeydown: D2 } : { id: S2, ref: l2, type: a2.value, "aria-expanded": t2.disabled ? void 0 : e2.disclosureState.value === 0, "aria-controls": o$2(e2.panel) ? e2.panelId.value : void 0, disabled: t2.disabled ? true : void 0, onClick: c2, onKeydown: D2, onKeyup: T2 };
    return H$1({ ourProps: K2, theirProps: k2, slot: n2, attrs: r2, slots: o2, name: "DisclosureButton" });
  };
} }), X$1 = defineComponent({ name: "DisclosurePanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: () => `headlessui-disclosure-panel-${t$2()}` } }, setup(t2, { attrs: r2, slots: o2, expose: u2 }) {
  let e2 = g$1("DisclosurePanel");
  onMounted(() => {
    e2.panelId.value = t2.id;
  }), onUnmounted(() => {
    e2.panelId.value = null;
  }), u2({ el: e2.panel, $el: e2.panel }), provide(B$1, e2.panelId);
  let i2 = p$5(), s2 = computed(() => i2 !== null ? i2.value === l$3.Open : e2.disclosureState.value === 0);
  return () => {
    let l2 = { open: e2.disclosureState.value === 0, close: e2.close }, { id: a2, ...c2 } = t2, D2 = { id: a2, ref: e2.panel };
    return H$1({ ourProps: D2, theirProps: c2, slot: l2, attrs: r2, slots: o2, features: N$1.RenderStrategy | N$1.Static, visible: s2.value, name: "DisclosurePanel" });
  };
} });
const disclosure = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Disclosure: Q,
  DisclosureButton: V$1,
  DisclosurePanel: X$1
}, Symbol.toStringTag, { value: "Module" }));
function se(t2, b2) {
  return t2 === b2;
}
var de$3 = ((u2) => (u2[u2.Open = 0] = "Open", u2[u2.Closed = 1] = "Closed", u2))(de$3 || {}), fe$1 = ((u2) => (u2[u2.Single = 0] = "Single", u2[u2.Multi = 1] = "Multi", u2))(fe$1 || {}), pe$1 = ((u2) => (u2[u2.Pointer = 0] = "Pointer", u2[u2.Other = 1] = "Other", u2))(pe$1 || {});
function ce$1(t2) {
  requestAnimationFrame(() => requestAnimationFrame(t2));
}
let U$1 = Symbol("ListboxContext");
function E(t2) {
  let b2 = inject(U$1, null);
  if (b2 === null) {
    let u2 = new Error(`<${t2} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(u2, E), u2;
  }
  return b2;
}
let Ee$1 = defineComponent({ name: "Listbox", emits: { "update:modelValue": (t2) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], default: () => se }, horizontal: { type: [Boolean], default: false }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, name: { type: String, optional: true }, multiple: { type: [Boolean], default: false } }, inheritAttrs: false, setup(t2, { slots: b2, attrs: u2, emit: L2 }) {
  let e2 = ref(1), d2 = ref(null), m2 = ref(null), x2 = ref(null), f2 = ref([]), o2 = ref(""), i2 = ref(null), w2 = ref(1);
  function R2(a2 = (l2) => l2) {
    let l2 = i2.value !== null ? f2.value[i2.value] : null, r2 = I(a2(f2.value.slice()), (S2) => o$2(S2.dataRef.domRef)), s2 = l2 ? r2.indexOf(l2) : null;
    return s2 === -1 && (s2 = null), { options: r2, activeOptionIndex: s2 };
  }
  let h2 = computed(() => t2.multiple ? 1 : 0), [y$12, M2] = d$6(computed(() => t2.modelValue === void 0 ? u$5(h2.value, { [1]: [], [0]: void 0 }) : t2.modelValue), (a2) => L2("update:modelValue", a2), computed(() => t2.defaultValue)), n2 = { listboxState: e2, value: y$12, mode: h2, compare(a2, l2) {
    if (typeof t2.by == "string") {
      let r2 = t2.by;
      return (a2 == null ? void 0 : a2[r2]) === (l2 == null ? void 0 : l2[r2]);
    }
    return t2.by(a2, l2);
  }, orientation: computed(() => t2.horizontal ? "horizontal" : "vertical"), labelRef: d2, buttonRef: m2, optionsRef: x2, disabled: computed(() => t2.disabled), options: f2, searchQuery: o2, activeOptionIndex: i2, activationTrigger: w2, closeListbox() {
    t2.disabled || e2.value !== 1 && (e2.value = 1, i2.value = null);
  }, openListbox() {
    t2.disabled || e2.value !== 0 && (e2.value = 0);
  }, goToOption(a2, l2, r2) {
    if (t2.disabled || e2.value === 1)
      return;
    let s2 = R2(), S2 = x$2(a2 === a$4.Specific ? { focus: a$4.Specific, id: l2 } : { focus: a2 }, { resolveItems: () => s2.options, resolveActiveIndex: () => s2.activeOptionIndex, resolveId: (D2) => D2.id, resolveDisabled: (D2) => D2.dataRef.disabled });
    o2.value = "", i2.value = S2, w2.value = r2 != null ? r2 : 1, f2.value = s2.options;
  }, search(a2) {
    if (t2.disabled || e2.value === 1)
      return;
    let r2 = o2.value !== "" ? 0 : 1;
    o2.value += a2.toLowerCase();
    let S2 = (i2.value !== null ? f2.value.slice(i2.value + r2).concat(f2.value.slice(0, i2.value + r2)) : f2.value).find((j2) => j2.dataRef.textValue.startsWith(o2.value) && !j2.dataRef.disabled), D2 = S2 ? f2.value.indexOf(S2) : -1;
    D2 === -1 || D2 === i2.value || (i2.value = D2, w2.value = 1);
  }, clearSearch() {
    t2.disabled || e2.value !== 1 && o2.value !== "" && (o2.value = "");
  }, registerOption(a2, l2) {
    let r2 = R2((s2) => [...s2, { id: a2, dataRef: l2 }]);
    f2.value = r2.options, i2.value = r2.activeOptionIndex;
  }, unregisterOption(a2) {
    let l2 = R2((r2) => {
      let s2 = r2.findIndex((S2) => S2.id === a2);
      return s2 !== -1 && r2.splice(s2, 1), r2;
    });
    f2.value = l2.options, i2.value = l2.activeOptionIndex, w2.value = 1;
  }, select(a2) {
    t2.disabled || M2(u$5(h2.value, { [0]: () => a2, [1]: () => {
      let l2 = toRaw(n2.value.value).slice(), r2 = toRaw(a2), s2 = l2.findIndex((S2) => n2.compare(r2, toRaw(S2)));
      return s2 === -1 ? l2.push(r2) : l2.splice(s2, 1), l2;
    } }));
  } };
  y([m2, x2], (a2, l2) => {
    var r2;
    n2.closeListbox(), S$2(l2, F$2.Loose) || (a2.preventDefault(), (r2 = o$2(m2)) == null || r2.focus());
  }, computed(() => e2.value === 0)), provide(U$1, n2), c$2(computed(() => u$5(e2.value, { [0]: l$3.Open, [1]: l$3.Closed })));
  let p2 = computed(() => {
    var a2;
    return (a2 = o$2(m2)) == null ? void 0 : a2.closest("form");
  });
  return onMounted(() => {
    watch([p2], () => {
      if (!p2.value || t2.defaultValue === void 0)
        return;
      function a2() {
        n2.select(t2.defaultValue);
      }
      return p2.value.addEventListener("reset", a2), () => {
        var l2;
        (l2 = p2.value) == null || l2.removeEventListener("reset", a2);
      };
    }, { immediate: true });
  }), () => {
    let { name: a2, modelValue: l2, disabled: r2, ...s2 } = t2, S2 = { open: e2.value === 0, disabled: r2, value: y$12.value };
    return h$1(Fragment, [...a2 != null && y$12.value != null ? e$1({ [a2]: y$12.value }).map(([D2, j2]) => h$1(f$1, K$1({ features: a$3.Hidden, key: D2, as: "input", type: "hidden", hidden: true, readOnly: true, name: D2, value: j2 }))) : [], H$1({ ourProps: {}, theirProps: { ...u2, ...T$2(s2, ["defaultValue", "onUpdate:modelValue", "horizontal", "multiple", "by"]) }, slot: S2, slots: b2, attrs: u2, name: "Listbox" })]);
  };
} }), je = defineComponent({ name: "ListboxLabel", props: { as: { type: [Object, String], default: "label" }, id: { type: String, default: () => `headlessui-listbox-label-${t$2()}` } }, setup(t2, { attrs: b2, slots: u2 }) {
  let L2 = E("ListboxLabel");
  function e2() {
    var d2;
    (d2 = o$2(L2.buttonRef)) == null || d2.focus({ preventScroll: true });
  }
  return () => {
    let d2 = { open: L2.listboxState.value === 0, disabled: L2.disabled.value }, { id: m2, ...x2 } = t2, f2 = { id: m2, ref: L2.labelRef, onClick: e2 };
    return H$1({ ourProps: f2, theirProps: x2, slot: d2, attrs: b2, slots: u2, name: "ListboxLabel" });
  };
} }), Ae = defineComponent({ name: "ListboxButton", props: { as: { type: [Object, String], default: "button" }, id: { type: String, default: () => `headlessui-listbox-button-${t$2()}` } }, setup(t2, { attrs: b2, slots: u2, expose: L2 }) {
  let e2 = E("ListboxButton");
  L2({ el: e2.buttonRef, $el: e2.buttonRef });
  function d2(o2) {
    switch (o2.key) {
      case o$3.Space:
      case o$3.Enter:
      case o$3.ArrowDown:
        o2.preventDefault(), e2.openListbox(), nextTick(() => {
          var i2;
          (i2 = o$2(e2.optionsRef)) == null || i2.focus({ preventScroll: true }), e2.value.value || e2.goToOption(a$4.First);
        });
        break;
      case o$3.ArrowUp:
        o2.preventDefault(), e2.openListbox(), nextTick(() => {
          var i2;
          (i2 = o$2(e2.optionsRef)) == null || i2.focus({ preventScroll: true }), e2.value.value || e2.goToOption(a$4.Last);
        });
        break;
    }
  }
  function m2(o2) {
    switch (o2.key) {
      case o$3.Space:
        o2.preventDefault();
        break;
    }
  }
  function x2(o2) {
    e2.disabled.value || (e2.listboxState.value === 0 ? (e2.closeListbox(), nextTick(() => {
      var i2;
      return (i2 = o$2(e2.buttonRef)) == null ? void 0 : i2.focus({ preventScroll: true });
    })) : (o2.preventDefault(), e2.openListbox(), ce$1(() => {
      var i2;
      return (i2 = o$2(e2.optionsRef)) == null ? void 0 : i2.focus({ preventScroll: true });
    })));
  }
  let f2 = b$1(computed(() => ({ as: t2.as, type: b2.type })), e2.buttonRef);
  return () => {
    var h2, y2;
    let o2 = { open: e2.listboxState.value === 0, disabled: e2.disabled.value, value: e2.value.value }, { id: i2, ...w2 } = t2, R2 = { ref: e2.buttonRef, id: i2, type: f2.value, "aria-haspopup": "listbox", "aria-controls": (h2 = o$2(e2.optionsRef)) == null ? void 0 : h2.id, "aria-expanded": e2.disabled.value ? void 0 : e2.listboxState.value === 0, "aria-labelledby": e2.labelRef.value ? [(y2 = o$2(e2.labelRef)) == null ? void 0 : y2.id, i2].join(" ") : void 0, disabled: e2.disabled.value === true ? true : void 0, onKeydown: d2, onKeyup: m2, onClick: x2 };
    return H$1({ ourProps: R2, theirProps: w2, slot: o2, attrs: b2, slots: u2, name: "ListboxButton" });
  };
} }), Fe = defineComponent({ name: "ListboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: () => `headlessui-listbox-options-${t$2()}` } }, setup(t2, { attrs: b2, slots: u2, expose: L2 }) {
  let e2 = E("ListboxOptions"), d2 = ref(null);
  L2({ el: e2.optionsRef, $el: e2.optionsRef });
  function m2(o2) {
    switch (d2.value && clearTimeout(d2.value), o2.key) {
      case o$3.Space:
        if (e2.searchQuery.value !== "")
          return o2.preventDefault(), o2.stopPropagation(), e2.search(o2.key);
      case o$3.Enter:
        if (o2.preventDefault(), o2.stopPropagation(), e2.activeOptionIndex.value !== null) {
          let i2 = e2.options.value[e2.activeOptionIndex.value];
          e2.select(i2.dataRef.value);
        }
        e2.mode.value === 0 && (e2.closeListbox(), nextTick(() => {
          var i2;
          return (i2 = o$2(e2.buttonRef)) == null ? void 0 : i2.focus({ preventScroll: true });
        }));
        break;
      case u$5(e2.orientation.value, { vertical: o$3.ArrowDown, horizontal: o$3.ArrowRight }):
        return o2.preventDefault(), o2.stopPropagation(), e2.goToOption(a$4.Next);
      case u$5(e2.orientation.value, { vertical: o$3.ArrowUp, horizontal: o$3.ArrowLeft }):
        return o2.preventDefault(), o2.stopPropagation(), e2.goToOption(a$4.Previous);
      case o$3.Home:
      case o$3.PageUp:
        return o2.preventDefault(), o2.stopPropagation(), e2.goToOption(a$4.First);
      case o$3.End:
      case o$3.PageDown:
        return o2.preventDefault(), o2.stopPropagation(), e2.goToOption(a$4.Last);
      case o$3.Escape:
        o2.preventDefault(), o2.stopPropagation(), e2.closeListbox(), nextTick(() => {
          var i2;
          return (i2 = o$2(e2.buttonRef)) == null ? void 0 : i2.focus({ preventScroll: true });
        });
        break;
      case o$3.Tab:
        o2.preventDefault(), o2.stopPropagation();
        break;
      default:
        o2.key.length === 1 && (e2.search(o2.key), d2.value = setTimeout(() => e2.clearSearch(), 350));
        break;
    }
  }
  let x2 = p$5(), f2 = computed(() => x2 !== null ? x2.value === l$3.Open : e2.listboxState.value === 0);
  return () => {
    var h2, y2, M2, n2;
    let o2 = { open: e2.listboxState.value === 0 }, { id: i2, ...w2 } = t2, R2 = { "aria-activedescendant": e2.activeOptionIndex.value === null || (h2 = e2.options.value[e2.activeOptionIndex.value]) == null ? void 0 : h2.id, "aria-multiselectable": e2.mode.value === 1 ? true : void 0, "aria-labelledby": (n2 = (y2 = o$2(e2.labelRef)) == null ? void 0 : y2.id) != null ? n2 : (M2 = o$2(e2.buttonRef)) == null ? void 0 : M2.id, "aria-orientation": e2.orientation.value, id: i2, onKeydown: m2, role: "listbox", tabIndex: 0, ref: e2.optionsRef };
    return H$1({ ourProps: R2, theirProps: w2, slot: o2, attrs: b2, slots: u2, features: N$1.RenderStrategy | N$1.Static, visible: f2.value, name: "ListboxOptions" });
  };
} }), Be$1 = defineComponent({ name: "ListboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false }, id: { type: String, default: () => `headlessui-listbox.option-${t$2()}` } }, setup(t2, { slots: b2, attrs: u2, expose: L2 }) {
  let e2 = E("ListboxOption"), d2 = ref(null);
  L2({ el: d2, $el: d2 });
  let m2 = computed(() => e2.activeOptionIndex.value !== null ? e2.options.value[e2.activeOptionIndex.value].id === t2.id : false), x2 = computed(() => u$5(e2.mode.value, { [0]: () => e2.compare(toRaw(e2.value.value), toRaw(t2.value)), [1]: () => toRaw(e2.value.value).some((n2) => e2.compare(toRaw(n2), toRaw(t2.value))) })), f2 = computed(() => u$5(e2.mode.value, { [1]: () => {
    var p2;
    let n2 = toRaw(e2.value.value);
    return ((p2 = e2.options.value.find((a2) => n2.some((l2) => e2.compare(toRaw(l2), toRaw(a2.dataRef.value))))) == null ? void 0 : p2.id) === t2.id;
  }, [0]: () => x2.value })), o2 = computed(() => ({ disabled: t2.disabled, value: t2.value, textValue: "", domRef: d2 }));
  onMounted(() => {
    var p2, a2;
    let n2 = (a2 = (p2 = o$2(d2)) == null ? void 0 : p2.textContent) == null ? void 0 : a2.toLowerCase().trim();
    n2 !== void 0 && (o2.value.textValue = n2);
  }), onMounted(() => e2.registerOption(t2.id, o2)), onUnmounted(() => e2.unregisterOption(t2.id)), onMounted(() => {
    watch([e2.listboxState, x2], () => {
      e2.listboxState.value === 0 && (!x2.value || u$5(e2.mode.value, { [1]: () => {
        f2.value && e2.goToOption(a$4.Specific, t2.id);
      }, [0]: () => {
        e2.goToOption(a$4.Specific, t2.id);
      } }));
    }, { immediate: true });
  }), watchEffect(() => {
    e2.listboxState.value === 0 && (!m2.value || e2.activationTrigger.value !== 0 && nextTick(() => {
      var n2, p2;
      return (p2 = (n2 = o$2(d2)) == null ? void 0 : n2.scrollIntoView) == null ? void 0 : p2.call(n2, { block: "nearest" });
    }));
  });
  function i2(n2) {
    if (t2.disabled)
      return n2.preventDefault();
    e2.select(t2.value), e2.mode.value === 0 && (e2.closeListbox(), nextTick(() => {
      var p2;
      return (p2 = o$2(e2.buttonRef)) == null ? void 0 : p2.focus({ preventScroll: true });
    }));
  }
  function w2() {
    if (t2.disabled)
      return e2.goToOption(a$4.Nothing);
    e2.goToOption(a$4.Specific, t2.id);
  }
  let R2 = u$3();
  function h2(n2) {
    R2.update(n2);
  }
  function y2(n2) {
    !R2.wasMoved(n2) || t2.disabled || m2.value || e2.goToOption(a$4.Specific, t2.id, 0);
  }
  function M2(n2) {
    !R2.wasMoved(n2) || t2.disabled || !m2.value || e2.goToOption(a$4.Nothing);
  }
  return () => {
    let { disabled: n2 } = t2, p2 = { active: m2.value, selected: x2.value, disabled: n2 }, { id: a2, value: l2, disabled: r2, ...s2 } = t2, S2 = { id: a2, ref: d2, role: "option", tabIndex: n2 === true ? void 0 : -1, "aria-disabled": n2 === true ? true : void 0, "aria-selected": x2.value, disabled: void 0, onClick: i2, onFocus: w2, onPointerenter: h2, onMouseenter: h2, onPointermove: y2, onMousemove: y2, onPointerleave: M2, onMouseleave: M2 };
    return H$1({ ourProps: S2, theirProps: s2, slot: p2, attrs: u2, slots: b2, name: "ListboxOption" });
  };
} });
const listbox = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Listbox: Ee$1,
  ListboxButton: Ae,
  ListboxLabel: je,
  ListboxOption: Be$1,
  ListboxOptions: Fe
}, Symbol.toStringTag, { value: "Module" }));
var X = ((l2) => (l2[l2.Open = 0] = "Open", l2[l2.Closed = 1] = "Closed", l2))(X || {}), Y = ((l2) => (l2[l2.Pointer = 0] = "Pointer", l2[l2.Other = 1] = "Other", l2))(Y || {});
function Z(a2) {
  requestAnimationFrame(() => requestAnimationFrame(a2));
}
let A = Symbol("MenuContext");
function D(a2) {
  let b2 = inject(A, null);
  if (b2 === null) {
    let l2 = new Error(`<${a2} /> is missing a parent <Menu /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l2, D), l2;
  }
  return b2;
}
let ge$1 = defineComponent({ name: "Menu", props: { as: { type: [Object, String], default: "template" } }, setup(a2, { slots: b2, attrs: l2 }) {
  let g2 = ref(1), e2 = ref(null), m2 = ref(null), s2 = ref([]), p2 = ref(""), d2 = ref(null), o2 = ref(1);
  function t2(u2 = (r2) => r2) {
    let r2 = d2.value !== null ? s2.value[d2.value] : null, n2 = I(u2(s2.value.slice()), (I2) => o$2(I2.dataRef.domRef)), i2 = r2 ? n2.indexOf(r2) : null;
    return i2 === -1 && (i2 = null), { items: n2, activeItemIndex: i2 };
  }
  let v2 = { menuState: g2, buttonRef: e2, itemsRef: m2, items: s2, searchQuery: p2, activeItemIndex: d2, activationTrigger: o2, closeMenu: () => {
    g2.value = 1, d2.value = null;
  }, openMenu: () => g2.value = 0, goToItem(u2, r2, n2) {
    let i2 = t2(), I2 = x$2(u2 === a$4.Specific ? { focus: a$4.Specific, id: r2 } : { focus: u2 }, { resolveItems: () => i2.items, resolveActiveIndex: () => i2.activeItemIndex, resolveId: (M2) => M2.id, resolveDisabled: (M2) => M2.dataRef.disabled });
    p2.value = "", d2.value = I2, o2.value = n2 != null ? n2 : 1, s2.value = i2.items;
  }, search(u2) {
    let n2 = p2.value !== "" ? 0 : 1;
    p2.value += u2.toLowerCase();
    let I2 = (d2.value !== null ? s2.value.slice(d2.value + n2).concat(s2.value.slice(0, d2.value + n2)) : s2.value).find((P2) => P2.dataRef.textValue.startsWith(p2.value) && !P2.dataRef.disabled), M2 = I2 ? s2.value.indexOf(I2) : -1;
    M2 === -1 || M2 === d2.value || (d2.value = M2, o2.value = 1);
  }, clearSearch() {
    p2.value = "";
  }, registerItem(u2, r2) {
    let n2 = t2((i2) => [...i2, { id: u2, dataRef: r2 }]);
    s2.value = n2.items, d2.value = n2.activeItemIndex, o2.value = 1;
  }, unregisterItem(u2) {
    let r2 = t2((n2) => {
      let i2 = n2.findIndex((I2) => I2.id === u2);
      return i2 !== -1 && n2.splice(i2, 1), n2;
    });
    s2.value = r2.items, d2.value = r2.activeItemIndex, o2.value = 1;
  } };
  return y([e2, m2], (u2, r2) => {
    var n2;
    v2.closeMenu(), S$2(r2, F$2.Loose) || (u2.preventDefault(), (n2 = o$2(e2)) == null || n2.focus());
  }, computed(() => g2.value === 0)), provide(A, v2), c$2(computed(() => u$5(g2.value, { [0]: l$3.Open, [1]: l$3.Closed }))), () => {
    let u2 = { open: g2.value === 0, close: v2.closeMenu };
    return H$1({ ourProps: {}, theirProps: a2, slot: u2, slots: b2, attrs: l2, name: "Menu" });
  };
} }), Se$1 = defineComponent({ name: "MenuButton", props: { disabled: { type: Boolean, default: false }, as: { type: [Object, String], default: "button" }, id: { type: String, default: () => `headlessui-menu-button-${t$2()}` } }, setup(a2, { attrs: b2, slots: l2, expose: g2 }) {
  let e2 = D("MenuButton");
  g2({ el: e2.buttonRef, $el: e2.buttonRef });
  function m2(o2) {
    switch (o2.key) {
      case o$3.Space:
      case o$3.Enter:
      case o$3.ArrowDown:
        o2.preventDefault(), o2.stopPropagation(), e2.openMenu(), nextTick(() => {
          var t2;
          (t2 = o$2(e2.itemsRef)) == null || t2.focus({ preventScroll: true }), e2.goToItem(a$4.First);
        });
        break;
      case o$3.ArrowUp:
        o2.preventDefault(), o2.stopPropagation(), e2.openMenu(), nextTick(() => {
          var t2;
          (t2 = o$2(e2.itemsRef)) == null || t2.focus({ preventScroll: true }), e2.goToItem(a$4.Last);
        });
        break;
    }
  }
  function s2(o2) {
    switch (o2.key) {
      case o$3.Space:
        o2.preventDefault();
        break;
    }
  }
  function p2(o2) {
    a2.disabled || (e2.menuState.value === 0 ? (e2.closeMenu(), nextTick(() => {
      var t2;
      return (t2 = o$2(e2.buttonRef)) == null ? void 0 : t2.focus({ preventScroll: true });
    })) : (o2.preventDefault(), e2.openMenu(), Z(() => {
      var t2;
      return (t2 = o$2(e2.itemsRef)) == null ? void 0 : t2.focus({ preventScroll: true });
    })));
  }
  let d2 = b$1(computed(() => ({ as: a2.as, type: b2.type })), e2.buttonRef);
  return () => {
    var r2;
    let o2 = { open: e2.menuState.value === 0 }, { id: t2, ...v2 } = a2, u2 = { ref: e2.buttonRef, id: t2, type: d2.value, "aria-haspopup": "menu", "aria-controls": (r2 = o$2(e2.itemsRef)) == null ? void 0 : r2.id, "aria-expanded": a2.disabled ? void 0 : e2.menuState.value === 0, onKeydown: m2, onKeyup: s2, onClick: p2 };
    return H$1({ ourProps: u2, theirProps: v2, slot: o2, attrs: b2, slots: l2, name: "MenuButton" });
  };
} }), be = defineComponent({ name: "MenuItems", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: () => `headlessui-menu-items-${t$2()}` } }, setup(a2, { attrs: b2, slots: l2, expose: g2 }) {
  let e2 = D("MenuItems"), m2 = ref(null);
  g2({ el: e2.itemsRef, $el: e2.itemsRef }), p$4({ container: computed(() => o$2(e2.itemsRef)), enabled: computed(() => e2.menuState.value === 0), accept(t2) {
    return t2.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : t2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(t2) {
    t2.setAttribute("role", "none");
  } });
  function s2(t2) {
    var v2;
    switch (m2.value && clearTimeout(m2.value), t2.key) {
      case o$3.Space:
        if (e2.searchQuery.value !== "")
          return t2.preventDefault(), t2.stopPropagation(), e2.search(t2.key);
      case o$3.Enter:
        if (t2.preventDefault(), t2.stopPropagation(), e2.activeItemIndex.value !== null) {
          let r2 = e2.items.value[e2.activeItemIndex.value];
          (v2 = o$2(r2.dataRef.domRef)) == null || v2.click();
        }
        e2.closeMenu(), v$1(o$2(e2.buttonRef));
        break;
      case o$3.ArrowDown:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToItem(a$4.Next);
      case o$3.ArrowUp:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToItem(a$4.Previous);
      case o$3.Home:
      case o$3.PageUp:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToItem(a$4.First);
      case o$3.End:
      case o$3.PageDown:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToItem(a$4.Last);
      case o$3.Escape:
        t2.preventDefault(), t2.stopPropagation(), e2.closeMenu(), nextTick(() => {
          var u2;
          return (u2 = o$2(e2.buttonRef)) == null ? void 0 : u2.focus({ preventScroll: true });
        });
        break;
      case o$3.Tab:
        t2.preventDefault(), t2.stopPropagation(), e2.closeMenu(), nextTick(() => D$1(o$2(e2.buttonRef), t2.shiftKey ? N.Previous : N.Next));
        break;
      default:
        t2.key.length === 1 && (e2.search(t2.key), m2.value = setTimeout(() => e2.clearSearch(), 350));
        break;
    }
  }
  function p2(t2) {
    switch (t2.key) {
      case o$3.Space:
        t2.preventDefault();
        break;
    }
  }
  let d2 = p$5(), o2 = computed(() => d2 !== null ? d2.value === l$3.Open : e2.menuState.value === 0);
  return () => {
    var n2, i2;
    let t2 = { open: e2.menuState.value === 0 }, { id: v2, ...u2 } = a2, r2 = { "aria-activedescendant": e2.activeItemIndex.value === null || (n2 = e2.items.value[e2.activeItemIndex.value]) == null ? void 0 : n2.id, "aria-labelledby": (i2 = o$2(e2.buttonRef)) == null ? void 0 : i2.id, id: v2, onKeydown: s2, onKeyup: p2, role: "menu", tabIndex: 0, ref: e2.itemsRef };
    return H$1({ ourProps: r2, theirProps: u2, slot: t2, attrs: b2, slots: l2, features: N$1.RenderStrategy | N$1.Static, visible: o2.value, name: "MenuItems" });
  };
} }), Me = defineComponent({ name: "MenuItem", inheritAttrs: false, props: { as: { type: [Object, String], default: "template" }, disabled: { type: Boolean, default: false }, id: { type: String, default: () => `headlessui-menu-item-${t$2()}` } }, setup(a2, { slots: b2, attrs: l2, expose: g2 }) {
  let e2 = D("MenuItem"), m2 = ref(null);
  g2({ el: m2, $el: m2 });
  let s2 = computed(() => e2.activeItemIndex.value !== null ? e2.items.value[e2.activeItemIndex.value].id === a2.id : false), p2 = computed(() => ({ disabled: a2.disabled, textValue: "", domRef: m2 }));
  onMounted(() => {
    var i2, I2;
    let n2 = (I2 = (i2 = o$2(m2)) == null ? void 0 : i2.textContent) == null ? void 0 : I2.toLowerCase().trim();
    n2 !== void 0 && (p2.value.textValue = n2);
  }), onMounted(() => e2.registerItem(a2.id, p2)), onUnmounted(() => e2.unregisterItem(a2.id)), watchEffect(() => {
    e2.menuState.value === 0 && (!s2.value || e2.activationTrigger.value !== 0 && nextTick(() => {
      var n2, i2;
      return (i2 = (n2 = o$2(m2)) == null ? void 0 : n2.scrollIntoView) == null ? void 0 : i2.call(n2, { block: "nearest" });
    }));
  });
  function d2(n2) {
    if (a2.disabled)
      return n2.preventDefault();
    e2.closeMenu(), v$1(o$2(e2.buttonRef));
  }
  function o2() {
    if (a2.disabled)
      return e2.goToItem(a$4.Nothing);
    e2.goToItem(a$4.Specific, a2.id);
  }
  let t2 = u$3();
  function v2(n2) {
    t2.update(n2);
  }
  function u2(n2) {
    !t2.wasMoved(n2) || a2.disabled || s2.value || e2.goToItem(a$4.Specific, a2.id, 0);
  }
  function r2(n2) {
    !t2.wasMoved(n2) || a2.disabled || !s2.value || e2.goToItem(a$4.Nothing);
  }
  return () => {
    let { disabled: n2 } = a2, i2 = { active: s2.value, disabled: n2, close: e2.closeMenu }, { id: I2, ...M2 } = a2;
    return H$1({ ourProps: { id: I2, ref: m2, role: "menuitem", tabIndex: n2 === true ? void 0 : -1, "aria-disabled": n2 === true ? true : void 0, disabled: void 0, onClick: d2, onFocus: o2, onPointerenter: v2, onMouseenter: v2, onPointermove: u2, onMousemove: u2, onPointerleave: r2, onMouseleave: r2 }, theirProps: { ...l2, ...M2 }, slot: i2, attrs: l2, slots: b2, name: "MenuItem" });
  };
} });
const menu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Menu: ge$1,
  MenuButton: Se$1,
  MenuItem: Me,
  MenuItems: be
}, Symbol.toStringTag, { value: "Module" }));
var ce = ((p2) => (p2[p2.Open = 0] = "Open", p2[p2.Closed = 1] = "Closed", p2))(ce || {});
let te$1 = Symbol("PopoverContext");
function W(c2) {
  let m2 = inject(te$1, null);
  if (m2 === null) {
    let p2 = new Error(`<${c2} /> is missing a parent <${Pe.name} /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(p2, W), p2;
  }
  return m2;
}
let oe$2 = Symbol("PopoverGroupContext");
function ne$1() {
  return inject(oe$2, null);
}
let le$1 = Symbol("PopoverPanelContext");
function de$2() {
  return inject(le$1, null);
}
let Pe = defineComponent({ name: "Popover", props: { as: { type: [Object, String], default: "div" } }, setup(c2, { slots: m2, attrs: p2, expose: y$12 }) {
  var n2;
  let o2 = ref(null);
  y$12({ el: o2, $el: o2 });
  let e2 = ref(1), f2 = ref(null), d2 = ref(null), I2 = ref(null), s2 = ref(null), b2 = computed(() => m$3(o2)), P2 = computed(() => {
    var h2, D2;
    if (!o$2(f2) || !o$2(s2))
      return false;
    for (let w2 of document.querySelectorAll("body > *"))
      if (Number(w2 == null ? void 0 : w2.contains(o$2(f2))) ^ Number(w2 == null ? void 0 : w2.contains(o$2(s2))))
        return true;
    let t2 = d$7(), r2 = t2.indexOf(o$2(f2)), u2 = (r2 + t2.length - 1) % t2.length, v2 = (r2 + 1) % t2.length, S2 = t2[u2], G2 = t2[v2];
    return !((h2 = o$2(s2)) != null && h2.contains(S2)) && !((D2 = o$2(s2)) != null && D2.contains(G2));
  }), a2 = { popoverState: e2, buttonId: ref(null), panelId: ref(null), panel: s2, button: f2, isPortalled: P2, beforePanelSentinel: d2, afterPanelSentinel: I2, togglePopover() {
    e2.value = u$5(e2.value, { [0]: 1, [1]: 0 });
  }, closePopover() {
    e2.value !== 1 && (e2.value = 1);
  }, close(t2) {
    a2.closePopover();
    let r2 = (() => t2 ? t2 instanceof HTMLElement ? t2 : t2.value instanceof HTMLElement ? o$2(t2) : o$2(a2.button) : o$2(a2.button))();
    r2 == null || r2.focus();
  } };
  provide(te$1, a2), c$2(computed(() => u$5(e2.value, { [0]: l$3.Open, [1]: l$3.Closed })));
  let F2 = { buttonId: a2.buttonId, panelId: a2.panelId, close() {
    a2.closePopover();
  } }, g2 = ne$1(), E2 = g2 == null ? void 0 : g2.registerPopover;
  function i2() {
    var t2, r2, u2, v2;
    return (v2 = g2 == null ? void 0 : g2.isFocusWithinPopoverGroup()) != null ? v2 : ((t2 = b2.value) == null ? void 0 : t2.activeElement) && (((r2 = o$2(f2)) == null ? void 0 : r2.contains(b2.value.activeElement)) || ((u2 = o$2(s2)) == null ? void 0 : u2.contains(b2.value.activeElement)));
  }
  return watchEffect(() => E2 == null ? void 0 : E2(F2)), E$2((n2 = b2.value) == null ? void 0 : n2.defaultView, "focus", (t2) => {
    var r2, u2;
    e2.value === 0 && (i2() || !f2 || !s2 || t2.target !== window && ((r2 = o$2(a2.beforePanelSentinel)) != null && r2.contains(t2.target) || (u2 = o$2(a2.afterPanelSentinel)) != null && u2.contains(t2.target) || a2.closePopover()));
  }, true), y([f2, s2], (t2, r2) => {
    var u2;
    a2.closePopover(), S$2(r2, F$2.Loose) || (t2.preventDefault(), (u2 = o$2(f2)) == null || u2.focus());
  }, computed(() => e2.value === 0)), () => {
    let t2 = { open: e2.value === 0, close: a2.close };
    return H$1({ theirProps: c2, ourProps: { ref: o2 }, slot: t2, slots: m2, attrs: p2, name: "Popover" });
  };
} }), Be = defineComponent({ name: "PopoverButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: () => `headlessui-popover-button-${t$2()}` } }, inheritAttrs: false, setup(c2, { attrs: m2, slots: p2, expose: y2 }) {
  let o2 = W("PopoverButton"), e2 = computed(() => m$3(o2.button));
  y2({ el: o2.button, $el: o2.button }), onMounted(() => {
    o2.buttonId.value = c2.id;
  }), onUnmounted(() => {
    o2.buttonId.value = null;
  });
  let f2 = ne$1(), d2 = f2 == null ? void 0 : f2.closeOthers, I2 = de$2(), s2 = computed(() => I2 === null ? false : I2.value === o2.panelId.value), b2 = ref(null), P2 = `headlessui-focus-sentinel-${t$2()}`;
  s2.value || watchEffect(() => {
    o2.button.value = b2.value;
  });
  let a2 = b$1(computed(() => ({ as: c2.as, type: m2.type })), b2);
  function F2(n2) {
    var t2, r2, u2, v2, S2;
    if (s2.value) {
      if (o2.popoverState.value === 1)
        return;
      switch (n2.key) {
        case o$3.Space:
        case o$3.Enter:
          n2.preventDefault(), (r2 = (t2 = n2.target).click) == null || r2.call(t2), o2.closePopover(), (u2 = o$2(o2.button)) == null || u2.focus();
          break;
      }
    } else
      switch (n2.key) {
        case o$3.Space:
        case o$3.Enter:
          n2.preventDefault(), n2.stopPropagation(), o2.popoverState.value === 1 && (d2 == null || d2(o2.buttonId.value)), o2.togglePopover();
          break;
        case o$3.Escape:
          if (o2.popoverState.value !== 0)
            return d2 == null ? void 0 : d2(o2.buttonId.value);
          if (!o$2(o2.button) || ((v2 = e2.value) == null ? void 0 : v2.activeElement) && !((S2 = o$2(o2.button)) != null && S2.contains(e2.value.activeElement)))
            return;
          n2.preventDefault(), n2.stopPropagation(), o2.closePopover();
          break;
      }
  }
  function g2(n2) {
    s2.value || n2.key === o$3.Space && n2.preventDefault();
  }
  function E2(n2) {
    var t2, r2;
    c2.disabled || (s2.value ? (o2.closePopover(), (t2 = o$2(o2.button)) == null || t2.focus()) : (n2.preventDefault(), n2.stopPropagation(), o2.popoverState.value === 1 && (d2 == null || d2(o2.buttonId.value)), o2.togglePopover(), (r2 = o$2(o2.button)) == null || r2.focus()));
  }
  function i2(n2) {
    n2.preventDefault(), n2.stopPropagation();
  }
  return () => {
    let n$12 = o2.popoverState.value === 0, t2 = { open: n$12 }, { id: r2, ...u2 } = c2, v2 = s2.value ? { ref: b2, type: a2.value, onKeydown: F2, onClick: E2 } : { ref: b2, id: r2, type: a2.value, "aria-expanded": c2.disabled ? void 0 : o2.popoverState.value === 0, "aria-controls": o$2(o2.panel) ? o2.panelId.value : void 0, disabled: c2.disabled ? true : void 0, onKeydown: F2, onKeyup: g2, onClick: E2, onMousedown: i2 }, S2 = n();
    function G2() {
      let h2 = o$2(o2.panel);
      if (!h2)
        return;
      function D2() {
        u$5(S2.value, { [d$5.Forwards]: () => O(h2, N.First), [d$5.Backwards]: () => O(h2, N.Last) }) === T$1.Error && O(d$7().filter((re2) => re2.dataset.headlessuiFocusGuard !== "true"), u$5(S2.value, { [d$5.Forwards]: N.Next, [d$5.Backwards]: N.Previous }), { relativeTo: o$2(o2.button) });
      }
      D2();
    }
    return h$1(Fragment, [H$1({ ourProps: v2, theirProps: { ...m2, ...u2 }, slot: t2, attrs: m2, slots: p2, name: "PopoverButton" }), n$12 && !s2.value && o2.isPortalled.value && h$1(f$1, { id: P2, features: a$3.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: G2 })]);
  };
} }), Le = defineComponent({ name: "PopoverOverlay", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(c2, { attrs: m2, slots: p2 }) {
  let y2 = W("PopoverOverlay"), o2 = `headlessui-popover-overlay-${t$2()}`, e2 = p$5(), f2 = computed(() => e2 !== null ? e2.value === l$3.Open : y2.popoverState.value === 0);
  function d2() {
    y2.closePopover();
  }
  return () => {
    let I2 = { open: y2.popoverState.value === 0 };
    return H$1({ ourProps: { id: o2, "aria-hidden": true, onClick: d2 }, theirProps: c2, slot: I2, attrs: m2, slots: p2, features: N$1.RenderStrategy | N$1.Static, visible: f2.value, name: "PopoverOverlay" });
  };
} }), He = defineComponent({ name: "PopoverPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, focus: { type: Boolean, default: false }, id: { type: String, default: () => `headlessui-popover-panel-${t$2()}` } }, inheritAttrs: false, setup(c2, { attrs: m2, slots: p2, expose: y2 }) {
  let { focus: o2 } = c2, e2 = W("PopoverPanel"), f2 = computed(() => m$3(e2.panel)), d2 = `headlessui-focus-sentinel-before-${t$2()}`, I2 = `headlessui-focus-sentinel-after-${t$2()}`;
  y2({ el: e2.panel, $el: e2.panel }), onMounted(() => {
    e2.panelId.value = c2.id;
  }), onUnmounted(() => {
    e2.panelId.value = null;
  }), provide(le$1, e2.panelId), watchEffect(() => {
    var n2, t2;
    if (!o2 || e2.popoverState.value !== 0 || !e2.panel)
      return;
    let i2 = (n2 = f2.value) == null ? void 0 : n2.activeElement;
    (t2 = o$2(e2.panel)) != null && t2.contains(i2) || O(o$2(e2.panel), N.First);
  });
  let s2 = p$5(), b2 = computed(() => s2 !== null ? s2.value === l$3.Open : e2.popoverState.value === 0);
  function P2(i2) {
    var n2, t2;
    switch (i2.key) {
      case o$3.Escape:
        if (e2.popoverState.value !== 0 || !o$2(e2.panel) || f2.value && !((n2 = o$2(e2.panel)) != null && n2.contains(f2.value.activeElement)))
          return;
        i2.preventDefault(), i2.stopPropagation(), e2.closePopover(), (t2 = o$2(e2.button)) == null || t2.focus();
        break;
    }
  }
  function a2(i2) {
    var t2, r2, u2, v2, S2;
    let n2 = i2.relatedTarget;
    !n2 || !o$2(e2.panel) || (t2 = o$2(e2.panel)) != null && t2.contains(n2) || (e2.closePopover(), (((u2 = (r2 = o$2(e2.beforePanelSentinel)) == null ? void 0 : r2.contains) == null ? void 0 : u2.call(r2, n2)) || ((S2 = (v2 = o$2(e2.afterPanelSentinel)) == null ? void 0 : v2.contains) == null ? void 0 : S2.call(v2, n2))) && n2.focus({ preventScroll: true }));
  }
  let F2 = n();
  function g2() {
    let i2 = o$2(e2.panel);
    if (!i2)
      return;
    function n2() {
      u$5(F2.value, { [d$5.Forwards]: () => {
        var r2;
        O(i2, N.First) === T$1.Error && ((r2 = o$2(e2.afterPanelSentinel)) == null || r2.focus());
      }, [d$5.Backwards]: () => {
        var t2;
        (t2 = o$2(e2.button)) == null || t2.focus({ preventScroll: true });
      } });
    }
    n2();
  }
  function E2() {
    let i2 = o$2(e2.panel);
    if (!i2)
      return;
    function n2() {
      u$5(F2.value, { [d$5.Forwards]: () => {
        let t2 = o$2(e2.button), r2 = o$2(e2.panel);
        if (!t2)
          return;
        let u2 = d$7(), v2 = u2.indexOf(t2), S2 = u2.slice(0, v2 + 1), h2 = [...u2.slice(v2 + 1), ...S2];
        for (let D2 of h2.slice())
          if (D2.dataset.headlessuiFocusGuard === "true" || (r2 == null ? void 0 : r2.contains(D2))) {
            let w2 = h2.indexOf(D2);
            w2 !== -1 && h2.splice(w2, 1);
          }
        O(h2, N.First, { sorted: false });
      }, [d$5.Backwards]: () => {
        var r2;
        O(i2, N.Previous) === T$1.Error && ((r2 = o$2(e2.button)) == null || r2.focus());
      } });
    }
    n2();
  }
  return () => {
    let i2 = { open: e2.popoverState.value === 0, close: e2.close }, { id: n2, focus: t2, ...r2 } = c2, u2 = { ref: e2.panel, id: n2, onKeydown: P2, onFocusout: o2 && e2.popoverState.value === 0 ? a2 : void 0, tabIndex: -1 };
    return H$1({ ourProps: u2, theirProps: { ...m2, ...r2 }, attrs: m2, slot: i2, slots: { ...p2, default: (...v2) => {
      var S2;
      return [h$1(Fragment, [b2.value && e2.isPortalled.value && h$1(f$1, { id: d2, ref: e2.beforePanelSentinel, features: a$3.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: g2 }), (S2 = p2.default) == null ? void 0 : S2.call(p2, ...v2), b2.value && e2.isPortalled.value && h$1(f$1, { id: I2, ref: e2.afterPanelSentinel, features: a$3.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: E2 })])];
    } }, features: N$1.RenderStrategy | N$1.Static, visible: b2.value, name: "PopoverPanel" });
  };
} }), Ke = defineComponent({ name: "PopoverGroup", props: { as: { type: [Object, String], default: "div" } }, setup(c2, { attrs: m2, slots: p2, expose: y2 }) {
  let o2 = ref(null), e2 = shallowRef([]), f2 = computed(() => m$3(o2));
  y2({ el: o2, $el: o2 });
  function d2(P2) {
    let a2 = e2.value.indexOf(P2);
    a2 !== -1 && e2.value.splice(a2, 1);
  }
  function I2(P2) {
    return e2.value.push(P2), () => {
      d2(P2);
    };
  }
  function s2() {
    var F2;
    let P2 = f2.value;
    if (!P2)
      return false;
    let a2 = P2.activeElement;
    return (F2 = o$2(o2)) != null && F2.contains(a2) ? true : e2.value.some((g2) => {
      var E2, i2;
      return ((E2 = P2.getElementById(g2.buttonId.value)) == null ? void 0 : E2.contains(a2)) || ((i2 = P2.getElementById(g2.panelId.value)) == null ? void 0 : i2.contains(a2));
    });
  }
  function b2(P2) {
    for (let a2 of e2.value)
      a2.buttonId.value !== P2 && a2.close();
  }
  return provide(oe$2, { registerPopover: I2, unregisterPopover: d2, isFocusWithinPopoverGroup: s2, closeOthers: b2 }), () => H$1({ ourProps: { ref: o2 }, theirProps: c2, slot: {}, attrs: m2, slots: p2, name: "PopoverGroup" });
} });
const popover = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Popover: Pe,
  PopoverButton: Be,
  PopoverGroup: Ke,
  PopoverOverlay: Le,
  PopoverPanel: He
}, Symbol.toStringTag, { value: "Module" }));
let a = Symbol("LabelContext");
function d$3() {
  let t2 = inject(a, null);
  if (t2 === null) {
    let n2 = new Error("You used a <Label /> component, but it is not inside a parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(n2, d$3), n2;
  }
  return t2;
}
function K({ slot: t2 = {}, name: n2 = "Label", props: i2 = {} } = {}) {
  let e2 = ref([]);
  function l2(r2) {
    return e2.value.push(r2), () => {
      let o2 = e2.value.indexOf(r2);
      o2 !== -1 && e2.value.splice(o2, 1);
    };
  }
  return provide(a, { register: l2, slot: t2, name: n2, props: i2 }), computed(() => e2.value.length > 0 ? e2.value.join(" ") : void 0);
}
let T = defineComponent({ name: "Label", props: { as: { type: [Object, String], default: "label" }, passive: { type: [Boolean], default: false }, id: { type: String, default: () => `headlessui-label-${t$2()}` } }, setup(t2, { slots: n2, attrs: i2 }) {
  let e2 = d$3();
  return onMounted(() => onUnmounted(e2.register(t2.id))), () => {
    let { name: l2 = "Label", slot: r2 = {}, props: o2 = {} } = e2, { id: p2, passive: c2, ...s2 } = t2, u2 = { ...Object.entries(o2).reduce((f2, [b2, g2]) => Object.assign(f2, { [b2]: unref(g2) }), {}), id: p2 };
    return c2 && (delete u2.onClick, delete s2.onClick), H$1({ ourProps: u2, theirProps: s2, slot: r2, attrs: i2, slots: n2, name: l2 });
  };
} });
function ne(t2, m2) {
  return t2 === m2;
}
let V = Symbol("RadioGroupContext");
function j$1(t2) {
  let m2 = inject(V, null);
  if (m2 === null) {
    let o2 = new Error(`<${t2} /> is missing a parent <RadioGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o2, j$1), o2;
  }
  return m2;
}
let Oe = defineComponent({ name: "RadioGroup", emits: { "update:modelValue": (t2) => true }, props: { as: { type: [Object, String], default: "div" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], default: () => ne }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, name: { type: String, optional: true }, id: { type: String, default: () => `headlessui-radiogroup-${t$2()}` } }, inheritAttrs: false, setup(t2, { emit: m2, attrs: o2, slots: k2, expose: d2 }) {
  let s2 = ref(null), i2 = ref([]), b2 = K({ name: "RadioGroupLabel" }), E2 = M({ name: "RadioGroupDescription" });
  d2({ el: s2, $el: s2 });
  let [f2, w2] = d$6(computed(() => t2.modelValue), (e2) => m2("update:modelValue", e2), computed(() => t2.defaultValue)), l2 = { options: i2, value: f2, disabled: computed(() => t2.disabled), firstOption: computed(() => i2.value.find((e2) => !e2.propsRef.disabled)), containsCheckedOption: computed(() => i2.value.some((e2) => l2.compare(toRaw(e2.propsRef.value), toRaw(t2.modelValue)))), compare(e2, a2) {
    if (typeof t2.by == "string") {
      let n2 = t2.by;
      return (e2 == null ? void 0 : e2[n2]) === (a2 == null ? void 0 : a2[n2]);
    }
    return t2.by(e2, a2);
  }, change(e2) {
    var n2;
    if (t2.disabled || l2.compare(toRaw(f2.value), toRaw(e2)))
      return false;
    let a2 = (n2 = i2.value.find((r2) => l2.compare(toRaw(r2.propsRef.value), toRaw(e2)))) == null ? void 0 : n2.propsRef;
    return a2 != null && a2.disabled ? false : (w2(e2), true);
  }, registerOption(e2) {
    i2.value.push(e2), i2.value = I(i2.value, (a2) => a2.element);
  }, unregisterOption(e2) {
    let a2 = i2.value.findIndex((n2) => n2.id === e2);
    a2 !== -1 && i2.value.splice(a2, 1);
  } };
  provide(V, l2), p$4({ container: computed(() => o$2(s2)), accept(e2) {
    return e2.getAttribute("role") === "radio" ? NodeFilter.FILTER_REJECT : e2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(e2) {
    e2.setAttribute("role", "none");
  } });
  function g2(e2) {
    if (!s2.value || !s2.value.contains(e2.target))
      return;
    let a2 = i2.value.filter((n2) => n2.propsRef.disabled === false).map((n2) => n2.element);
    switch (e2.key) {
      case o$3.Enter:
        p$3(e2.currentTarget);
        break;
      case o$3.ArrowLeft:
      case o$3.ArrowUp:
        if (e2.preventDefault(), e2.stopPropagation(), O(a2, N.Previous | N.WrapAround) === T$1.Success) {
          let r2 = i2.value.find((p2) => {
            var c2;
            return p2.element === ((c2 = m$3(s2)) == null ? void 0 : c2.activeElement);
          });
          r2 && l2.change(r2.propsRef.value);
        }
        break;
      case o$3.ArrowRight:
      case o$3.ArrowDown:
        if (e2.preventDefault(), e2.stopPropagation(), O(a2, N.Next | N.WrapAround) === T$1.Success) {
          let r2 = i2.value.find((p2) => {
            var c2;
            return p2.element === ((c2 = m$3(p2.element)) == null ? void 0 : c2.activeElement);
          });
          r2 && l2.change(r2.propsRef.value);
        }
        break;
      case o$3.Space:
        {
          e2.preventDefault(), e2.stopPropagation();
          let n2 = i2.value.find((r2) => {
            var p2;
            return r2.element === ((p2 = m$3(r2.element)) == null ? void 0 : p2.activeElement);
          });
          n2 && l2.change(n2.propsRef.value);
        }
        break;
    }
  }
  let R2 = computed(() => {
    var e2;
    return (e2 = o$2(s2)) == null ? void 0 : e2.closest("form");
  });
  return onMounted(() => {
    watch([R2], () => {
      if (!R2.value || t2.defaultValue === void 0)
        return;
      function e2() {
        l2.change(t2.defaultValue);
      }
      return R2.value.addEventListener("reset", e2), () => {
        var a2;
        (a2 = R2.value) == null || a2.removeEventListener("reset", e2);
      };
    }, { immediate: true });
  }), () => {
    let { disabled: e2, name: a2, id: n2, ...r2 } = t2, p2 = { ref: s2, id: n2, role: "radiogroup", "aria-labelledby": b2.value, "aria-describedby": E2.value, onKeydown: g2 };
    return h$1(Fragment, [...a2 != null && f2.value != null ? e$1({ [a2]: f2.value }).map(([c2, S2]) => h$1(f$1, K$1({ features: a$3.Hidden, key: c2, as: "input", type: "hidden", hidden: true, readOnly: true, name: c2, value: S2 }))) : [], H$1({ ourProps: p2, theirProps: { ...o2, ...T$2(r2, ["modelValue", "defaultValue"]) }, slot: {}, attrs: o2, slots: k2, name: "RadioGroup" })]);
  };
} });
var re = ((o2) => (o2[o2.Empty = 1] = "Empty", o2[o2.Active = 2] = "Active", o2))(re || {});
let ke = defineComponent({ name: "RadioGroupOption", props: { as: { type: [Object, String], default: "div" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false }, id: { type: String, default: () => `headlessui-radiogroup-option-${t$2()}` } }, setup(t2, { attrs: m2, slots: o2, expose: k2 }) {
  let d2 = j$1("RadioGroupOption"), s2 = K({ name: "RadioGroupLabel" }), i2 = M({ name: "RadioGroupDescription" }), b2 = ref(null), E2 = computed(() => ({ value: t2.value, disabled: t2.disabled })), f2 = ref(1);
  k2({ el: b2, $el: b2 }), onMounted(() => d2.registerOption({ id: t2.id, element: b2, propsRef: E2 })), onUnmounted(() => d2.unregisterOption(t2.id));
  let w2 = computed(() => {
    var r2;
    return ((r2 = d2.firstOption.value) == null ? void 0 : r2.id) === t2.id;
  }), l2 = computed(() => d2.disabled.value || t2.disabled), g2 = computed(() => d2.compare(toRaw(d2.value.value), toRaw(t2.value))), R2 = computed(() => l2.value ? -1 : g2.value || !d2.containsCheckedOption.value && w2.value ? 0 : -1);
  function e2() {
    var r2;
    !d2.change(t2.value) || (f2.value |= 2, (r2 = b2.value) == null || r2.focus());
  }
  function a2() {
    f2.value |= 2;
  }
  function n2() {
    f2.value &= -3;
  }
  return () => {
    let { id: r2, value: p2, disabled: c2, ...S2 } = t2, H2 = { checked: g2.value, disabled: l2.value, active: Boolean(f2.value & 2) }, N2 = { id: r2, ref: b2, role: "radio", "aria-checked": g2.value ? "true" : "false", "aria-labelledby": s2.value, "aria-describedby": i2.value, "aria-disabled": l2.value ? true : void 0, tabIndex: R2.value, onClick: l2.value ? void 0 : e2, onFocus: l2.value ? void 0 : a2, onBlur: l2.value ? void 0 : n2 };
    return H$1({ ourProps: N2, theirProps: S2, slot: H2, attrs: m2, slots: o2, name: "RadioGroupOption" });
  };
} }), Ee = T, we = E$1;
const radioGroup = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RadioGroup: Oe,
  RadioGroupDescription: we,
  RadioGroupLabel: Ee,
  RadioGroupOption: ke
}, Symbol.toStringTag, { value: "Module" }));
let S = Symbol("GroupContext"), oe$1 = defineComponent({ name: "SwitchGroup", props: { as: { type: [Object, String], default: "template" } }, setup(l2, { slots: c2, attrs: o2 }) {
  let r2 = ref(null), p2 = K({ name: "SwitchLabel", props: { onClick() {
    !r2.value || (r2.value.click(), r2.value.focus({ preventScroll: true }));
  } } }), t2 = M({ name: "SwitchDescription" });
  return provide(S, { switchRef: r2, labelledby: p2, describedby: t2 }), () => H$1({ theirProps: l2, ourProps: {}, slot: {}, slots: c2, attrs: o2, name: "SwitchGroup" });
} }), ue$1 = defineComponent({ name: "Switch", emits: { "update:modelValue": (l2) => true }, props: { as: { type: [Object, String], default: "button" }, modelValue: { type: Boolean, default: void 0 }, defaultChecked: { type: Boolean, optional: true }, name: { type: String, optional: true }, value: { type: String, optional: true }, id: { type: String, default: () => `headlessui-switch-${t$2()}` } }, inheritAttrs: false, setup(l2, { emit: c2, attrs: o2, slots: r2, expose: p2 }) {
  let t2 = inject(S, null), [i2, s2] = d$6(computed(() => l2.modelValue), (e2) => c2("update:modelValue", e2), computed(() => l2.defaultChecked));
  function f2() {
    s2(!i2.value);
  }
  let w2 = ref(null), u2 = t2 === null ? w2 : t2.switchRef, k2 = b$1(computed(() => ({ as: l2.as, type: o2.type })), u2);
  p2({ el: u2, $el: u2 });
  function C2(e2) {
    e2.preventDefault(), f2();
  }
  function g2(e2) {
    e2.key === o$3.Space ? (e2.preventDefault(), f2()) : e2.key === o$3.Enter && p$3(e2.currentTarget);
  }
  function R2(e2) {
    e2.preventDefault();
  }
  let a2 = computed(() => {
    var e2, n2;
    return (n2 = (e2 = o$2(u2)) == null ? void 0 : e2.closest) == null ? void 0 : n2.call(e2, "form");
  });
  return onMounted(() => {
    watch([a2], () => {
      if (!a2.value || l2.defaultChecked === void 0)
        return;
      function e2() {
        s2(l2.defaultChecked);
      }
      return a2.value.addEventListener("reset", e2), () => {
        var n2;
        (n2 = a2.value) == null || n2.removeEventListener("reset", e2);
      };
    }, { immediate: true });
  }), () => {
    let { id: e2, name: n2, value: D2, ...E2 } = l2, K2 = { checked: i2.value }, L2 = { id: e2, ref: u2, role: "switch", type: k2.value, tabIndex: 0, "aria-checked": i2.value, "aria-labelledby": t2 == null ? void 0 : t2.labelledby.value, "aria-describedby": t2 == null ? void 0 : t2.describedby.value, onClick: C2, onKeyup: g2, onKeypress: R2 };
    return h$1(Fragment, [n2 != null && i2.value != null ? h$1(f$1, K$1({ features: a$3.Hidden, as: "input", type: "checkbox", hidden: true, readOnly: true, checked: i2.value, name: n2, value: D2 })) : null, H$1({ ourProps: L2, theirProps: { ...o2, ...T$2(E2, ["modelValue", "defaultChecked"]) }, slot: K2, attrs: o2, slots: r2, name: "Switch" })]);
  };
} }), ae = T, de$1 = E$1;
const _switch = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Switch: ue$1,
  SwitchDescription: de$1,
  SwitchGroup: oe$1,
  SwitchLabel: ae
}, Symbol.toStringTag, { value: "Module" }));
let d$2 = defineComponent({ props: { onFocus: { type: Function, required: true } }, setup(t2) {
  let n2 = ref(true);
  return () => n2.value ? h$1(f$1, { as: "button", type: "button", features: a$3.Focusable, onFocus(o2) {
    o2.preventDefault();
    let e2, a2 = 50;
    function r2() {
      var u2;
      if (a2-- <= 0) {
        e2 && cancelAnimationFrame(e2);
        return;
      }
      if ((u2 = t2.onFocus) != null && u2.call(t2)) {
        n2.value = false, cancelAnimationFrame(e2);
        return;
      }
      e2 = requestAnimationFrame(r2);
    }
    e2 = requestAnimationFrame(r2);
  } }) : null;
} });
var te = ((i2) => (i2[i2.Forwards = 0] = "Forwards", i2[i2.Backwards = 1] = "Backwards", i2))(te || {}), le = ((s2) => (s2[s2.Less = -1] = "Less", s2[s2.Equal = 0] = "Equal", s2[s2.Greater = 1] = "Greater", s2))(le || {});
let U = Symbol("TabsContext");
function k(a2) {
  let v2 = inject(U, null);
  if (v2 === null) {
    let i2 = new Error(`<${a2} /> is missing a parent <TabGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(i2, k), i2;
  }
  return v2;
}
let j = Symbol("TabsSSRContext"), xe = defineComponent({ name: "TabGroup", emits: { change: (a2) => true }, props: { as: { type: [Object, String], default: "template" }, selectedIndex: { type: [Number], default: null }, defaultIndex: { type: [Number], default: 0 }, vertical: { type: [Boolean], default: false }, manual: { type: [Boolean], default: false } }, inheritAttrs: false, setup(a2, { slots: v2, attrs: i2, emit: s2 }) {
  var h2;
  let l2 = ref((h2 = a2.selectedIndex) != null ? h2 : a2.defaultIndex), n2 = ref([]), o2 = ref([]), T2 = computed(() => a2.selectedIndex !== null), b2 = computed(() => T2.value ? a2.selectedIndex : l2.value);
  function m2(t2) {
    var S2;
    let e2 = I(r2.tabs.value, o$2), u2 = I(r2.panels.value, o$2), f2 = e2.filter((p2) => {
      var E2;
      return !((E2 = o$2(p2)) != null && E2.hasAttribute("disabled"));
    });
    if (t2 < 0 || t2 > e2.length - 1) {
      let p2 = u$5(l2.value === null ? 0 : Math.sign(t2 - l2.value), { [-1]: () => 1, [0]: () => u$5(Math.sign(t2), { [-1]: () => 0, [0]: () => 0, [1]: () => 1 }), [1]: () => 0 });
      l2.value = u$5(p2, { [0]: () => e2.indexOf(f2[0]), [1]: () => e2.indexOf(f2[f2.length - 1]) }), r2.tabs.value = e2, r2.panels.value = u2;
    } else {
      let p2 = e2.slice(0, t2), G2 = [...e2.slice(t2), ...p2].find((W2) => f2.includes(W2));
      if (!G2)
        return;
      let B2 = (S2 = e2.indexOf(G2)) != null ? S2 : r2.selectedIndex.value;
      B2 === -1 && (B2 = r2.selectedIndex.value), l2.value = B2, r2.tabs.value = e2, r2.panels.value = u2;
    }
  }
  let r2 = { selectedIndex: computed(() => {
    var t2, e2;
    return (e2 = (t2 = l2.value) != null ? t2 : a2.defaultIndex) != null ? e2 : null;
  }), orientation: computed(() => a2.vertical ? "vertical" : "horizontal"), activation: computed(() => a2.manual ? "manual" : "auto"), tabs: n2, panels: o2, setSelectedIndex(t2) {
    b2.value !== t2 && s2("change", t2), T2.value || m2(t2);
  }, registerTab(t2) {
    var f2;
    if (n2.value.includes(t2))
      return;
    let e2 = n2.value[l2.value];
    n2.value.push(t2), n2.value = I(n2.value, o$2);
    let u2 = (f2 = n2.value.indexOf(e2)) != null ? f2 : l2.value;
    u2 !== -1 && (l2.value = u2);
  }, unregisterTab(t2) {
    let e2 = n2.value.indexOf(t2);
    e2 !== -1 && n2.value.splice(e2, 1);
  }, registerPanel(t2) {
    o2.value.includes(t2) || (o2.value.push(t2), o2.value = I(o2.value, o$2));
  }, unregisterPanel(t2) {
    let e2 = o2.value.indexOf(t2);
    e2 !== -1 && o2.value.splice(e2, 1);
  } };
  provide(U, r2);
  let R2 = ref({ tabs: [], panels: [] }), y2 = ref(false);
  onMounted(() => {
    y2.value = true;
  }), provide(j, computed(() => y2.value ? null : R2.value));
  let w2 = computed(() => a2.selectedIndex);
  return onMounted(() => {
    watch([w2], () => {
      var t2;
      return m2((t2 = a2.selectedIndex) != null ? t2 : a2.defaultIndex);
    }, { immediate: true });
  }), watchEffect(() => {
    if (!T2.value || b2.value == null || r2.tabs.value.length <= 0)
      return;
    let t2 = I(r2.tabs.value, o$2);
    t2.some((u2, f2) => o$2(r2.tabs.value[f2]) !== o$2(u2)) && r2.setSelectedIndex(t2.findIndex((u2) => o$2(u2) === o$2(r2.tabs.value[b2.value])));
  }), () => {
    let t2 = { selectedIndex: l2.value };
    return h$1(Fragment, [n2.value.length <= 0 && h$1(d$2, { onFocus: () => {
      for (let e2 of n2.value) {
        let u2 = o$2(e2);
        if ((u2 == null ? void 0 : u2.tabIndex) === 0)
          return u2.focus(), true;
      }
      return false;
    } }), H$1({ theirProps: { ...i2, ...T$2(a2, ["selectedIndex", "defaultIndex", "manual", "vertical", "onChange"]) }, ourProps: {}, slot: t2, slots: v2, attrs: i2, name: "TabGroup" })]);
  };
} }), Ie = defineComponent({ name: "TabList", props: { as: { type: [Object, String], default: "div" } }, setup(a2, { attrs: v2, slots: i2 }) {
  let s2 = k("TabList");
  return () => {
    let l2 = { selectedIndex: s2.selectedIndex.value }, n2 = { role: "tablist", "aria-orientation": s2.orientation.value };
    return H$1({ ourProps: n2, theirProps: a2, slot: l2, attrs: v2, slots: i2, name: "TabList" });
  };
} }), ye = defineComponent({ name: "Tab", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: () => `headlessui-tabs-tab-${t$2()}` } }, setup(a2, { attrs: v2, slots: i2, expose: s2 }) {
  let l2 = k("Tab"), n2 = ref(null);
  s2({ el: n2, $el: n2 }), onMounted(() => l2.registerTab(n2)), onUnmounted(() => l2.unregisterTab(n2));
  let o2 = inject(j), T2 = computed(() => {
    if (o2.value) {
      let e2 = o2.value.tabs.indexOf(a2.id);
      return e2 === -1 ? o2.value.tabs.push(a2.id) - 1 : e2;
    }
    return -1;
  }), b2 = computed(() => {
    let e2 = l2.tabs.value.indexOf(n2);
    return e2 === -1 ? T2.value : e2;
  }), m2 = computed(() => b2.value === l2.selectedIndex.value);
  function r2(e2) {
    var f2;
    let u2 = e2();
    if (u2 === T$1.Success && l2.activation.value === "auto") {
      let S2 = (f2 = m$3(n2)) == null ? void 0 : f2.activeElement, p2 = l2.tabs.value.findIndex((E2) => o$2(E2) === S2);
      p2 !== -1 && l2.setSelectedIndex(p2);
    }
    return u2;
  }
  function R2(e2) {
    let u2 = l2.tabs.value.map((S2) => o$2(S2)).filter(Boolean);
    if (e2.key === o$3.Space || e2.key === o$3.Enter) {
      e2.preventDefault(), e2.stopPropagation(), l2.setSelectedIndex(b2.value);
      return;
    }
    switch (e2.key) {
      case o$3.Home:
      case o$3.PageUp:
        return e2.preventDefault(), e2.stopPropagation(), r2(() => O(u2, N.First));
      case o$3.End:
      case o$3.PageDown:
        return e2.preventDefault(), e2.stopPropagation(), r2(() => O(u2, N.Last));
    }
    if (r2(() => u$5(l2.orientation.value, { vertical() {
      return e2.key === o$3.ArrowUp ? O(u2, N.Previous | N.WrapAround) : e2.key === o$3.ArrowDown ? O(u2, N.Next | N.WrapAround) : T$1.Error;
    }, horizontal() {
      return e2.key === o$3.ArrowLeft ? O(u2, N.Previous | N.WrapAround) : e2.key === o$3.ArrowRight ? O(u2, N.Next | N.WrapAround) : T$1.Error;
    } })) === T$1.Success)
      return e2.preventDefault();
  }
  let y2 = ref(false);
  function w2() {
    var e2;
    y2.value || (y2.value = true, !a2.disabled && ((e2 = o$2(n2)) == null || e2.focus(), l2.setSelectedIndex(b2.value), t(() => {
      y2.value = false;
    })));
  }
  function h2(e2) {
    e2.preventDefault();
  }
  let t$12 = b$1(computed(() => ({ as: a2.as, type: v2.type })), n2);
  return () => {
    var p2;
    let e2 = { selected: m2.value }, { id: u2, ...f2 } = a2, S2 = { ref: n2, onKeydown: R2, onMousedown: h2, onClick: w2, id: u2, role: "tab", type: t$12.value, "aria-controls": (p2 = o$2(l2.panels.value[b2.value])) == null ? void 0 : p2.id, "aria-selected": m2.value, tabIndex: m2.value ? 0 : -1, disabled: a2.disabled ? true : void 0 };
    return H$1({ ourProps: S2, theirProps: f2, slot: e2, attrs: v2, slots: i2, name: "Tab" });
  };
} }), Se = defineComponent({ name: "TabPanels", props: { as: { type: [Object, String], default: "div" } }, setup(a2, { slots: v2, attrs: i2 }) {
  let s2 = k("TabPanels");
  return () => {
    let l2 = { selectedIndex: s2.selectedIndex.value };
    return H$1({ theirProps: a2, ourProps: {}, slot: l2, attrs: i2, slots: v2, name: "TabPanels" });
  };
} }), ge = defineComponent({ name: "TabPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: () => `headlessui-tabs-panel-${t$2()}` }, tabIndex: { type: Number, default: 0 } }, setup(a2, { attrs: v2, slots: i2, expose: s2 }) {
  let l2 = k("TabPanel"), n2 = ref(null);
  s2({ el: n2, $el: n2 }), onMounted(() => l2.registerPanel(n2)), onUnmounted(() => l2.unregisterPanel(n2));
  let o2 = inject(j), T2 = computed(() => {
    if (o2.value) {
      let r2 = o2.value.panels.indexOf(a2.id);
      return r2 === -1 ? o2.value.panels.push(a2.id) - 1 : r2;
    }
    return -1;
  }), b2 = computed(() => {
    let r2 = l2.panels.value.indexOf(n2);
    return r2 === -1 ? T2.value : r2;
  }), m2 = computed(() => b2.value === l2.selectedIndex.value);
  return () => {
    var t2;
    let r2 = { selected: m2.value }, { id: R2, tabIndex: y2, ...w2 } = a2, h2 = { ref: n2, id: R2, role: "tabpanel", "aria-labelledby": (t2 = o$2(l2.tabs.value[b2.value])) == null ? void 0 : t2.id, tabIndex: m2.value ? y2 : -1 };
    return !m2.value && a2.unmount && !a2.static ? h$1(f$1, { as: "span", ...h2 }) : H$1({ ourProps: h2, theirProps: w2, slot: r2, attrs: v2, slots: i2, features: N$1.Static | N$1.RenderStrategy, visible: m2.value, name: "TabPanel" });
  };
} });
const tabs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Tab: ye,
  TabGroup: xe,
  TabList: Ie,
  TabPanel: ge,
  TabPanels: Se
}, Symbol.toStringTag, { value: "Module" }));
function l(r2) {
  let e2 = { called: false };
  return (...t2) => {
    if (!e2.called)
      return e2.called = true, r2(...t2);
  };
}
function m(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.add(...t2);
}
function d$1(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.remove(...t2);
}
var g = ((i2) => (i2.Finished = "finished", i2.Cancelled = "cancelled", i2))(g || {});
function F$1(e2, t2) {
  let i2 = o$1();
  if (!e2)
    return i2.dispose;
  let { transitionDuration: n2, transitionDelay: a2 } = getComputedStyle(e2), [l2, s2] = [n2, a2].map((o2) => {
    let [u2 = 0] = o2.split(",").filter(Boolean).map((r2) => r2.includes("ms") ? parseFloat(r2) : parseFloat(r2) * 1e3).sort((r2, c2) => c2 - r2);
    return u2;
  });
  return l2 !== 0 ? i2.setTimeout(() => t2("finished"), l2 + s2) : t2("finished"), i2.add(() => t2("cancelled")), i2.dispose;
}
function L(e2, t2, i2, n2, a2, l$12) {
  let s2 = o$1(), o2 = l$12 !== void 0 ? l(l$12) : () => {
  };
  return d$1(e2, ...a2), m(e2, ...t2, ...i2), s2.nextFrame(() => {
    d$1(e2, ...i2), m(e2, ...n2), s2.add(F$1(e2, (u2) => (d$1(e2, ...n2, ...t2), m(e2, ...a2), o2(u2))));
  }), s2.add(() => d$1(e2, ...t2, ...i2, ...n2, ...a2)), s2.add(() => o2("cancelled")), s2.dispose;
}
function d(e2 = "") {
  return e2.split(" ").filter((t2) => t2.trim().length > 1);
}
let B = Symbol("TransitionContext");
var oe = ((l2) => (l2.Visible = "visible", l2.Hidden = "hidden", l2))(oe || {});
function ue() {
  return inject(B, null) !== null;
}
function fe() {
  let e2 = inject(B, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
function de() {
  let e2 = inject(F, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
let F = Symbol("NestingContext");
function x(e2) {
  return "children" in e2 ? x(e2.children) : e2.value.filter(({ state: t2 }) => t2 === "visible").length > 0;
}
function z(e2) {
  let t2 = ref([]), l2 = ref(false);
  onMounted(() => l2.value = true), onUnmounted(() => l2.value = false);
  function s2(r2, n2 = S$3.Hidden) {
    let i2 = t2.value.findIndex(({ id: a2 }) => a2 === r2);
    i2 !== -1 && (u$5(n2, { [S$3.Unmount]() {
      t2.value.splice(i2, 1);
    }, [S$3.Hidden]() {
      t2.value[i2].state = "hidden";
    } }), !x(t2) && l2.value && (e2 == null || e2()));
  }
  function v2(r2) {
    let n2 = t2.value.find(({ id: i2 }) => i2 === r2);
    return n2 ? n2.state !== "visible" && (n2.state = "visible") : t2.value.push({ id: r2, state: "visible" }), () => s2(r2, S$3.Unmount);
  }
  return { children: t2, register: v2, unregister: s2 };
}
let $ = N$1.RenderStrategy, ve = defineComponent({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: l2, slots: s2, expose: v2 }) {
  if (!ue() && f$3())
    return () => h$1(me, { ...e2, onBeforeEnter: () => t2("beforeEnter"), onAfterEnter: () => t2("afterEnter"), onBeforeLeave: () => t2("beforeLeave"), onAfterLeave: () => t2("afterLeave") }, s2);
  let r2 = ref(null), n2 = ref("visible"), i2 = computed(() => e2.unmount ? S$3.Unmount : S$3.Hidden);
  v2({ el: r2, $el: r2 });
  let { show: a2, appear: g$12 } = fe(), { register: S2, unregister: p2 } = de(), R2 = { value: true }, m2 = t$2(), c2 = { value: false }, N2 = z(() => {
    c2.value || (n2.value = "hidden", p2(m2), t2("afterLeave"));
  });
  onMounted(() => {
    let o2 = S2(m2);
    onUnmounted(o2);
  }), watchEffect(() => {
    if (i2.value === S$3.Hidden && !!m2) {
      if (a2 && n2.value !== "visible") {
        n2.value = "visible";
        return;
      }
      u$5(n2.value, { ["hidden"]: () => p2(m2), ["visible"]: () => S2(m2) });
    }
  });
  let O2 = d(e2.enter), A2 = d(e2.enterFrom), q2 = d(e2.enterTo), D2 = d(e2.entered), G2 = d(e2.leave), J = d(e2.leaveFrom), Q2 = d(e2.leaveTo);
  onMounted(() => {
    watchEffect(() => {
      if (n2.value === "visible") {
        let o2 = o$2(r2);
        if (o2 instanceof Comment && o2.data === "")
          throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function W2(o2) {
    let C2 = R2.value && !g$12.value, u2 = o$2(r2);
    !u2 || !(u2 instanceof HTMLElement) || C2 || (c2.value = true, a2.value && t2("beforeEnter"), a2.value || t2("beforeLeave"), o2(a2.value ? L(u2, O2, A2, q2, D2, (b2) => {
      c2.value = false, b2 === g.Finished && t2("afterEnter");
    }) : L(u2, G2, J, Q2, D2, (b2) => {
      c2.value = false, b2 === g.Finished && (x(N2) || (n2.value = "hidden", p2(m2), t2("afterLeave")));
    })));
  }
  return onMounted(() => {
    watch([a2], (o2, C2, u2) => {
      W2(u2), R2.value = false;
    }, { immediate: true });
  }), provide(F, N2), c$2(computed(() => u$5(n2.value, { ["visible"]: l$3.Open, ["hidden"]: l$3.Closed }))), () => {
    let { appear: o2, show: C2, enter: u2, enterFrom: b2, enterTo: Te, entered: he, leave: ge2, leaveFrom: Se2, leaveTo: ce2, ...I2 } = e2, X2 = { ref: r2 }, Y2 = { ...I2, ...g$12 && a2 && n$1.isServer ? { class: normalizeClass([I2.class, ...O2, ...A2]) } : {} };
    return H$1({ theirProps: Y2, ourProps: X2, slot: {}, slots: s2, attrs: l2, features: $, visible: n2.value === "visible", name: "TransitionChild" });
  };
} }), pe = ve, me = defineComponent({ inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: l2, slots: s2 }) {
  let v2 = p$5(), r2 = computed(() => e2.show === null && v2 !== null ? u$5(v2.value, { [l$3.Open]: true, [l$3.Closed]: false }) : e2.show);
  watchEffect(() => {
    if (![true, false].includes(r2.value))
      throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let n2 = ref(r2.value ? "visible" : "hidden"), i2 = z(() => {
    n2.value = "hidden";
  }), a2 = ref(true), g2 = { show: r2, appear: computed(() => e2.appear || !a2.value) };
  return onMounted(() => {
    watchEffect(() => {
      a2.value = false, r2.value ? n2.value = "visible" : x(i2) || (n2.value = "hidden");
    });
  }), provide(F, i2), provide(B, g2), () => {
    let S2 = T$2(e2, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), p2 = { unmount: e2.unmount };
    return H$1({ ourProps: { ...p2, as: "template" }, theirProps: {}, slot: {}, slots: { ...s2, default: () => [h$1(pe, { onBeforeEnter: () => t2("beforeEnter"), onAfterEnter: () => t2("afterEnter"), onBeforeLeave: () => t2("beforeLeave"), onAfterLeave: () => t2("afterLeave"), ...l2, ...p2, ...S2 }, s2.default)] }, attrs: {}, features: $, visible: n2.value === "visible", name: "Transition" });
  };
} });
const transition = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TransitionChild: ve,
  TransitionRoot: me
}, Symbol.toStringTag, { value: "Module" }));
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const NoScript = defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    title: String,
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a;
    const noscript = { ...props };
    const textContent = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      noscript.children = textContent;
    }
    return {
      noscript: [noscript]
    };
  })
});
const Link = defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String,
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_2, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String,
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((props) => {
    const meta = { ...props };
    if (meta.httpEquiv) {
      meta["http-equiv"] = meta.httpEquiv;
      delete meta.httpEquiv;
    }
    return {
      meta: [meta]
    };
  })
});
const Style = defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    },
    body: Boolean,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: {
    ...globalProps,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NoScript,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/paralax-parallax" */
  './team.cb2fc7c3.mjs'
).then((n2) => n2.p).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/paralax-slide" */
  './team.cb2fc7c3.mjs'
).then((n2) => n2.j).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/about-compliance" */
  './team.7553d105.mjs'
).then((n2) => n2.c).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => contact$1).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/about-offices" */
  './offices.7902760e.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/about-team" */
  './team.7553d105.mjs'
).then((n2) => n2.t).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => index$1).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => script).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/headers-new-header" */
  './team.cb2fc7c3.mjs'
).then((n2) => n2.N).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/headers-footer" */
  './footer.708c07f4.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/headers-header" */
  './header.01e51ad3.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/landing-about" */
  './team.cb2fc7c3.mjs'
).then((n2) => n2.k).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/landing-categories" */
  './team.cb2fc7c3.mjs'
).then((n2) => n2.l).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => creative).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/landing-fetures" */
  './team.cb2fc7c3.mjs'
).then((n2) => n2.m).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/landing-hero" */
  './team.cb2fc7c3.mjs'
).then((n2) => n2.n).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/landing-map" */
  './team.cb2fc7c3.mjs'
).then((n2) => n2.o).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/landing-newsletter" */
  './team.cb2fc7c3.mjs'
).then((n2) => n2.q).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/landing-team" */
  './team.cb2fc7c3.mjs'
).then((n2) => n2.t).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/tweenmax" */
  './index.12b79e49.mjs'
).then((n2) => n2.i).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/tweenmax-script" */
  './index.12b79e49.mjs'
).then((n2) => n2.s).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/content-doc" */
  './ContentDoc.7257673d.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/content-list" */
  './ContentList.2ee2b1bb.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => ContentNavigation).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/content-query" */
  './ContentQuery.33f4cc5b.mjs'
).then((n2) => n2.C).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/content-renderer" */
  './ContentRenderer.1e663aea.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/content-renderer-markdown" */
  './ContentRendererMarkdown.da2615f8.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/content-slot" */
  './ContentSlot.0c26fe87.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/document-driven-empty" */
  './DocumentDrivenEmpty.b1426f16.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/document-driven-not-found" */
  './DocumentDrivenNotFound.b4d3af5a.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/markdown" */
  './Markdown.e24afae3.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-a" */
  './ProseA.930098cf.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-blockquote" */
  './ProseBlockquote.0d47af5d.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-code" */
  './ProseCode.b1d75cf2.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-code-inline" */
  './ProseCodeInline.d1e93a42.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-em" */
  './ProseEm.388f36f9.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-h1" */
  './ProseH1.1e9328c0.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-h2" */
  './ProseH2.8d9aecb2.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-h3" */
  './ProseH3.3f0b9ce6.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-h4" */
  './ProseH4.9ae15dd8.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-h5" */
  './ProseH5.7880134c.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-h6" */
  './ProseH6.9f7d5875.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-hr" */
  './ProseHr.e4acbe61.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-img" */
  './ProseImg.72820dc1.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-li" */
  './ProseLi.c46a83f2.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-ol" */
  './ProseOl.165d9f09.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-p" */
  './ProseP.dcb7711f.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-strong" */
  './ProseStrong.c11337c0.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-table" */
  './ProseTable.7b028ee8.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-tbody" */
  './ProseTbody.9077420b.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-td" */
  './ProseTd.29a2680f.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-th" */
  './ProseTh.c624aa9b.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-thead" */
  './ProseThead.a42b5275.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-tr" */
  './ProseTr.48851f03.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/prose-ul" */
  './ProseUl.16bdf484.mjs'
).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => welcome$1).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/nuxt-layout" */
  './server.mjs'
).then((n2) => n2.l).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => nuxtErrorBoundary$1).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => clientOnly$1).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => devOnly$1).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => serverPlaceholder$1).then((c2) => c2.default || c2));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/nuxt-link" */
  './server.mjs'
).then((n2) => n2.n).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => nuxtLoadingIndicator$1).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => combobox).then((c2) => c2["Combobox"]));
defineAsyncComponent(() => Promise.resolve().then(() => combobox).then((c2) => c2["ComboboxLabel"]));
defineAsyncComponent(() => Promise.resolve().then(() => combobox).then((c2) => c2["ComboboxButton"]));
defineAsyncComponent(() => Promise.resolve().then(() => combobox).then((c2) => c2["ComboboxInput"]));
defineAsyncComponent(() => Promise.resolve().then(() => combobox).then((c2) => c2["ComboboxOptions"]));
defineAsyncComponent(() => Promise.resolve().then(() => combobox).then((c2) => c2["ComboboxOption"]));
defineAsyncComponent(() => Promise.resolve().then(() => dialog).then((c2) => c2["Dialog"]));
defineAsyncComponent(() => Promise.resolve().then(() => dialog).then((c2) => c2["DialogOverlay"]));
defineAsyncComponent(() => Promise.resolve().then(() => dialog).then((c2) => c2["DialogBackdrop"]));
defineAsyncComponent(() => Promise.resolve().then(() => dialog).then((c2) => c2["DialogPanel"]));
defineAsyncComponent(() => Promise.resolve().then(() => dialog).then((c2) => c2["DialogTitle"]));
defineAsyncComponent(() => Promise.resolve().then(() => dialog).then((c2) => c2["DialogDescription"]));
defineAsyncComponent(() => Promise.resolve().then(() => disclosure).then((c2) => c2["Disclosure"]));
defineAsyncComponent(() => Promise.resolve().then(() => disclosure).then((c2) => c2["DisclosureButton"]));
defineAsyncComponent(() => Promise.resolve().then(() => disclosure).then((c2) => c2["DisclosurePanel"]));
defineAsyncComponent(() => Promise.resolve().then(() => focusTrap).then((c2) => c2["FocusTrap"]));
defineAsyncComponent(() => Promise.resolve().then(() => listbox).then((c2) => c2["Listbox"]));
defineAsyncComponent(() => Promise.resolve().then(() => listbox).then((c2) => c2["ListboxLabel"]));
defineAsyncComponent(() => Promise.resolve().then(() => listbox).then((c2) => c2["ListboxButton"]));
defineAsyncComponent(() => Promise.resolve().then(() => listbox).then((c2) => c2["ListboxOptions"]));
defineAsyncComponent(() => Promise.resolve().then(() => listbox).then((c2) => c2["ListboxOption"]));
defineAsyncComponent(() => Promise.resolve().then(() => menu).then((c2) => c2["Menu"]));
defineAsyncComponent(() => Promise.resolve().then(() => menu).then((c2) => c2["MenuButton"]));
defineAsyncComponent(() => Promise.resolve().then(() => menu).then((c2) => c2["MenuItems"]));
defineAsyncComponent(() => Promise.resolve().then(() => menu).then((c2) => c2["MenuItem"]));
defineAsyncComponent(() => Promise.resolve().then(() => popover).then((c2) => c2["Popover"]));
defineAsyncComponent(() => Promise.resolve().then(() => popover).then((c2) => c2["PopoverButton"]));
defineAsyncComponent(() => Promise.resolve().then(() => popover).then((c2) => c2["PopoverOverlay"]));
defineAsyncComponent(() => Promise.resolve().then(() => popover).then((c2) => c2["PopoverPanel"]));
defineAsyncComponent(() => Promise.resolve().then(() => popover).then((c2) => c2["PopoverGroup"]));
defineAsyncComponent(() => Promise.resolve().then(() => portal).then((c2) => c2["Portal"]));
defineAsyncComponent(() => Promise.resolve().then(() => portal).then((c2) => c2["PortalGroup"]));
defineAsyncComponent(() => Promise.resolve().then(() => radioGroup).then((c2) => c2["RadioGroup"]));
defineAsyncComponent(() => Promise.resolve().then(() => radioGroup).then((c2) => c2["RadioGroupOption"]));
defineAsyncComponent(() => Promise.resolve().then(() => radioGroup).then((c2) => c2["RadioGroupLabel"]));
defineAsyncComponent(() => Promise.resolve().then(() => radioGroup).then((c2) => c2["RadioGroupDescription"]));
defineAsyncComponent(() => Promise.resolve().then(() => _switch).then((c2) => c2["SwitchGroup"]));
defineAsyncComponent(() => Promise.resolve().then(() => _switch).then((c2) => c2["Switch"]));
defineAsyncComponent(() => Promise.resolve().then(() => _switch).then((c2) => c2["SwitchLabel"]));
defineAsyncComponent(() => Promise.resolve().then(() => _switch).then((c2) => c2["SwitchDescription"]));
defineAsyncComponent(() => Promise.resolve().then(() => tabs).then((c2) => c2["TabGroup"]));
defineAsyncComponent(() => Promise.resolve().then(() => tabs).then((c2) => c2["TabList"]));
defineAsyncComponent(() => Promise.resolve().then(() => tabs).then((c2) => c2["Tab"]));
defineAsyncComponent(() => Promise.resolve().then(() => tabs).then((c2) => c2["TabPanels"]));
defineAsyncComponent(() => Promise.resolve().then(() => tabs).then((c2) => c2["TabPanel"]));
defineAsyncComponent(() => Promise.resolve().then(() => transition).then((c2) => c2["TransitionChild"]));
defineAsyncComponent(() => Promise.resolve().then(() => transition).then((c2) => c2["TransitionRoot"]));
defineAsyncComponent(() => import(
  /* webpackChunkName: "components/nuxt-page" */
  './server.mjs'
).then((n2) => n2.p).then((c2) => c2.default || c2));
defineAsyncComponent(() => Promise.resolve().then(() => components).then((c2) => c2["NoScript"]));
defineAsyncComponent(() => Promise.resolve().then(() => components).then((c2) => c2["Link"]));
defineAsyncComponent(() => Promise.resolve().then(() => components).then((c2) => c2["Base"]));
defineAsyncComponent(() => Promise.resolve().then(() => components).then((c2) => c2["Title"]));
defineAsyncComponent(() => Promise.resolve().then(() => components).then((c2) => c2["Meta"]));
defineAsyncComponent(() => Promise.resolve().then(() => components).then((c2) => c2["Style"]));
defineAsyncComponent(() => Promise.resolve().then(() => components).then((c2) => c2["Head"]));
defineAsyncComponent(() => Promise.resolve().then(() => components).then((c2) => c2["Html"]));
defineAsyncComponent(() => Promise.resolve().then(() => components).then((c2) => c2["Body"]));
const _sfc_main = defineComponent({
  name: "ContentNavigation",
  props: {
    query: {
      type: Object,
      required: false,
      default: void 0
    }
  },
  async setup(props) {
    const {
      query
    } = toRefs(props);
    const queryBuilder = computed(() => {
      var _a;
      if (typeof ((_a = query.value) == null ? void 0 : _a.params) === "function") {
        return query.value.params();
      }
      return query.value;
    });
    if (!queryBuilder.value && useState("dd-navigation").value) {
      const { navigation: navigation2 } = useContentDisabled();
      return { navigation: navigation2 };
    }
    const { data: navigation } = await useAsyncData(
      `content-navigation-${hash(queryBuilder.value)}`,
      () => fetchContentNavigation(queryBuilder.value)
    );
    return { navigation };
  },
  render(ctx) {
    const slots = useSlots();
    const { navigation } = ctx;
    const renderLink = (link) => h$1(__nuxt_component_0$1, { to: link._path }, () => link.title);
    const renderLinks = (data, level) => h$1(
      "ul",
      level ? { "data-level": level } : null,
      data.map((link) => {
        if (link.children) {
          return h$1("li", null, [renderLink(link), renderLinks(link.children, level + 1)]);
        }
        return h$1("li", null, renderLink(link));
      })
    );
    const defaultNode = (data) => renderLinks(data, 0);
    return (slots == null ? void 0 : slots.default) ? slots.default({ navigation, ...this.$attrs }) : defaultNode(navigation);
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ContentNavigation = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));

export { _sfc_main as default };
//# sourceMappingURL=ContentNavigation.e3fa96fe.mjs.map
