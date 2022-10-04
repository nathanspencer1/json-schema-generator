import logo from './logo.svg';
import './App.css';
import httpGet from './logic/JsonSchema';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState({ swaggerContent: "" });
  useEffect(() => {
    async function fetchData() {
      const response = await httpGet("https://petstore.swagger.io/v2/swagger.json");
      setState({ swaggerContent: response });
      console.log(response);
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <textarea cols={100} rows={100} value={state.swaggerContent} />
    </div>
  );
}

export default App;
