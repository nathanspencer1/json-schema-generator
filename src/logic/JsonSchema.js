const httpGet = async (url) => {
    //Code to recreate: https://github.com/nathanspencer1/JsonSchemaGenerator/blob/master/JsonSchemaGenerator/AppLogic/JsonSchema.cs
    //Got this from: https://www.codegrepper.com/code-examples/javascript/Javascript+read+content+from+url
    return await fetch(url).then(r => r.text());
    //Parsing JSON: https://stackoverflow.com/questions/9292823/serialize-javascript-object-to-json-and-back
}

export default httpGet;