const translations = {
  pt: {
    "meta.title": "Seiji | Portfólio",
    "nav.home": "Início",
    "nav.about": "Sobre Mim",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    "profile.alt": "Foto de Perfil",
    "about.title": "Sobre Mim",
    "about.text":
      "Meu nome é Nyikholas Seiji, tenho formação técnica em Administração pela ETEC Getúlio Vargas e sou futuro tecnólogo em Análise e Desenvolvimento de Sistemas pela FATEC Ipiranga.",
    "about.cv": "⬇ Baixar currículo",
    "projects.title": "Projetos",
    "projects.status": "Em desenvolvimento",
    "projects.repo": "Ver repositório no GitHub",
    "projects.uniques.alt": "Preview do site UniqueS",
    "projects.uniques.desc":
      "Plataforma de skincare individualizado: o usuário responde um quiz rápido sobre a própria pele e recebe uma rotina de cuidados sob medida, sem fórmulas genéricas. Estou desenvolvendo o front-end em React com um back-end em Java/Spring Boot planejado para dar suporte ao diagnóstico e às recomendações.",
    "projects.fnshop.alt": "Preview do site FNShop",
    "projects.fnshop.desc":
      "Loja virtual e plataforma de e-commerce desenvolvida em Angular para compor a nota da matéria de Desenvolvimento de Software. O projeto adota princípios de Clean Architecture adaptados ao front-end (separação entre domínio, casos de uso, infraestrutura e apresentação), contando com catálogo de produtos, busca com filtros, carrinho de compras, autenticação e gerenciamento reativo de estado.",
    "projects.condohub.alt": "Preview do site CondoHub",
    "projects.condohub.desc":
      "Sistema Integrado de Gestão Condominial desenvolvido como Projeto Integrador do curso de ADS na FATEC Ipiranga. A plataforma centraliza o ciclo operacional e a comunicação do condomínio em painéis dedicados por perfil (síndico, morador, porteiro e funcionário), cobrindo manutenção preventiva, gestão de vagas para veículos elétricos, sustentabilidade, encomendas, controle de acesso e reservas.",
    "projects.more": "Além disso, minhas",
    "projects.java": "lições de Java",
    "contact.title": "Contato",
    "contact.name": "Nome",
    "contact.message": "Digite sua mensagem",
    "contact.send": "Enviar por Email",
    "contact.sending": "Enviando...",
    "contact.empty": "Preencha todos os campos.",
    "contact.success": "Mensagem enviada com sucesso!",
    "contact.error": "Falha ao enviar. Tente novamente.",
    "footer.location": "Brasil, São Paulo",
  },
  en: {
    "meta.title": "Seiji | Portfolio",
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "profile.alt": "Profile picture",
    "about.title": "About Me",
    "about.text":
      "My name is Nyikholas Seiji. I hold a technical degree in Business Administration from ETEC Getúlio Vargas and I'm currently pursuing a Technologist degree in Systems Analysis and Development at FATEC Ipiranga.",
    "about.cv": "⬇ Download resume",
    "projects.title": "Projects",
    "projects.status": "In development",
    "projects.repo": "View repository on GitHub",
    "projects.uniques.alt": "UniqueS website preview",
    "projects.uniques.desc":
      "Personalized skincare platform: users take a quick quiz about their skin and receive a tailor-made care routine, with no generic formulas. I'm building the front-end in React, with a Java/Spring Boot back-end planned to support the diagnosis and recommendations.",
    "projects.fnshop.alt": "FNShop website preview",
    "projects.fnshop.desc":
      "Online store and e-commerce platform built with Angular for the Software Development course. The project applies Clean Architecture principles adapted to the front-end (separating domain, use cases, infrastructure and presentation), featuring a product catalog, filtered search, shopping cart, authentication and reactive state management.",
    "projects.condohub.alt": "CondoHub website preview",
    "projects.condohub.desc":
      "Integrated Condominium Management System developed as the capstone project (Projeto Integrador) of the Systems Analysis and Development program at FATEC Ipiranga. The platform centralizes the building's operations and communication in dedicated dashboards per role (property manager, resident, doorman and staff), covering preventive maintenance, EV parking management, sustainability, package delivery, access control and reservations.",
    "projects.more": "Also, check out my",
    "projects.java": "Java exercises",
    "contact.title": "Contact",
    "contact.name": "Name",
    "contact.message": "Type your message",
    "contact.send": "Send via Email",
    "contact.sending": "Sending...",
    "contact.empty": "Please fill in all fields.",
    "contact.success": "Message sent successfully!",
    "contact.error": "Failed to send. Please try again.",
    "footer.location": "São Paulo, Brazil",
  },
};

