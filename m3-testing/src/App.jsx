import React, { useState } from 'react';
import './App.css'
import Gemini from './components/Gemini.jsx'
import MyTextInput from './components/TextInput.jsx'

function App() {
  const [outputValue, setOutputValue] = useState('');

  return (
    <>
      <MyTextInput outputValue={outputValue} setOutputValue={setOutputValue} /> 
      <p>Current output: {outputValue}</p>
    </>
  )
}

export default App
