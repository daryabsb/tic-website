import { ref, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createTextVNode, Transition, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { d as data, _ as _imports_0 } from './tic-logo-01.c552b047.mjs';
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, TabGroup, TabList, Tab, TabPanels, TabPanel, PopoverGroup, Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { XMarkIcon, Bars3Icon, MagnifyingGlassIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline';

const _sfc_main = {
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const navigation = ref(data);
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white w-full global sticky" }, _attrs))}>`);
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
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex px-4 pt-5 pb-2"${_scopeId4}><button type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"${_scopeId4}><span class="sr-only"${_scopeId4}>Close menu</span>`);
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
                                                  _push8(`<button class="${ssrRenderClass([selected ? "text-blood border-blood" : "text-gray-900 border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"])}"${_scopeId7}>${ssrInterpolate(category.name)}</button>`);
                                                } else {
                                                  return [
                                                    createVNode("button", {
                                                      class: [selected ? "text-blood border-blood" : "text-gray-900 border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
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
                                                    class: [selected ? "text-blood border-blood" : "text-gray-900 border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
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
                                                    _push8(`<div class="group relative"${_scopeId7}><div class="h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75"${_scopeId7}><img${ssrRenderAttr("src", item.image)} class="h-full w-full object-cover object-center"${_scopeId7}></div><a${ssrRenderAttr("href", category.name === "Industries" ? `/industries/${item.id}` : `/services/${item.id}`)} class="mt-6 block text-sm font-medium text-gray-900"${_scopeId7}><span class="absolute inset-0 z-10" aria-hidden="true"${_scopeId7}></span> ${ssrInterpolate(item.title)}</a><p aria-hidden="true" class="mt-1 text-sm text-gray-500"${_scopeId7}>Shop now</p></div>`);
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
                                                            class: "mt-6 block text-sm font-medium text-gray-900"
                                                          }, [
                                                            createVNode("span", {
                                                              class: "absolute inset-0 z-10",
                                                              "aria-hidden": "true"
                                                            }),
                                                            createTextVNode(" " + toDisplayString(item.title), 1)
                                                          ], 8, ["href"]),
                                                          createVNode("p", {
                                                            "aria-hidden": "true",
                                                            class: "mt-1 text-sm text-gray-500"
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
                                                          class: "mt-6 block text-sm font-medium text-gray-900"
                                                        }, [
                                                          createVNode("span", {
                                                            class: "absolute inset-0 z-10",
                                                            "aria-hidden": "true"
                                                          }),
                                                          createTextVNode(" " + toDisplayString(item.title), 1)
                                                        ], 8, ["href"]),
                                                        createVNode("p", {
                                                          "aria-hidden": "true",
                                                          class: "mt-1 text-sm text-gray-500"
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
                                                    class: [selected ? "text-blood border-blood" : "text-gray-900 border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
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
                                                        class: "mt-6 block text-sm font-medium text-gray-900"
                                                      }, [
                                                        createVNode("span", {
                                                          class: "absolute inset-0 z-10",
                                                          "aria-hidden": "true"
                                                        }),
                                                        createTextVNode(" " + toDisplayString(item.title), 1)
                                                      ], 8, ["href"]),
                                                      createVNode("p", {
                                                        "aria-hidden": "true",
                                                        class: "mt-1 text-sm text-gray-500"
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
                                    class: "-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400",
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
                                                  class: [selected ? "text-blood border-blood" : "text-gray-900 border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
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
                                                      class: "mt-6 block text-sm font-medium text-gray-900"
                                                    }, [
                                                      createVNode("span", {
                                                        class: "absolute inset-0 z-10",
                                                        "aria-hidden": "true"
                                                      }),
                                                      createTextVNode(" " + toDisplayString(item.title), 1)
                                                    ], 8, ["href"]),
                                                    createVNode("p", {
                                                      "aria-hidden": "true",
                                                      class: "mt-1 text-sm text-gray-500"
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
                          createVNode(unref(DialogPanel), { class: "relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex px-4 pt-5 pb-2" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400",
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
                                                class: [selected ? "text-blood border-blood" : "text-gray-900 border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
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
                                                    class: "mt-6 block text-sm font-medium text-gray-900"
                                                  }, [
                                                    createVNode("span", {
                                                      class: "absolute inset-0 z-10",
                                                      "aria-hidden": "true"
                                                    }),
                                                    createTextVNode(" " + toDisplayString(item.title), 1)
                                                  ], 8, ["href"]),
                                                  createVNode("p", {
                                                    "aria-hidden": "true",
                                                    class: "mt-1 text-sm text-gray-500"
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
                          createVNode(unref(DialogPanel), { class: "relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex px-4 pt-5 pb-2" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400",
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
                                                class: [selected ? "text-blood border-blood" : "text-gray-900 border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
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
                                                    class: "mt-6 block text-sm font-medium text-gray-900"
                                                  }, [
                                                    createVNode("span", {
                                                      class: "absolute inset-0 z-10",
                                                      "aria-hidden": "true"
                                                    }),
                                                    createTextVNode(" " + toDisplayString(item.title), 1)
                                                  ], 8, ["href"]),
                                                  createVNode("p", {
                                                    "aria-hidden": "true",
                                                    class: "mt-1 text-sm text-gray-500"
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
                        createVNode(unref(DialogPanel), { class: "relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex px-4 pt-5 pb-2" }, [
                              createVNode("button", {
                                type: "button",
                                class: "-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400",
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
                                              class: [selected ? "text-blood border-blood" : "text-gray-900 border-transparent", "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"]
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
                                                  class: "mt-6 block text-sm font-medium text-gray-900"
                                                }, [
                                                  createVNode("span", {
                                                    class: "absolute inset-0 z-10",
                                                    "aria-hidden": "true"
                                                  }),
                                                  createTextVNode(" " + toDisplayString(item.title), 1)
                                                ], 8, ["href"]),
                                                createVNode("p", {
                                                  "aria-hidden": "true",
                                                  class: "mt-1 text-sm text-gray-500"
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
      _push(`<header class="relative"><nav aria-label="Top"><div class="bg-white"><div class=""><div class="border-b border-gray-200"><div class="flex mx-2 md:mx-4 xl:mx-6 h-24 xl:py-2 items-center justify-evenly"><div class="hidden lg:flex lg:flex-1 lg:items-center xl:my-3 ml-32"><a href="/"><span class="sr-only">Your Company</span><img class="sm:h-16 xl:h-20 w-auto"${ssrRenderAttr("src", _imports_0)} alt=""></a></div><div class="hidden h-full lg:flex">`);
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
                        open2 ? "border-blood text-blood" : " border-transparent text-zinc-900 hover:text-zinc-600",
                        "relative z-10 -mb-px flex items-center border-b-2 pt-px text-xl focus:outline-none ",
                        "uppercase font-medium transition-colors duration-200 ease-out"
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
                            _push4(`<div class="group relative"${_scopeId3}><div class="h-32 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75 object-cover"${_scopeId3}><img${ssrRenderAttr("src", item.image)} class="h-full w-full object-cover"${_scopeId3}></div><a${ssrRenderAttr("href", `/${category.name.toLocaleLowerCase()}/${item.id}`)} class="mt-4 block font-medium text-gray-900"${_scopeId3}><span class="absolute inset-0 z-10" aria-hidden="true"${_scopeId3}></span> ${ssrInterpolate(item.title)}</a><p aria-hidden="true" class="mt-1"${_scopeId3}>Contact now</p></div>`);
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
                                        class: "mt-4 block font-medium text-gray-900"
                                      }, [
                                        createVNode("span", {
                                          class: "absolute inset-0 z-10",
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
                            open2 ? "border-blood text-blood" : " border-transparent text-zinc-900 hover:text-zinc-600",
                            "relative z-10 -mb-px flex items-center border-b-2 pt-px text-xl focus:outline-none ",
                            "uppercase font-medium transition-colors duration-200 ease-out"
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
                                          class: "mt-4 block font-medium text-gray-900"
                                        }, [
                                          createVNode("span", {
                                            class: "absolute inset-0 z-10",
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
              _push2(`<a${ssrRenderAttr("href", page.href)} class="flex items-center uppercase text-xl font-medium text-zinc-900 hover:text-gray-800"${_scopeId}>${ssrInterpolate(page.name)}</a>`);
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
                            open2 ? "border-blood text-blood" : " border-transparent text-zinc-900 hover:text-zinc-600",
                            "relative z-10 -mb-px flex items-center border-b-2 pt-px text-xl focus:outline-none ",
                            "uppercase font-medium transition-colors duration-200 ease-out"
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
                                          class: "mt-4 block font-medium text-gray-900"
                                        }, [
                                          createVNode("span", {
                                            class: "absolute inset-0 z-10",
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
                    class: "flex items-center uppercase text-xl font-medium text-zinc-900 hover:text-gray-800"
                  }, toDisplayString(page.name), 9, ["href"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-1 items-center lg:hidden mx-4"><button type="button" class="-ml-2 rounded-md bg-white p-2 text-gray-400"><span class="sr-only">Open menu</span>`);
      _push(ssrRenderComponent(unref(Bars3Icon), {
        class: "h-6 w-6",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</button><a href="#" class="ml-2 p-2 text-gray-400 hover:text-gray-500"><span class="sr-only">Search</span>`);
      _push(ssrRenderComponent(unref(MagnifyingGlassIcon), {
        class: "h-6 w-6",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</a></div><a href="/" class="lg:hidden"><span class="sr-only">Your Company</span><img${ssrRenderAttr("src", _imports_0)} alt="" class="h-12 w-auto"></a><div class="flex flex-1 items-center justify-end lg:hidden"><div class="flex items-center lg:ml-8"><a href="#" class="p-2 text-gray-400 hover:text-gray-500 lg:hidden"><span class="sr-only">Help</span>`);
      _push(ssrRenderComponent(unref(QuestionMarkCircleIcon), {
        class: "h-6 w-6",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</a></div></div></div></div></div></div></nav></header></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/headers/header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=header.01e51ad3.mjs.map
