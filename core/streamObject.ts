import { google } from '@ai-sdk/google';
import { streamObject } from "ai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

async function main() {
  const result = await streamObject({
    model: google('models/gemini-pro'),
    prompt: "Tell me a joke.",
    schema: z.object({
        setup: z.string().describe('the setup of the joke'),
        punchline: z.string().describe('the punchline of the joke'),
        }),    
  });

  for await (const partialObject of result.partialObjectStream) {
    console.clear();
    console.log(partialObject);
  }

}

main().catch(console.error);