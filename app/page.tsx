"use client";

import { useState } from "react";
import { ClientMessage } from "./actions";
import { useActions, useUIState,} from "ai/rsc";
import { nanoid } from "nanoid";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <div>
      <h1 className="px-4 py-4 text-4xl font-bold">Testing</h1>
      <div className="px-4 py-4">
        {conversation.map((message: ClientMessage) => (
          <div key={message.id}>
            {message.role}: {message.display}
          </div>
        ))}
      </div>

      <form
      className="flex px-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setInput("");
          setConversation((currentConversation: ClientMessage[]) => [
            ...currentConversation,
            { id: nanoid(), role: "user", display: input },
          ]);

          const message = await continueConversation(input);

          setConversation((currentConversation: ClientMessage[]) => [
            ...currentConversation,
            message,
          ]);
        }}
      >
        <input
          type="text"
          className="w-1/2 border-2 border-gray-800 rounded-lg px-2 py-2"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button className="px-4">Send Message</button>
      </form>
    </div>
  );
}

