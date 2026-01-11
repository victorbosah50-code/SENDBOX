function choosePlan(plan) {
  localStorage.setItem("sendboxPlan", plan);
  if (plan === "enterprise") {
    window.location.href = "#contact";
  } else {
    window.location.href = "signup.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("selectedPlan");
  if (el) {
    const plan = localStorage.getItem("sendboxPlan");
    el.textContent = "Selected Plan: " + (plan || "Free");
  }
});

function completeSignup() {
  const plan = localStorage.getItem("sendboxPlan");
  if (plan === "free") {
    window.location.href = "demo.html";
  } else {
    alert("Redirecting to secure payment (Stripe test mode)");
  }
}

function startVoice() {
  const rec = new webkitSpeechRecognition();
  rec.onresult = e => alert("Voice command: " + e.results[0][0].transcript);
  rec.start();
}
