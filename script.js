document.addEventListener("DOMContentLoaded", () => {

/* =========================
Navbar
========================== */

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {

```
if (navbar) {
  navbar.classList.toggle(
    "scrolled",
    window.scrollY > 20
  );
}
```

});

menuToggle?.addEventListener("click", () => {

```
const isOpen =
  navLinks.classList.toggle("open");

menuToggle.setAttribute(
  "aria-expanded",
  String(isOpen)
);
```

});

navLinks?.querySelectorAll("a").forEach(link => {

```
link.addEventListener("click", () => {

  navLinks.classList.remove("open");

  menuToggle?.setAttribute(
    "aria-expanded",
    "false"
  );

});
```

});

/* =========================
Reveal Animations
========================== */

const revealItems =
document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

```
const observer =
  new IntersectionObserver(
    (entries, obs) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          obs.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealItems.forEach(el => {
  observer.observe(el);
});
```

} else {

```
revealItems.forEach(el => {
  el.classList.add("visible");
});
```

}

/* =========================
Projects
========================== */

const projects = {

```
ecommerce: {

  label: "Web · Demo",

  title: "متجر إلكتروني",

  description:
    "نموذج تجريبي لمتجر إلكتروني عصري يوضح طريقة عرض المنتجات والتصفح وإضافة المنتجات إلى السلة.",

  details: [
    "HTML",
    "CSS",
    "JavaScript",
    "Responsive",
    "UI/UX"
  ],

  type: "ecommerce"

},


services: {

  label: "Platform · Demo",

  title: "منصة خدمات",

  description:
    "نموذج تجريبي لمنصة خدمات تساعد العميل على استكشاف الخدمات واختيار ما يناسب احتياجه.",

  details: [
    "Web",
    "API",
    "Dashboard",
    "Responsive",
    "UX"
  ],

  type: "services"

},


ai: {

  label: "AI · Demo",

  title: "AI Assistant",

  description:
    "نموذج تجريبي لمساعد ذكي يساعد الزائر على فهم الخدمات وتحديد احتياجه ثم التواصل لإطلاق المشروع.",

  details: [
    "AI",
    "API",
    "Automation",
    "Lead Generation",
    "Chat"
  ],

  type: "ai"

}
```

};

const modal =
document.getElementById(
"projectModal"
);

const modalClose =
document.getElementById(
"modalClose"
);

const modalLabel =
document.getElementById(
"modalLabel"
);

const modalTitle =
document.getElementById(
"modalTitle"
);

const modalDescription =
document.getElementById(
"modalDescription"
);

const modalDetails =
document.getElementById(
"modalDetails"
);

const projectDemo =
document.getElementById(
"projectDemo"
);

const modalCTA =
document.getElementById(
"modalCTA"
);

/* =========================
Ecommerce Demo
========================== */

function createEcommerceDemo() {

```
projectDemo.innerHTML = `

  <div class="demo-store">

    <div class="demo-store-header">

      <strong>
        REXIO SHOP
      </strong>

      <div class="demo-store-search">
        🔍 البحث عن منتج
      </div>

      <div class="demo-cart">
        🛒
        <span id="demoCartCount">0</span>
      </div>

    </div>


    <div class="demo-store-hero">

      <div>

        <small>
          متجر عصري
        </small>

        <h3>
          اكتشف منتجاتك المفضلة
        </h3>

        <p>
          تجربة شراء بسيطة وسريعة.
        </p>

        <button
          type="button"
          class="demo-button"
        >
          استكشف المنتجات
        </button>

      </div>

    </div>


    <div class="demo-products">

      <div class="demo-product">

        <div class="demo-product-image">
          ◇
        </div>

        <h4>
          Product One
        </h4>

        <span>
          $49
        </span>

        <button
          type="button"
          class="demo-add-product"
        >
          إضافة للسلة
        </button>

      </div>


      <div class="demo-product">

        <div class="demo-product-image">
          ✦
        </div>

        <h4>
          Product Two
        </h4>

        <span>
          $79
        </span>

        <button
          type="button"
          class="demo-add-product"
        >
          إضافة للسلة
        </button>

      </div>


      <div class="demo-product">

        <div class="demo-product-image">
          ◈
        </div>

        <h4>
          Product Three
        </h4>

        <span>
          $99
        </span>

        <button
          type="button"
          class="demo-add-product"
        >
          إضافة للسلة
        </button>

      </div>

    </div>

  </div>

`;


let cartCount = 0;

const cartElement =
  document.getElementById(
    "demoCartCount"
  );


document
  .querySelectorAll(
    ".demo-add-product"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        cartCount++;

        cartElement.textContent =
          cartCount;

        button.textContent =
          "تمت الإضافة ✓";

        setTimeout(() => {

          button.textContent =
            "إضافة للسلة";

        }, 1200);

      }
    );

  });
```

}

