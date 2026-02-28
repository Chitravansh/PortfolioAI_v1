import { GoogleGenAI, Type } from "@google/genai";

export interface PortfolioData {
  name: string;
  role: string;
  about: string;
  experience: {
    company: string;
    role: string;
    period: string;
    desc: string;
  }[];
  projects: {
    name: string;
    desc: string;
    tech: string[];
  }[];
  skills: string[];
  contact: {
    email: string;
    location: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const analyzeResume = async (text: string): Promise<PortfolioData> => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing from process.env");
    throw new Error("Gemini API key is not configured. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following resume text and extract information to create a professional portfolio. 
    Return the data in the specified JSON format.
    
    Resume Text:
    ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          role: { type: Type.STRING },
          about: { type: Type.STRING },
          experience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                company: { type: Type.STRING },
                role: { type: Type.STRING },
                period: { type: Type.STRING },
                desc: { type: Type.STRING }
              },
              required: ["company", "role", "period", "desc"]
            }
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                desc: { type: Type.STRING },
                tech: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["name", "desc", "tech"]
            }
          },
          skills: { type: Type.ARRAY, items: { type: Type.STRING } },
          contact: {
            type: Type.OBJECT,
            properties: {
              email: { type: Type.STRING },
              location: { type: Type.STRING },
              github: { type: Type.STRING },
              linkedin: { type: Type.STRING },
              twitter: { type: Type.STRING }
            },
            required: ["email", "location"]
          }
        },
        required: ["name", "role", "about", "experience", "projects", "skills", "contact"]
      }
    }
  });

  console.log("Raw AI Response:", response.text);
  const jsonStr = response.text.trim();
  const cleanJson = jsonStr.replace(/^```json\n?/, "").replace(/\n?```$/, "");
  try {
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Failed to parse AI response:", cleanJson);
    throw new Error("Invalid response format from AI");
  }
};
