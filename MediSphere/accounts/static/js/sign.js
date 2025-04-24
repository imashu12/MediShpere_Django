document.addEventListener("DOMContentLoaded", () => {
    const pwd1 = document.getElementById("password1");
    const pwd2 = document.getElementById("password2");
    const msg = document.getElementById("matchMsg");
  
    function checkMatch() {
      if (pwd1.value && pwd2.value) {
        if (pwd1.value === pwd2.value) {
          msg.style.color = "green";
          msg.textContent = "Passwords match ✅";
        } else {
          msg.style.color = "red";
          msg.textContent = "Passwords do not match ❌";
        }
      } else {
        msg.textContent = "";
      }
    }
  
    pwd1.addEventListener("input", checkMatch);
    pwd2.addEventListener("input", checkMatch);
  });
  