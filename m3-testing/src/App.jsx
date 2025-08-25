import React, { useState, useEffect } from 'react';
import './App.css'
import { GoogleGenAI } from "@google/genai";
import MyTextInput from './components/TextInput.jsx'

function App() {
  const [textValue, setTextValue] = useState('');
  const [onUse, setOnUse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const ai = new GoogleGenAI({ apiKey: "API KEY" });

  useEffect(() => {
    if (!onUse) return;
    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: textValue,
      });
      setResponseText(response.text);
    }
    main();
  }, [onUse, textValue]);

  return (
    <>
      <MyTextInput setTextValue={setTextValue} setOnUse={setOnUse}/>    
      <p>{responseText}</p> 
    </>
  )
}

export default App
