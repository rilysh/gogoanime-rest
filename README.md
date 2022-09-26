## gogoanime-rest
A REST API wrapper in TypeScript for gogoanime

## Usage
```sh
# Clone the repo and transpile the TypeScript code into JavaScript
git clone https://github.com/kiwimoe/gogoanime-rest.git
cd gogoanime-rest && tsc
```
- Now ts compiler should create a dist folder, you need to import from there

#### Example
```js
const { searchAnime } = require("./dist/api");

(async () => {
    const data = await searchAnime("devil is a part timer");
    if (data) {
        console.log(data);
    } else {
        console.error("Something went wrong");
    }
})();
```
