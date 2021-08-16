/*  (async() => {
  let response = await fetch("https://character-database.becode.xyz/characters");
  let data = await response.json();

  data.forEach(obj => {
      let template = document.getElementsByTagName("template")[0];
      let target = document.getElementById("target");
      let clone = template.content.cloneNode(true);

      clone.querySelector(".image").src= `data:image/png;base64,${obj.image}`
      clone.querySelector(".name").innerHTML= obj.name;
      clone.querySelector(".shortDescription").innerHTML= obj.shortDescription;

      target.appendChild(clone);
  });
})();*/

(async () => {
    const express = require("express");
    const app = express();
    app.use(cors({
        origin: "*"
    }))

    const template = document.getElementsById("tpl-char");
    let target = document.getElementById("target");
    let data = await fetch("https://character-database.becode.xyz/characters");
    let char = await data.json();
    let clone = template.content.cloneNode(true);
    char.forEach(obj => {      
        clone.querySelector(".image").src= `data:image/png;base64,${obj.image}`
        clone.querySelector(".name").innerHTML= obj.name;
        clone.querySelector(".shortDescription").innerHTML= obj.shortDescription;
        target.appendChild(clone);
    });
})();
  

/*fetch("https://character-database.becode.xyz/characters")
    .then(response => response.json())
    .then(characters => showCharacters(characters.result));
showCharacters = characters => {
    characters.forEach(obj => {
        let template = document.getElementsByTagName("template")[0];
        let target = document.getElementById("target");
        let clone = template.content.cloneNode(true);
  
        clone.querySelector(".image").src= `data:image/png;base64,${obj.image}`
        clone.querySelector(".name").innerHTML= obj.name;
        clone.querySelector(".shortDescription").innerHTML= obj.shortDescription;
  
        target.appendChild(clone);
    });
}*/