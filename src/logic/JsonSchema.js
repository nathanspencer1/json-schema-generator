import template from "../schemaTemplate.json";

const httpGet = async (url) => {
  //Got this from: https://www.codegrepper.com/code-examples/javascript/Javascript+read+content+from+url
  return await fetch(url).then((r) => r.text());
  //Parsing JSON: https://stackoverflow.com/questions/9292823/serialize-javascript-object-to-json-and-back
};
const createSchema = async (myClass) => {
  //Need to actually create schema here.
  //Code to recreate: https://github.com/nathanspencer1/JsonSchemaGenerator/blob/master/JsonSchemaGenerator/AppLogic/JsonSchema.cs
  //console.log(myClass);
  let schema = JSON.parse(JSON.stringify(template)); //Deep copy template
  delete schema.definitions.MySubClass;
  schema.title = myClass.xml.name;
  schema.type = myClass.type;
  schema.properties = myClass.properties;
  //Populate definitions
  return JSON.stringify(schema, null, 2); //JSON.stringify(myClass, null, 2);
};

const schemaMethods = { httpGet, createSchema };
export default schemaMethods;
