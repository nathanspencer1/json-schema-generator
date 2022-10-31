import "./App.css";
import httpGet from "./logic/JsonSchema";
import { useState } from "react";

function App() {
  const [swaggerJsonURL] = useState(
    "https://petstore.swagger.io/v2/swagger.json"
  );
  const [swaggerContent, setSwaggerContent] = useState("");
  const [schema, setSchema] = useState("");
  const [classNames, setClassNames] = useState(["Class 1"]);
  const handleJsonImport = async () => {
    async function fetchData() {
      const response = await httpGet(swaggerJsonURL);
      const data = JSON.parse(response);
      const displayText = JSON.stringify(data, null, 2);
      setSwaggerContent(displayText);
    }
    await fetchData();
    //**** need to find a way to propogate the change to swagger content.
    // console.log(swaggerContent);
    // handleParseClasses();
  };
  const handleParseClasses = () => {
    const data = JSON.parse(swaggerContent);
    const classes = data?.components?.schemas ?? data.definitions;
    setClassNames(Object.keys(classes));
    //handleClassSelect();
  };
  const handleClassSelect = (event) => {
    const data = JSON.parse(swaggerContent);
    const classes = data?.components?.schemas ?? data.definitions;
    const myClass = classes[event.target.value];
    const displayText = JSON.stringify(myClass, null, 2);
    console.log(myClass);
    //Need to actually create schema here.
    setSchema(displayText);
  };
  return (
    <div className="App">
      <div className="ImportBar">
        <input type={"text"} value={swaggerJsonURL} onChange={() => {}} />
        <button onClick={handleJsonImport}>Import Swagger.json</button>
      </div>
      <select id="classes" onChange={handleClassSelect}>
        {classNames.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>
      <textarea value={swaggerContent} onChange={handleParseClasses} />
      <textarea value={schema} onChange={() => {}} />
    </div>
  );
}

export default App;
