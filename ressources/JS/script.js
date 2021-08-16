const axios = require("axios").default; // avec intellisense/autocomplete
const regeneratorRuntime = require("regenerator-runtime");
const { Remarkable } = require("remarkable");
var md = new Remarkable();

// Class character
class Character {
  constructor(name, shortDescription, description, image) {
    this.name = name;
    this.shortDescription = shortDescription;
    this.description = description;
    this.image = image;
  }
}

// Main function
(function main() {
  // Déclaration de variables globales du programme
  let charactersID = [];
  let viewButtons = [];
  let editButtons = [];
  let deleteButtons = [];
  let toggleButtons = [];

  let characterToEdit = {};

  // HTML element recovery
  const viewWindow = document.getElementById("overlayView");
  const createWindow = document.getElementById("overlayCreation");
  const editWindow = document.getElementById("overlayEdit");

  // Program

  // Cards containing API data
  axiosGetAllExistingCharacters()
    .then((charactersArray) => {
      displayAllCharacters(charactersArray.data);
      getAllButtons();
      toggleScroll();
    })
    .catch((error) => console.error(error));

  // Buttons

  document.getElementById("btnCreation").addEventListener("click", () => {
    resetForm();
    displayWindow(createWindow);
  });

  document
    .getElementById("createSubmitButton")
    .addEventListener("click", () => {
      const characterToAdd = createOneCharacter();

      axiosPostOneCharacter(characterToAdd)
        .then((character) => {
          undisplayWindow(createWindow);
          window.location.reload(false);
        })
        .catch((error) => console.error(error));
    });

  document.getElementById("editSubmitButton").addEventListener("click", () => {
    let editedCharacter = changeValuesToEditOneCharacter(characterToEdit);

    axiosUpdateOneCharacter(editedCharacter)
      .then((data) => {
        undisplayWindow(editWindow);
        window.location.reload(false);
      })
      .catch((error) => console.error(error));
  });

  document
    .getElementById("createImgSelector")
    .addEventListener("change", () => {
      readImage(
        document.getElementById("createImgSelector"),
        document.getElementById("createImgPreview")
      );
    });

  document.getElementById("editImgSelector").addEventListener("change", () => {
    readImage(
      document.getElementById("editImgSelector"),
      document.getElementById("editImgPreview")
    );
  });

  document.getElementById("closeView").addEventListener("click", () => {
    undisplayWindow(viewWindow);
  });

  document.getElementById("closeCreate").addEventListener("click", () => {
    undisplayWindow(createWindow);
  });

  document.getElementById("closeEdit").addEventListener("click", () => {
    undisplayWindow(editWindow);
  });

  // End of main program

  // FUNCTIONS API CALLS

  async function axiosGetAllExistingCharacters() {
    try {
      return await axios.get(
        "https://character-database.becode.xyz/characters"
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function axiosGetOneCharacter(characterID) {
    try {
      return await axios.get(
        "https://character-database.becode.xyz/characters" + "/" + characterID
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function axiosPostOneCharacter(newCharacter) {
    try {
      return await axios.post(
        "https://character-database.becode.xyz/characters",
        {
          name: newCharacter.name,
          shortDescription: newCharacter.shortDescription,
          description: newCharacter.description,
          image: newCharacter.image,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function axiosUpdateOneCharacter(characterToUpdate) {
    try {
      return await axios.put(
        "https://character-database.becode.xyz/characters" +
          "/" +
          characterToUpdate.id,
        {
          name: characterToUpdate.name,
          shortDescription: characterToUpdate.shortDescription,
          description: characterToUpdate.description,
          image: characterToUpdate.image,
        }
      );
    } catch (error) {
      console.error(error);
    }

    console.log(characterToUpdate.id);
  }

  async function axiosDeleteOneCharacter(characterID) {
    try {
      return await axios.delete(
        "https://character-database.becode.xyz/characters" + "/" + characterID
      );
    } catch (error) {
      console.error(error);
    }
  }

  // FUNCTIONS MANAGING DATA

  function getAllButtons() {
    viewButtons = document.getElementsByClassName("viewHero");
    editButtons = document.getElementsByClassName("editHero");
    deleteButtons = document.getElementsByClassName("deleteHero");

    for (let i = 0; i < viewButtons.length; i++) {
      viewButtons[i].addEventListener("click", async () => {
        const characterToView = await axiosGetOneCharacter(charactersID[i]);
        displayWindow(viewWindow);
        displayOneCharacter(characterToView.data);
      });

      editButtons[i].addEventListener("click", async () => {
        const characterToEdit = await axiosGetOneCharacter(charactersID[i]);
        displayWindow(editWindow);
        retrieveValuesToEditOneCharacter(characterToEdit.data);
      });

      deleteButtons[i].addEventListener("click", async () => {
        return await deleteOneCharacter(i);
      });
    }
  }

  function toggleScroll() {
    toggleButtons = document.getElementsByClassName("toggleScroll");
    const bodyElement = document.querySelector("body");

    for (let i = 0; i < toggleButtons.length; i++) {
      toggleButtons[i].addEventListener("click", () => {
        bodyElement.classList.toggle("fixBackground");
      });
    }
  }

  function displayAllCharacters(charactersArray) {
    const charactersElement = document.getElementById("charactersBoard");
    const template = document.getElementById("tpl-card");

    charactersArray.forEach((character) => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".card-title").innerHTML = character.name;
      clone.querySelector(".card-text").innerHTML = md.render(
        character.shortDescription
      );
      clone.querySelector(".card-img").src =
        "data:image/*;base64," + character.image;
      charactersID.push(character.id);

      charactersElement.appendChild(clone);
    });
  }

  function displayOneCharacter(character) {
    document.querySelector(".viewCardTitle").innerHTML = character.name;
    document.querySelector(".viewCardText").innerHTML = md.render(
      character.shortDescription
    );
    document.querySelector(".viewCardLongtext").innerHTML = md.render(
      character.description
    );
    document.querySelector(".viewCardImg").src =
      "data:image/*;base64," + character.image;
  }

  function retrieveValuesToEditOneCharacter(character) {
    document.getElementById("editName").value = character.name;
    document.getElementById("editShortDescription").value =
      character.shortDescription;
    document.getElementById("editDescription").value = character.description;
    document.getElementById("editImgPreview").src =
      "data:image/*;base64," + character.image;

    characterToEdit = character;
  }

  function changeValuesToEditOneCharacter(character) {
    const nameInput = document.getElementById("editName").value;
    const shortDescriptionInput = document.getElementById(
      "editShortDescription"
    ).value;
    const descriptionInput = document.getElementById("editDescription").value;

    const imagePreviewElement = document.getElementById("editImgPreview");

    const base64String = imagePreviewElement.src
      .replace("data:", "")
      .replace(/^.+,/, "");

    character.name = nameInput;
    character.shortDescription = shortDescriptionInput;
    character.description = descriptionInput;
    character.image = base64String;

    return character;
  }

  async function deleteOneCharacter(index) {
    let response = confirm("Are you sure you want to delete this character?");

    if (response === true) {
      const deletedCharacter = await axiosDeleteOneCharacter(
        charactersID[index]
      );
      window.location.reload(false);
      return deletedCharacter;
    } else {
      alert("The character has not been deleted.");
    }
  }

  function resetForm() {
    document.getElementById("createName").value = "";
    document.getElementById("createShortDescription").value = "";
    document.getElementById("createDescription").value = "";
    document.getElementById("createImgPreview").src = "";
    document.getElementById("createImgSelector").value = "";
  }

  function createOneCharacter() {
    const nameInput = document.getElementById("createName").value;
    const shortDescriptionInput = document.getElementById(
      "createShortDescription"
    ).value;
    const descriptionInput = document.getElementById("createDescription").value;

    const imagePreviewElement = document.getElementById("createImgPreview");
    let base64String = "";

    if (imagePreviewElement.src != window.location.href) {
      base64String = imagePreviewElement.src
        .replace("data:", "")
        .replace(/^.+,/, "");
    } else {
      base64String = "";
    }

    const newCharacter = new Character(
      nameInput,
      shortDescriptionInput,
      descriptionInput,
      base64String
    );

    return newCharacter;
  }

  function readImage(imageSelector, imagePreview) {
    const imageSelectorInput = imageSelector.files[0];
    const imagePreviewElement = imagePreview;

    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      imagePreviewElement.src = event.target.result;
    });
    reader.readAsDataURL(imageSelectorInput);
  }

  function displayWindow(window) {
    window.style.display = "block";
  }

  function undisplayWindow(window) {
    window.style.display = "none";
  }
})();
