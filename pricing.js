// Pricing Table with Monthly/Yearly Toggle
document.addEventListener('DOMContentLoaded', () => {
  const pricingSection = document.getElementById('pricing');
  pricingSection.innerHTML = `
    <h2>Pricing Plans</h2>
    <div class="pricing-toggle">
      <button id="monthlyBtn">Monthly</button>
      <button id="yearlyBtn">Yearly</button>
    </div>
    <div id="plans"></div>
  `;

  const plansData = {
    monthly: [
      {name:'Basic', price:29, features:['3 Users','3 Sends/month','Basic Support']},
      {name:'Professional', price:59, features:['5 Users','Unlimited Sends','Priority Support']},
      {name:'Enterprise', price:'Custom', features:['Unlimited Users','Unlimited Sends','Dedicated Support']}
    ],
    yearly: [
      {name:'Basic', price:29*12*0.9, features:['3 Users','3 Sends/month','Basic Support']},
      {name:'Professional', price:59*12*0.9, features:['5 Users','Unlimited Sends','Priority Support']},
      {name:'Enterprise', price:'Custom', features:['Unlimited Users','Unlimited Sends','Dedicated Support']}
    ]
  };

  const plansDiv = document.getElementById('plans');

  function simulatePayment(planName){
    const payment = confirm(`Simulate payment for ${planName}? Click OK for success.`);
    if(payment){
      alert(`${planName} plan activated! Unlimited sends unlocked.`);
      localStorage.setItem(`paidUser_${simulatedIP}`, planName);
      location.reload();
    } else {
      alert('Payment failed. Try again.');
    }
  }

  function renderPlans(type='monthly'){
    plansDiv.innerHTML = '';
    plansData[type].forEach(p=>{
      const div = document.createElement('div');
      div.className='plan';
      div.innerHTML = `<h3>${p.name}</h3><p>${p.price === 'Custom' ? 'Custom Pricing' : '$'+p.price}</p>
      <ul>${p.features.map(f=>'<li>'+f+'</li>').join('')}</ul>
      <button onclick="${p.name==='Basic' ? "alert('Basic plan is free!')" : `simulatePayment('${p.name}')`}">Sign Up</button>`;
      plansDiv.appendChild(div);
    });
  }

  renderPlans();
  document.getElementById('monthlyBtn').onclick = ()=>renderPlans('monthly');
  document.getElementById('yearlyBtn').onclick = ()=>renderPlans('yearly');
});
