import React, { useState, useEffect } from 'react';
import '../App.css'

import MyTextInput from '../components/TextInput.jsx'
import ChatLog from '../components/ChatLog.jsx'
import MyTextInputNoButton from '../components/TextInputNoButton.jsx';

function TextBot() {
  //Text Input from user
  const [textValue, setTextValue] = useState('');
  const [onUse, setOnUse] = useState(false);

  //Job type from user
  const [jobType, setJobType] = useState('');
  const [jobOnUse, setJobOnUse] = useState(false);

  //Data
  const [chatHistory, setChatHistory] = useState([]);
  const [originalPrompt, setOriginalPrompt] = useState("");

  // Error handling
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // First Prompt
  useEffect(() => {
    if (!jobOnUse) return;
    async function main() {
      const prompt = { contents : `You are a job interviewer. You are interviewing a candidate for the position of ${jobType}.
        Ask them one question at a time and wait for their response before asking the next question.
        The flow will start with the you saying “Tell me about yourself”. You should ask exactly 6 questions
        based on response of the user.  Other than the first question. At the end of the whole interview,
        You should comment on how well the user answered the questions, and suggest how the user can improve
        its response.`};
      setOriginalPrompt(prompt);

      //call API
      try {
        const response = await fetch('/api/gemini', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: prompt 
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }

      const text = response;
      setChatHistory(prevChatHistory => [...prevChatHistory, text]);
    }
    main();
  }, [jobOnUse, jobType]);

  // Following Chat
  useEffect(() => {
    if (!onUse) return;
    async function main() {
      const prompt = { contents: `Here is the chat history so far: ${originalPrompt} ${chatHistory.toString()}
        The candidate just answered: ${textValue} give your next reply`};
      setChatHistory(prevChatHistory => [...prevChatHistory, textValue]);
      
      //call api
      try {
        const response = await fetch('/api/gemini', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prompt)
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }

      const text = response;
      setChatHistory(prevChatHistory => [...prevChatHistory, text]);
    }
    main();
  }, [onUse, textValue]);


  return (
    <>
      <div className='section'>
        <h1>AI Mock Interviewer Text</h1>
        <div className='sectionChild'>
          <div className='sectionLeft'>
            <h2>Job Title:</h2>
          </div>
          <MyTextInputNoButton setTextValue={setJobType} setOnUse={setJobOnUse}/>
        </div>
        <div className='sectionChild'>
          <ChatLog chat={chatHistory} />
          <p>{error && <span className="error">{error.message}</span>}</p>
        </div>
        <div className='sectionChild'>
          <MyTextInput setTextValue={setTextValue} setOnUse={setOnUse} />
        </div>
      </div>
    </>
  )
}

export default TextBot;
