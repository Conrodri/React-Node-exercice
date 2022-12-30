import React, { useState } from "react";
import "./App.css";
import axios from "axios";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);

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
          // return <div key={result.name}>
          //   {JSON.stringify(result)}
          //   </div>;
          return (
            <Card key={result.name} sx={{ minWidth: 150 }}>
              <CardContent>
                <Typography variant="h3" component="div">
                  Name : {result.name}
                </Typography>
                <Typography variant="h5" component="div">
                  Gender : {result.gender}
                  <br />
                  Hair color : {result.hair_color}
                  <br />
                  Eyes color : {result.eye_color}
                  <br />
                  Skin color : {result.skin_color}
                  <br />
                  Height : {result.height}
                  <br />
                  Mass : {result.mass}
                  <br />
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
