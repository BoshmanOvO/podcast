import { action } from "@/convex/_generated/server";
import { v } from "convex/values";
import { OpenAI } from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAudioAction = action({
  args: {
    input: v.string(),
    voice: v.string(),
  },
  handler: async (_, { voice, input }) => {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as SpeechCreateParams["voice"],
      input,
    });
    return await mp3.arrayBuffer();
  },
});

export const generateImageAction = action({
  args: {
    prompt: v.string(),
  },
  handler: async (_, { prompt }) => {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    const imageUrl = image.data[0].url;
    if (!imageUrl) {
      throw new Error("Image generation failed");
    }
    const res = await fetch(imageUrl);
    return await res.arrayBuffer();
  },
});
