import React, { useState, useEffect } from "react";
import "./App.css";
import Meme from "./meme";

function App() {
  const [memes, setMemes] = useState(new Array<Meme>());

  //Ejecuta petición API despues de cada renderizado
  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    let response = await fetch("/api/memes");
    let newMemes = await response.json();
    setMemes(newMemes);
  };

  return (
    <div className="gif__grid">
      {memes.map((meme, index) => (
        <img className="gif__card" alt={meme.title} src={meme.images.original.url} key={index} />
      ))}
    </div>
  );
}

export default App;
