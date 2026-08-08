// ==========================================
// REXIO Portfolio - Main JavaScript
// ==========================================


// ==========================================
// Smooth Navigation
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


// ==========================================
// Contact Form
// ==========================================

const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const project = document.getElementById("project").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !project || !message) {
      contactMessage.style.display = "block";

      contactMessage.textContent =
        "يرجى تعبئة جميع الحقول المطلوبة.";

      contactMessage.style.color = "#fca5a5";

      contactMessage.style.background =
        "rgba(239, 68, 68, 0.08)";

      contactMessage.style.borderColor =
        "rgba(239, 68, 68, 0.15)";

      return;
    }

    /*
      حاليًا النموذج يعمل محليًا فقط.

      لاحقًا سنربطه بخدمة Backend آمنة
      لإرسال البيانات إلى البريد أو قاعدة بيانات.
    */

    contactMessage.style.display = "block";

    contactMessage.textContent =
      `شكرًا ${name} 👋 تم استلام طلبك وسنتواصل معك قريبًا.`;

    contactMessage.style.color = "#86efac";

    contactMessage.style.background =
      "rgba(34, 197, 94, 0.08)";

    contactMessage.style.borderColor =
      "rgba(34, 197, 94, 0.15)";

    contactForm.reset();
  });
}


// ==========================================
// AI Chat
// ==========================================

const chatButton = document.getElementById("chatButton");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");


// Open Chat
if (chatButton) {
  chatButton.addEventListener("click", () => {
    chatWindow.classList.remove("hidden");

    chatButton.classList.add("hidden");

    setTimeout(() => {
      chatInput.focus();
    }, 100);
  });
}


// Close Chat
if (closeChat) {
  closeChat.addEventListener("click", () => {
    chatWindow.classList.add("hidden");

    chatButton.classList.remove("hidden");
  });
}


// ==========================================
// Add Message
// ==========================================

function addMessage(text, type) {
  const message = document.createElement("div");

  message.classList.add(
    "message",
    type
  );

  message.textContent = text;

  chatMessages.appendChild(message);

  chatMessages.scrollTop =
    chatMessages.scrollHeight;

  return message;
}


// ==========================================
// Loading Message
// ==========================================

function addLoadingMessage() {
  const message = document.createElement("div");

  message.classList.add(
    "message",
    "assistant",
    "loading"
  );

  message.textContent =
    "جاري التفكير...";

  chatMessages.appendChild(message);

  chatMessages.scrollTop =
    chatMessages.scrollHeight;

  return message;
}


// ==========================================
// AI Request
// ==========================================

async function askAI(userMessage) {

  /*
    مهم جدًا:

    لا نضع GROQ_API_KEY هنا.

    هذا الملف يعمل داخل متصفح الزائر،
    وأي مفتاح API يوضع هنا يمكن كشفه.

    لاحقًا سنجعل الطلب يذهب إلى Backend
    آمن يحتوي على مفتاح Groq داخل .env.
  */

  const response = await fetch(
    "/api/chat",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: userMessage
      })
    }
  );


  if (!response.ok) {
    throw new Error(
      "حدث خطأ أثناء الاتصال بالخادم."
    );
  }


  const data = await response.json();

  return data.reply;
}


// ==========================================
// Chat Submit
// ==========================================

if (chatForm) {

  chatForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const userMessage =
        chatInput.value.trim();


      if (!userMessage) {
        return;
      }


      // Display user message
      addMessage(
        userMessage,
        "user"
      );


      // Clear input
      chatInput.value = "";


      // Disable input
      chatInput.disabled = true;


      const submitButton =
        chatForm.querySelector("button");

      submitButton.disabled = true;


      // Loading message
      const loadingMessage =
        addLoadingMessage();


      try {

        const reply =
          await askAI(userMessage);


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
          "عذرًا، حدث خطأ في الاتصال بالمساعد الذكي. حاول مرة أخرى.",
          "assistant"
        );

      }

      finally {

        chatInput.disabled = false;

        submitButton.disabled = false;

        chatInput.focus();

      }

    }
  );

}


// ==========================================
// Scroll Reveal
// ==========================================

const revealElements =
  document.querySelectorAll(
    ".service-card, .project-card, .section-heading"
  );


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }
  );


revealElements.forEach((element) => {

  element.style.opacity = "0";

  element.style.transform =
    "translateY(25px)";

  element.style.transition =
    "opacity 0.7s ease, transform 0.7s ease";

  revealObserver.observe(element);

});
