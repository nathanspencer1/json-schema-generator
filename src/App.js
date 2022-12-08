import "./App.css";
import schemaMethods from "./logic/JsonSchema";
import { useEffect, useState } from "react";
import "../src/css/button-green.css";

function App() {
  const [swaggerJsonURL, setSwaggerJsonURL] = useState(
    "https://petstore.swagger.io/v2/swagger.json"
  );
  const [swaggerContent, setSwaggerContent] = useState("");
  const [schema, setSchema] = useState("");
  const [classNames, setClassNames] = useState(["Class 1"]);
  const [selectedClass, setSelectedClass] = useState("Class 1");

  const handleJsonImport = async () => {
    async function fetchData() {
      const response = await schemaMethods.httpGet(swaggerJsonURL);
      if (response === '')
        return;
      const data = JSON.parse(response);
      const displayText = JSON.stringify(data, null, 2);
      setSwaggerContent(displayText);
    }
    await fetchData();
  };

  useEffect(() => {
    if (!swaggerContent) return;
    try {
      const data = JSON.parse(swaggerContent);
      const classes = data?.components?.schemas ?? data.definitions;
      setClassNames(Object.getOwnPropertyNames(classes).sort());
    } catch (error) {}
  }, [swaggerContent]);

  useEffect(() => {
    if (!classNames || classNames.length === 0) return;
    if (!classNames.includes(selectedClass)) setSelectedClass(classNames[0]);
  }, [classNames, selectedClass]);

  const handleClassSelect = async () => {
    async function fetchData() {
      const data = JSON.parse(swaggerContent);
      const classes = data?.components?.schemas ?? data.definitions;
      const myClass = classes[selectedClass];
      const displayText = await schemaMethods.createSchema(
        selectedClass,
        myClass,
        data
      );
      setSchema(displayText);
    }
    await fetchData();
  };
  return (
    <div className="App">
      <div className="TopLeft">
        <a
          href="https://github.com/nathanspencer1/json-schema-generator"
          target={"blank"}
        >
          <i className="fa fa-github" />
        </a>
        <div className="ImportBar">
          {/* https://reactjs.org/docs/forms.html */}
          <input
            type={"text"}
            value={swaggerJsonURL}
            onChange={(event) => {
              setSwaggerJsonURL(event.target.value);
            }}
          />
          <button className="button-green" onClick={handleJsonImport}>
            Import Swagger.json
          </button>
        </div>
      </div>
      <div className="ImportBar">
        <select
          id="classes"
          value={selectedClass}
          onChange={(event) => {
            setSelectedClass(event.target.value);
          }}
        >
          {classNames.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button className="button-green" onClick={handleClassSelect}>
          Create Schema
        </button>
      </div>
      <textarea
        value={swaggerContent}
        onChange={(event) => {
          setSwaggerContent(event.target.value);
        }}
      />
      <textarea
        value={schema}
        onChange={(event) => {
          setSchema(event.target.value);
        }}
      />
    </div>
  );
}

export default App;
