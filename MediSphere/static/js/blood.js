document.addEventListener('DOMContentLoaded', () => {
    // Get the location from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get("location") || "your area";
    document.getElementById("searchedLocation").textContent = location;
  
    // Static example data (can be replaced with API or database)
    const hospitals = [
      {
        name: "Apollo Hospital",
        location: location,
        blood: {
          "A+": 12,
          "O+": 8,
          "B+": 5,
          "AB-": 2
        }
      },
      {
        name: "Max Healthcare",
        location: location,
        blood: {
          "A+": 4,
          "O-": 3,
          "B-": 1
        }
      },
      {
        name: "Fortis Hospital",
        location: location,
        blood: {
          "A-": 7,
          "O+": 10,
          "AB+": 6
        }
      }
    ];
  
    // Render the results in the container
    const container = document.getElementById("bloodResultsContainer");
  
    hospitals.forEach(hospital => {
      const card = document.createElement("div");
      card.className = "blood-card";
  
      // Render blood groups as tags
      let bloodInfo = "";
      for (let group in hospital.blood) {
        bloodInfo += `<span class="blood-group">${group}: ${hospital.blood[group]}</span>`;
      }
  
      // Final HTML inside each hospital card
      card.innerHTML = `
        <h3>${hospital.name}</h3>
        <p><strong>Location:</strong> ${hospital.location}</p>
        <div class="blood-info">${bloodInfo}</div>
      `;
  
      container.appendChild(card);
    });
  });
  