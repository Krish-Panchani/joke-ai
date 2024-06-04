import { google } from '@ai-sdk/google';
import { generateObject } from "ai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

async function main() {
  const result = await generateObject({
    model: google('models/gemini-pro'),
    prompt: "Tell me a joke.",
    schema: z.object({
        setup: z.string().describe('the setup of the joke'),
        punchline: z.string().describe('the punchline of the joke'),
        }),
        
  });

  console.log(result.object);

}

main().catch(console.error);