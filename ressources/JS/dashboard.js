const axios = require("axios").default;
const regeneratorRuntime = require("regenerator-runtime");

(() => {
  async function getAllExistingCharacters() {
    try {
      return await axios.get(
        "https://character-database.becode.xyz/characters"
      );
    } catch (error) {
      console.error(error);
    }
  }
}

function displayAllCharacters(charactersArray)
{
    const characterElement = document.getElementById("character");
    const template = document.getElementById("tpl-character");

    charactersArray.forEach(character => {
        const clone = template.contentEditable.cloneNode(true);
        
        clone.getElementById("name").innerHTML = character.name;
        clone.getElementById("shortdescription").innerHTML = character.shortdescription;
        clone.getElementById("description").innerHTML = characters.description;
        clone.getElementById("image").src = character.image;

        characterElement.appendChild(clone);
    });
}

getAllExistingCharacters()
    .then(charactersArray => {
        displayAllCharacters(charactersArray.data);
    })
    .catch(error => console.error(error));

}) ();