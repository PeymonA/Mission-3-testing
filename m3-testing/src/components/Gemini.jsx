import { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";

export default function Gemini() {
  const [responseText, setResponseText] = useState("");
  const ai = new GoogleGenAI({ apiKey: "AIzaSyCf3s1A49XLizYKXXR2Hvvs_VB_5l35CMk" });

  useEffect(() => {
    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
      });
      setResponseText(response.text);
    }
    main();
  }, []);

  return (
    <div>
      <h1>Gemini Component</h1>
      <p>{responseText}</p>
    </div>
  );
}