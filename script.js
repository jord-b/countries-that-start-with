document.addEventListener("DOMContentLoaded", function () {
  let currentSelectedLetter = null;

  // Initialize the app
  init();

  function init() {
    createAlphabetKeyboard();
    loadWorldMap();
  }

  function createAlphabetKeyboard() {
    const keyboard = document.querySelector(".alphabet-keyboard");
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let letter of alphabet) {
      const button = document.createElement("button");
      button.className = "letter-btn";
      button.textContent = letter;
      button.addEventListener("click", () => selectLetter(letter));
      keyboard.appendChild(button);
    }
  }

  function selectLetter(letter) {
    // Check if this letter is already selected (toggle functionality)
    if (currentSelectedLetter === letter) {
      // Deselect the letter
      document.querySelectorAll(".letter-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      currentSelectedLetter = null;

      // Clear all highlights
      clearCountryHighlights();

      // Reset header and sidebar to default state
      const mainHeader = document.querySelector("h1");
      const countryList = document.getElementById("country-list");

      mainHeader.textContent = "Countries that start with...";
      countryList.innerHTML =
        '<p class="placeholder">Click a letter to see countries!</p>';

      return; // Exit early since we're deselecting
    }

    // Update button states for new selection
    document.querySelectorAll(".letter-btn").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.textContent === letter) {
        btn.classList.add("active");
      }
    });

    currentSelectedLetter = letter;

    // Clear previous highlights
    clearCountryHighlights();

    // Get countries for this letter
    const countries = countriesData[letter] || [];

    // Highlight countries on map
    highlightCountries(countries);

    // Update main header and country list
    updateMainHeader(letter);
    updateCountryList(countries, letter);
  }

  function highlightCountries(countries) {
    countries.forEach((country) => {
      // Use the ISO 2-letter code directly as the ID
      const countryId = country.id.toLowerCase();

      // Select the country element by its ID
      const countryElement = document.getElementById(countryId);
      if (countryElement) {
        countryElement.classList.add("highlighted");
      }

      // Also try to find any child paths if it's a group element
      const groupElement = document.querySelector(`#${countryId}`);
      if (groupElement) {
        const paths = groupElement.querySelectorAll("path");
        paths.forEach((path) => {
          path.classList.add("highlighted");
        });
      }
    });
  }

  function clearCountryHighlights() {
    document.querySelectorAll(".highlighted").forEach((element) => {
      element.classList.remove("highlighted");
    });
  }

  function updateMainHeader(letter) {
    const mainHeader = document.querySelector("h1");
    mainHeader.textContent = `Countries that start with "${letter}"`;
  }
  
  function findLetterForCountry(countryId) {
    // Search through all letters in countriesData to find which letter this country belongs to
    for (const letter in countriesData) {
      const countries = countriesData[letter];
      const foundCountry = countries.find(country => country.id === countryId);
      if (foundCountry) {
        return letter;
      }
    }
    return null; // Country not found
  }
  
  function findCountryByID(countryId) {
    // Search through all letters in countriesData to find the country object
    for (const letter in countriesData) {
      const countries = countriesData[letter];
      const foundCountry = countries.find(country => country.id === countryId);
      if (foundCountry) {
        return foundCountry;
      }
    }
    return null; // Country not found
  }
  
  function showTooltip(countryId, event) {
    const country = findCountryByID(countryId);
    if (!country) return;
    
    const tooltip = document.getElementById('country-tooltip');
    tooltip.textContent = `${country.flag} ${country.name}`;
    tooltip.classList.add('visible');
    
    // Position tooltip near mouse cursor
    const x = event.clientX + 10; // 10px offset to avoid cursor overlap
    const y = event.clientY - 35; // Position above cursor
    
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }
  
  function hideTooltip() {
    const tooltip = document.getElementById('country-tooltip');
    tooltip.classList.remove('visible');
  }

  function updateCountryList(countries, letter) {
    const countryList = document.getElementById("country-list");

    if (countries.length === 0) {
      countryList.innerHTML = `<p class="placeholder">No countries start with "${letter}"</p>`;
      return;
    }

    const countryItems = countries
      .map(
        (country) => `
            <div class="country-item" onclick="focusOnCountry('${country.id}')">
                <span class="country-flag">${country.flag}</span>
                <span class="country-name">${country.name}</span>
            </div>
        `
      )
      .join("");

    countryList.innerHTML = countryItems;
  }

  function focusOnCountry(countryId) {
    // Clear all highlights first
    clearCountryHighlights();

    // Highlight only the selected country using ISO code
    const countryLowerId = countryId.toLowerCase();
    const countryElement = document.getElementById(countryLowerId);

    if (countryElement) {
      countryElement.classList.add("highlighted");
      countryElement.style.transform = "scale(1.05)";
      countryElement.style.transformOrigin = "center";

      // Remove the scale effect after animation
      setTimeout(() => {
        countryElement.style.transform = "";
      }, 500);
    }

    // Also try to find any child paths if it's a group element
    const groupElement = document.querySelector(`#${countryLowerId}`);
    if (groupElement) {
      const paths = groupElement.querySelectorAll("path");
      paths.forEach((path) => {
        path.classList.add("highlighted");
        path.style.transform = "scale(1.05)";
        path.style.transformOrigin = "center";

        setTimeout(() => {
          path.style.transform = "";
        }, 500);
      });
    }
  }

  async function loadWorldMap() {
    const mapContainer = document.getElementById("world-map");

    // Show loading message
    mapContainer.innerHTML = '<div class="loading">Loading world map...</div>';

    try {
      // Load the proper world map SVG from GitHub
      const response = await fetch(
        "https://raw.githubusercontent.com/flekschas/simple-world-map/master/world-map.svg"
      );
      const svgText = await response.text();

      // Parse and insert the SVG
      mapContainer.innerHTML = svgText;

      // Wait a brief moment for DOM to settle, then add event listeners
      setTimeout(() => {
        addCountryEventListeners();
      }, 100);
    } catch (error) {
      console.error("Error loading map:", error);
      // Fallback to a basic world map if the external SVG fails to load
      const fallbackSvg = createFallbackWorldMap();
      mapContainer.innerHTML = fallbackSvg;
      setTimeout(() => {
        addCountryEventListeners();
      }, 100);
    }
  }

  function addCountryEventListeners() {
    const mapContainer = document.getElementById("world-map");

    // Add event listeners specifically to path elements within the SVG
    const pathElements = mapContainer.querySelectorAll("svg path");
    const groupElements = mapContainer.querySelectorAll("svg g");

    console.log(
      `Found ${pathElements.length} path elements and ${groupElements.length} group elements`
    );

    // Add listeners to individual path elements
    pathElements.forEach((element) => {
      element.addEventListener("mouseenter", function (event) {
        // Only add hover effect if not already highlighted
        if (!this.classList.contains("highlighted")) {
          this.classList.add("hovered");
        }
        
        // Show tooltip with country name
        const countryId = this.id?.toUpperCase();
        if (countryId) {
          showTooltip(countryId, event);
        }
      });

      element.addEventListener("mouseleave", function () {
        // Remove hover effect
        this.classList.remove("hovered");
        // Hide tooltip
        hideTooltip();
      });
      
      element.addEventListener("mousemove", function (event) {
        // Update tooltip position as mouse moves
        const countryId = this.id?.toUpperCase();
        if (countryId) {
          const tooltip = document.getElementById('country-tooltip');
          if (tooltip.classList.contains('visible')) {
            const x = event.clientX + 10;
            const y = event.clientY - 35;
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
          }
        }
      });
      
      element.addEventListener("click", function () {
        // Get the country ID from the element
        const countryId = this.id?.toUpperCase();
        if (countryId) {
          const letter = findLetterForCountry(countryId);
          if (letter) {
            selectLetter(letter);
          }
        }
      });
    });

    // Add listeners to group elements (for multi-part countries)
    groupElements.forEach((element) => {
      if (element.id && element.id !== "world-map") {
        // Skip the root SVG group
        element.addEventListener("mouseenter", function (event) {
          if (!this.classList.contains("highlighted")) {
            this.classList.add("hovered");
          }
          
          // Show tooltip with country name
          const countryId = this.id?.toUpperCase();
          if (countryId) {
            showTooltip(countryId, event);
          }
        });

        element.addEventListener("mouseleave", function () {
          this.classList.remove("hovered");
          // Hide tooltip
          hideTooltip();
        });
        
        element.addEventListener("mousemove", function (event) {
          // Update tooltip position as mouse moves
          const countryId = this.id?.toUpperCase();
          if (countryId) {
            const tooltip = document.getElementById('country-tooltip');
            if (tooltip.classList.contains('visible')) {
              const x = event.clientX + 10;
              const y = event.clientY - 35;
              tooltip.style.left = x + 'px';
              tooltip.style.top = y + 'px';
            }
          }
        });
        
        element.addEventListener("click", function () {
          // Get the country ID from the group element
          const countryId = this.id?.toUpperCase();
          if (countryId) {
            const letter = findLetterForCountry(countryId);
            if (letter) {
              selectLetter(letter);
            }
          }
        });
      }
    });
  }

  function createFallbackWorldMap() {
    return `
            <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="background: #e3f2fd;">
                <text x="400" y="200" text-anchor="middle" fill="#666" font-size="16">🗺️ World Map</text>
                <text x="400" y="230" text-anchor="middle" fill="#888" font-size="12">Select a letter to highlight countries!</text>
            </svg>
        `;
  }

  // Make focusOnCountry available globally for onclick handlers
  window.focusOnCountry = focusOnCountry;
});
