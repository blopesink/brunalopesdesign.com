/* BRUNA LOPES DESIGN — interactions
   mouse parallax (hero collage) + scroll parallax + scroll-scale reveal
   + reveal on scroll */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- mouse parallax on hero collage ---- */
/* .hero (index) or .page-hero (design/uiux split hero) — only one exists
   per page, so a single mousemove listener covers whichever is present */
const hero = document.querySelector(".hero, .page-hero");
const depthItems = document.querySelectorAll("[data-depth]");
const heroPhotoImg = document.getElementById("hero-photo-img");

if (hero && !prefersReduced) {
  let targetX = 0, targetY = 0, curX = 0, curY = 0;

  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    targetX = (e.clientX - r.left) / r.width - 0.5;
    targetY = (e.clientY - r.top) / r.height - 0.5;
  });

  hero.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  (function animate() {
    const dx = targetX - curX;
    const dy = targetY - curY;
    // only touch styles while actually moving, so idle frames cost nothing
    if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
      curX += dx * 0.06;
      curY += dy * 0.06;
      depthItems.forEach((el) => {
        const d = parseFloat(el.dataset.depth);
        el.style.translate = `${-curX * d * 120}px ${-curY * d * 90}px`;
      });
      // photo slides WITHIN the fixed blob windows (user units, not px)
      if (heroPhotoImg) {
        heroPhotoImg.setAttribute(
          "transform",
          `translate(${(curX * 150).toFixed(1)} ${(curY * 130).toFixed(1)})`
        );
      }
    }
    requestAnimationFrame(animate);
  })();
}

/* ---- scroll parallax for decorative images ---- */
const speedItems = document.querySelectorAll("[data-speed]");

