/* script.js - para sa index.html at about.html ni Rai Emir */
(function () {
  "use strict";

  // 1. Sabihin sa CSS na gumagana ang JavaScript
  document.documentElement.classList.add("js");

  // 2. Anino at linya sa menu kapag nag-scroll
  var nav = document.querySelector(".nav-container");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
    if (toTop) toTop.classList.toggle("show", window.scrollY > 400);
  }

  // 3. Button pabalik sa itaas
  var toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = "&uarr;";
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(toTop);

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 4. Lumilitaw ang mga card habang nag-i-scroll
  var targets = document.querySelectorAll(
    ".project, .about-card, .entry-card, .contact-card, .outside-card, .section-header, .skills li"
  );
  targets.forEach(function (el, i) {
    el.classList.add("reveal");
    // bahagyang pagkakasunod-sunod para sa mga magkatabing card
    el.style.transitionDelay = (i % 4) * 70 + "ms";
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("in"); });
  }

  // 5. Kapag wala pa ang images/me.jpg, initials muna ang lalabas
  var photo = document.querySelector("img.me");
  if (photo) {
    var showInitials = function () {
      var box = document.createElement("div");
      box.className = "me me-fallback";
      box.setAttribute("role", "img");
      box.setAttribute("aria-label", photo.alt);
      box.textContent = "RE";
      photo.replaceWith(box);
    };
    photo.addEventListener("error", showInitials);
    if (photo.complete && photo.naturalWidth === 0) showInitials();
  }

  // 6. Taon sa footer ay awtomatikong napapalitan
  var foot = document.querySelector(".footer-content p");
  if (foot) {
    foot.innerHTML = foot.innerHTML.replace("2026", new Date().getFullYear());
  }

  // 7. Demo na contact form (hindi ito nagpapadala ng totoong email)
  var form = document.querySelector("#contactForm");
  var formMessage = document.querySelector("#formMessage");
  if (form && formMessage) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      formMessage.textContent =
        "Thank you! Your message was received by this demo form.";
      form.reset();
    });
  }
})();