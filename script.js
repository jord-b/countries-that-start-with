document.addEventListener("DOMContentLoaded", function () {
  let currentSelectedLetter = null;
  let currentSessionId = null;
  let supabase = window.supabaseClient;
  let realTimeSubscription = null;

  // Initialize the app
  init();

  // Check if we're on a voting page
  checkForVotingSession();

  function init() {
    createAlphabetKeyboard();
    loadWorldMap();
    setupVotingButton();
  }

  function setupVotingButton() {
    const startVoteBtn = document.getElementById("start-vote-btn");
    startVoteBtn.addEventListener("click", startVotingSession);
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
      const startVoteBtn = document.getElementById("start-vote-btn");

      mainHeader.textContent = "Countries that start with...";
      countryList.innerHTML =
        '<p class="placeholder">Click a letter to see countries!</p>';
      startVoteBtn.disabled = true;

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

    // Update current selected letter
    currentSelectedLetter = letter;

    // Get countries for this letter
    const countries = countriesData[letter] || [];

    // Enable Start Vote button
    const startVoteBtn = document.getElementById("start-vote-btn");
    startVoteBtn.disabled = false;

    // Update the main header
    updateMainHeader(letter);

    // Update country list
    updateCountryList(countries, letter);

    // Clear previous highlights
    clearCountryHighlights();

    // Highlight countries on the map
    highlightCountries(countries);
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
    mainHeader.textContent = `Countries that start with ${letter}`;
  }

  function findLetterForCountry(countryId) {
    // Search through all letters in countriesData to find which letter this country belongs to
    for (const letter in countriesData) {
      const countries = countriesData[letter];
      const foundCountry = countries.find(
        (country) => country.id === countryId
      );
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
      const foundCountry = countries.find(
        (country) => country.id === countryId
      );
      if (foundCountry) {
        return foundCountry;
      }
    }
    return null; // Country not found
  }

  function showTooltip(countryId, event) {
    const country = findCountryByID(countryId);
    if (!country) return;

    const tooltip = document.getElementById("country-tooltip");
    tooltip.textContent = `${country.flag} ${country.name}`;
    tooltip.classList.add("visible");

    // Position tooltip near mouse cursor
    const x = event.clientX + 10; // 10px offset to avoid cursor overlap
    const y = event.clientY - 35; // Position above cursor

    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }

  function hideTooltip() {
    const tooltip = document.getElementById("country-tooltip");
    tooltip.classList.remove("visible");
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
          const tooltip = document.getElementById("country-tooltip");
          if (tooltip.classList.contains("visible")) {
            const x = event.clientX + 10;
            const y = event.clientY - 35;
            tooltip.style.left = x + "px";
            tooltip.style.top = y + "px";
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
            const tooltip = document.getElementById("country-tooltip");
            if (tooltip.classList.contains("visible")) {
              const x = event.clientX + 10;
              const y = event.clientY - 35;
              tooltip.style.left = x + "px";
              tooltip.style.top = y + "px";
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

  // Voting functions
  async function startVotingSession() {
    if (!currentSelectedLetter) return;

    const sessionId = generateSessionId();
    
    // Create session data
    const sessionData = {
      session_id: sessionId,
      letter: currentSelectedLetter,
      countries: countriesData[currentSelectedLetter] || [],
      completed: false
    };

    try {
      // Insert session into Supabase
      const { data, error } = await supabase
        .from('voting_sessions')
        .insert([sessionData])
        .select();

      if (error) {
        console.error('Error creating voting session:', error);
        alert('Failed to create voting session. Please try again.');
        return;
      }

      // Navigate to voting page with session ID
      const votingUrl = `${window.location.origin}${window.location.pathname}?vote=${sessionId}&letter=${currentSelectedLetter}`;
      window.location.href = votingUrl;
      
    } catch (error) {
      console.error('Error starting voting session:', error);
      alert('Failed to create voting session. Please check your internet connection.');
    }
  }

  function generateSessionId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  function checkForVotingSession() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("vote");
    const letter = urlParams.get("letter");

    if (sessionId && letter) {
      currentSessionId = sessionId;
      loadVotingSession(sessionId, letter);
    }
  }

  async function loadVotingSession(sessionId, letter) {
    try {
      // Fetch session from Supabase
      const { data: sessionData, error: sessionError } = await supabase
        .from('voting_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (sessionError) {
        console.error('Error loading session:', sessionError);
        // Create new session if not found
        await createNewSession(sessionId, letter);
        return;
      }

      // Fetch current votes for this session
      const { data: votesData, error: votesError } = await supabase
        .from('votes')
        .select('*')
        .eq('session_id', sessionId);

      if (votesError) {
        console.error('Error loading votes:', votesError);
      }

      // Process votes into format expected by UI
      const votes = {};
      if (votesData) {
        votesData.forEach(vote => {
          votes[vote.country_name] = (votes[vote.country_name] || 0) + 1;
        });
      }

      // Create session object with vote counts
      const session = {
        ...sessionData,
        votes: votes
      };

      // Set up real-time subscription for this session
      setupRealTimeSubscription(sessionId);

      if (session.completed) {
        showVotingResults(session, sessionId);
      } else {
        showVotingPage(session, sessionId);
      }
      
    } catch (error) {
      console.error('Error loading voting session:', error);
      alert('Failed to load voting session. Please check your internet connection.');
    }
  }

  async function createNewSession(sessionId, letter) {
    const sessionData = {
      session_id: sessionId,
      letter: letter,
      countries: countriesData[letter] || [],
      completed: false
    };

    const { error } = await supabase
      .from('voting_sessions')
      .insert([sessionData]);

    if (error) {
      console.error('Error creating new session:', error);
      alert('Failed to create voting session.');
      return;
    }

    const session = {
      ...sessionData,
      votes: {}
    };

    setupRealTimeSubscription(sessionId);
    showVotingPage(session, sessionId);
  }
  
  function setupRealTimeSubscription(sessionId) {
    // Clean up existing subscription
    if (realTimeSubscription) {
      supabase.removeChannel(realTimeSubscription);
    }
    
    // Subscribe to vote changes for this session
    realTimeSubscription = supabase
      .channel(`voting_session_${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          console.log('Real-time vote update:', payload);
          // Refresh vote counts when votes change
          refreshVoteCounts(sessionId);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'voting_sessions',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          console.log('Session updated:', payload);
          // Handle session completion
          if (payload.new.completed && !payload.old.completed) {
            // Session was just completed, refresh the page to show results
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        }
      )
      .subscribe();
  }
  
  async function refreshVoteCounts(sessionId) {
    try {
      // Fetch updated votes
      const { data: votesData, error } = await supabase
        .from('votes')
        .select('*')
        .eq('session_id', sessionId);
        
      if (error) {
        console.error('Error refreshing votes:', error);
        return;
      }
      
      // Process votes into counts
      const votes = {};
      if (votesData) {
        votesData.forEach(vote => {
          votes[vote.country_name] = (votes[vote.country_name] || 0) + 1;
        });
      }
      
      // Update all vote count displays
      Object.keys(votes).forEach(countryName => {
        const voteCountElement = document.querySelector(`[data-country="${countryName}"]`)?.closest('.voting-country')?.querySelector('.vote-count');
        if (voteCountElement) {
          voteCountElement.textContent = votes[countryName] || 0;
        }
      });
      
      // Update voting stats
      const session = { votes, countries: countriesData[currentSelectedLetter] || [] };
      updateVotingStats(session);
      
    } catch (error) {
      console.error('Error refreshing vote counts:', error);
    }
  }

  function showVotingPage(session, sessionId) {
    const container = document.querySelector(".container");
    container.innerHTML = `
      <div class="voting-container">
        <header class="voting-header">
          <h1>Vote for countries starting with "${session.letter}"</h1>
        </header>
        
		<div class="voting-stats">
		<div class="leading-country-display" id="leading-country-display">
			<div class="leading-country-content">
			<span class="leading-flag" id="leading-flag">🏳️</span>
			<span class="leading-name" id="leading-name">No votes yet</span>
			</div>
		</div>
		<div class="total-votes" id="total-votes">Total votes: 0</div>
		</div>
        <div class="voting-countries" id="voting-countries">
          <!-- Countries will be populated here -->
        </div>
        
        <div class="voting-actions">
          <button id="complete-voting-btn" class="complete-voting-btn">Complete Voting</button>
          <button id="share-vote-btn" class="share-vote-btn">Share Vote Link</button>
          <button id="back-home-btn" class="back-home-btn" onclick="goBackToHome()">Back to Home</button>
        </div>
      </div>
    `;

    populateVotingCountries(session, sessionId);
    setupVotingEventListeners(session, sessionId);
  }

  async function populateVotingCountries(session, sessionId) {
    const container = document.getElementById("voting-countries");
    const userId = getUserId();
    
    // Fetch user's existing votes for this session
    let userVotes = {};
    try {
      const { data: votesData, error } = await supabase
        .from('votes')
        .select('country_name')
        .eq('session_id', sessionId)
        .eq('user_id', userId);
        
      if (error) {
        console.error('Error fetching user votes:', error);
      } else if (votesData) {
        votesData.forEach(vote => {
          userVotes[vote.country_name] = true;
        });
      }
    } catch (error) {
      console.error('Error loading user votes:', error);
    }

    session.countries.forEach((country) => {
      const hasVoted = userVotes[country.name];
      const countryDiv = document.createElement("div");
      countryDiv.className = "voting-country";
      countryDiv.innerHTML = `
        <div class="country-info">
          <span class="country-flag">${country.flag}</span>
          <span class="country-name">${country.name}</span>
        </div>
        <div class="vote-section">
          <span class="vote-count">${session.votes[country.name] || 0}</span>
          <button class="vote-btn ${hasVoted ? "voted" : ""}" data-country="${
        country.name
      }">${hasVoted ? "Voted!" : "Vote"}</button>
        </div>
      `;
      container.appendChild(countryDiv);
    });

    updateVotingStats(session);
  }

  function setupVotingEventListeners(session, sessionId) {
    // Vote buttons
    document.querySelectorAll(".vote-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const countryName = e.target.dataset.country;
        castVote(session, sessionId, countryName, e.target);
      });
    });

    // Complete voting button
    document
      .getElementById("complete-voting-btn")
      .addEventListener("click", () => {
        completeVoting(session, sessionId);
      });

    // Share button
    document.getElementById("share-vote-btn").addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href);
      alert("Vote link copied to clipboard!");
    });
  }

  async function castVote(session, sessionId, countryName, buttonElement) {
    const userId = getUserId();
    
    try {
      // Check if user already voted for this country
      const { data: existingVote, error: checkError } = await supabase
        .from('votes')
        .select('*')
        .eq('session_id', sessionId)
        .eq('country_name', countryName)
        .eq('user_id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error checking existing vote:', checkError);
        return;
      }

      if (existingVote) {
        // Un-vote: remove the vote from database
        const { error: deleteError } = await supabase
          .from('votes')
          .delete()
          .eq('id', existingVote.id);

        if (deleteError) {
          console.error('Error removing vote:', deleteError);
          alert('Failed to remove vote. Please try again.');
          return;
        }

        // Update UI for un-vote
        buttonElement.textContent = "Vote";
        buttonElement.classList.remove("voted");
      } else {
        // Vote: add the vote to database
        const { error: insertError } = await supabase
          .from('votes')
          .insert({
            session_id: sessionId,
            country_name: countryName,
            user_id: userId
          });

        if (insertError) {
          console.error('Error adding vote:', insertError);
          alert('Failed to add vote. Please try again.');
          return;
        }

        // Update UI for vote
        buttonElement.textContent = "Voted!";
        buttonElement.classList.add("voted");
      }

      // The real-time subscription will automatically update the vote counts
      // But we can also immediately refresh to show the change
      setTimeout(() => refreshVoteCounts(sessionId), 100);
      
    } catch (error) {
      console.error('Error casting vote:', error);
      alert('Failed to cast vote. Please check your internet connection.');
    }
  }

  function updateVotingStats(session) {
    const totalVotes = Object.values(session.votes).reduce(
      (sum, count) => sum + count,
      0
    );
    const leadingCountry = Object.entries(session.votes).reduce(
      (leader, [country, votes]) => {
        return votes > (leader.votes || 0) ? { country, votes } : leader;
      },
      {}
    );

    // Update total votes
    document.getElementById(
      "total-votes"
    ).textContent = `Total votes: ${totalVotes}`;

    // Update leading country display
    const leadingFlag = document.getElementById("leading-flag");
    const leadingName = document.getElementById("leading-name");

    if (leadingCountry.country && leadingCountry.votes > 0) {
      // Find the country data to get the flag
      const countryData = session.countries.find(
        (c) => c.name === leadingCountry.country
      );
      leadingFlag.textContent = countryData?.flag || "🏳️";
      leadingName.textContent = `${leadingCountry.country} (${
        leadingCountry.votes
      } vote${leadingCountry.votes !== 1 ? "s" : ""})`;
    } else {
      leadingFlag.textContent = "🏳️";
      leadingName.textContent = "No votes yet";
    }
  }

  function getUserId() {
    let userId = localStorage.getItem("user_id");
    if (!userId) {
      userId = generateSessionId();
      localStorage.setItem("user_id", userId);
    }
    return userId;
  }

  async function completeVoting(session, sessionId) {
    try {
      // Update session as completed in Supabase
      const { error } = await supabase
        .from('voting_sessions')
        .update({ completed: true })
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error completing voting session:', error);
        alert('Failed to complete voting. Please try again.');
        return;
      }

      // Update local session object
      session.completed = true;
      showVotingResults(session, sessionId);
      
    } catch (error) {
      console.error('Error completing voting session:', error);
      alert('Failed to complete voting. Please check your internet connection.');
    }
  }

  function showVotingResults(session, sessionId) {
    const winner = Object.entries(session.votes).reduce(
      (leader, [country, votes]) => {
        return votes > (leader.votes || 0) ? { country, votes } : leader;
      },
      {}
    );

    const container = document.querySelector(".container");
    container.innerHTML = `
      <div class="results-container">
        <div class="celebration">
          <h1 class="celebration-title">🎉 Voting Complete! 🎉</h1>
          ${
            winner.country
              ? `
            <div class="winner-section">
              <div class="winner-content">
                <span class="winner-flag">${session.countries.find(c => c.name === winner.country)?.flag || '🏳️'}</span>
                <h2 class="winner-name">${winner.country}</h2>
                <div class="winner-stats">${winner.votes} vote${winner.votes !== 1 ? 's' : ''}</div>
              </div>
              <div class="confetti">🎊 🎈 🎉 🎊 🎈</div>
            </div>
          `
              : "<p>No votes were cast!</p>"
          }
        </div>
        
        <div class="final-results">
          <h3>Final Results:</h3>
          <div class="results-list" id="results-list">
            <!-- Results will be populated here -->
          </div>
        </div>
        
        <div class="results-actions">
          <button onclick="goBackToHome()" class="back-btn">Back to Home</button>
        </div>
      </div>
    `;

    populateResults(session);
    triggerCelebration();
  }

  function populateResults(session) {
    const resultsList = document.getElementById("results-list");
    const sortedResults = Object.entries(session.votes)
      .sort(([, a], [, b]) => b - a)
      .map(([country, votes]) => {
        const countryData = session.countries.find((c) => c.name === country);
        return { country, votes, flag: countryData?.flag || "🏳️" };
      });

    sortedResults.forEach((result, index) => {
      const resultDiv = document.createElement("div");
      resultDiv.className = `result-item ${index === 0 ? "winner" : ""}`;
      resultDiv.innerHTML = `
        <span class="result-rank">#${index + 1}</span>
        <span class="result-flag">${result.flag}</span>
        <span class="result-country">${result.country}</span>
        <span class="result-votes">${result.votes} vote${
        result.votes !== 1 ? "s" : ""
      }</span>
      `;
      resultsList.appendChild(resultDiv);
    });
  }

  function triggerCelebration() {
    // Add some celebration animations
    setTimeout(() => {
      document.querySelector(".celebration-title").style.animation =
        "bounce 1s ease-in-out";
    }, 500);
  }
  
  function goBackToHome() {
    // Clear URL parameters and reload to main page
    window.location.href = window.location.pathname;
  }

  // Make functions available globally
  window.focusOnCountry = focusOnCountry;
  window.goBackToHome = goBackToHome;
});