/* =========================
Services Demo
========================== */

function createServicesDemo() {

```
projectDemo.innerHTML = `

  <div class="demo-services">

    <div class="demo-services-sidebar">

      <strong>
        REXIO
      </strong>

      <span class="active">
        الرئيسية
      </span>

      <span>
        الخدمات
      </span>

      <span>
        الطلبات
      </span>

      <span>
        الحساب
      </span>

    </div>


    <div class="demo-services-main">

      <div class="demo-services-top">

        <div>

          <small>
            مرحبًا 👋
          </small>

          <h3>
            ماذا تحتاج اليوم؟
          </h3>

        </div>

        <div class="demo-avatar">
          R
        </div>

      </div>


      <div class="demo-service-search">
        🔍 ابحث عن خدمة...
      </div>


      <div class="demo-service-categories">

        <button type="button">
          🌐 مواقع
        </button>

        <button type="button">
          🎨 تصميم
        </button>

        <button type="button">
          🤖 AI
        </button>

        <button type="button">
          ⚡ تحسين
        </button>

      </div>


      <div class="demo-service-list">

        <article>

          <div class="demo-service-icon">
            ◇
          </div>

          <div>

            <strong>
              تطوير موقع
            </strong>

            <p>
              موقع احترافي ومتجاوب
            </p>

          </div>

          <span>
            →
          </span>

        </article>


        <article>

          <div class="demo-service-icon">
            ✦
          </div>

          <div>

            <strong>
              دمج AI
            </strong>

            <p>
              مساعد ذكي لموقعك
            </p>

          </div>

          <span>
            →
          </span>

        </article>


        <article>

          <div class="demo-service-icon">
            ⚡
          </div>

          <div>

            <strong>
              تحسين الموقع
            </strong>

            <p>
              سرعة وتجربة أفضل
            </p>

          </div>

          <span>
            →
          </span>

        </article>

      </div>

    </div>

  </div>

`;


document
  .querySelectorAll(
    ".demo-service-categories button"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        button.style.borderColor =
          "rgba(139,92,246,.7)";

        button.style.color =
          "#fff";

      }
    );

  });
```

}

/* =========================
AI Demo
========================== */

