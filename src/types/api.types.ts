export type GroqRequest = {
  message: string;
  format: string;
  model?: string;
};

export type GroqResponse = {
  success: boolean;
  message?: string;
  format?: string;
  error?: string;
};

export type FewShotPrompt = {
  user: string;
  assistant:
    | {
        task: string;
        entities: string[];
        parameters: object;
      }
    | string;
};

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type PromptConfig = {
  fewShot: ChatMessage[];
  system: string;
};
