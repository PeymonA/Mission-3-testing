import React, { useState, useEffect } from 'react';
import './App.css'
import { GoogleGenAI } from "@google/genai";
import MyTextInput from './components/TextInput.jsx'
import ChatLog from './components/ChatLog.jsx'
import JobInput from './components/JobInput.jsx'

function App() {
  const [textValue, setTextValue] = useState('');
  const [onUse, setOnUse] = useState(false);

  const [jobType, setJobType] = useState('');
  const [jobOnUse, setJobOnUse] = useState(false);

  const [chat, setChat] = useState([]);

  const [responseText, setResponseText] = useState("");
  const ai = new GoogleGenAI({ apiKey: "" });

  useEffect(() => {
    console.log(jobType);
    if (!onUse) return;
    async function main() {
      chat.push(textValue)
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: textValue,
      });
      setResponseText(response.text);
      chat.push(response.text);
      console.log(chat);
    }
    main();
  }, [onUse, textValue, chat]);

  useEffect(() => {
    if (!jobOnUse) return;
    const prompt = `You are a job interviewer. You are interviewing a candidate for the position of ${jobType}.
        Ask them one question at a time and wait for their response before asking the next question.
        The flow will start with the you saying “Tell me about yourself”. You should ask at least 6 questions
        based on response of the user.  Other than the first question. At the end of the whole interview,
        You should comment on how well the user answered the questions, and suggest how the user can improve
        its response.`
    console.log(prompt);
    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      setResponseText(response.text);
      chat.push(response.text);
      console.log(chat);
    }
    main();
  }, [jobOnUse, jobType, chat]);
  return (
    <>
      <div className='section'>
        <h1>AI Mock Interviewer</h1>
        <div className='sectionChild'>
          <h2>Job Title:</h2>
          <MyTextInput setTextValue={setJobType} setOnUse={setJobOnUse} />
        </div>
        <div className='sectionChild'>
          <ChatLog chat={chat} />
        </div>
        <div className='sectionChild'>
          <MyTextInput setTextValue={setTextValue} setOnUse={setOnUse} />
        </div>
      </div>
    </>
  )
}

export default App
