// cookie-consent init
window.addEventListener("load", function() {
  window.cookieconsent.initialise({
    palette: {
      popup: {
        background: "#252e39"
      },
      button: {
        background: "#17a2b8",
        text: "#000000"
      }
    },
    theme: "classic",
    type: "opt-out"
  });
});
