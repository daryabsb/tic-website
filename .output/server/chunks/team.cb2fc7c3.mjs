import { reactive, ref, computed, watch, mergeProps, useSSRContext, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createTextVNode, Transition, defineAsyncComponent, defineComponent, h } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { d as data, _ as _imports_0$4 } from './tic-logo-01.c552b047.mjs';
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, TabGroup, TabList, Tab, TabPanels, TabPanel, PopoverGroup, Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { XMarkIcon, Bars3Icon, MagnifyingGlassIcon, QuestionMarkCircleIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';
import { _ as _export_sfc, e as __nuxt_component_0$1 } from './server.mjs';
import _sfc_main$a from './footer.708c07f4.mjs';
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

const _sfc_main$9 = {
  __name: "parallax",
  __ssrInlineRender: true,
  setup(__props) {
    reactive({ value: 0 });
    const ticking = ref(false);
    const currentSection = ref(1);
    ref(
      false
    );
    ref(
      false
    );
    ref(30);
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div class="fixed z-50 w-full">`);
      ssrRenderSlot(_ctx.$slots, "nav", {
        navigate,
        currentSlideNumber: currentSlideNumber.value
      }, null, _push, _parent);
      _push(`</div><div class="">`);
      ssrRenderSlot(_ctx.$slots, "sections", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Paralax/parallax.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const parallax = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "background" }, _attrs))}><div class="content-wrapper">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></section>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Paralax/slide.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const slide = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$1]]);
const slide$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: slide
}, Symbol.toStringTag, { value: "Module" }));
const _imports_0$3 = "" + globalThis.__buildAssetsURL("map.e3bca050.png");
const _sfc_main$7 = {
  __name: "NewHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const navigation = ref(data);
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(TransitionRoot), {
        as: "template",
        show: open.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              class: "relative z-40 lg:hidden",
              onClose: ($event) => open.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "transition-opacity ease-linear duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition-opacity ease-linear duration-300",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-25"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 z-40 flex"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "transition ease-in-out duration-300 transform",
                    "enter-from": "-translate-x-full",
                    "enter-to": "translate-x-0",
                    leave: "transition ease-in-out duration-300 transform",
                    "leave-from": "translate-x-0",
                    "leave-to": "-translate-x-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "relative flex w-full max-w-xs flex-col overflow-y-auto bg-zinc-900 bg-opacity-80 pb-12 shadow-xl" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex px-4 pt-5 pb-2"${_scopeId4}><button type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-white"${_scopeId4}><span class="sr-only"${_scopeId4}>Close menu</span>`);
                              _push5(ssrRenderComponent(unref(XMarkIcon), {
                                class: "h-6 w-6",
                                "aria-hidden": "true"
                              }, null, _parent5, _scopeId4));
                              _push5(`</button></div>`);
                              _push5(ssrRenderComponent(unref(TabGroup), {
                                as: "div",
                                class: "mt-12"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="border-b border-gray-200"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(TabList), { class: "-mb-px flex space-x-8 px-4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList(navigation.value.categories, (category) => {
                                            _push7(ssrRenderComponent(unref(Tab), {
                                              as: "template",
                                              key: category.name
                                            }, {
                                              default: withCtx(({ selected }, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<button class="${ssrRenderClass([selected ? "text-blood border-blood" : "text-white border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"])}"${_scopeId7}>${ssrInterpolate(category.name)}</button>`);
                                                } else {
                                                  return [
                                                    createVNode("button", {
                                                      class: [selected ? "text-blood border-blood" : "text-white border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                                    }, toDisplayString(category.name), 3)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                              return openBlock(), createBlock(unref(Tab), {
                                                as: "template",
                                                key: category.name
                                              }, {
                                                default: withCtx(({ selected }) => [
                                                  createVNode("button", {
                                                    class: [selected ? "text-blood border-blood" : "text-white border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                                  }, toDisplayString(category.name), 3)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                    _push6(ssrRenderComponent(unref(TabPanels), { as: "template" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList(navigation.value.categories, (category) => {
                                            _push7(ssrRenderComponent(unref(TabPanel), {
                                              key: category.name,
                                              class: "space-y-12 px-4 py-6"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<div class="grid grid-cols-2 gap-x-4 gap-y-10"${_scopeId7}><!--[-->`);
                                                  ssrRenderList(category.featured.slice(0, 4), (item) => {
                                                    _push8(`<div class="group relative"${_scopeId7}><div class="h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75"${_scopeId7}><img${ssrRenderAttr("src", item.image)} class="h-full w-full object-cover object-center"${_scopeId7}></div><a${ssrRenderAttr("href", category.name === "Industries" ? `/industries/${item.id}` : `/services/${item.id}`)} class="mt-6 block text-sm font-medium text-white"${_scopeId7}><span class="absolute inset-0 z-10" aria-hidden="true"${_scopeId7}></span> ${ssrInterpolate(item.title)}</a><p aria-hidden="true" class="mt-1 text-sm text-white"${_scopeId7}>Shop now</p></div>`);
                                                  });
                                                  _push8(`<!--]--></div>`);
                                                } else {
                                                  return [
                                                    createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                                      (openBlock(true), createBlock(Fragment, null, renderList(category.featured.slice(0, 4), (item) => {
                                                        return openBlock(), createBlock("div", {
                                                          key: item.id,
                                                          class: "group relative"
                                                        }, [
                                                          createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                                            createVNode("img", {
                                                              src: item.image,
                                                              class: "h-full w-full object-cover object-center"
                                                            }, null, 8, ["src"])
                                                          ]),
                                                          createVNode("a", {
                                                            href: category.name === "Industries" ? `/industries/${item.id}` : `/services/${item.id}`,
                                                            class: "mt-6 block text-sm font-medium text-white"
                                                          }, [
                                                            createVNode("span", {
                                                              class: "absolute inset-0 z-10",
                                                              "aria-hidden": "true"
                                                            }),
                                                            createTextVNode(" " + toDisplayString(item.title), 1)
                                                          ], 8, ["href"]),
                                                          createVNode("p", {
                                                            "aria-hidden": "true",
                                                            class: "mt-1 text-sm text-white"
                                                          }, "Shop now")
                                                        ]);
                                                      }), 128))
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                              return openBlock(), createBlock(unref(TabPanel), {
                                                key: category.name,
                                                class: "space-y-12 px-4 py-6"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(category.featured.slice(0, 4), (item) => {
                                                      return openBlock(), createBlock("div", {
                                                        key: item.id,
                                                        class: "group relative"
                                                      }, [
                                                        createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                                          createVNode("img", {
                                                            src: item.image,
                                                            class: "h-full w-full object-cover object-center"
                                                          }, null, 8, ["src"])
                                                        ]),
                                                        createVNode("a", {
                                                          href: category.name === "Industries" ? `/industries/${item.id}` : `/services/${item.id}`,
                                                          class: "mt-6 block text-sm font-medium text-white"
                                                        }, [
                                                          createVNode("span", {
                                                            class: "absolute inset-0 z-10",
                                                            "aria-hidden": "true"
                                                          }),
                                                          createTextVNode(" " + toDisplayString(item.title), 1)
                                                        ], 8, ["href"]),
                                                        createVNode("p", {
                                                          "aria-hidden": "true",
                                                          class: "mt-1 text-sm text-white"
                                                        }, "Shop now")
                                                      ]);
                                                    }), 128))
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("div", { class: "border-b border-gray-200" }, [
                                        createVNode(unref(TabList), { class: "-mb-px flex space-x-8 px-4" }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                              return openBlock(), createBlock(unref(Tab), {
                                                as: "template",
                                                key: category.name
                                              }, {
                                                default: withCtx(({ selected }) => [
                                                  createVNode("button", {
                                                    class: [selected ? "text-blood border-blood" : "text-white border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                                  }, toDisplayString(category.name), 3)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      createVNode(unref(TabPanels), { as: "template" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                            return openBlock(), createBlock(unref(TabPanel), {
                                              key: category.name,
                                              class: "space-y-12 px-4 py-6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(category.featured.slice(0, 4), (item) => {
                                                    return openBlock(), createBlock("div", {
                                                      key: item.id,
                                                      class: "group relative"
                                                    }, [
                                                      createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                                        createVNode("img", {
                                                          src: item.image,
                                                          class: "h-full w-full object-cover object-center"
                                                        }, null, 8, ["src"])
                                                      ]),
                                                      createVNode("a", {
                                                        href: category.name === "Industries" ? `/industries/${item.id}` : `/services/${item.id}`,
                                                        class: "mt-6 block text-sm font-medium text-white"
                                                      }, [
                                                        createVNode("span", {
                                                          class: "absolute inset-0 z-10",
                                                          "aria-hidden": "true"
                                                        }),
                                                        createTextVNode(" " + toDisplayString(item.title), 1)
                                                      ], 8, ["href"]),
                                                      createVNode("p", {
                                                        "aria-hidden": "true",
                                                        class: "mt-1 text-sm text-white"
                                                      }, "Shop now")
                                                    ]);
                                                  }), 128))
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="space-y-6 border-t border-gray-200 py-6 px-4"${_scopeId4}><!--[-->`);
                              ssrRenderList(navigation.value.pages, (page) => {
                                _push5(`<div class="flow-root"${_scopeId4}><a${ssrRenderAttr("href", page.href)} class="-m-2 block p-2 font-medium text-gray-900"${_scopeId4}>${ssrInterpolate(page.name)}</a></div>`);
                              });
                              _push5(`<!--]--></div><div class="space-y-6 border-t border-gray-200 py-6 px-4"${_scopeId4}></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex px-4 pt-5 pb-2" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "-m-2 inline-flex items-center justify-center rounded-md p-2 text-white",
                                    onClick: ($event) => open.value = false
                                  }, [
                                    createVNode("span", { class: "sr-only" }, "Close menu"),
                                    createVNode(unref(XMarkIcon), {
                                      class: "h-6 w-6",
                                      "aria-hidden": "true"
                                    })
                                  ], 8, ["onClick"])
                                ]),
                                createVNode(unref(TabGroup), {
                                  as: "div",
                                  class: "mt-12"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "border-b border-gray-200" }, [
                                      createVNode(unref(TabList), { class: "-mb-px flex space-x-8 px-4" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                            return openBlock(), createBlock(unref(Tab), {
                                              as: "template",
                                              key: category.name
                                            }, {
                                              default: withCtx(({ selected }) => [
                                                createVNode("button", {
                                                  class: [selected ? "text-blood border-blood" : "text-white border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                                }, toDisplayString(category.name), 3)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    createVNode(unref(TabPanels), { as: "template" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                          return openBlock(), createBlock(unref(TabPanel), {
                                            key: category.name,
                                            class: "space-y-12 px-4 py-6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(category.featured.slice(0, 4), (item) => {
                                                  return openBlock(), createBlock("div", {
                                                    key: item.id,
                                                    class: "group relative"
                                                  }, [
                                                    createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                                      createVNode("img", {
                                                        src: item.image,
                                                        class: "h-full w-full object-cover object-center"
                                                      }, null, 8, ["src"])
                                                    ]),
                                                    createVNode("a", {
                                                      href: category.name === "Industries" ? `/industries/${item.id}` : `/services/${item.id}`,
                                                      class: "mt-6 block text-sm font-medium text-white"
                                                    }, [
                                                      createVNode("span", {
                                                        class: "absolute inset-0 z-10",
                                                        "aria-hidden": "true"
                                                      }),
                                                      createTextVNode(" " + toDisplayString(item.title), 1)
                                                    ], 8, ["href"]),
                                                    createVNode("p", {
                                                      "aria-hidden": "true",
                                                      class: "mt-1 text-sm text-white"
                                                    }, "Shop now")
                                                  ]);
                                                }), 128))
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "space-y-6 border-t border-gray-200 py-6 px-4" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.pages, (page) => {
                                    return openBlock(), createBlock("div", {
                                      key: page.name,
                                      class: "flow-root"
                                    }, [
                                      createVNode("a", {
                                        href: page.href,
                                        class: "-m-2 block p-2 font-medium text-gray-900"
                                      }, toDisplayString(page.name), 9, ["href"])
                                    ]);
                                  }), 128))
                                ]),
                                createVNode("div", { class: "space-y-6 border-t border-gray-200 py-6 px-4" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "relative flex w-full max-w-xs flex-col overflow-y-auto bg-zinc-900 bg-opacity-80 pb-12 shadow-xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex px-4 pt-5 pb-2" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "-m-2 inline-flex items-center justify-center rounded-md p-2 text-white",
                                  onClick: ($event) => open.value = false
                                }, [
                                  createVNode("span", { class: "sr-only" }, "Close menu"),
                                  createVNode(unref(XMarkIcon), {
                                    class: "h-6 w-6",
                                    "aria-hidden": "true"
                                  })
                                ], 8, ["onClick"])
                              ]),
                              createVNode(unref(TabGroup), {
                                as: "div",
                                class: "mt-12"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "border-b border-gray-200" }, [
                                    createVNode(unref(TabList), { class: "-mb-px flex space-x-8 px-4" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                          return openBlock(), createBlock(unref(Tab), {
                                            as: "template",
                                            key: category.name
                                          }, {
                                            default: withCtx(({ selected }) => [
                                              createVNode("button", {
                                                class: [selected ? "text-blood border-blood" : "text-white border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                              }, toDisplayString(category.name), 3)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(unref(TabPanels), { as: "template" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                        return openBlock(), createBlock(unref(TabPanel), {
                                          key: category.name,
                                          class: "space-y-12 px-4 py-6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(category.featured.slice(0, 4), (item) => {
                                                return openBlock(), createBlock("div", {
                                                  key: item.id,
                                                  class: "group relative"
                                                }, [
                                                  createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                                    createVNode("img", {
                                                      src: item.image,
                                                      class: "h-full w-full object-cover object-center"
                                                    }, null, 8, ["src"])
                                                  ]),
                                                  createVNode("a", {
                                                    href: category.name === "Industries" ? `/industries/${item.id}` : `/services/${item.id}`,
                                                    class: "mt-6 block text-sm font-medium text-white"
                                                  }, [
                                                    createVNode("span", {
                                                      class: "absolute inset-0 z-10",
                                                      "aria-hidden": "true"
                                                    }),
                                                    createTextVNode(" " + toDisplayString(item.title), 1)
                                                  ], 8, ["href"]),
                                                  createVNode("p", {
                                                    "aria-hidden": "true",
                                                    class: "mt-1 text-sm text-white"
                                                  }, "Shop now")
                                                ]);
                                              }), 128))
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "space-y-6 border-t border-gray-200 py-6 px-4" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.pages, (page) => {
                                  return openBlock(), createBlock("div", {
                                    key: page.name,
                                    class: "flow-root"
                                  }, [
                                    createVNode("a", {
                                      href: page.href,
                                      class: "-m-2 block p-2 font-medium text-gray-900"
                                    }, toDisplayString(page.name), 9, ["href"])
                                  ]);
                                }), 128))
                              ]),
                              createVNode("div", { class: "space-y-6 border-t border-gray-200 py-6 px-4" })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "transition-opacity ease-linear duration-300",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "transition-opacity ease-linear duration-300",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 z-40 flex" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "transition ease-in-out duration-300 transform",
                        "enter-from": "-translate-x-full",
                        "enter-to": "translate-x-0",
                        leave: "transition ease-in-out duration-300 transform",
                        "leave-from": "translate-x-0",
                        "leave-to": "-translate-x-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), { class: "relative flex w-full max-w-xs flex-col overflow-y-auto bg-zinc-900 bg-opacity-80 pb-12 shadow-xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex px-4 pt-5 pb-2" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "-m-2 inline-flex items-center justify-center rounded-md p-2 text-white",
                                  onClick: ($event) => open.value = false
                                }, [
                                  createVNode("span", { class: "sr-only" }, "Close menu"),
                                  createVNode(unref(XMarkIcon), {
                                    class: "h-6 w-6",
                                    "aria-hidden": "true"
                                  })
                                ], 8, ["onClick"])
                              ]),
                              createVNode(unref(TabGroup), {
                                as: "div",
                                class: "mt-12"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "border-b border-gray-200" }, [
                                    createVNode(unref(TabList), { class: "-mb-px flex space-x-8 px-4" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                          return openBlock(), createBlock(unref(Tab), {
                                            as: "template",
                                            key: category.name
                                          }, {
                                            default: withCtx(({ selected }) => [
                                              createVNode("button", {
                                                class: [selected ? "text-blood border-blood" : "text-white border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                              }, toDisplayString(category.name), 3)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(unref(TabPanels), { as: "template" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                        return openBlock(), createBlock(unref(TabPanel), {
                                          key: category.name,
                                          class: "space-y-12 px-4 py-6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(category.featured.slice(0, 4), (item) => {
                                                return openBlock(), createBlock("div", {
                                                  key: item.id,
                                                  class: "group relative"
                                                }, [
                                                  createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                                    createVNode("img", {
                                                      src: item.image,
                                                      class: "h-full w-full object-cover object-center"
                                                    }, null, 8, ["src"])
                                                  ]),
                                                  createVNode("a", {
                                                    href: category.name === "Industries" ? `/industries/${item.id}` : `/services/${item.id}`,
                                                    class: "mt-6 block text-sm font-medium text-white"
                                                  }, [
                                                    createVNode("span", {
                                                      class: "absolute inset-0 z-10",
                                                      "aria-hidden": "true"
                                                    }),
                                                    createTextVNode(" " + toDisplayString(item.title), 1)
                                                  ], 8, ["href"]),
                                                  createVNode("p", {
                                                    "aria-hidden": "true",
                                                    class: "mt-1 text-sm text-white"
                                                  }, "Shop now")
                                                ]);
                                              }), 128))
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "space-y-6 border-t border-gray-200 py-6 px-4" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.pages, (page) => {
                                  return openBlock(), createBlock("div", {
                                    key: page.name,
                                    class: "flow-root"
                                  }, [
                                    createVNode("a", {
                                      href: page.href,
                                      class: "-m-2 block p-2 font-medium text-gray-900"
                                    }, toDisplayString(page.name), 9, ["href"])
                                  ]);
                                }), 128))
                              ]),
                              createVNode("div", { class: "space-y-6 border-t border-gray-200 py-6 px-4" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                class: "relative z-40 lg:hidden",
                onClose: ($event) => open.value = false
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    as: "template",
                    enter: "transition-opacity ease-linear duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition-opacity ease-linear duration-300",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 z-40 flex" }, [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "transition ease-in-out duration-300 transform",
                      "enter-from": "-translate-x-full",
                      "enter-to": "translate-x-0",
                      leave: "transition ease-in-out duration-300 transform",
                      "leave-from": "translate-x-0",
                      "leave-to": "-translate-x-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(DialogPanel), { class: "relative flex w-full max-w-xs flex-col overflow-y-auto bg-zinc-900 bg-opacity-80 pb-12 shadow-xl" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex px-4 pt-5 pb-2" }, [
                              createVNode("button", {
                                type: "button",
                                class: "-m-2 inline-flex items-center justify-center rounded-md p-2 text-white",
                                onClick: ($event) => open.value = false
                              }, [
                                createVNode("span", { class: "sr-only" }, "Close menu"),
                                createVNode(unref(XMarkIcon), {
                                  class: "h-6 w-6",
                                  "aria-hidden": "true"
                                })
                              ], 8, ["onClick"])
                            ]),
                            createVNode(unref(TabGroup), {
                              as: "div",
                              class: "mt-12"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "border-b border-gray-200" }, [
                                  createVNode(unref(TabList), { class: "-mb-px flex space-x-8 px-4" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                        return openBlock(), createBlock(unref(Tab), {
                                          as: "template",
                                          key: category.name
                                        }, {
                                          default: withCtx(({ selected }) => [
                                            createVNode("button", {
                                              class: [selected ? "text-blood border-blood" : "text-white border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                            }, toDisplayString(category.name), 3)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(unref(TabPanels), { as: "template" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                                      return openBlock(), createBlock(unref(TabPanel), {
                                        key: category.name,
                                        class: "space-y-12 px-4 py-6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(category.featured.slice(0, 4), (item) => {
                                              return openBlock(), createBlock("div", {
                                                key: item.id,
                                                class: "group relative"
                                              }, [
                                                createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                                  createVNode("img", {
                                                    src: item.image,
                                                    class: "h-full w-full object-cover object-center"
                                                  }, null, 8, ["src"])
                                                ]),
                                                createVNode("a", {
                                                  href: category.name === "Industries" ? `/industries/${item.id}` : `/services/${item.id}`,
                                                  class: "mt-6 block text-sm font-medium text-white"
                                                }, [
                                                  createVNode("span", {
                                                    class: "absolute inset-0 z-10",
                                                    "aria-hidden": "true"
                                                  }),
                                                  createTextVNode(" " + toDisplayString(item.title), 1)
                                                ], 8, ["href"]),
                                                createVNode("p", {
                                                  "aria-hidden": "true",
                                                  class: "mt-1 text-sm text-white"
                                                }, "Shop now")
                                              ]);
                                            }), 128))
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "space-y-6 border-t border-gray-200 py-6 px-4" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.pages, (page) => {
                                return openBlock(), createBlock("div", {
                                  key: page.name,
                                  class: "flow-root"
                                }, [
                                  createVNode("a", {
                                    href: page.href,
                                    class: "-m-2 block p-2 font-medium text-gray-900"
                                  }, toDisplayString(page.name), 9, ["href"])
                                ]);
                              }), 128))
                            ]),
                            createVNode("div", { class: "space-y-6 border-t border-gray-200 py-6 px-4" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<header class="fixed top-0 h-28 z-50 w-full global bg-zinc-900 bg-opacity-60"><nav class="flex mx-4 md:mx-32 xl:mx-64 xl:py-2 items-center justify-around"><div class="hidden lg:flex lg:flex-1 lg:items-center xl:my-3"><a href="/"><span class="sr-only">Your Company</span><img class="sm:h-16 xl:h-20 w-auto"${ssrRenderAttr("src", _imports_0$4)} alt=""></a></div><div class="hidden h-full lg:flex">`);
      _push(ssrRenderComponent(unref(PopoverGroup), {
        as: "div",
        class: "inset-x-0 bottom-0 px-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full justify-center space-x-6 mr-32"${_scopeId}><!--[-->`);
            ssrRenderList(navigation.value.categories, (category) => {
              _push2(ssrRenderComponent(unref(Popover), {
                key: category.name,
                class: "flex"
              }, {
                default: withCtx(({ open: open2 }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="relative flex"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(PopoverButton), {
                      class: [
                        open2 ? "border-sky-400 text-sky-400" : " border-transparent text-white hover:text-sky-400",
                        "relative z-10 -mb-px flex items-center border-b-4 pt-px text-lg focus:outline-none ",
                        "uppercase transition-colors duration-200 ease-out"
                      ]
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(category.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(category.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(unref(PopoverPanel), { class: "absolute inset-x-0 top-full text-sm text-gray-500" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"${_scopeId3}></div><div class="relative bg-white"${_scopeId3}><div class="mx-auto max-w-7xl px-8"${_scopeId3}><div class="grid grid-cols-4 gap-y-10 gap-x-8 py-16"${_scopeId3}><!--[-->`);
                          ssrRenderList(category.featured.slice(0, 4), (item) => {
                            _push4(`<div class="group relative"${_scopeId3}><div class="h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75 object-cover"${_scopeId3}><img${ssrRenderAttr("src", item.image)} class="h-full w-full object-cover"${_scopeId3}></div><a${ssrRenderAttr("href", `/${category.name.toLocaleLowerCase()}/${item.id}`)} class="mt-4 block font-medium text-white"${_scopeId3}><span class="absolute text-white inset-0 z-10" aria-hidden="true"${_scopeId3}></span> ${ssrInterpolate(item.title)}</a><p aria-hidden="true" class="mt-1"${_scopeId3}>Contact now</p></div>`);
                          });
                          _push4(`<!--]--></div></div></div>`);
                        } else {
                          return [
                            createVNode("div", {
                              class: "absolute inset-0 top-1/2 bg-white shadow",
                              "aria-hidden": "true"
                            }),
                            createVNode("div", { class: "relative bg-white" }, [
                              createVNode("div", { class: "mx-auto max-w-7xl px-8" }, [
                                createVNode("div", { class: "grid grid-cols-4 gap-y-10 gap-x-8 py-16" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(category.featured.slice(0, 4), (item) => {
                                    return openBlock(), createBlock("div", {
                                      key: item.name,
                                      class: "group relative"
                                    }, [
                                      createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75 object-cover" }, [
                                        createVNode("img", {
                                          src: item.image,
                                          class: "h-full w-full object-cover"
                                        }, null, 8, ["src"])
                                      ]),
                                      createVNode("a", {
                                        href: `/${category.name.toLocaleLowerCase()}/${item.id}`,
                                        class: "mt-4 block font-medium text-white"
                                      }, [
                                        createVNode("span", {
                                          class: "absolute text-white inset-0 z-10",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" " + toDisplayString(item.title), 1)
                                      ], 8, ["href"]),
                                      createVNode("p", {
                                        "aria-hidden": "true",
                                        class: "mt-1"
                                      }, "Contact now")
                                    ]);
                                  }), 128))
                                ])
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "relative flex" }, [
                        createVNode(unref(PopoverButton), {
                          class: [
                            open2 ? "border-sky-400 text-sky-400" : " border-transparent text-white hover:text-sky-400",
                            "relative z-10 -mb-px flex items-center border-b-4 pt-px text-lg focus:outline-none ",
                            "uppercase transition-colors duration-200 ease-out"
                          ]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(category.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["class"])
                      ]),
                      createVNode(Transition, {
                        "enter-active-class": "transition ease-out duration-200",
                        "enter-from-class": "opacity-0",
                        "enter-to-class": "opacity-100",
                        "leave-active-class": "transition ease-in duration-150",
                        "leave-from-class": "opacity-100",
                        "leave-to-class": "opacity-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(PopoverPanel), { class: "absolute inset-x-0 top-full text-sm text-gray-500" }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: "absolute inset-0 top-1/2 bg-white shadow",
                                "aria-hidden": "true"
                              }),
                              createVNode("div", { class: "relative bg-white" }, [
                                createVNode("div", { class: "mx-auto max-w-7xl px-8" }, [
                                  createVNode("div", { class: "grid grid-cols-4 gap-y-10 gap-x-8 py-16" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(category.featured.slice(0, 4), (item) => {
                                      return openBlock(), createBlock("div", {
                                        key: item.name,
                                        class: "group relative"
                                      }, [
                                        createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75 object-cover" }, [
                                          createVNode("img", {
                                            src: item.image,
                                            class: "h-full w-full object-cover"
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("a", {
                                          href: `/${category.name.toLocaleLowerCase()}/${item.id}`,
                                          class: "mt-4 block font-medium text-white"
                                        }, [
                                          createVNode("span", {
                                            class: "absolute text-white inset-0 z-10",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" " + toDisplayString(item.title), 1)
                                        ], 8, ["href"]),
                                        createVNode("p", {
                                          "aria-hidden": "true",
                                          class: "mt-1"
                                        }, "Contact now")
                                      ]);
                                    }), 128))
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(navigation.value.pages, (page) => {
              _push2(`<a${ssrRenderAttr("href", page.href)} class="transition-colors duration-200 ease-out uppercase border-transparent text-white hover:text-sky-400 -mb-px flex items-center border-b-4 pt-px text-lg focus:outline-none"${_scopeId}>${ssrInterpolate(page.name)}</a>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full justify-center space-x-6 mr-32" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.categories, (category) => {
                  return openBlock(), createBlock(unref(Popover), {
                    key: category.name,
                    class: "flex"
                  }, {
                    default: withCtx(({ open: open2 }) => [
                      createVNode("div", { class: "relative flex" }, [
                        createVNode(unref(PopoverButton), {
                          class: [
                            open2 ? "border-sky-400 text-sky-400" : " border-transparent text-white hover:text-sky-400",
                            "relative z-10 -mb-px flex items-center border-b-4 pt-px text-lg focus:outline-none ",
                            "uppercase transition-colors duration-200 ease-out"
                          ]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(category.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["class"])
                      ]),
                      createVNode(Transition, {
                        "enter-active-class": "transition ease-out duration-200",
                        "enter-from-class": "opacity-0",
                        "enter-to-class": "opacity-100",
                        "leave-active-class": "transition ease-in duration-150",
                        "leave-from-class": "opacity-100",
                        "leave-to-class": "opacity-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(PopoverPanel), { class: "absolute inset-x-0 top-full text-sm text-gray-500" }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: "absolute inset-0 top-1/2 bg-white shadow",
                                "aria-hidden": "true"
                              }),
                              createVNode("div", { class: "relative bg-white" }, [
                                createVNode("div", { class: "mx-auto max-w-7xl px-8" }, [
                                  createVNode("div", { class: "grid grid-cols-4 gap-y-10 gap-x-8 py-16" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(category.featured.slice(0, 4), (item) => {
                                      return openBlock(), createBlock("div", {
                                        key: item.name,
                                        class: "group relative"
                                      }, [
                                        createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75 object-cover" }, [
                                          createVNode("img", {
                                            src: item.image,
                                            class: "h-full w-full object-cover"
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("a", {
                                          href: `/${category.name.toLocaleLowerCase()}/${item.id}`,
                                          class: "mt-4 block font-medium text-white"
                                        }, [
                                          createVNode("span", {
                                            class: "absolute text-white inset-0 z-10",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" " + toDisplayString(item.title), 1)
                                        ], 8, ["href"]),
                                        createVNode("p", {
                                          "aria-hidden": "true",
                                          class: "mt-1"
                                        }, "Contact now")
                                      ]);
                                    }), 128))
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 128)),
                (openBlock(true), createBlock(Fragment, null, renderList(navigation.value.pages, (page) => {
                  return openBlock(), createBlock("a", {
                    key: page.name,
                    href: page.href,
                    class: "transition-colors duration-200 ease-out uppercase border-transparent text-white hover:text-sky-400 -mb-px flex items-center border-b-4 pt-px text-lg focus:outline-none"
                  }, toDisplayString(page.name), 9, ["href"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-1 items-center lg:hidden mx-4"><button type="button" class="-ml-2 h-8 w-8 text-lg rounded-md p-4 text-zinc-900-400"><span class="sr-only">Open menu</span>`);
      _push(ssrRenderComponent(unref(Bars3Icon), {
        class: "h-6 w-6",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</button><a href="#" class="ml-2 p-2 text-gray-400 hover:text-gray-500"><span class="sr-only">Search</span>`);
      _push(ssrRenderComponent(unref(MagnifyingGlassIcon), {
        class: "h-6 w-6",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</a></div><a href="/" class="lg:hidden"><span class="sr-only">Your Company</span><img${ssrRenderAttr("src", _imports_0$4)} alt="" class="h-12 w-auto"></a><div class="flex flex-1 items-center justify-end lg:hidden"><div class="flex items-center lg:ml-8"><a href="#" class="p-2 text-gray-400 hover:text-gray-500 lg:hidden"><span class="sr-only">Help</span>`);
      _push(ssrRenderComponent(unref(QuestionMarkCircleIcon), {
        class: "h-6 w-6",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</a></div></div></nav></header></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/headers/NewHeader.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const NewHeader = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ParalaxSlide = slide;
  _push(ssrRenderComponent(_component_ParalaxSlide, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="relative px-6 lg:px-8"${_scopeId}><div class="mx-auto max-w-3xl xl:max-w-7xl pt-20 pb-32 sm:pt-48 sm:pb-40"${_scopeId}><div${_scopeId}><div class="hidden sm:mb-8 sm:flex sm:justify-center"${_scopeId}><div class="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20"${_scopeId}><span class="text-gray-600 capitalize text-xl"${_scopeId}>Who is TIC Quality Control? <a href="/about" class="font-semibold text-blood"${_scopeId}><span class="absolute inset-0" aria-hidden="true"${_scopeId}></span>Read more <span aria-hidden="true"${_scopeId}>\u2192</span></a></span></div></div><div${_scopeId}><h1 class="content-title capitalize text-4xl leading-1 tracking-tight sm:text-center sm:text-8xl"${_scopeId}> consulting services and quality solutions </h1><p class="mt-6 text-lg leading-8 text-gray-600 sm:text-center"${_scopeId}> We are dedicated to helping you meet the safety, quality, and ethical standards you demand throughout your supply chain. </p><div class="mt-8 flex gap-x-4 justify-center"${_scopeId}><a href="/industries" class="inline-block rounded-lg bg-blood px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blood hover:bg-blood hover:ring-blood"${_scopeId}>Industries <span class="text-indigo-200" aria-hidden="true"${_scopeId}>\u2192</span></a><a href="/services" class="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"${_scopeId}>Services <span class="text-gray-400" aria-hidden="true"${_scopeId}>\u2192</span></a></div></div><div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"${_scopeId}><svg class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"${_scopeId}></path><defs${_scopeId}><linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse"${_scopeId}><stop stop-color="#9089FC"${_scopeId}></stop><stop offset="1" stop-color="#FF80B5"${_scopeId}></stop></linearGradient></defs></svg></div></div></div></div><div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"${_scopeId}><svg class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"${_scopeId}></path><defs${_scopeId}><linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse"${_scopeId}><stop stop-color="pink"${_scopeId}></stop><stop offset="1" stop-color="purple"${_scopeId}></stop></linearGradient></defs></svg></div>`);
      } else {
        return [
          createVNode("div", { class: "relative px-6 lg:px-8" }, [
            createVNode("div", { class: "mx-auto max-w-3xl xl:max-w-7xl pt-20 pb-32 sm:pt-48 sm:pb-40" }, [
              createVNode("div", null, [
                createVNode("div", { class: "hidden sm:mb-8 sm:flex sm:justify-center" }, [
                  createVNode("div", { class: "relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20" }, [
                    createVNode("span", { class: "text-gray-600 capitalize text-xl" }, [
                      createTextVNode("Who is TIC Quality Control? "),
                      createVNode("a", {
                        href: "/about",
                        class: "font-semibold text-blood"
                      }, [
                        createVNode("span", {
                          class: "absolute inset-0",
                          "aria-hidden": "true"
                        }),
                        createTextVNode("Read more "),
                        createVNode("span", { "aria-hidden": "true" }, "\u2192")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("h1", { class: "content-title capitalize text-4xl leading-1 tracking-tight sm:text-center sm:text-8xl" }, " consulting services and quality solutions "),
                  createVNode("p", { class: "mt-6 text-lg leading-8 text-gray-600 sm:text-center" }, " We are dedicated to helping you meet the safety, quality, and ethical standards you demand throughout your supply chain. "),
                  createVNode("div", { class: "mt-8 flex gap-x-4 justify-center" }, [
                    createVNode("a", {
                      href: "/industries",
                      class: "inline-block rounded-lg bg-blood px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blood hover:bg-blood hover:ring-blood"
                    }, [
                      createTextVNode("Industries "),
                      createVNode("span", {
                        class: "text-indigo-200",
                        "aria-hidden": "true"
                      }, "\u2192")
                    ]),
                    createVNode("a", {
                      href: "/services",
                      class: "inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                    }, [
                      createTextVNode("Services "),
                      createVNode("span", {
                        class: "text-gray-400",
                        "aria-hidden": "true"
                      }, "\u2192")
                    ])
                  ])
                ]),
                createVNode("div", { class: "absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" }, [
                  (openBlock(), createBlock("svg", {
                    class: "relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]",
                    viewBox: "0 0 1155 678",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      fill: "url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)",
                      "fill-opacity": ".3",
                      d: "M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    }),
                    createVNode("defs", null, [
                      createVNode("linearGradient", {
                        id: "ecb5b0c9-546c-4772-8c71-4d3f06d544bc",
                        x1: "1155.49",
                        x2: "-78.208",
                        y1: ".177",
                        y2: "474.645",
                        gradientUnits: "userSpaceOnUse"
                      }, [
                        createVNode("stop", { "stop-color": "#9089FC" }),
                        createVNode("stop", {
                          offset: "1",
                          "stop-color": "#FF80B5"
                        })
                      ])
                    ])
                  ]))
                ])
              ])
            ])
          ]),
          createVNode("div", { class: "absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" }, [
            (openBlock(), createBlock("svg", {
              class: "relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]",
              viewBox: "0 0 1155 678",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              createVNode("path", {
                fill: "url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)",
                "fill-opacity": ".3",
                d: "M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              }),
              createVNode("defs", null, [
                createVNode("linearGradient", {
                  id: "45de2b6b-92d5-4d68-a6a0-9b9b2abad533",
                  x1: "1155.49",
                  x2: "-78.208",
                  y1: ".177",
                  y2: "474.645",
                  gradientUnits: "userSpaceOnUse"
                }, [
                  createVNode("stop", { "stop-color": "pink" }),
                  createVNode("stop", {
                    offset: "1",
                    "stop-color": "purple"
                  })
                ])
              ])
            ]))
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/about.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender]]);
const about = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_3
}, Symbol.toStringTag, { value: "Module" }));
const _imports_0$2 = "" + globalThis.__buildAssetsURL("cats-3.fbae75f8.jpg");
const _sfc_main$5 = {
  __name: "categories",
  __ssrInlineRender: true,
  setup(__props) {
    const navigation = {
      categories: [
        {
          name: "Industries",
          featured: [
            {
              title: "Vehicle",
              href: "#",
              image: "/img/industry-cars---01.jpg",
              text: "Pre-exports vehicles Inspections & Confirmation of Conformity verification service to ensure shipments conform to local importing standards to be cleared at destination."
            },
            {
              title: "Oil and Gas",
              href: "#",
              image: "/img/industry-oil---01.jpg",
              text: "We help support highlighting the maintenance equipment, as well as the safety of petroleum refining and extraction operations. "
            },
            {
              title: "Food Safety",
              href: "#",
              image: "/img/industry-food---01.jpg",
              text: "TIC provide reliable methods and services to guarantee food safety and better food control throughout the entire food supply chain."
            },
            {
              title: "Agriculture",
              href: "#",
              image: "/img/industry-agriculture---01.jpg",
              text: "Our agricultural inspection and testing services help companies be more transparent and comply with contractual obligations"
            }
          ]
        },
        {
          name: "Services",
          featured: [
            {
              title: "Non-Destructive Testing \u2013 NDT ",
              href: "#",
              image: "/img/services-ndt-01.jpg",
              text: "Testing that is used to examine and evaluate the properties of materials, structures, and equipment without causing damage or increasing the risk of the integrity of the items being tested. "
            },
            {
              title: "Calibration Services",
              href: "#",
              image: "/img/services-calibration-01.jpg",
              text: "Pre-exports vehicles Inspections & Confirmation of Conformity verification service to ensure shipments conform to local importing standards to be cleared at destination."
            },
            {
              title: "Corrosion",
              href: "#",
              image: "/img/services-Corrosion-01.jpg",
              text: "Pre-exports vehicles Inspections & Confirmation of Conformity verification service to ensure shipments conform to local importing standards to be cleared at destination."
            },
            {
              title: "Steel Manufacturing & Fabrication",
              href: "#",
              image: "/img/services-steel-01.jpg",
              text: "Pre-exports vehicles Inspections & Confirmation of Conformity verification service to ensure shipments conform to local importing standards to be cleared at destination."
            }
          ]
        }
      ],
      pages: [
        { name: "industries", href: "/industries" },
        { name: "services", href: "/services" }
      ]
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ParalaxSlide = slide;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ParalaxSlide, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto w-full max-w-7xl pt-16 pb-20 text-left lg:py-48 lg:text-left z-50"${_scopeId}><div class="px-6 sm:px-8 lg:w-1/2 xl:pr-12"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TabGroup), {
              as: "div",
              class: "mt-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="border-b border-gray-200"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TabList), { class: "-mb-px flex space-x-8 px-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(navigation.categories, (category) => {
                          _push4(ssrRenderComponent(unref(Tab), {
                            as: "template",
                            key: category.name
                          }, {
                            default: withCtx(({ selected }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<button class="${ssrRenderClass([selected ? "text-blood border-blood outline-none" : "text-zinc-900 border-transparent ", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"])}"${_scopeId4}>${ssrInterpolate(category.name)}</button>`);
                              } else {
                                return [
                                  createVNode("button", {
                                    class: [selected ? "text-blood border-blood outline-none" : "text-zinc-900 border-transparent ", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                  }, toDisplayString(category.name), 3)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(navigation.categories, (category) => {
                            return openBlock(), createBlock(unref(Tab), {
                              as: "template",
                              key: category.name
                            }, {
                              default: withCtx(({ selected }) => [
                                createVNode("button", {
                                  class: [selected ? "text-blood border-blood outline-none" : "text-zinc-900 border-transparent ", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                }, toDisplayString(category.name), 3)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(TabPanels), { as: "template" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(navigation.categories, (category) => {
                          _push4(ssrRenderComponent(unref(TabPanel), {
                            key: category.name,
                            class: "space-y-12 px-4 py-6"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="grid grid-cols-2 gap-x-4 gap-y-10"${_scopeId4}><!--[-->`);
                                ssrRenderList(category.featured, (item, idx) => {
                                  _push5(`<div class="group relative shadow-md p-2 rounded-md bg-neutral-50" data-aos="fade-in" data-aos-ease="ease" data-aos-duration="900"${ssrRenderAttr("data-aos-delay", `${300 * idx}`)}${_scopeId4}><div class="h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75"${_scopeId4}><img${ssrRenderAttr("src", item.image)} class="h-full w-full object-cover object-center"${_scopeId4}></div><a${ssrRenderAttr("href", item.href)} class="mt-6 block text-sm font-medium text-blood"${_scopeId4}><span class="absolute inset-0 z-10" aria-hidden="true"${_scopeId4}></span> ${ssrInterpolate(item.title)}</a><p aria-hidden="true" class="mt-1 text-sm text-zinc-80000 line-clamp-3"${_scopeId4}>${ssrInterpolate(item.text)}</p></div>`);
                                });
                                _push5(`<!--]--><div class="col-span-2 flex justify-start"${_scopeId4}>`);
                                if (category.name === "Industries") {
                                  _push5(ssrRenderComponent(_component_nuxt_link, {
                                    to: navigation.pages[0].href,
                                    class: "hover:text-blood"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`Find more ${ssrInterpolate(navigation.pages[0].name)} &gt;&gt;&gt;`);
                                      } else {
                                        return [
                                          createTextVNode("Find more " + toDisplayString(navigation.pages[0].name) + " >>>", 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(ssrRenderComponent(_component_nuxt_link, {
                                    to: navigation.pages[1].href,
                                    class: "hover:text-blood"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`Find more ${ssrInterpolate(navigation.pages[1].name)} &gt;&gt;&gt;`);
                                      } else {
                                        return [
                                          createTextVNode("Find more " + toDisplayString(navigation.pages[1].name) + " >>>", 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                }
                                _push5(`</div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(category.featured, (item, idx) => {
                                      return openBlock(), createBlock("div", {
                                        key: item.title,
                                        class: "group relative shadow-md p-2 rounded-md bg-neutral-50",
                                        "data-aos": "fade-in",
                                        "data-aos-ease": "ease",
                                        "data-aos-duration": "900",
                                        "data-aos-delay": `${300 * idx}`
                                      }, [
                                        createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                          createVNode("img", {
                                            src: item.image,
                                            class: "h-full w-full object-cover object-center"
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("a", {
                                          href: item.href,
                                          class: "mt-6 block text-sm font-medium text-blood"
                                        }, [
                                          createVNode("span", {
                                            class: "absolute inset-0 z-10",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" " + toDisplayString(item.title), 1)
                                        ], 8, ["href"]),
                                        createVNode("p", {
                                          "aria-hidden": "true",
                                          class: "mt-1 text-sm text-zinc-80000 line-clamp-3"
                                        }, toDisplayString(item.text), 1)
                                      ], 8, ["data-aos-delay"]);
                                    }), 128)),
                                    createVNode("div", { class: "col-span-2 flex justify-start" }, [
                                      category.name === "Industries" ? (openBlock(), createBlock(_component_nuxt_link, {
                                        key: 0,
                                        to: navigation.pages[0].href,
                                        class: "hover:text-blood"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Find more " + toDisplayString(navigation.pages[0].name) + " >>>", 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"])) : (openBlock(), createBlock(_component_nuxt_link, {
                                        key: 1,
                                        to: navigation.pages[1].href,
                                        class: "hover:text-blood"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Find more " + toDisplayString(navigation.pages[1].name) + " >>>", 1)
                                        ]),
                                        _: 1
                                      }, 8, ["to"]))
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(navigation.categories, (category) => {
                            return openBlock(), createBlock(unref(TabPanel), {
                              key: category.name,
                              class: "space-y-12 px-4 py-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(category.featured, (item, idx) => {
                                    return openBlock(), createBlock("div", {
                                      key: item.title,
                                      class: "group relative shadow-md p-2 rounded-md bg-neutral-50",
                                      "data-aos": "fade-in",
                                      "data-aos-ease": "ease",
                                      "data-aos-duration": "900",
                                      "data-aos-delay": `${300 * idx}`
                                    }, [
                                      createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                        createVNode("img", {
                                          src: item.image,
                                          class: "h-full w-full object-cover object-center"
                                        }, null, 8, ["src"])
                                      ]),
                                      createVNode("a", {
                                        href: item.href,
                                        class: "mt-6 block text-sm font-medium text-blood"
                                      }, [
                                        createVNode("span", {
                                          class: "absolute inset-0 z-10",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" " + toDisplayString(item.title), 1)
                                      ], 8, ["href"]),
                                      createVNode("p", {
                                        "aria-hidden": "true",
                                        class: "mt-1 text-sm text-zinc-80000 line-clamp-3"
                                      }, toDisplayString(item.text), 1)
                                    ], 8, ["data-aos-delay"]);
                                  }), 128)),
                                  createVNode("div", { class: "col-span-2 flex justify-start" }, [
                                    category.name === "Industries" ? (openBlock(), createBlock(_component_nuxt_link, {
                                      key: 0,
                                      to: navigation.pages[0].href,
                                      class: "hover:text-blood"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Find more " + toDisplayString(navigation.pages[0].name) + " >>>", 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"])) : (openBlock(), createBlock(_component_nuxt_link, {
                                      key: 1,
                                      to: navigation.pages[1].href,
                                      class: "hover:text-blood"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Find more " + toDisplayString(navigation.pages[1].name) + " >>>", 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"]))
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "border-b border-gray-200" }, [
                      createVNode(unref(TabList), { class: "-mb-px flex space-x-8 px-4" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(navigation.categories, (category) => {
                            return openBlock(), createBlock(unref(Tab), {
                              as: "template",
                              key: category.name
                            }, {
                              default: withCtx(({ selected }) => [
                                createVNode("button", {
                                  class: [selected ? "text-blood border-blood outline-none" : "text-zinc-900 border-transparent ", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                }, toDisplayString(category.name), 3)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(TabPanels), { as: "template" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(navigation.categories, (category) => {
                          return openBlock(), createBlock(unref(TabPanel), {
                            key: category.name,
                            class: "space-y-12 px-4 py-6"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(category.featured, (item, idx) => {
                                  return openBlock(), createBlock("div", {
                                    key: item.title,
                                    class: "group relative shadow-md p-2 rounded-md bg-neutral-50",
                                    "data-aos": "fade-in",
                                    "data-aos-ease": "ease",
                                    "data-aos-duration": "900",
                                    "data-aos-delay": `${300 * idx}`
                                  }, [
                                    createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                      createVNode("img", {
                                        src: item.image,
                                        class: "h-full w-full object-cover object-center"
                                      }, null, 8, ["src"])
                                    ]),
                                    createVNode("a", {
                                      href: item.href,
                                      class: "mt-6 block text-sm font-medium text-blood"
                                    }, [
                                      createVNode("span", {
                                        class: "absolute inset-0 z-10",
                                        "aria-hidden": "true"
                                      }),
                                      createTextVNode(" " + toDisplayString(item.title), 1)
                                    ], 8, ["href"]),
                                    createVNode("p", {
                                      "aria-hidden": "true",
                                      class: "mt-1 text-sm text-zinc-80000 line-clamp-3"
                                    }, toDisplayString(item.text), 1)
                                  ], 8, ["data-aos-delay"]);
                                }), 128)),
                                createVNode("div", { class: "col-span-2 flex justify-start" }, [
                                  category.name === "Industries" ? (openBlock(), createBlock(_component_nuxt_link, {
                                    key: 0,
                                    to: navigation.pages[0].href,
                                    class: "hover:text-blood"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Find more " + toDisplayString(navigation.pages[0].name) + " >>>", 1)
                                    ]),
                                    _: 1
                                  }, 8, ["to"])) : (openBlock(), createBlock(_component_nuxt_link, {
                                    key: 1,
                                    to: navigation.pages[1].href,
                                    class: "hover:text-blood"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Find more " + toDisplayString(navigation.pages[1].name) + " >>>", 1)
                                    ]),
                                    _: 1
                                  }, 8, ["to"]))
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2"${_scopeId}><img class="absolute inset-0 h-full w-full object-cover"${ssrRenderAttr("src", _imports_0$2)} alt=""${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto w-full max-w-7xl pt-16 pb-20 text-left lg:py-48 lg:text-left z-50" }, [
                createVNode("div", { class: "px-6 sm:px-8 lg:w-1/2 xl:pr-12" }, [
                  createVNode(unref(TabGroup), {
                    as: "div",
                    class: "mt-2"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "border-b border-gray-200" }, [
                        createVNode(unref(TabList), { class: "-mb-px flex space-x-8 px-4" }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(navigation.categories, (category) => {
                              return openBlock(), createBlock(unref(Tab), {
                                as: "template",
                                key: category.name
                              }, {
                                default: withCtx(({ selected }) => [
                                  createVNode("button", {
                                    class: [selected ? "text-blood border-blood outline-none" : "text-zinc-900 border-transparent ", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
                                  }, toDisplayString(category.name), 3)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(unref(TabPanels), { as: "template" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(navigation.categories, (category) => {
                            return openBlock(), createBlock(unref(TabPanel), {
                              key: category.name,
                              class: "space-y-12 px-4 py-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "grid grid-cols-2 gap-x-4 gap-y-10" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(category.featured, (item, idx) => {
                                    return openBlock(), createBlock("div", {
                                      key: item.title,
                                      class: "group relative shadow-md p-2 rounded-md bg-neutral-50",
                                      "data-aos": "fade-in",
                                      "data-aos-ease": "ease",
                                      "data-aos-duration": "900",
                                      "data-aos-delay": `${300 * idx}`
                                    }, [
                                      createVNode("div", { class: "h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75" }, [
                                        createVNode("img", {
                                          src: item.image,
                                          class: "h-full w-full object-cover object-center"
                                        }, null, 8, ["src"])
                                      ]),
                                      createVNode("a", {
                                        href: item.href,
                                        class: "mt-6 block text-sm font-medium text-blood"
                                      }, [
                                        createVNode("span", {
                                          class: "absolute inset-0 z-10",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" " + toDisplayString(item.title), 1)
                                      ], 8, ["href"]),
                                      createVNode("p", {
                                        "aria-hidden": "true",
                                        class: "mt-1 text-sm text-zinc-80000 line-clamp-3"
                                      }, toDisplayString(item.text), 1)
                                    ], 8, ["data-aos-delay"]);
                                  }), 128)),
                                  createVNode("div", { class: "col-span-2 flex justify-start" }, [
                                    category.name === "Industries" ? (openBlock(), createBlock(_component_nuxt_link, {
                                      key: 0,
                                      to: navigation.pages[0].href,
                                      class: "hover:text-blood"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Find more " + toDisplayString(navigation.pages[0].name) + " >>>", 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"])) : (openBlock(), createBlock(_component_nuxt_link, {
                                      key: 1,
                                      to: navigation.pages[1].href,
                                      class: "hover:text-blood"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Find more " + toDisplayString(navigation.pages[1].name) + " >>>", 1)
                                      ]),
                                      _: 1
                                    }, 8, ["to"]))
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("div", { class: "relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2" }, [
                createVNode("img", {
                  class: "absolute inset-0 h-full w-full object-cover",
                  src: _imports_0$2,
                  alt: ""
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/categories.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const categories = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _imports_0$1 = "" + globalThis.__buildAssetsURL("Oil-0-2.97ebaa96.jpg");
const _sfc_main$4 = {
  __name: "fetures",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(slide, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto w-full max-w-7xl pt-16 pb-20 text-left lg:py-48 lg:text-left z-50"${_scopeId}><div class="px-6 sm:px-8 lg:w-1/2 xl:pr-12"${_scopeId}><h1 class="text-4xl capitalize font-montserrat font-normal tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"${_scopeId}><span class="block xl:inline"${_scopeId}>the cruicial role of</span> ${ssrInterpolate(" ")} <span class="block text-blood xl:inline"${_scopeId}>oil and gas</span> ${ssrInterpolate(" ")} <span class="block xl:inline"${_scopeId}> sector.</span></h1><p class="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl"${_scopeId}> Maintaining the integrity of Oil and Gas equipment help support safer working practice, and efficient process flow. </p><div class="mt-10 sm:flex sm:justify-center lg:justify-start"${_scopeId}><div class="rounded-md shadow"${_scopeId}><a href="/industries/2" class="flex w-full items-center justify-center rounded-md border border-transparent bg-blood px-8 py-3 text-base font-medium text-white hover:bg-blood md:py-4 md:px-10 md:text-lg"${_scopeId}> Read more</a></div><div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"${_scopeId}><a href="/services" class="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-blood hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"${_scopeId}> Services</a></div></div></div></div><div class="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2"${_scopeId}><img class="absolute inset-0 h-full w-full object-cover"${ssrRenderAttr("src", _imports_0$1)} alt=""${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto w-full max-w-7xl pt-16 pb-20 text-left lg:py-48 lg:text-left z-50" }, [
                createVNode("div", { class: "px-6 sm:px-8 lg:w-1/2 xl:pr-12" }, [
                  createVNode("h1", { class: "text-4xl capitalize font-montserrat font-normal tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl" }, [
                    createVNode("span", { class: "block xl:inline" }, "the cruicial role of"),
                    createTextVNode(" " + toDisplayString(" ") + " "),
                    createVNode("span", { class: "block text-blood xl:inline" }, "oil and gas"),
                    createTextVNode(" " + toDisplayString(" ") + " "),
                    createVNode("span", { class: "block xl:inline" }, " sector.")
                  ]),
                  createVNode("p", { class: "mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl" }, " Maintaining the integrity of Oil and Gas equipment help support safer working practice, and efficient process flow. "),
                  createVNode("div", { class: "mt-10 sm:flex sm:justify-center lg:justify-start" }, [
                    createVNode("div", { class: "rounded-md shadow" }, [
                      createVNode("a", {
                        href: "/industries/2",
                        class: "flex w-full items-center justify-center rounded-md border border-transparent bg-blood px-8 py-3 text-base font-medium text-white hover:bg-blood md:py-4 md:px-10 md:text-lg"
                      }, " Read more")
                    ]),
                    createVNode("div", { class: "mt-3 rounded-md shadow sm:mt-0 sm:ml-3" }, [
                      createVNode("a", {
                        href: "/services",
                        class: "flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-blood hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
                      }, " Services")
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2" }, [
                createVNode("img", {
                  class: "absolute inset-0 h-full w-full object-cover",
                  src: _imports_0$1,
                  alt: ""
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/fetures.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const fetures = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "hero",
  __ssrInlineRender: true,
  setup(__props) {
    const Tweenmax = defineAsyncComponent(() => import('./index.12b79e49.mjs').then((n) => n.i));
    const slideData = [
      {
        title: "Vehicle COC",
        href: "/industries/1",
        description: "We provide quick and efficient vehicle inspections which guarantee environmental and roadworthy vehicles entering the country by implementing international quality standard guidelines and processes.",
        img: "/img/hero-vehicle-02.jpg",
        btn: "Upcoming event"
      },
      {
        title: "Agriculture Inspections & Testing",
        href: "/industries/4",
        description: "We help support the agriculture industry to maintain good environmental practice, sustainable growth, and a safe model.",
        img: "/img/hero-agriculture-01.jpg",
        btn: "Upcoming event"
      },
      {
        title: "Oil and Gas",
        href: "/industries/2",
        description: "We help Oil and Gas customers identify, eliminate, control, and monitor the reliability of their production, transportation and storage infrastructure.",
        img: "/img/hero-oil-01.webp",
        btn: "Upcoming event"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ParalaxSlide = slide;
      _push(ssrRenderComponent(_component_ParalaxSlide, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Tweenmax), { "slide-data": slideData }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Tweenmax), { "slide-data": slideData })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/hero.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const hero = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "map",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ParalaxSlide = slide;
      _push(ssrRenderComponent(_component_ParalaxSlide, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="overflow-hidden bg-white py-12 sm:py-24 h-full w-full" data-v-c1549252${_scopeId}><div class="h-full relative bg-white" data-v-c1549252${_scopeId}><div class="absolute inset-0" data-v-c1549252${_scopeId}><div class="absolute inset-y-0 left-0 w-1/2 bg-gray-50" data-v-c1549252${_scopeId}></div></div><div class="relative mx-auto max-w-7xl lg:grid lg:grid-cols-6" data-v-c1549252${_scopeId}><div class="bg-zinc-100 py-8 px-8 lg:col-span-2 lg:px-4 lg:py-24 xl:pr-4" data-v-c1549252${_scopeId}><div class="mx-auto max-w-lg" data-v-c1549252${_scopeId}><h2 class="text-2xl font-thin tracking-tight font-montserrat text-blood uppercase sm:text-3xl" data-v-c1549252${_scopeId}> Global presence </h2><dl class="mt-8 text-base text-gray-500" data-v-c1549252${_scopeId}><p class="text-lg font-montserrat text-blood" data-v-c1549252${_scopeId}> Dubai Office </p><div data-v-c1549252${_scopeId}><dt class="sr-only" data-v-c1549252${_scopeId}>Postal address</dt><dd data-v-c1549252${_scopeId}><p data-v-c1549252${_scopeId}>Office 2206, Clover Bay Tower</p><p data-v-c1549252${_scopeId}>Marasi Drive, Business Bay</p><p data-v-c1549252${_scopeId}>PO BOX 28129</p><p data-v-c1549252${_scopeId}>Dubai, UAE</p></dd></div><div class="mt-6" data-v-c1549252${_scopeId}><dt class="sr-only" data-v-c1549252${_scopeId}>Phone number</dt><dd class="flex" data-v-c1549252${_scopeId}>`);
            _push2(ssrRenderComponent(unref(PhoneIcon), {
              class: "h-6 w-6 flex-shrink-0 text-gray-400",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3" data-v-c1549252${_scopeId}>+971 (04) 225-5555</span></dd></div><div class="mt-3" data-v-c1549252${_scopeId}><dt class="sr-only" data-v-c1549252${_scopeId}>Email</dt><dd class="flex" data-v-c1549252${_scopeId}>`);
            _push2(ssrRenderComponent(unref(EnvelopeIcon), {
              class: "h-6 w-6 flex-shrink-0 text-gray-400",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3" data-v-c1549252${_scopeId}>info@ticqc.ae</span></dd></div></dl><p class="mt-6 text-base text-gray-500" data-v-c1549252${_scopeId}> Looking for careers? ${ssrInterpolate(" ")} <a href="#" class="font-medium text-gray-700 underline" data-v-c1549252${_scopeId}>View all job openings</a>. </p></div></div><div class="bg-white py-2 px-2 lg:col-span-4 lg:py-24 lg:px-4 xl:pl-6" data-v-c1549252${_scopeId}><div class="mx-auto max-w-lg lg:max-w-none" data-v-c1549252${_scopeId}><div class="map-container pl-0 xl-pl-24 w-full overflow-hidden" data-v-c1549252${_scopeId}><img${ssrRenderAttr("src", _imports_0$3)} class="object-cover" data-v-c1549252${_scopeId}><div class="point dubai tippy pulse" title="Dubai" data-v-c1549252${_scopeId}></div><div class="point abudhabi tippy" title="Abu Dhabi" data-v-c1549252${_scopeId}></div><div class="point sulaimani tippy" title="Iraq" data-v-c1549252${_scopeId}></div><div class="point cairo tippy" title="Egypt" data-v-c1549252${_scopeId}></div><div class="point delhi tippy" title="India" data-v-c1549252${_scopeId}></div><div class="point japan tippy" title="Japan" data-v-c1549252${_scopeId}></div><div class="point south-africa tippy" title="South Africa" data-v-c1549252${_scopeId}></div><div class="point kenya tippy" title="Kenya" data-v-c1549252${_scopeId}></div><div class="point london tippy" title="United Kingdom" data-v-c1549252${_scopeId}></div><div class="point nairobi tippy" title="Nairobi" data-v-c1549252${_scopeId}></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "overflow-hidden bg-white py-12 sm:py-24 h-full w-full" }, [
                createVNode("div", { class: "h-full relative bg-white" }, [
                  createVNode("div", { class: "absolute inset-0" }, [
                    createVNode("div", { class: "absolute inset-y-0 left-0 w-1/2 bg-gray-50" })
                  ]),
                  createVNode("div", { class: "relative mx-auto max-w-7xl lg:grid lg:grid-cols-6" }, [
                    createVNode("div", { class: "bg-zinc-100 py-8 px-8 lg:col-span-2 lg:px-4 lg:py-24 xl:pr-4" }, [
                      createVNode("div", { class: "mx-auto max-w-lg" }, [
                        createVNode("h2", { class: "text-2xl font-thin tracking-tight font-montserrat text-blood uppercase sm:text-3xl" }, " Global presence "),
                        createVNode("dl", { class: "mt-8 text-base text-gray-500" }, [
                          createVNode("p", { class: "text-lg font-montserrat text-blood" }, " Dubai Office "),
                          createVNode("div", null, [
                            createVNode("dt", { class: "sr-only" }, "Postal address"),
                            createVNode("dd", null, [
                              createVNode("p", null, "Office 2206, Clover Bay Tower"),
                              createVNode("p", null, "Marasi Drive, Business Bay"),
                              createVNode("p", null, "PO BOX 28129"),
                              createVNode("p", null, "Dubai, UAE")
                            ])
                          ]),
                          createVNode("div", { class: "mt-6" }, [
                            createVNode("dt", { class: "sr-only" }, "Phone number"),
                            createVNode("dd", { class: "flex" }, [
                              createVNode(unref(PhoneIcon), {
                                class: "h-6 w-6 flex-shrink-0 text-gray-400",
                                "aria-hidden": "true"
                              }),
                              createVNode("span", { class: "ml-3" }, "+971 (04) 225-5555")
                            ])
                          ]),
                          createVNode("div", { class: "mt-3" }, [
                            createVNode("dt", { class: "sr-only" }, "Email"),
                            createVNode("dd", { class: "flex" }, [
                              createVNode(unref(EnvelopeIcon), {
                                class: "h-6 w-6 flex-shrink-0 text-gray-400",
                                "aria-hidden": "true"
                              }),
                              createVNode("span", { class: "ml-3" }, "info@ticqc.ae")
                            ])
                          ])
                        ]),
                        createVNode("p", { class: "mt-6 text-base text-gray-500" }, [
                          createTextVNode(" Looking for careers? " + toDisplayString(" ") + " "),
                          createVNode("a", {
                            href: "#",
                            class: "font-medium text-gray-700 underline"
                          }, "View all job openings"),
                          createTextVNode(". ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white py-2 px-2 lg:col-span-4 lg:py-24 lg:px-4 xl:pl-6" }, [
                      createVNode("div", { class: "mx-auto max-w-lg lg:max-w-none" }, [
                        createVNode("div", { class: "map-container pl-0 xl-pl-24 w-full overflow-hidden" }, [
                          createVNode("img", {
                            src: _imports_0$3,
                            class: "object-cover"
                          }),
                          createVNode("div", {
                            class: "point dubai tippy pulse",
                            title: "Dubai"
                          }),
                          createVNode("div", {
                            class: "point abudhabi tippy",
                            title: "Abu Dhabi"
                          }),
                          createVNode("div", {
                            class: "point sulaimani tippy",
                            title: "Iraq"
                          }),
                          createVNode("div", {
                            class: "point cairo tippy",
                            title: "Egypt"
                          }),
                          createVNode("div", {
                            class: "point delhi tippy",
                            title: "India"
                          }),
                          createVNode("div", {
                            class: "point japan tippy",
                            title: "Japan"
                          }),
                          createVNode("div", {
                            class: "point south-africa tippy",
                            title: "South Africa"
                          }),
                          createVNode("div", {
                            class: "point kenya tippy",
                            title: "Kenya"
                          }),
                          createVNode("div", {
                            class: "point london tippy",
                            title: "United Kingdom"
                          }),
                          createVNode("div", {
                            class: "point nairobi tippy",
                            title: "Nairobi"
                          })
                        ])
                      ])
                    ])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/map.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c1549252"]]);
const map = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "newsletter",
  __ssrInlineRender: true,
  setup(__props) {
    const isos = [
      {
        name: "EIACI",
        role: "ISO for Quanlity Services",
        image: "/img/iso/iso-01.jpg"
      },
      {
        name: "EIACI",
        role: "ISO for Quanlity Services",
        image: "/img/iso/iso-02.jpg"
      },
      {
        name: "EIACI",
        role: "ISO for Quanlity Services",
        image: "/img/iso/iso-03.jpg"
      },
      {
        name: "EIACI",
        role: "ISO for Quanlity Services",
        image: "/img/iso/iso-04.jpg"
      }
    ];
    [
      {
        name: "Facebook",
        href: "#",
        icon: defineComponent({
          render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              "fill-rule": "evenodd",
              d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
              "clip-rule": "evenodd"
            })
          ])
        })
      },
      {
        name: "Instagram",
        href: "#",
        icon: defineComponent({
          render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              "fill-rule": "evenodd",
              d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
              "clip-rule": "evenodd"
            })
          ])
        })
      },
      {
        name: "Twitter",
        href: "#",
        icon: defineComponent({
          render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
            })
          ])
        })
      },
      {
        name: "GitHub",
        href: "#",
        icon: defineComponent({
          render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              "fill-rule": "evenodd",
              d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
              "clip-rule": "evenodd"
            })
          ])
        })
      },
      {
        name: "YouTube",
        href: "#",
        icon: defineComponent({
          render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              "fill-rule": "evenodd",
              d: "M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z",
              "clip-rule": "evenodd"
            })
          ])
        })
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ParalaxSlide = slide;
      const _component_HeadersFooter = _sfc_main$a;
      _push(ssrRenderComponent(_component_ParalaxSlide, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative h-full pt-8"${_scopeId}><div class="mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24"${_scopeId}><div class="h-full space-y-12"${_scopeId}><div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none"${_scopeId}><h2 class="text-3xl font-bold tracking-tight sm:text-4xl"${_scopeId}>ISO</h2><p class="text-xl text-gray-500"${_scopeId}>Odio nisi, lectus dis nulla. Ultrices maecenas vitae rutrum dolor ultricies donec risus sodales. Tempus quis et.</p></div><ul role="list" class="space-y-12 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8"${_scopeId}><!--[-->`);
            ssrRenderList(isos, (iso) => {
              _push2(`<li${_scopeId}><div class="space-y-4"${_scopeId}><div class="min-h-full aspect-w-1.2 aspect-h-2 shadow-md border border-blood"${_scopeId}><img class="rounded-lg object-cover shadow-lg"${ssrRenderAttr("src", iso.image)} alt=""${_scopeId}></div><div class="space-y-2"${_scopeId}><div class="space-y-1 text-lg font-medium leading-6"${_scopeId}><h3${_scopeId}>${ssrInterpolate(iso.name)}</h3><p class="text-blood"${_scopeId}>${ssrInterpolate(iso.role)}</p></div></div></div></li>`);
            });
            _push2(`<!--]--></ul></div></div>`);
            _push2(ssrRenderComponent(_component_HeadersFooter, { class: "absolute bottom-0 w-full" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative h-full pt-8" }, [
                createVNode("div", { class: "mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24" }, [
                  createVNode("div", { class: "h-full space-y-12" }, [
                    createVNode("div", { class: "space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none" }, [
                      createVNode("h2", { class: "text-3xl font-bold tracking-tight sm:text-4xl" }, "ISO"),
                      createVNode("p", { class: "text-xl text-gray-500" }, "Odio nisi, lectus dis nulla. Ultrices maecenas vitae rutrum dolor ultricies donec risus sodales. Tempus quis et.")
                    ]),
                    createVNode("ul", {
                      role: "list",
                      class: "space-y-12 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(isos, (iso) => {
                        return createVNode("li", {
                          key: iso.name
                        }, [
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", { class: "min-h-full aspect-w-1.2 aspect-h-2 shadow-md border border-blood" }, [
                              createVNode("img", {
                                class: "rounded-lg object-cover shadow-lg",
                                src: iso.image,
                                alt: ""
                              }, null, 8, ["src"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "space-y-1 text-lg font-medium leading-6" }, [
                                createVNode("h3", null, toDisplayString(iso.name), 1),
                                createVNode("p", { class: "text-blood" }, toDisplayString(iso.role), 1)
                              ])
                            ])
                          ])
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                createVNode(_component_HeadersFooter, { class: "absolute bottom-0 w-full" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/newsletter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const newsletter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _imports_0 = "" + globalThis.__publicAssetsURL("img/sectionteam.jpg");
const _sfc_main = {
  __name: "team",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(slide, mergeProps({ class: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="-mt-12 lg:grid lg:grid-cols-12 lg:gap-8 p-6 z-10"${_scopeId}><div class="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left"${_scopeId}><h1 class="text-4xl font-montserrat font-normal tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"${_scopeId}><span class="inline"${_scopeId}>Contact</span> ${ssrInterpolate(" ")} <span class="text-blood inline"${_scopeId}> Us</span></h1><p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"${_scopeId}> For more information on our products and services and to request a free quotation, please get in touch using the below form and our team will be in touch.\xA0 </p><div class="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left"${_scopeId}><form action="#" method="POST" class="mt-3 sm:flex sm:flex-col space-y-3"${_scopeId}><label for="name" class="sr-only"${_scopeId}>Name</label><input type="text" name="name" id="name" class="pl-2 block w-full border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1" placeholder="Enter your name"${_scopeId}><label for="phone" class="sr-only"${_scopeId}>Phone</label><input type="text" name="phone" id="phone" class="pl-2 block w-full border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1" placeholder="Contact number"${_scopeId}><label for="email" class="sr-only"${_scopeId}>Email</label><input type="email" name="email" id="email" class="pl-2 block w-full border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1" placeholder="Enter your email"${_scopeId}><button type="submit" class="mt-3 border border-transparent bg-zinc-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:inline-flex w-fit sm:flex-shrink-0 sm:items-center"${_scopeId}> Send me free quotation </button></form></div></div><div class="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center"${_scopeId}><div class="block lg:hidden relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"${_scopeId}><button type="button" class="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"${_scopeId}><div class="abolute inset-0 bg-zinc-900 bg-opacity-20 z-10"${_scopeId}></div><img class="w-full overlay"${ssrRenderAttr("src", _imports_0)} alt=""${_scopeId}></button></div></div></div><div class="hidden lg:block absolute top-0"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="" class="h-screen w-screen object-cover"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "-mt-12 lg:grid lg:grid-cols-12 lg:gap-8 p-6 z-10" }, [
                createVNode("div", { class: "sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left" }, [
                  createVNode("h1", { class: "text-4xl font-montserrat font-normal tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl" }, [
                    createVNode("span", { class: "inline" }, "Contact"),
                    createTextVNode(" " + toDisplayString(" ") + " "),
                    createVNode("span", { class: "text-blood inline" }, " Us")
                  ]),
                  createVNode("p", { class: "mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl" }, " For more information on our products and services and to request a free quotation, please get in touch using the below form and our team will be in touch.\xA0 "),
                  createVNode("div", { class: "mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left" }, [
                    createVNode("form", {
                      action: "#",
                      method: "POST",
                      class: "mt-3 sm:flex sm:flex-col space-y-3"
                    }, [
                      createVNode("label", {
                        for: "name",
                        class: "sr-only"
                      }, "Name"),
                      createVNode("input", {
                        type: "text",
                        name: "name",
                        id: "name",
                        class: "pl-2 block w-full border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1",
                        placeholder: "Enter your name"
                      }),
                      createVNode("label", {
                        for: "phone",
                        class: "sr-only"
                      }, "Phone"),
                      createVNode("input", {
                        type: "text",
                        name: "phone",
                        id: "phone",
                        class: "pl-2 block w-full border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1",
                        placeholder: "Contact number"
                      }),
                      createVNode("label", {
                        for: "email",
                        class: "sr-only"
                      }, "Email"),
                      createVNode("input", {
                        type: "email",
                        name: "email",
                        id: "email",
                        class: "pl-2 block w-full border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1",
                        placeholder: "Enter your email"
                      }),
                      createVNode("button", {
                        type: "submit",
                        class: "mt-3 border border-transparent bg-zinc-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:inline-flex w-fit sm:flex-shrink-0 sm:items-center"
                      }, " Send me free quotation ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center" }, [
                  createVNode("div", { class: "block lg:hidden relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md" }, [
                    createVNode("button", {
                      type: "button",
                      class: "relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }, [
                      createVNode("div", { class: "abolute inset-0 bg-zinc-900 bg-opacity-20 z-10" }),
                      createVNode("img", {
                        class: "w-full overlay",
                        src: _imports_0,
                        alt: ""
                      })
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "hidden lg:block absolute top-0" }, [
                createVNode("img", {
                  src: _imports_0,
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/team.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const team = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));

export { NewHeader as N, _imports_0$3 as _, _sfc_main$9 as a, _sfc_main$7 as b, _sfc_main$3 as c, __nuxt_component_3 as d, _sfc_main$5 as e, _sfc_main$4 as f, _sfc_main as g, __nuxt_component_7 as h, _sfc_main$1 as i, slide$1 as j, about as k, categories as l, fetures as m, hero as n, map as o, parallax as p, newsletter as q, slide as s, team as t };
//# sourceMappingURL=team.cb2fc7c3.mjs.map
