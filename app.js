// Firebase (replace with your real config)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

function selectPlan(plan) {
  localStorage.setItem("plan", plan);
  if(plan === "free") {
    location.href = "demo.html";
  } else {
    // Stripe Checkout redirect (test mode)
    window.location.href = "https://buy.stripe.com/test_XXXXXXXX";
  }
}

function uploadFiles(files) {
  [...files].forEach(file => {
    const ref = storage.ref('files/' + file.name);
    ref.put(file).then(() => {
      const div = document.createElement('div');
      div.textContent = file.name;
      document.getElementById('fileGrid').appendChild(div);
    });
  });
}

function startVoice() {
  const rec = new webkitSpeechRecognition();
  rec.onresult = e => {
    alert("Voice Command: " + e.results[0][0].transcript);
  };
  rec.start();
}
