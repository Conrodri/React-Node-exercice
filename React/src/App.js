import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {

  });

  async function searchData(e){
    e.preventDefault()
    
    axios.get("http://localhost:3000/search?name=" + name).then(function (response) {
      console.log(response.data.results);
      setResult(response.data.results);
    });

  }


  return (
    <div className="App">
      <form onSubmit={searchData}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" > Send Name </button>
      </form>
      <div>
        {result.map((result) => {
          return <div key={result.name}>
            {JSON.stringify(result)}
            </div>;
        })}
      </div>
    </div>
  );
}

export default App;
