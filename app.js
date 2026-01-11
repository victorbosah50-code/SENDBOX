/*
  Sendbox - Modern File Collaboration Prototype
  Licensed under Apache License 2.0
*/

// Modal
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const closeBtn = document.querySelector('.closeBtn');
const authForms = document.getElementById('authForms');

loginBtn.onclick = () => openAuth('login');
signupBtn.onclick = () => openAuth('signup');
closeBtn.onclick = () => authModal.style.display = 'none';

function openAuth(type){
  authModal.style.display = 'block';
  if(type==='login'){
    authForms.innerHTML = `
      <h2>Login</h2>
      <input type="text" id="loginUser" placeholder="Username" />
      <input type="password" id="loginPass" placeholder="Password" />
      <button onclick="login()">Login</button>
    `;
  } else {
    authForms.innerHTML = `
      <h2>Sign Up</h2>
      <input type="text" id="signupUser" placeholder="Username" />
      <input type="password" id="signupPass" placeholder="Password" />
      <button onclick="signup()">Sign Up</button>
    `;
  }
}

// Authentication
function login(){
  const u = document.getElementById('loginUser').value;
  const p = document.getElementById('loginPass').value;
  const stored = JSON.parse(localStorage.getItem('users') || '{}');
  if(stored[u] && stored[u] === p){
    alert('Login successful!');
    authModal.style.display = 'none';
  } else alert('Invalid credentials!');
}

function signup(){
  const u = document.getElementById('signupUser').value;
  const p = document.getElementById('signupPass').value;
  const stored = JSON.parse(localStorage.getItem('users') || '{}');
  if(stored[u]) return alert('User exists!');
  stored[u] = p;
  localStorage.setItem('users', JSON.stringify(stored));
  alert('Sign Up successful!');
  authModal.style.display = 'none';
}

// Free demo
const demoBtn = document.getElementById('demoBtn');
const simulatedIP = 'user-ip-' + btoa(navigator.userAgent);
const freeDemoKey = `freeDemo_${simulatedIP}`;

demoBtn.onclick = () => {
  if(localStorage.getItem(freeDemoKey)){
    return alert('Free demo already used. Upgrade for unlimited sends.');
  }
  localStorage.setItem(freeDemoKey,true);
  localStorage.setItem(`demoSends_${simulatedIP}`,3);
  alert('Free demo started! You have 3 sends.');
};

// Dashboard
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const voiceUpload = document.getElementById('voiceUpload');

function sendFile(fileName){
  let sendsLeft = parseInt(localStorage.getItem(`demoSends_${simulatedIP}`)||0);
  if(sendsLeft>0){
    sendsLeft--;
    localStorage.setItem(`demoSends_${simulatedIP}`,sendsLeft);
    alert(`File "${fileName}" sent! Sends left: ${sendsLeft}`);
  } else if(localStorage.getItem(`paidUser_${simulatedIP}`)){
    alert(`Paid user: File "${fileName}" sent!`);
  } else alert('Demo limit reached! Upgrade to paid plan.');
}

fileInput.onchange = () => {
  fileList.innerHTML = '';
  Array.from(fileInput.files).forEach(file=>{
    const div = document.createElement('div');
    div.textContent = file.name;
    const sendBtn = document.createElement('button');
    sendBtn.textContent = 'Send';
    sendBtn.onclick = ()=>sendFile(file.name);
    div.appendChild(sendBtn);
    fileList.appendChild(div);
  });
};

// Voice
voiceUpload.onclick = () => {
  if(!('webkitSpeechRecognition' in window)) return alert('Voice commands not supported!');
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.start();
  recognition.onresult = (event)=>{
    const command = event.results[0][0].transcript.toLowerCase();
    if(command.includes('upload')) fileInput.click();
    else if(command.includes('send')){
      const firstFile = fileInput.files[0];
      if(firstFile) sendFile(firstFile.name);
      else alert('No file selected!');
    } else if(command.includes('create')) alert('Simulate creating a new file...');
    else alert('Voice command not recognized');
  };
};

// Paid badge
if(localStorage.getItem(`paidUser_${simulatedIP}`)){
  const badge = document.createElement('div');
  badge.textContent = `Paid User - ${localStorage.getItem(`paidUser_${simulatedIP}`)} Plan`;
  badge.style.color = 'green';
  badge.style.fontWeight = 'bold';
  badge.style.margin = '1rem';
  document.getElementById('dashboard').prepend(badge);
}
