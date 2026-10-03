document.documentElement.classList.add("js");

const trackEvent = (name, parameters = {}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, parameters);
  }
};

const navToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector("#site-nav");

if (navToggle && navigation) {
  const closeNavigation = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navigation.classList.toggle("is-open", willOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeNavigation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });
}

document.addEventListener("click", (event) => {
  const trackedElement = event.target.closest("[data-ga-event]");
  if (!trackedElement) {
    return;
  }

  trackEvent(trackedElement.dataset.gaEvent, {
    event_label: trackedElement.dataset.gaLabel || "",
    link_url: trackedElement.href || ""
  });
});

const lightbox = document.querySelector("#project-lightbox");

if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("#lightbox-caption");
  const closeButton = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll("[data-lightbox-alt]").forEach((button) => {
    button.addEventListener("click", () => {
      const thumbnail = button.querySelector("img");

      lightboxImage.src = thumbnail.src.replace("-thumb.jpg", "-full.jpg");
      lightboxImage.alt = button.dataset.lightboxAlt;
      lightboxCaption.textContent = button.dataset.lightboxCaption;
      lightbox.showModal();
    });
  });

  closeButton.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });
}

const estimateForm = document.querySelector("#estimate-form");

if (estimateForm) {
  let formStarted = false;
  const serviceField = estimateForm.elements.service;
  const requestedService = new URLSearchParams(window.location.search).get("service");

  if (requestedService) {
    const matchingOption = [...serviceField.options].find((option) => {
      const slug = option.value.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replaceAll(/^-|-$/g, "");
      return slug === requestedService;
    });

    if (matchingOption) {
      serviceField.value = matchingOption.value;
    }
  }

  estimateForm.addEventListener("input", () => {
    if (!formStarted) {
      formStarted = true;
      trackEvent("form_start", { form_name: "estimate_request" });
    }
  });

  estimateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!estimateForm.reportValidity()) {
      return;
    }

    const values = new FormData(estimateForm);
    const fullName = `${values.get("firstName")} ${values.get("lastName")}`;
    const body = [
      "Hello Oaktree Landscaping,",
      "",
      "I would like to request a landscaping estimate.",
      "",
      `Name: ${fullName}`,
      `Email: ${values.get("email")}`,
      `Telephone: ${values.get("telephone")}`,
      `Service of interest: ${values.get("service") || "Not specified"}`,
      "",
      "Project details:",
      values.get("message"),
      "",
      "Thank you."
    ].join("\n");
    const mailtoUrl = `mailto:oaktreelandscaper@gmail.com?subject=${encodeURIComponent(values.get("subject"))}&body=${encodeURIComponent(body)}`;

    trackEvent("estimate_request", {
      form_name: "estimate_request",
      service: values.get("service") || "not_specified"
    });

    document.querySelector("#form-status").textContent = "Your email app should open now. Review the message there, then send it to complete your request.";
    window.location.href = mailtoUrl;
  });
}
