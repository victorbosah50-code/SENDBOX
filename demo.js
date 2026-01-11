const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const fileGrid = document.getElementById('file-grid');
const sendBtn = document.getElementById('send-btn');
const voiceBtn = document.getElementById('voice-btn');

let filesUploaded = [];

uploadBtn.addEventListener('click', () => {
  const files = fileInput.files;
  for (let f of files) {
    filesUploaded.push(f);
    const div = document.createElement('div');
    div.textContent = f.name;
    div.className = 'file-item';
    fileGrid.appendChild(div);
  }
});

// Voice Command Simulation
voiceBtn.addEventListener('click', () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();
  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    if (command.includes('upload')) alert('Voice Upload Triggered!');
  };
});

// Send Files Simulation
sendBtn.addEventListener('click', () => {
  const sender = document.getElementById('sender-name').value;
  const fromEmail = document.getElementById('sender-email').value;
  const toEmail = document.getElementById('receiver-email').value;
  const message = document.getElementById('message').value;
  if (!sender || !fromEmail || !toEmail) return alert('Please fill all fields.');
  alert(`Sent ${filesUploaded.length} file(s) from ${sender} (${fromEmail}) to ${toEmail}`);
});