function createAIDemo() {

```
projectDemo.innerHTML = `

  <div class="demo-ai">

    <div class="demo-ai-header">

      <div class="demo-ai-avatar">
        AI
      </div>

      <div>

        <strong>
          REXIO AI
        </strong>

        <span>
          ● Online
        </span>

      </div>

    </div>


    <div
      class="demo-ai-messages"
      id="demoAIMessages"
    >

      <div class="demo-ai-message assistant">

        مرحبًا 👋

        أنا مساعد REXIO الذكي.
        ما نوع المشروع الذي تريد بناءه؟

      </div>


      <div class="demo-ai-options">

        <button
          type="button"
          data-ai-option="موقع إلكتروني"
        >
          🌐 موقع إلكتروني
        </button>

        <button
          type="button"
          data-ai-option="Landing Page"
        >
          🚀 Landing Page
        </button>

        <button
          type="button"
          data-ai-option="مشروع AI"
        >
          🤖 مشروع AI
        </button>

      </div>

    </div>


    <div class="demo-ai-input">

      <input
        id="demoAIInput"
        type="text"
        placeholder="اكتب رسالتك..."
        autocomplete="off"
      >

      <button
        id="demoAISend"
        type="button"
      >
        ↑
      </button>

    </div>

  </div>

`;


const messages =
  document.getElementById(
    "demoAIMessages"
  );

const input =
  document.getElementById(
    "demoAIInput"
  );

const send =
  document.getElementById(
    "demoAISend"
  );


function addDemoMessage(
  text,
  type
) {

  const message =
    document.createElement(
      "div"
    );

  message.className =
    `demo-ai-message ${type}`;

  message.textContent =
    text;

  messages.appendChild(
    message
  );

  messages.scrollTop =
    messages.scrollHeight;

}


function demoReply(text) {

  const lower =
    text.toLowerCase();

  if (
    lower.includes("ai") ||
    lower.includes("ذكاء")
  ) {

    return "ممتاز! يمكن بناء مساعد ذكي داخل موقعك وربطه لاحقًا بواجهة API.";

  }

  if (
    lower.includes("موقع") ||
    lower.includes("ويب")
  ) {

    return "يمكنني مساعدتك في بناء موقع احترافي ومتجاوب يعرض خدماتك ويجذب العملاء.";

  }

  return "فكرة ممتازة! أخبرني بالمزيد عن الهدف والوظائف التي تريدها.";

}


function sendDemoMessage() {

  const text =
    input.value.trim();

  if (!text) {
    return;
  }


  addDemoMessage(
    text,
    "user"
  );


  input.value = "";


  setTimeout(() => {

    addDemoMessage(
      demoReply(text),
      "assistant"
    );

  }, 450);

}


document
  .querySelectorAll(
    "[data-ai-option]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        input.value =
          button.dataset.aiOption;

        sendDemoMessage();

      }
    );

  });


send.addEventListener(
  "click",
  sendDemoMessage
);


input.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      event.preventDefault();

      sendDemoMessage();

    }

  }
);
```

}

/* =========================
Open Project
========================== */

function openProject(key) {

```
const project =
  projects[key];

if (!project) {
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
    .map(
      item =>
        `<span>${item}</span>`
    )
    .join("");


if (
  project.type ===
  "ecommerce"
) {

  createEcommerceDemo();

}


if (
  project.type ===
  "services"
) {

  createServicesDemo();

}


if (
  project.type ===
  "ai"
) {

  createAIDemo();

}


modal.classList.add(
  "open"
);

modal.setAttribute(
  "aria-hidden",
  "false"
);

document.body.classList.add(
  "modal-open"
);
```

}

/* =========================
Close Project
========================== */

function closeProject() {

```
modal.classList.remove(
  "open"
);

modal.setAttribute(
  "aria-hidden",
  "true"
);

document.body.classList.remove(
  "modal-open"
);
```

}

