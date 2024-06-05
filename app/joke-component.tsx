"use client";

import { useState } from "react";
import { Joke } from "./joke";
import { Button } from "@radix-ui/themes";

export const JokeComponent = ({ joke }: { joke?: Joke }) => {
  const [showPunchline, setShowPunchline] = useState(false);
  return (
    <div className="bg-gray-800 p-4 rounded-md m-4 max-w-prose flex items-center justify-between">
      <p>{showPunchline ? joke?.punchline : joke?.setup}</p>
      <Button
        onClick={() => setShowPunchline(true)}
        disabled={showPunchline}
        variant="outline"
      >
        Show Punchline!
      </Button>
    </div>
  );
};