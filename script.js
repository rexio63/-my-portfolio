/* ==========================================
REXIO Portfolio
Main JavaScript
========================================== */

// ==========================================
// Smooth Navigation
// ==========================================

document
.querySelectorAll('a[href^="#"]')
.forEach((link) => {

```
link.addEventListener(
  "click",
  (event) => {

    const targetId =
      link.getAttribute("href");


    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(targetId);


    if (!target) {
      return;
    }


    event.preventDefault();


    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);
```

});

// ==========================================
// Contact Form
// ==========================================

const contactForm =
document.getElementById(
"contactForm"
);

const contactMessage =
document.getElementById(
"contactMessage"
);

if (contactForm) {

contactForm.addEventListener(
"submit",
(event) => {

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


  // Validate form

  if (
    !name ||
    !email ||
    !project ||
    !message
  ) {

    contactMessage.style.display =
      "block";


    contactMessage.textContent =
      "يرجى تعبئة جميع الحقول المطلوبة.";


    return;

  }


  // Project names

  const projectNames = {

    website:
      "موقع إلكتروني",

    landing:
      "Landing Page",

    ai:
      "مشروع يعتمد على الذكاء الاصطناعي",

    other:
      "مشروع آخر"

  };


  const projectName =
    projectNames[project] ||
    project;


  // Email subject

  const subject =
    `طلب مشروع جديد من ${name}`;


  // Email body

  const emailBody =
```

`مرحبًا REXIO،

أرغب في التواصل معك بخصوص مشروع جديد.

الاسم:
${name}

البريد الإلكتروني:
${email}

نوع المشروع:
${projectName}

تفاصيل الفكرة:
${message}

---

تم إرسال هذه الرسالة من نموذج التواصل في موقع REXIO.`;

```
  // Create mailto link

  const mailtoLink =
    `mailto:rexiopro63@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(emailBody)}`;


  // Open email application

  window.location.href =
    mailtoLink;


  // Confirmation message

  contactMessage.style.display =
    "block";


  contactMessage.textContent =
    "سيتم فتح تطبيق البريد لإرسال فكرتك إلى REXIO.";

}
```

);

}

// ==========================================
// AI Chat Elements
// ==========================================

const chatButton =
document.getElementById(
"chatButton"
);

const chatWindow =
document.getElementById(
"chatWindow"
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

// ==========================================
// Open AI Chat
// ==========================================

if (chatButton) {

chatButton.addEventListener(
"click",
() => {

```
  chatWindow.classList.remove(
    "hidden"
  );


  chatButton.classList.add(
    "hidden"
  );


  setTimeout(
    () => {

      if (chatInput) {
        chatInput.focus();
      }

    },
    100
  );

}
```

);

}

// ==========================================
// Close AI Chat
// ==========================================

if (closeChat) {

closeChat.addEventListener(
"click",
() => {

```
  chatWindow.classList.add(
    "hidden"
  );


  chatButton.classList.remove(
    "hidden"
  );

}
```

);

}

// ==========================================
// Add Chat Message
// ==========================================

function addMessage(
text,
type
) {

const message =
document.createElement(
"div"
);

message.classList.add(
"message",
type
);

message.textContent =
text;

chatMessages.appendChild(
message
);

chatMessages.scrollTop =
chatMessages.scrollHeight;

return message;

}

// ==========================================
// Loading Message
// ==========================================

function addLoadingMessage() {

const message =
document.createElement(
"div"
);

message.classList.add(
"message",
"assistant",
"loading"
);

message.textContent =
"جاري التفكير...";

chatMessages.appendChild(
message
);

chatMessages.scrollTop =
chatMessages.scrollHeight;

return message;

}

// ==========================================
// AI Request
// ==========================================

async function askAI(
userMessage
) {

/*
لا نضع مفتاح Groq هنا.

```
هذا الملف يصل إلى متصفح الزائر،
وبالتالي وضع API Key داخله سيكشف المفتاح.

الطلب يذهب إلى:

/api/chat

وسنربطه لاحقًا بالـ Backend
الذي يحتوي على GROQ_API_KEY
داخل متغير البيئة .env.
```

*/

const response =
await fetch(
"/api/chat",
{

```
    method: "POST",


    headers: {

      "Content-Type":
        "application/json"

    },


    body: JSON.stringify({

      message:
        userMessage

    })

  }
);
```

if (!response.ok) {

```
throw new Error(
  "حدث خطأ أثناء الاتصال بالخادم."
);
```

}

const data =
await response.json();

return data.reply;

}

// ==========================================
// AI Chat Submit
// ==========================================

if (chatForm) {

chatForm.addEventListener(
"submit",
async (event) => {

```
  event.preventDefault();


  const userMessage =
    chatInput.value.trim();


  if (!userMessage) {
    return;
  }


  // Add user message

  addMessage(
    userMessage,
    "user"
  );


  // Clear input

  chatInput.value =
    "";


  // Disable controls

  chatInput.disabled =
    true;


  const submitButton =
    chatForm.querySelector(
      "button"
    );


  submitButton.disabled =
    true;


  // Loading

  const loadingMessage =
    addLoadingMessage();


  try {

    const reply =
      await askAI(
        userMessage
      );


    loadingMessage.remove();


    addMessage(
      reply,
      "assistant"
    );

  }

  catch (error) {

    console.error(
      "AI Error:",
      error
    );


    loadingMessage.remove();


    addMessage(
      "عذرًا، المساعد الذكي غير متاح حاليًا. حاول مرة أخرى لاحقًا.",
      "assistant"
    );

  }

  finally {

    chatInput.disabled =
      false;


    submitButton.disabled =
      false;


    chatInput.focus();

  }

}
```

);

}

// ==========================================
// Scroll Reveal Animation
// ==========================================

const revealElements =
document.querySelectorAll(
".service-card, .project-card, .section-heading"
);

if (
"IntersectionObserver"
in window
) {

const revealObserver =
new IntersectionObserver(
(entries) => {

```
    entries.forEach(
      (entry) => {

        if (
          entry.isIntersecting
        ) {

          entry.target.style.opacity =
            "1";


          entry.target.style.transform =
            "translateY(0)";


          revealObserver.unobserve(
            entry.target
          );

        }

      }
    );

  },
  {
    threshold: 0.12
  }
);
```

revealElements.forEach(
(element) => {

```
  element.style.opacity =
    "0";


  element.style.transform =
    "translateY(25px)";


  element.style.transition =
    "opacity 0.7s ease, transform 0.7s ease";


  revealObserver.observe(
    element
  );

}
```

);

}
