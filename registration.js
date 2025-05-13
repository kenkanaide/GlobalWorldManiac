document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("registrationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneCode = document.getElementById("country-code").value;
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const school = document.getElementById("school").value.trim();
    const paymentMethod = document.getElementById("payment-method").value;

    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, phoneCode, phone, address, school, paymentMethod }),
    });

    const data = await res.json();
    alert(data.message);
  });
});
function validateForm() {
  // validation logic here
  return true; // or false if invalid
}
fetch("http://localhost:3000/register", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
})
