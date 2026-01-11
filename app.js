// Login / Signup Simulation
function simulateLogin(userEmail) {
  let users = JSON.parse(localStorage.getItem('users') || '{}');
  if (!users[userEmail]) {
    users[userEmail] = { created: Date.now() };
    localStorage.setItem('users', JSON.stringify(users));
  }
}

// IP-based demo restriction
function checkIPDemo() {
  let ip = 'demo_ip'; // Simulated
  let ipAccess = JSON.parse(localStorage.getItem('ipAccess') || '{}');
  if (ipAccess[ip]) return false;
  ipAccess[ip] = true;
  localStorage.setItem('ipAccess', JSON.stringify(ipAccess));
  return true;
}
