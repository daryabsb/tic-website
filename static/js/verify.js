// Verify (T19, master plan 06): send the check without a page load and put the answer
// in place. The server answers the same "HX-Request" header HTMX would send, with the
// block of verify/verify_block.html. Without this script the form is a plain post.
// When the answer asks for the hCaptcha, its script is loaded once and the new widget
// is drawn. Listeners sit on the document, so they work after each swap.

const HCAPTCHA = "https://js.hcaptcha.com/1/api.js?render=explicit&recaptchacompat=off";
let loading = null;

function hcaptchaReady() {
  if (window.hcaptcha) return Promise.resolve(window.hcaptcha);
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = HCAPTCHA;
      script.async = true;
      script.onload = () => resolve(window.hcaptcha);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return loading;
}

function drawCaptcha(root) {
  const box = root.querySelector("[data-captcha]");
  if (!box || box.dataset.drawn) return;
  hcaptchaReady().then((hcaptcha) => {
    if (!hcaptcha || box.dataset.drawn) return;
    box.dataset.drawn = "1";
    hcaptcha.render(box, { sitekey: box.dataset.sitekey });
  }).catch(() => {});
}

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-verify-form]");
  if (!form || !window.fetch) return;
  event.preventDefault();
  const button = form.querySelector("button[type=submit]");
  if (button) button.disabled = true;
  let response;
  try {
    response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "HX-Request": "true" },
      credentials: "same-origin",
    });
  } catch (error) {
    form.submit();
    return;
  }
  if (!response.ok && response.status !== 429) {
    form.submit();
    return;
  }
  const holder = document.createElement("div");
  holder.innerHTML = await response.text();
  const fresh = holder.querySelector("[data-verify]");
  const current = document.querySelector("[data-verify]");
  if (!fresh || !current) {
    form.submit();
    return;
  }
  current.replaceWith(fresh);
  drawCaptcha(fresh);
  const input = fresh.querySelector("#verify-number");
  const result = fresh.querySelector(".verify__head");
  (result || input)?.setAttribute("tabindex", "-1");
  (result || input)?.focus();
});

drawCaptcha(document);