document
.querySelectorAll(
".project-card[data-project]"
)
.forEach(card => {

```
  card.addEventListener(
    "click",
    () => {

      openProject(
        card.dataset.project
      );

    }
  );


  card.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        openProject(
          card.dataset.project
        );

      }

    }
  );

});
```

modalClose?.addEventListener(
"click",
closeProject
);

document
.querySelector(
"[data-close-modal]"
)
?.addEventListener(
"click",
closeProject
);

document.addEventListener(
"keydown",
event => {

```
  if (
    event.key === "Escape" &&
    modal.classList.contains("open")
  ) {

    closeProject();

  }

}
```

);

modalCTA?.addEventListener(
"click",
closeProject
);

/* =========================
Contact Form
Gmail Compose
========================== */

const contactForm =
document.getElementById(
"contactForm"
);

const contactMessage =
document.getElementById(
"contactMessage"
);

contactForm?.addEventListener(
"submit",
event => {

```
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
    "_blank",
    "noopener,noreferrer"
  );


  contactMessage.textContent =
    "تم تجهيز الرسالة في Gmail. راجعها ثم اضغط إرسال.";


  contactForm.reset();

}
```

);

/* =========================
Main AI Assistant
========================== */

const chatButton =
document.getElementById(
"chatButton"
);

const chatPanel =
document.getElementById(
"chatPanel"
);

const closeChat =
document.getElementById(
"closeChat"
);

const chatForm =
document.getElementById(
"chatForm"
);

const chatInput =
document.getElementById(
"chatInput"
);

const chatMessages =
document.getElementById(
"chatMessages"
);

function toggleChat(force) {

```
if (!chatPanel) {
  return;
}


const open =
  typeof force === "boolean"
    ? force
    : !chatPanel.classList.contains(
        "open"
      );


chatPanel.classList.toggle(
  "open",
  open
);


chatPanel.setAttribute(
  "aria-hidden",
  String(!open)
);


if (open) {

  setTimeout(() => {

    chatInput?.focus();

  }, 100);

}
```

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

```
const div =
  document.createElement(
    "div"
  );


div.className =
  `message ${type}`;


div.textContent =
  text;


chatMessages.appendChild(
  div
);


chatMessages.scrollTop =
  chatMessages.scrollHeight;
```

}

function getReply(text) {

```
const t =
  text.toLowerCase();


if (
  t.includes("ai") ||
  t.includes("ذكاء") ||
  t.includes("مساعد")
) {

  return "يمكنني بناء مساعد ذكي داخل موقعك وربطه لاحقًا بواجهة API لمعالجة الأسئلة وشرح الخدمات وجمع طلبات العملاء.";

}


if (
  t.includes("متجر") ||
  t.includes("ecommerce") ||
  t.includes("بيع")
) {

  return "أستطيع بناء متجر متجاوب يعرض المنتجات بشكل احترافي، مع إمكانية إضافة وظائف مخصصة وواجهات API عند الحاجة.";

}


if (
  t.includes("سعر") ||
  t.includes("تكلفة") ||
  t.includes("ميزانية")
) {

  return "التكلفة تعتمد على نوع المشروع والوظائف المطلوبة. أرسل تفاصيل فكرتك من نموذج التواصل حتى يتم تحديد النطاق المناسب.";

}


if (
  t.includes("خدمات") ||
  t.includes("ماذا") ||
  t.includes("تقدم")
) {

  return "الخدمات تشمل تطوير المواقع، Landing Pages، دمج الذكاء الاصطناعي، وتحسين الواجهات والأداء.";

}


if (
  t.includes("موقع") ||
  t.includes("شركة") ||
  t.includes("ويب")
) {

  return "ممتاز. يمكن بناء موقع شركة احترافي ومتجاوب يعرض خدماتك وأعمالك ومعلومات التواصل بطريقة واضحة وجذابة.";

}


if (
  t.includes("مرحبا") ||
  t.includes("مرحبا") ||
  t.includes("السلام")
) {

  return "مرحبًا بك 👋 أخبرني بما تريد بناءه وسأساعدك في معرفة الحل المناسب.";

}


return "فهمت فكرتك. أخبرني أكثر عن المشروع: ما الذي تريد بناءه؟ وما الهدف الأساسي منه؟ ويمكنك أيضًا إرسال التفاصيل مباشرة من قسم التواصل.";
```

}

chatForm?.addEventListener(
"submit",
event => {

```
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


  chatInput.value =
    "";


  setTimeout(() => {

    addMessage(
      getReply(text),
      "assistant"
    );

  }, 450);

}
```

);

document
.querySelectorAll(
".quick-actions button"
)
.forEach(button => {

```
  button.addEventListener(
    "click",
    () => {

      const question =
        button.dataset.question;


      if (!question) {
        return;
      }


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
```

/* =========================
Close Chat with Escape
========================== */

document.addEventListener(
"keydown",
event => {

```
  if (
    event.key === "Escape" &&
    chatPanel?.classList.contains(
      "open"
    )
  ) {

    toggleChat(false);

  }

}
```

);

});
