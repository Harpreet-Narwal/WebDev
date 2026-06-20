import axios from "axios";
import {GoogleGenAI, VideoGenerationReferenceType} from "@google/genai"
import { resolve } from "bun";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
})

export async function generateVideo(videoPrompt: string, imageUrls: string[], outputPath: string){

    const imageBuffers = await Promise.all(imageUrls.map(async imageUrl =>{
        const based64Image = await axios
            .get(imageUrl, {
                responseType: 'arraybuffer'
            })
            .then(response => Buffer.from(response.data, 'binary').toString('base64'));
            
            return {
                image: {imageBytes: based64Image},
                referenceType: VideoGenerationReferenceType.ASSET
            }
        
        }))

        let operation = await ai.models.generateVideos({
            model: "veo-3.1-generate-preview",
            prompt: videoPrompt,
            config:{
                durationSeconds:4,
                referenceImages: imageBuffers
            }
        })

        while(!operation.done){
            console.log("Waiting for video generation to complete");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            operation = await ai.operations.getVideosOperation({
                operation: operation,
            });
        }

        const video = operation.response?.generatedVideos?.[0]?.video;

        if(!video){
            throw new Error("No video was generated in the response");
        }

        ai.files.download({
          file: video,
          downloadPath: outputPath
        });

        console.log("Generate Video saved to veo3.1_with_reference_images.mp4");

        // ADD logic to keep polling

}