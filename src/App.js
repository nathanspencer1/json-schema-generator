import logo from './logo.svg';
import './App.css';
import httpGet from './logic/JsonSchema';
import { useEffect, useState } from 'react';

function App() {
  const [swaggerJsonURL, setSwaggerJsonURL] = useState("https://petstore.swagger.io/v2/swagger.json");
  const [swaggerContent, setSwaggerContent] = useState("");
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await httpGet(swaggerJsonURL);
  //     setSwaggerContent(response);
  //     console.log(response);
  //   }
  //   fetchData();
  // }, []);
  return (
    <div className="App">
      <input type={'text'} value={swaggerJsonURL} size={200} />
      <textarea cols={100} rows={100} value={swaggerContent} />
    </div>
  );
}

export default App;
