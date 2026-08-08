document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  });

  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.classList.remove("active");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Reveal animations
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => observer.observe(el));

  // Hero code-window typewriter signature
  const typedText = document.getElementById("typedText");
  const phrases = ["Let's build it.", "Let's design it.", "Let's ship it.", "Let's automate it."];

  if (typedText && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        typedText.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        typedText.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(tick, deleting ? 35 : 65);
    }

    tick();
  } else if (typedText) {
    typedText.textContent = phrases[0];
  }

  // Footer year
  const footerYear = document.getElementById("footerYear");
  if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} REXIO. جميع الحقوق محفوظة.`;
  }

  // Project modal
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalDetails = document.getElementById("modalDetails");
  const modalLabel = document.getElementById("modalLabel");

  const projects = {
    ecommerce: {
      label: "Web · فكرة مشروع",
      title: "متجر إلكتروني",
      description: "فكرة متجر إلكتروني عصري يركز على عرض المنتجات بوضوح، سهولة التصفح، وتجربة شراء مناسبة للهاتف والكمبيوتر.",
      details: ["HTML", "CSS", "JavaScript", "Responsive", "UI/UX"]
    },
    services: {
      label: "Platform · فكرة مشروع",
      title: "منصة خدمات",
      description: "منصة رقمية لعرض الخدمات وتنظيم المعلومات ومساعدة العميل على الوصول إلى الخدمة المناسبة والتواصل بسهولة.",
      details: ["Web", "API", "Dashboard", "Responsive", "UX"]
    },
    ai: {
      label: "AI · تجربة ذكية",
      title: "AI Assistant",
      description: "مساعد ذكي داخل الموقع يجيب عن الأسئلة، يشرح الخدمات، يساعد الزائر في تحديد احتياجه، ثم يوجهه لإرسال طلب مشروع.",
      details: ["AI", "API", "Automation", "Lead Generation", "Chat"]
    }
  };

  let lastFocused = null;

  function openProject(key) {
    const project = projects[key];
    if (!project) return;

    lastFocused = document.activeElement;

    modalLabel.textContent = project.label;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalDetails.innerHTML = project.details.map(item => `<span>${item}</span>`).join("");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose?.focus();
  }

  function closeProject() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastFocused?.focus();
  }

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => openProject(card.dataset.project));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProject(card.dataset.project);
      }
    });
  });

  modalClose?.addEventListener("click", closeProject);
  document.querySelector("[data-close-modal]")?.addEventListener("click", closeProject);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeProject();
  });

  document.getElementById("modalCTA")?.addEventListener("click", () => {
    closeProject();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.getElementById("name")?.focus(), 500);
  });

  // Contact form -> Gmail Compose
  const contactForm = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");

  contactForm?.addEventListener("submit", e => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const project = document.getElementById("project").value;
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(`طلب مشروع جديد من ${name}`);
    const body = encodeURIComponent(
      `مرحبًا REXIO،\n\n` +
      `الاسم: ${name}\n` +
      `البريد: ${email}\n` +
      `نوع المشروع: ${project}\n\n` +
      `تفاصيل المشروع:\n${message}\n\n` +
      `تم إرسال الطلب من موقع REXIO.`
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rexiopro63@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    contactMessage.textContent = "تم تجهيز الرسالة في Gmail. راجعها ثم اضغط إرسال.";
    contactForm.reset();
  });

  // AI assistant - local demo, no API key exposed
  const chatButton = document.getElementById("chatButton");
  const chatPanel = document.getElementById("chatPanel");
  const closeChat = document.getElementById("closeChat");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  function toggleChat(force) {
    const open = typeof force === "boolean" ? force : !chatPanel.classList.contains("open");
    chatPanel.classList.toggle("open", open);
    chatPanel.setAttribute("aria-hidden", String(!open));
    chatButton.setAttribute("aria-expanded", String(open));
    if (open) setTimeout(() => chatInput.focus(), 100);
  }

  chatButton.addEventListener("click", () => toggleChat());
  closeChat.addEventListener("click", () => toggleChat(false));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && chatPanel.classList.contains("open")) toggleChat(false);
  });

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "message assistant typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
  }

  function getReply(text) {
    const t = text.toLowerCase();

    if (t.includes("ai") || t.includes("ذكاء") || t.includes("مساعد")) {
      return "يمكنني بناء مساعد ذكي داخل موقعك، وربطه لاحقًا بواجهة API لمعالجة الأسئلة، شرح الخدمات، وجمع طلبات العملاء.";
    }
    if (t.includes("متجر") || t.includes("ecommerce") || t.includes("بيع")) {
      return "أستطيع بناء متجر متجاوب يعرض المنتجات بشكل احترافي، مع إمكانية إضافة وظائف مخصصة وواجهات API عند الحاجة.";
    }
    if (t.includes("سعر") || t.includes("تكلفة") || t.includes("ميزانية")) {
      return "التكلفة تعتمد على نوع المشروع والوظائف المطلوبة. أرسل تفاصيل فكرتك من نموذج التواصل وسأتمكن من تحديد النطاق المناسب.";
    }
    if (t.includes("خدمات") || t.includes("ماذا") || t.includes("تقدم")) {
      return "الخدمات تشمل تطوير المواقع، Landing Pages، دمج الذكاء الاصطناعي، وتحسين الواجهات والأداء.";
    }
    if (t.includes("موقع") || t.includes("شركة") || t.includes("ويب")) {
      return "ممتاز. يمكن بناء موقع شركة احترافي ومتجاوب يعرض خدماتك، أعمالك، ومعلومات التواصل بطريقة واضحة وجذابة.";
    }

    return "فهمت فكرتك. أخبرني أكثر عن المشروع: ما الذي تريد بناءه؟ وما الهدف الأساسي منه؟ ويمكنك أيضًا إرسال التفاصيل مباشرة من قسم التواصل.";
  }

  function respondTo(text) {
    addMessage(text, "user");
    const typingBubble = showTyping();

    setTimeout(() => {
      typingBubble.remove();
      addMessage(getReply(text), "assistant");
    }, 700);
  }

  chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = "";
    respondTo(text);
  });

  document.querySelectorAll(".quick-actions button").forEach(btn => {
    btn.addEventListener("click", () => respondTo(btn.dataset.question));
  });
});