const CV_FILES = {
  pt: "assets/docs/CV Nyikholas.pdf",
  en: "assets/docs/CV Nyikholas EN.pdf",
};

let currentLang = "pt";
let englishCvAvailable = false;

function t(key) {
  return translations[currentLang][key] ?? translations.pt[key] ?? key;
}

function detectLanguage() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl && translations[fromUrl]) return fromUrl;
  const saved = localStorage.getItem("lang");
  if (saved && translations[saved]) return saved;
  return (navigator.language || "pt").toLowerCase().startsWith("pt")
    ? "pt"
    : "en";
}

function updateCvLink() {
  const link = document.getElementById("cv-download");
  const useEnglish = currentLang === "en" && englishCvAvailable;
  link.setAttribute("href", useEnglish ? CV_FILES.en : CV_FILES.pt);
}

function setLanguage(lang) {
  currentLang = translations[lang] ? lang : "pt";
  localStorage.setItem("lang", currentLang);
  document.documentElement.lang = currentLang === "pt" ? "pt-br" : "en";
  document.title = t("meta.title");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    el.alt = t(el.dataset.i18nAlt);
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === currentLang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active);
  });

  updateCvLink();
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

setLanguage(detectLanguage());

fetch(encodeURI(CV_FILES.en), { method: "HEAD" })
  .then((res) => {
    englishCvAvailable = res.ok;
    updateCvLink();
  })
  .catch(() => {});

const elements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach((el) => observer.observe(el));

emailjs.init("S-sHCt-gLmBIJ8sPc");

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) {
    alert(t("contact.empty"));
    return;
  }

  const btn = document.querySelector(".contact-button");
  btn.textContent = t("contact.sending");
  btn.disabled = true;

  emailjs
    .send("service_2lo4qaj", "template_updwfxf", {
      from_name: name,
      message: message,
    })
    .then(() => {
      alert(t("contact.success"));
      document.getElementById("form").reset();
    })
    .catch((error) => {
      console.error(error);
      alert(t("contact.error"));
    })
    .finally(() => {
      btn.textContent = t("contact.send");
      btn.disabled = false;
    });
});

const songs = [
  {
    title: "And So It Begins",
    artist: "Artificial.Music", 
    src: "assets/music/song1.mp3",
    cover: "assets/img/cover1.jpg",
  },
  {
    title: "A Night Alone",
    artist: "TrackTribe", 
    src: "assets/music/song2.mp3",
    cover: "assets/img/cover2.png",
  },
];

let current = 0;
let hideTimeout;
const audio = document.getElementById("audio");
const bar = document.getElementById("music-bar");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  document.getElementById("music-title").textContent = song.title;
  document.getElementById("music-artist").textContent = song.artist;
  document.getElementById("music-cover").src = song.cover;
}

function showBar() {
  bar.classList.add("visible");
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => bar.classList.remove("visible"), 3000);
}

document.addEventListener("mousemove", (e) => {
  if (e.clientX < 60) showBar();
});

bar.addEventListener("mouseenter", () => {
  bar.classList.add("visible");
  clearTimeout(hideTimeout);
});

bar.addEventListener("mouseleave", () => {
  hideTimeout = setTimeout(() => bar.classList.remove("visible"), 2000);
});

document.getElementById("music-play").addEventListener("click", () => {
  const btn = document.getElementById("music-play");
  if (audio.paused) {
    audio.play();
    btn.textContent = "⏸";
  } else {
    audio.pause();
    btn.textContent = "▶";
  }
});

document.getElementById("music-next").addEventListener("click", () => {
  current = (current + 1) % songs.length;
  loadSong(current);
  audio.play();
  document.getElementById("music-play").textContent = "⏸";
});

document.getElementById("music-prev").addEventListener("click", () => {
  current = (current - 1 + songs.length) % songs.length;
  loadSong(current);
  audio.play();
  document.getElementById("music-play").textContent = "⏸";
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    document.getElementById("music-progress").value =
      (audio.currentTime / audio.duration) * 100;
  }
});

audio.addEventListener("ended", () => {
  current = (current + 1) % songs.length;
  loadSong(current);
  audio.play();
});

document.getElementById("music-progress").addEventListener("input", (e) => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

loadSong(current);
