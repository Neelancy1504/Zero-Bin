import axios from "axios";

class GeminiService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    //this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    this.baseUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  }

  async getGeminiResponse(prompt, imageFile) {
    try {
      let requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };

      // If there's an image, add it to the request
      if (imageFile) {
        const base64Image = await this.convertImageToBase64(imageFile);
        requestBody.contents[0].parts.unshift({
          inline_data: {
            mime_type: imageFile.type,
            data: base64Image,
          },
        });
      }

      const response = await axios.post(
        `${this.baseUrl}?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract the response text from the Gemini API response structure
      const generatedText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      return generatedText || "No response generated.";
    } catch (error) {
      console.error("Gemini API Error:", error.response?.data || error.message);
      return `Error: ${error.response?.data?.error?.message || error.message}`;
    }
  }

  async convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
}

export default new GeminiService();
