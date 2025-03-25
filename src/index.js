document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters();
    setupVoteForm();
    setupResetButton();
    setupCharacterForm();
  });

  function fetchCharacters() {
    fetch("http://localhost:3000/characters")
      .then(response => response.json())
      .then(characters => {
        const characterBar = document.getElementById("character-bar");
        characterBar.innerHTML = ""; 

        characters.forEach(character => {
          const span = document.createElement("span");
          span.textContent = character.name; 
          span.style.marginRight = '10px';
          span.addEventListener("click", () => displayCharacterDetails(character));
          characterBar.appendChild(span);
        });
      });
  }
  
  function displayCharacterDetails(characters) {
    document.getElementById("name").textContent = characters.name;
    document.getElementById("image").src = character.image;
    document.getElementById("vote-count").textContent = character.votes;
    document.getElementById("votes-form").dataset.id = character.id; 
  }
  
  function setupVoteForm() {
    document.getElementById("votes-form").addEventListener("submit", event => {
      event.preventDefault();
      const votesInput = document.getElementById("votes");
      const voteCount = document.getElementById("vote-count");
  
      let newVotes = parseInt(voteCount.textContent) + parseInt(votesInput.value);
      voteCount.textContent = newVotes;
  
      votesInput.value = "";
    });
  }
  
  
  function setupResetButton() {
    document.getElementById("reset-btn").addEventListener("click", () => {
      document.getElementById("vote-count").textContent = "0";
    });
  }
  
  function setupCharacterForm() {
    const characterForm = document.getElementById("character-form");
    if (!characterForm) return;
  
    characterForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const image = document.getElementById("image-url").value;
  
      const newCharacter = { name, image, votes: 0 };
  
      fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCharacter)
      })
        .then(response => response.json())
        .then(character => {
          fetchCharacters(); 
          displayCharacterDetails(character); 
        });
  
      event.target.reset(); 
    });
  }