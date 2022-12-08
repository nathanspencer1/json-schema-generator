# JSON Schema Generator

A tool for helping extract JSON schemas from open API files. To use enter the URL of the swagger.json file for the API and click *Import Swagger.json*. Alternatively you can copy and past the file contents directly.  
![image](https://user-images.githubusercontent.com/50782218/206354951-ae3e0e97-f221-480f-bd88-f9c70437f2d7.png)

Once swagger.json contents are entered the schema names will populate the drop down in the top right. Select the desired schema and click *Create Schema*.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run deploy`

Deploys the site to https://nathanspencer1.github.io/json-schema-generator. Runs `npm run build` followed by `gh-pages -d build`. Deploys an optimized build to github pages. See https://github.com/gitname/react-gh-pages. The repo needs to be set to Deploy from the `gh-pages` branch. See https://github.com/nathanspencer1/json-schema-generator/settings/pages.
