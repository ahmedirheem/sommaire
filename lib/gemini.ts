import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateSummaryFromGemini(pdfText: string) {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-pro-002",
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting: \n\n${pdfText}`,
            },
          ],
        },
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });
    const summary = result.text;

    if (!summary) {
      throw new Error("Empty response from Gemini API");
    }

    return summary;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
