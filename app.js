// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Modals
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const dashboardModal = document.getElementById('dashboardModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const signupHeroBtn = document.getElementById('signupHeroBtn');
    const demoBtn = document.getElementById('demoBtn');
    const closes = document.querySelectorAll('.close');

    // Open modals
    loginBtn.onclick = () => loginModal.style.display = 'block';
    signupBtn.onclick = signupHeroBtn.onclick = () => signupModal.style.display = 'block';
    demoBtn.onclick = checkDemoAccess;

    // Close modals
    closes.forEach(close => {
        close.onclick = () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
            dashboardModal.style.display = 'none';
        };
    });

    window.onclick = (event) => {
        if (event.target == loginModal) loginModal.style.display = 'none';
        if (event.target == signupModal) signupModal.style.display = 'none';
        if (event.target == dashboardModal) dashboardModal.style.display = 'none';
    };

    // Signup form
    const signupForm = document.getElementById('signupForm');
    const planSelect = document.getElementById('planSelect');
    const paymentSection = document.getElementById('paymentSection');
    const simulatePayment = document.getElementById('simulatePayment');

    planSelect.onchange = () => {
        paymentSection.style.display = planSelect.value !== 'free' ? 'block' : 'none';
    };

    simulatePayment.onclick = () => {
        alert('Payment simulated successfully!');
    };

    signupForm.onsubmit = (e) => {
        e.preventDefault();
        alert('Signed up successfully!');
        signupModal.style.display = 'none';
        openDashboard();
    };

    // Login form
    const loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        alert('Logged in successfully!');
        loginModal.style.display = 'none';
        openDashboard();
    };

    // Demo access with "IP" restriction simulation using LocalStorage
    function checkDemoAccess() {
        const trialKey = 'sendbox_trial';
        let trials = parseInt(localStorage.getItem(trialKey)) || 0;
        if (trials >= 3) {
            alert('You have reached the maximum free trials. Please sign up for more.');
            return;
        }
        trials++;
        localStorage.setItem(trialKey, trials);
        openDashboard(true); // demo mode
    }

    // Dashboard
    function openDashboard(demo = false) {
        dashboardModal.style.display = 'block';
        initVoiceCommands(demo);
        initFileUpload();
    }

    // Voice commands using Web Speech API
    function initVoiceCommands(demo) {
        const startVoice = document.getElementById('startVoice');
        const voiceStatus = document.getElementById('voiceStatus');
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        startVoice.onclick = () => {
            recognition.start();
            voiceStatus.textContent = 'Listening...';
        };

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            voiceStatus.textContent = `Heard: ${command}`;
            processVoiceCommand(command, demo);
        };

        recognition.onerror = () => {
            voiceStatus.textContent = 'Error occurred in recognition.';
        };
    }

    function processVoiceCommand(command, demo) {
        if (command.includes('upload file')) {
            document.getElementById('fileUpload').click();
        } else if (command.includes('create file')) {
            const fileName = prompt('Enter file name:');
            if (fileName) addFile(fileName, 'Created via voice');
        } else if (command.includes('send to')) {
            const contact = command.split('send to')[1].trim();
            alert(`Simulating send to ${contact}`);
            if (demo) checkSendsLimit();
        } else if (command.includes('edit file')) {
            alert('Simulating file edit');
        }
    }

    // File upload simulation
    function initFileUpload() {
        const fileUpload = document.getElementById('fileUpload');
        const uploadBtn = document.getElementById('uploadBtn');
        uploadBtn.onclick = () => fileUpload.click();

        fileUpload.onchange = (e) => {
            const file = e.target.files[0];
            if (file) addFile(file.name, file.type);
        };
    }

    function addFile(name, type) {
        const filesList = document.getElementById('filesList');
        const li = document.createElement('li');
        li.textContent = `${name} (${type})`;
        filesList.appendChild(li);
    }

    // Simulate email integration - static contacts

    // Demo sends limit
    function checkSendsLimit() {
        const sendsKey = 'demo_sends';
        let sends = parseInt(localStorage.getItem(sendsKey)) || 0;
        if (sends >= 3) {
            alert('Demo send limit reached.');
            return false;
        }
        sends++;
        localStorage.setItem(sendsKey, sends);
        return true;
    }

    // Simulate backend with LocalStorage for users/files etc.
    // For simplicity, not fully implemented here.
});
