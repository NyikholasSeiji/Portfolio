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
    alert("Please fill in all fields.");
    return;
  }

  const btn = document.querySelector(".contact-button");
  btn.textContent = "Sending...";
  btn.disabled = true;

  emailjs
    .send("service_2lo4qaj", "template_updwfxf", {
      from_name: name,
      message: message,
    })
    .then(() => {
      alert("Message sent successfully!");
      document.getElementById("form").reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send. Please try again.");
    })
    .finally(() => {
      btn.textContent = "Send via Email";
      btn.disabled = false;
    });
});
