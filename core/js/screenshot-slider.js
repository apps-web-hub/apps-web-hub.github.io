(function () {
  function setup(root) {
    const track = root.querySelector("[data-screenshot-track]");
    const previous = root.querySelector("[data-screenshot-prev]");
    const next = root.querySelector("[data-screenshot-next]");
    if (!track || !previous || !next) return;
    function update() {
      const max = track.scrollWidth - track.clientWidth;
      previous.classList.toggle("hidden", track.scrollLeft <= 1);
      next.classList.toggle("hidden", max <= 1 || max - track.scrollLeft <= 1);
    }
    function move(direction) {
      const card = track.firstElementChild;
      if (!(card instanceof HTMLElement)) return;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
      track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
    }
    previous.addEventListener("click", function () { move(-1); });
    next.addEventListener("click", function () { move(1); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
  document.querySelectorAll("[data-screenshot-slider]").forEach(setup);
})();
