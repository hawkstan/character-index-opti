# Challenge: Character Manager in JS

| Challenge Parameters | Challenge Details                     |
| :------------------- | :------------------------------------ |
| Repository           | `character-manager-js`                |
| Challenge type       | `consolidation challenge`             |
| Duration             | `5 days`                              |
| Deadline             | `17/08/2021 17h00`                    |
| Deployment method    | `GitHub pages` or `Netlify`           |
| Group composition    | `Duo`                                 |
| Page                 | https://tompouday.github.io/character_manager_js/ |
| Developer            | [Zoé Ranzy](https://github.com/hawkstan) & [Thomas El Serghani](https://github.com/Tompouday)|

## Objectives

- Use best JS practices
- Read documentation and test a REST API
- Use a REST API with HTTP requests
- Create a typical asynchronous flow : send asynchronous (promises or async/await) requests to a remote server and process the results
- DOM manipulation: changing the DOM based on results of HTTP requests

## The job

A Comics fan client would like to manage his favorites characters on a dashboard. He contacted us to create an app that will be able to view, edit, create all his favorites characters.

In this project, we had to use the [**Character Database API**](https://character-database.becode.xyz/) to make/fetch a Character Manager. This project asked us to perform HTTP Request.

The root endpoint of the API is the following : https://character-database.becode.xyz/

This is a frontend project, we had to care about the appearance of our application and follow the [template](./design)  the client gaves us. This being said, the design is only for desktop, so we had the freedom to manage the responsive as we wanted.

## Design Ressources

- Purple/Blue : #4B4EA2
- Corail : #E14444
- Grey : #363333
- Blue(for the button) : #4B7CFB
- Red(for the button) : #BF3A30
- Fonts: Roboto, Permanent Marker
- Images size: on the main page, 100x100, and on the "single character" page, 150x150

## Tips

### API REST

Explanations about what can do a [REST API](https://github.com/leny/klopedi/blob/master/rest/rest.md)

### .gitignore

If you use `npm`, don't forget to add `node_modules` in your `.gitignore` file before beginning.

### CSS frameworks

You can use a _css frameworks_ like [Bootstrap](https://getbootstrap.com/) or [Materialize](https://materializecss.com/).
It will help you to design quickly your application.

Even more, you can search and use some free pre-made templates like [this](https://github.com/startbootstrap/startbootstrap-heroic-features).

### HTTP requests

To help you to perfom HTTP Requests you can use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

And another nice solution is a tool called [axios](https://github.com/axios/axios). Axios is a promise based HTTP client for the browser and Node.js.
You can install it with npm :

```bash
npm install --save axios
```

Then to import it in your JS files:

```javascript
const axios = require("axios");
```

Using axios it is strongly recommended to use the [async/await](https://javascript.info/async-await) syntax when working with asynchronous operations.

### Postman

To test APIs rapidly before coding you can use [Postman](https://www.getpostman.com/).
To start using it today with the Character Database API you can **import** [this Postman collection](https://static.becode.xyz/character-database/characters-database.postman_collection.json).

You can follow this serie of video to know how to manage it : [Postman Tutorial](https://www.youtube.com/watch?v=juldrxDrSH0&list=PLhW3qG5bs-L-oT0GenwPLcJAPD_SiFK3C&ab_channel=AutomationStepbyStep-RaghavPal)

![](https://media.giphy.com/media/Av22U399aVmBMfexSF/giphy.gif)
