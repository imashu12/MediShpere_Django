document.addEventListener("DOMContentLoaded", () => {
  const autoBtn = document.getElementById("autoDetectBtn");

  if (autoBtn) {
    autoBtn.addEventListener("click", () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const location = await reverseGeocode(lat, lon);
            if (location) {
              window.location.href = `/search-blood/?city=${encodeURIComponent(location)}`;
            } else {
              showError();
            }
          },
          showError
        );
      } else {
        showError();
      }
    });
  }

  function showError() {
    document.getElementById("locationError").style.display = "block";
  }

  async function reverseGeocode(lat, lon) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await res.json();
      return (data.address.city || data.address.town || data.address.state || "").toLowerCase().trim();
    } catch {
      return null;
    }
  }
});
