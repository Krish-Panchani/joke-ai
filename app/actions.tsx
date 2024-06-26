import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { google } from '@ai-sdk/google';
import { ReactNode } from "react";
import { z } from "zod";
import { nanoid } from "nanoid";
import { JokeComponent } from "./joke-component";
import { generateObject } from "ai";
import { jokeSchema } from "./joke";


export interface ServerMessage {
    role: "user" | "assistant";
    content: string;
}

export interface ClientMessage {
    id: string;
    role: "user" | "assistant";
    display: ReactNode;

}

export async function continueConversation(
    input: string,
): Promise<ClientMessage> {
    "use server";
    
    const history = getMutableAIState();
    const result = await streamUI({
        model: google('models/gemini-pro'),
        messages: [...history.get(), { role: "user", content: input }],
        text: ({ content, done }) => {
            if (done) {
                history.done((messages: ServerMessage[]) => [
                    ...messages,
                    { role: "assistant", content },
                ]);
            }

            return <div>{content}</div>;
        },

        tools: {
            tellAJoke: {
                description: "Tell me a joke.",
                parameters: z.object({
                    entity: z.string().describe("user's defined Person. If user not specify then default value person = friend."),
                    generationConfig: z.object({
                        response_mime_type: z.string(),
                    }),
                }),
                
                generate: async function* ({ entity  }) {
                    const joke = await generateObject({
                        model: google('models/gemini-1.5-pro-latest'),
                        schema: jokeSchema,
                        prompt:
                            "Generate a very funny dark joke that incorporates the Person:" +
                            entity,
                    });

                    return <JokeComponent joke={joke.object} />;
                    // return <div>{content}</div>;
                },
            },
        },

        });

return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
};
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
    actions: {
        continueConversation,
    },
    initialAIState: [],
    initialUIState: [],
});