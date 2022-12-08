import template from "../schemaTemplate.json";

const httpGet = async (url) => {
  //Got this from: https://www.codegrepper.com/code-examples/javascript/Javascript+read+content+from+url
  try {
    return await fetch(url).then((r) => r.text());
  } catch (error) {
    alert(error + "\nTry copy and pasting file contents directly.");
    return "";
  }
  //Parsing JSON: https://stackoverflow.com/questions/9292823/serialize-javascript-object-to-json-and-back
};
const createSchema = async (className, myClass, allSchemas = null) => {
  //Need to actually create schema here.
  //Code to recreate: https://github.com/nathanspencer1/JsonSchemaGenerator/blob/master/JsonSchemaGenerator/AppLogic/JsonSchema.cs
  //console.log(myClass);
  let schema = JSON.parse(JSON.stringify(template)); //Deep copy template
  delete schema.definitions.MySubClass;
  schema.title = getTitle(myClass?.xml?.name ?? myClass?.name ?? className);
  schema.type = myClass.type;
  schema.properties = myClass.properties;
  //Populate definitions
  getDefinitions(myClass, allSchemas?.components?.schemas ?? allSchemas.definitions, schema.definitions);
  return JSON.stringify(schema, null, 2).replace(/#\/components\/schemas\//g, "#/definitions/");
};

function getTitle(name) {
  let index = name.lastIndexOf('.') + 1;
  return name.substring(index);
}

function getDefinitions(myClass, schemas, definitions, definitionsAdded = null) {
  if (definitionsAdded == null) definitionsAdded = [];
  const componentRegex = /['"]#\/components\/schemas\/([^"]*)['"]/g;
  const classString = JSON.stringify(myClass);
  let matches = [...classString.matchAll(componentRegex)];
  if (matches == null || matches.length === 0) {
    const definitionRegex = /['"]#\/definitions\/([^"]*)['"]/g;
    matches = [...classString.matchAll(definitionRegex)];
  }
  let classesNeeded = matches.flatMap((m) => m.slice(1));
  classesNeeded.forEach((c) => {
    if (definitionsAdded.includes(c)) return;
    for (const s in schemas) {
      if (s === c) {
        let def = Object.assign({ title: getTitle(c) }, schemas[s]);
        definitions[c] = def;
        definitionsAdded.push(c);
        getDefinitions(def, schemas, definitions, definitionsAdded);
      }
    }
  });
}

const schemaMethods = { httpGet, createSchema };
export default schemaMethods;
