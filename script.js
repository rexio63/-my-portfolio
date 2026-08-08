```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     Navbar
  ========================== */

  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );
    }
  });

  menuToggle?.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  navLinks?.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuToggle?.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


  /* =========================
     Reveal Animations
  ========================== */

  const revealItems =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              obs.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealItems.forEach(item => {
      observer.observe(item);
    });

  } else {

    revealItems.forEach(item => {
      item.classList.add("visible");
    });

  }


  /* =========================
     Project Data
  ========================== */

  const projects = {

    ecommerce: {

      label: "Web · قيد التطوير",

      title: "متجر إلكتروني",

      description:
        "مثال على متجر إلكتروني عصري يركز على عرض المنتجات بطريقة واضحة، سهولة التصفح، وتجربة شراء مناسبة للهاتف والكمبيوتر.",

      details: [
        "HTML",
        "CSS",
        "JavaScript",
        "Responsive",
        "UI/UX"
      ],

      preview: `
        <div class="example-shop">

          <div class="example-top"></div>

          <div class="example-banner"></div>

          <div class="example-products">
            <div></div>
            <div></div>
            <div></div>
          </div>

        </div>
      `

    },


    services: {

      label: "Platform · قيد التطوير",

      title: "منصة خدمات",

      description:
        "مثال على منصة رقمية يمكن من خلالها عرض الخدمات وتنظيم المعلومات ومساعدة العميل على الوصول إلى الخدمة المناسبة والتواصل بسهولة.",

      details: [
        "Web",
        "API",
        "Dashboard",
        "Responsive",
        "UX"
      ],

      preview: `
        <div class="example-dashboard">

          <div class="side"></div>

          <div class="main">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

        </div>
      `

    },


    ai: {

      label: "AI · تجربة ذكية",

      title: "AI Assistant",

      description:
        "مثال على مساعد ذكي داخل الموقع يجيب عن أسئلة الزوار، يشرح الخدمات، يساعد العميل في تحديد احتياجه ثم يوجهه لإرسال طلب مشروع.",

      details: [
        "AI",
        "API",
        "Automation",
        "Lead Generation",
        "Chat"
      ],

      preview: `
        <div class="example-ai">

          <div class="ai-message">
            مرحبًا 👋 كيف يمكنني مساعدتك؟
          </div>

          <div class="ai-message user">
            أريد إنشاء موقع لشركتي.
          </div>

          <div class="ai-message">
            رائع! أخبرني أكثر عن نشاط شركتك وسأساعدك
            في اختيار الحل المناسب.
          </div>

          <div class="ai-input"></div>

        </div>
      `

    }

  };


  /* =========================
     Project Modal
  ========================== */

  const modal =
    document.getElementById("projectModal");

  const modalClose =
    document.getElementById("modalClose");

  const modalLabel =
    document.getElementById("modalLabel");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalDescription =
    document.getElementById("modalDescription");

  const modalDetails =
    document.getElementById("modalDetails");

  const modalPreview =
    document.getElementById("modalPreview");

  const modalCTA =
    document.getElementById("modalCTA");


  function openProject(key) {

    const project = projects[key];

    if (!project || !modal) {
      return;
    }

    modalLabel.textContent =
      project.label;

    modalTitle.textContent =
      project.title;

    modalDescription.textContent =
      project.description;

    modalDetails.innerHTML =
      project.details
        .map(item => `<span>${item}</span>`)
        .join("");

    modalPreview.innerHTML =
      project.preview;

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );

  }


  function closeProject() {

    if (!modal) {
      return;
    }

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  document
    .querySelectorAll(".project-card")
    .forEach(card => {

      card.addEventListener("click", () => {

        openProject(
          card.dataset.project
        );

      });


      card.addEventListener("keydown", event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openProject(
            card.dataset.project
          );

        }

      });

    });


  modalClose?.addEventListener(
    "click",
    closeProject
  );


  document
    .querySelector("[data-close-modal]")
    ?.addEventListener(
      "click",
      closeProject
    );


  modalCTA?.addEventListener(
    "click",
    closeProject
  );


  /* =========================
     Escape Key
  ========================== */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeProject();

        toggleChat(false);

      }

    }
  );


  /* =========================
     Contact Form
  ========================== */

  const contactForm =
    document.getElementById("contactForm");

  const contactMessage =
    document.getElementById("contactMessage");


  contactForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document
          .getElementById("name")
          .value
          .trim();


      const email =
        document
          .getElementById("email")
          .value
          .trim();


      const project =
        document
          .getElementById("project")
          .value;


      const message =
        document
          .getElementById("message")
          .value
          .trim();


      if (
        !name ||
        !email ||
        !project ||
        !message
      ) {

        contactMessage.textContent =
          "يرجى تعبئة جميع الحقول.";

        return;

      }


      const subject =
        encodeURIComponent(
          `طلب مشروع جديد من ${name}`
        );


      const body =
        encodeURIComponent(

          `مرحبًا REXIO،\n\n` +

          `الاسم: ${name}\n` +

          `البريد الإلكتروني: ${email}\n` +

          `نوع المشروع: ${project}\n\n` +

          `فكرة المشروع:\n${message}\n\n` +

          `تم إرسال الطلب من موقع REXIO.`

        );


      const gmailUrl =
        `https://mail.google.com/mail/?view=cm&fs=1&to=rexiopro63@gmail.com&su=${subject}&body=${body}`;


      window.open(
        gmailUrl,
        "_blank"
      );


      contactMessage.textContent =
        "تم تجهيز الرسالة في Gmail. راجعها ثم اضغط إرسال.";


      contactForm.reset();

    }
  );


  /* =========================
     AI Assistant
  ========================== */

  const chatButton =
    document.getElementById("chatButton");

  const chatPanel =
    document.getElementById("chatPanel");

  const closeChat =
    document.getElementById("closeChat");

  const chatForm =
    document.getElementById("chatForm");

  const chatInput =
    document.getElementById("chatInput");

  const chatMessages =
    document.getElementById("chatMessages");


  function toggleChat(force) {

    if (!chatPanel) {
      return;
    }

    const open =
      typeof force === "boolean"
        ? force
        : !chatPanel.classList.contains("open");


    chatPanel.classList.toggle(
      "open",
      open
    );


    chatPanel.setAttribute(
      "aria-hidden",
      String(!open)
    );


    document.body.classList.toggle(
      "chat-open",
      open
    );


    if (open) {

      setTimeout(() => {
        chatInput?.focus();
      }, 100);

    }

  }


  chatButton?.addEventListener(
    "click",
    () => toggleChat()
  );


  closeChat?.addEventListener(
    "click",
    () => toggleChat(false)
  );


  function addMessage(
    text,
    type
  ) {

    if (!chatMessages) {
      return;
    }

    const message =
      document.createElement("div");

    message.className =
      `message ${type}`;

    message.textContent =
      text;

    chatMessages.appendChild(
      message
    );

    chatMessages.scrollTop =
      chatMessages.scrollHeight;

  }


  function getReply(text) {

    const t =
      text.toLowerCase();


    if (
      t.includes("ai") ||
      t.includes("ذكاء") ||
      t.includes("مساعد")
    ) {

      return (
        "يمكنني بناء مساعد ذكي داخل موقعك، " +
        "وربطه لاحقًا بواجهة API لمعالجة الأسئلة، " +
        "شرح الخدمات، وجمع طلبات العملاء."
      );

    }


    if (
      t.includes("متجر") ||
      t.includes("ecommerce") ||
      t.includes("بيع")
    ) {

      return (
        "أستطيع بناء متجر متجاوب يعرض المنتجات " +
        "بشكل احترافي، مع إمكانية إضافة وظائف " +
        "مخصصة وواجهات API عند الحاجة."
      );

    }


    if (
      t.includes("سعر") ||
      t.includes("تكلفة") ||
      t.includes("ميزانية")
    ) {

      return (
        "التكلفة تعتمد على نوع المشروع والوظائف " +
        "المطلوبة. أرسل تفاصيل فكرتك من نموذج " +
        "التواصل لتحديد نطاق المشروع المناسب."
      );

    }


    if (
      t.includes("خدمات") ||
      t.includes("ماذا") ||
      t.includes("تقدم")
    ) {

      return (
        "الخدمات تشمل تطوير المواقع، Landing Pages، " +
        "دمج الذكاء الاصطناعي، وتحسين الواجهات والأداء."
      );

    }


    if (
      t.includes("موقع") ||
      t.includes("شركة") ||
      t.includes("ويب")
    ) {

      return (
        "ممتاز. يمكن بناء موقع شركة احترافي ومتجاوب " +
        "يعرض خدماتك وأعمالك ومعلومات التواصل بطريقة واضحة وجذابة."
      );

    }


    return (
      "فهمت فكرتك 👌 أخبرني أكثر عن المشروع: " +
      "ما الذي تريد بناءه؟ وما الهدف الأساسي منه؟ " +
      "ويمكنك أيضًا إرسال التفاصيل مباشرة من قسم التواصل."
    );

  }


  chatForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const text =
        chatInput.value.trim();


      if (!text) {
        return;
      }


      addMessage(
        text,
        "user"
      );


      chatInput.value = "";


      setTimeout(() => {

        addMessage(
          getReply(text),
          "assistant"
        );

      }, 450);

    }
  );


  /* =========================
     Quick Chat Buttons
  ========================== */

  document
    .querySelectorAll(
      ".quick-actions button"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const question =
            button.dataset.question;


          addMessage(
            question,
            "user"
          );


          setTimeout(() => {

            addMessage(
              getReply(question),
              "assistant"
            );

          }, 450);

        }
      );

    });


});
```
