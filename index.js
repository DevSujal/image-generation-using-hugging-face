import fetch from 'node-fetch';
import fs from 'fs/promises';
import { unlinkSync } from "fs";
import readline from "readline"
import dotenv from "dotenv"
dotenv.config();
// Load environment variables

// API Key and model configuration
const API_KEY = process.env.API_KEY;
const MODEL_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large";

async function generateImage(prompt) {
    try {
        console.log("Generating image for prompt:", prompt);

        const response = await fetch(MODEL_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    num_inference_steps: 30,    // Lower for faster generation
                    width: 512,                 // Standard size
                    height: 512,
                    guidance_scale: 7.5         // How closely to follow the prompt
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get image data
        const arrayBuffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        // Save image with timestamp
        const filename = `generated-image-${Date.now()}.png`;
        await fs.writeFile(filename, imageBuffer);

        console.log(`Image successfully saved as ${filename}`);

        try {
            console.error("deleting the image after 60s please don't off the server!")
            setTimeout(() => {
                unlinkSync(filename);
                console.log("image deleted successfully")
            }, 60000);

        } catch (err) {
            console.log("error while deleting file : " + err?.message)
        }


        return filename;

    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the description of the image : ", async (input) => {
    console.log(`You entered: ${input}`);

    try {
        const filename = await generateImage(input);
        console.log("Generation completed:", filename);

    } catch (error) {
        console.error("Generation failed:", error)
    }

    // Close the readline interface
    rl.close();
});