if (speedItems.length && !prefersReduced) {
  const onScroll = () => {
    const vh = window.innerHeight;
    speedItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - vh / 2);
      el.style.translate = `0 ${progress * parseFloat(el.dataset.speed)}px`;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---- scroll-scrubbed scale reveal (hero collage pieces, manifesto bird) ----
   data-scale-in="<start>" / data-scale-to="<end, default 1>" — each element
   scales independently at its own rate/direction (e.g. the hero's bezier
   connectors grow more than the photo blob, the pink blobs shrink slightly).
   data-drift-x="<px>" (manifesto bird) slides in from that offset to 0.
   Two triggers:
   - data-scale-trigger="page": driven by absolute scrollY over
     data-scale-range px — for hero pieces, already on screen at load, so
     "has this scrolled into view" is never true for them.
   - default: driven by how far the element has scrolled up into the
     viewport (bottom half), for elements revealed further down the page. */
const scaleItems = document.querySelectorAll("[data-scale-in], [data-drift-x], [data-drift-y]");

if (scaleItems.length && !prefersReduced) {
  // offsetTop/offsetParent reflect layout position and ignore `transform`,
  // unlike getBoundingClientRect — reading the rect here would feed the
  // scale this function computes back into itself (scaling up shrinks
  // rect.top, which would push progress toward 1 even faster, runaway).
  const staticTop = (el) => {
    let top = 0;
    for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
    return top;
  };

  const onScaleScroll = () => {
    const vh = window.innerHeight;
    scaleItems.forEach((el) => {
      let progress;
      if (el.dataset.scaleTrigger === "page") {
        const range = parseFloat(el.dataset.scaleRange) || 400;
        progress = window.scrollY / range;
      } else {
        const top = staticTop(el) - window.scrollY;
        progress = (vh - top) / (vh * 0.5);
      }
      progress = Math.min(Math.max(progress, 0), 1);
      if (el.dataset.scaleIn !== undefined) {
        const start = parseFloat(el.dataset.scaleIn);
        const end = el.dataset.scaleTo !== undefined ? parseFloat(el.dataset.scaleTo) : 1;
        el.style.setProperty("--scale-in", start + progress * (end - start));
      }
      // scroll-driven drift on X and/or Y (e.g. the manifesto bird glides
      // diagonally left+up; the two "areas" blobs slide apart→together).
      if (el.dataset.driftX !== undefined || el.dataset.driftY !== undefined) {
        // optional: spread the drift over more scroll for a slower glide.
        // data-drift-span is the fraction of the viewport it travels across
        // (default 0.5 — larger = slower/gentler). data-drift-x-span /
        // data-drift-y-span override it per axis (e.g. the areas blocks ease
        // in their horizontal desktop drift slower than their vertical
        // mobile drift), falling back to data-drift-span, then progress.
        const easedFor = (span) => {
          let p = progress;
          if (span !== undefined) {
            const top = staticTop(el) - window.scrollY;
            p = Math.min(Math.max((vh - top) / (vh * parseFloat(span)), 0), 1);
          }
          // smoothstep easing → soft acceleration in and deceleration out
          return p * p * (3 - 2 * p);
        };
        // each axis interpolates start → end (end defaults to 0)
        if (el.dataset.driftX !== undefined) {
          const eased = easedFor(el.dataset.driftXSpan ?? el.dataset.driftSpan);
          const startX = parseFloat(el.dataset.driftX);
          const endX = el.dataset.driftEnd !== undefined ? parseFloat(el.dataset.driftEnd) : 0;
          el.style.setProperty("--drift-x", `${endX + (startX - endX) * (1 - eased)}px`);
        }
        if (el.dataset.driftY !== undefined) {
          const eased = easedFor(el.dataset.driftYSpan ?? el.dataset.driftSpan);
          const startY = parseFloat(el.dataset.driftY);
          const endY = el.dataset.driftYEnd !== undefined ? parseFloat(el.dataset.driftYEnd) : 0;
          el.style.setProperty("--drift-y", `${endY + (startY - endY) * (1 - eased)}px`);
        }
      }
    });
  };
  window.addEventListener("scroll", onScaleScroll, { passive: true });
  onScaleScroll();
}

/* ---- expandable résumé (home) ---- */
const resumeToggle = document.getElementById("resume-toggle");
const resumeMore = document.getElementById("resume-more");

if (resumeToggle && resumeMore) {
  resumeToggle.addEventListener("click", () => {
    const open = resumeMore.classList.toggle("open");
    resumeToggle.setAttribute("aria-expanded", String(open));
    resumeToggle.innerHTML = window.i18n
      ? window.i18n.t(open ? "idx.work.toggle_open" : "idx.work.toggle_closed")
      : open
        ? 'Fold the résumé <span class="px">↑</span>'
        : 'Read the résumé <span class="px">↓</span>';
    if (open) {
      // reveal blocks inside are outside the viewport when collapsed;
      // mark them visible so the IO animation doesn't hide them
      resumeMore.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    }
  });

  // index.html#curriculo arrives with the résumé already open (link from the proposal page)
  if (location.hash === "#curriculo") {
    resumeToggle.click();
    // scroll after load (images/fonts shift layout) and win over scroll restoration
    history.scrollRestoration = "manual";
    addEventListener("load", () => document.getElementById("resume").scrollIntoView());
  }
}

/* ---- reveal on scroll ---- */
const revealItems = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((el) => io.observe(el));

/* ---- seamless, gapless marquee ----
   two identical halves + translateX(-50%) only loops without a gap if ONE half
   is wider than the viewport. Clone the template group until that holds, then
   mirror the whole half — so it stays infinite at any screen width. */
const marquee = document.querySelector(".marquee");
if (marquee && !prefersReduced) {
  const track = marquee.querySelector(".marquee-track");
  const buildMarquee = () => {
    // collapse back to a single template group
    const groups = track.querySelectorAll(".marquee-group");
    for (let i = groups.length - 1; i >= 1; i--) groups[i].remove();
    const base = track.querySelector(".marquee-group");
    if (!base) return;
    // grow one half past the viewport (+ a spare group for rounding)
    let guard = 0;
    while (track.scrollWidth < marquee.offsetWidth && guard++ < 40) {
      track.appendChild(base.cloneNode(true));
    }
    track.appendChild(base.cloneNode(true));
    // mirror the half so the second half is identical → -50% is seamless
    [...track.children].forEach((n) => track.appendChild(n.cloneNode(true)));
    // constant pixel speed regardless of how many clones were needed (~80px/s)
    track.style.animationDuration = (track.scrollWidth / 2 / 80).toFixed(1) + "s";
  };
  buildMarquee();
  let marqueeResize;
  window.addEventListener("resize", () => {
    clearTimeout(marqueeResize);
    marqueeResize = setTimeout(buildMarquee, 200);
  }, { passive: true });
}
