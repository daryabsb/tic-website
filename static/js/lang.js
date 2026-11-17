// The utility bar's language select (includes/language_switcher.html): the browser
// follows the chosen option's URL. A file, not an inline script: the CSP allows only
// scripts from 'self' (master plan 12; T32).
document.querySelectorAll("[data-lang-switch] select").forEach(function (select) {
  select.addEventListener("change", function () {
    if (select.value) {
      window.location.href = select.value;
    }
  });
});
