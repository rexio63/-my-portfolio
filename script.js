document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  });

  menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
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

  // Project modal
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalDetails = document.getElementById("modalDetails");

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

  function openProject(key) {
    const project = projects[key];
    if (!project) return;

    document.getElementById("modalLabel").textContent = project.label;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalDetails.innerHTML = project.details.map(item => `<span>${item}</span>`).join("");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProject() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
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

  document.getElementById("modalCTA")?.addEventListener("click", closeProject);

  // Contact form -> Gmail Compose
  const contactForm = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");

  contactForm?.addEventListener("submit", e => {
    e.preventDefault();

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
    window.open(gmailUrl, "_blank");

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
    if (open) setTimeout(() => chatInput.focus(), 100);
  }

  chatButton.addEventListener("click", () => toggleChat());
  closeChat.addEventListener("click", () => toggleChat(false));

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
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

  chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => addMessage(getReply(text), "assistant"), 450);
  });

  document.querySelectorAll(".quick-actions button").forEach(btn => {
    btn.addEventListener("click", () => {
      const question = btn.dataset.question;
      addMessage(question, "user");
      setTimeout(() => addMessage(getReply(question), "assistant"), 450);
    });
  });
});
