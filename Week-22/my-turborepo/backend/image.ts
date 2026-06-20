import { GoogleGenAI } from "@google/genai"
import axios from "axios";
import fs from "fs";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});


async function getBase64(imageUrl: string){
    return await axios.get(imageUrl, {
        responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}


export async function generateImage(userPrompt: string, imageUrl: string, outputFilePath: string){

    const base64Image = await getBase64(imageUrl)
    
    const prompt = [
        {text: userPrompt},
        {
            inlineData: {
                mimeType: "image/png",
                data: base64Image,
            },
        },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image",
        contents: prompt,
    });

    if(response.candidates?.[0]?.content?.parts){
        for(const part of response.candidates[0].content.parts){
            if(part.text){
                console.log(part.text);
            }else if(part.inlineData){
                const imageData = part.inlineData.data;
                const buffer = Buffer.from(imageData!, "base64");
                fs.writeFileSync(outputFilePath, buffer);
                console.log("Image saved as gemini-native-image.png");
            }
        }
    }

}