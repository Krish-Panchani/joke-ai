import { google } from '@ai-sdk/google';
import { streamText } from "ai";
import dotenv from "dotenv";
import { z } from "zod";

export async function POST(request: Request) {
    const { messages } = await request.json();
    const result = await streamText({
        model: google('models/gemini-pro'),
        system: "You are a helpful assistant.",
        messages,
    });
    return result.toAIStreamResponse();
}