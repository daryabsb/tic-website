import _sfc_main$1 from './header.01e51ad3.mjs';
import _sfc_main$2 from './offices.7902760e.mjs';
import _sfc_main$3 from './footer.708c07f4.mjs';
import { defineComponent, h, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';
import './tic-logo-01.c552b047.mjs';
import '@headlessui/vue';

const _sfc_main = {
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    ({
      solutions: [
        { name: "Marketing", href: "#" },
        { name: "Analytics", href: "#" },
        { name: "Commerce", href: "#" },
        { name: "Insights", href: "#" }
      ],
      support: [
        { name: "Pricing", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Guides", href: "#" },
        { name: "API Status", href: "#" }
      ],
      company: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Jobs", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partners", href: "#" }
      ],
      legal: [
        { name: "Claim", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" }
      ],
      social: [
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
          name: "Dribbble",
          href: "#",
          icon: defineComponent({
            render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
              h("path", {
                "fill-rule": "evenodd",
                d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z",
                "clip-rule": "evenodd"
              })
            ])
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadersHeader = _sfc_main$1;
      const _component_AboutOffices = _sfc_main$2;
      const _component_HeadersFooter = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_HeadersHeader, null, null, _parent));
      _push(`<main class="overflow-hidden"><div class="bg-warm-gray-50"><div class="py-16 lg:py-20"><div class="relative z-10 mx-auto max-w-7xl pl-4 pr-8 sm:px-6 lg:px-8"><h1 class="text-4xl font-bold tracking-tight text-warm-gray-900 sm:text-5xl lg:text-6xl">Get in touch</h1></div></div></div><section class="relative bg-white" aria-labelledby="contact-heading"><div class="absolute h-1/2 w-full bg-warm-gray-50" aria-hidden="true"></div><div class="relative mx-auto max-w-7xl px-6 lg:px-8"><svg class="absolute top-0 right-0 z-0 -translate-y-16 translate-x-1/2 transform sm:translate-x-1/4 md:-translate-y-24 lg:-translate-y-72" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true"><defs><pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" class="text-warm-gray-200" fill="currentColor"></rect></pattern></defs><rect width="404" height="384" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"></rect></svg></div><div class="mx-auto max-w-7xl px-6 lg:px-8"><div class="relative bg-white shadow-xl"><h2 id="contact-heading" class="sr-only">Contact us</h2><div class="grid grid-cols-1 lg:grid-cols-3"><div class="relative overflow-hidden bg-gradient-to-b from-blood to-red-500 py-10 px-6 sm:px-10 xl:p-12"><div class="pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true"><svg class="absolute inset-0 h-full w-full" width="343" height="388" viewBox="0 0 343 388" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z" fill="url(#linear1)" fill-opacity=".1"></path><defs><linearGradient id="linear1" x1="254.553" y1="107.554" x2="961.66" y2="814.66" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs></svg></div><div class="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden" aria-hidden="true"><svg class="absolute inset-0 h-full w-full" width="359" height="339" viewBox="0 0 359 339" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z" fill="url(#linear2)" fill-opacity=".1"></path><defs><linearGradient id="linear2" x1="192.553" y1="28.553" x2="899.66" y2="735.66" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs></svg></div><div class="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block" aria-hidden="true"><svg class="absolute inset-0 h-full w-full" width="160" height="678" viewBox="0 0 160 678" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z" fill="url(#linear3)" fill-opacity=".1"></path><defs><linearGradient id="linear3" x1="192.553" y1="325.553" x2="899.66" y2="1032.66" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs></svg></div><h3 class="text-lg font-medium text-white">Contact information</h3><p class="mt-6 max-w-3xl text-base text-teal-50">Office 2206, Clover Bay Tower, Marasi Drive, Business Bay, Dubai, UAE.</p><p class="mt-6 max-w-3xl text-base text-teal-50">PO BOX 28129</p><dl class="mt-8 space-y-6"><dt><span class="sr-only">Phone number</span></dt><dd class="flex text-base text-teal-50">`);
      _push(ssrRenderComponent(unref(PhoneIcon), {
        class: "h-6 w-6 flex-shrink-0 text-teal-200",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="ml-3">+971 4 225 5555</span></dd><dt><span class="sr-only">Email</span></dt><dd class="flex text-base text-teal-50">`);
      _push(ssrRenderComponent(unref(EnvelopeIcon), {
        class: "h-6 w-6 flex-shrink-0 text-teal-200",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="ml-3">info@ticqc.ae</span></dd></dl><dl class="mt-48 space-y-6"><dt><p class="mt-6 max-w-3xl text-base text-teal-50">Help line</p><p class="max-w-3xl text-base text-teal-50">An interested party can make inquiries, complaints or feedback about the Compliance Code via our listed helpline</p></dt><dt><span class="sr-only">Help line</span></dt><dd class="flex text-base text-teal-50">`);
      _push(ssrRenderComponent(unref(PhoneIcon), {
        class: "h-6 w-6 flex-shrink-0 text-teal-200",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="ml-3">+971 56 410 6001</span></dd><dt><span class="sr-only">Email</span></dt><dd class="flex text-base text-teal-50">`);
      _push(ssrRenderComponent(unref(EnvelopeIcon), {
        class: "h-6 w-6 flex-shrink-0 text-teal-200",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="ml-3">help@ticqc.ae</span></dd></dl></div><div class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12"><h3 class="text-lg font-medium text-warm-gray-900">Send us a message</h3><form action="#" method="POST" class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"><div><label for="first-name" class="block text-sm font-medium text-warm-gray-900">First name</label><div class="mt-1"><input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"></div></div><div><label for="last-name" class="block text-sm font-medium text-warm-gray-900">Last name</label><div class="mt-1"><input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"></div></div><div><label for="email" class="block text-sm font-medium text-warm-gray-900">Email</label><div class="mt-1"><input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"></div></div><div><div class="flex justify-between"><label for="phone" class="block text-sm font-medium text-warm-gray-900">Phone</label><span id="phone-optional" class="text-sm text-warm-gray-500">Optional</span></div><div class="mt-1"><input type="text" name="phone" id="phone" autocomplete="tel" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" aria-describedby="phone-optional"></div></div><div class="sm:col-span-2"><label for="subject" class="block text-sm font-medium text-warm-gray-900">Subject</label><div class="mt-1"><input type="text" name="subject" id="subject" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"></div></div><div class="sm:col-span-2"><div class="flex justify-between"><label for="message" class="block text-sm font-medium text-warm-gray-900">Message</label><span id="message-max" class="text-sm text-warm-gray-500">Max. 500 characters</span></div><div class="mt-1"><textarea id="message" name="message" rows="4" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" aria-describedby="message-max"></textarea></div></div><div class="sm:col-span-2 sm:flex sm:justify-end"><button type="submit" class="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto">Submit</button></div></form></div></div></div></div></section><section>`);
      _push(ssrRenderComponent(_component_AboutOffices, null, null, _parent));
      _push(`</section></main>`);
      _push(ssrRenderComponent(_component_HeadersFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact.ef8c4998.mjs.map
