import { NextRequest, NextResponse } from "next/server";
import {
  textToJSONFewShotPrompts,
  textToJSONSystemPrompt,
  promptEnhancerFewShotExamples,
  promptEnhancerSystemPrompt,
} from "@/constants/prompts";
import { Groq } from "groq-sdk";
import { getErrorMessage } from "@/lib/utils";
import {
  GroqRequest,
  FewShotPrompt,
  ChatMessage,
  PromptConfig,
} from "@/types/api.types";

const groq = new Groq();

const DEFAULT_MODEL = "openai/gpt-oss-20b";

export async function POST(req: NextRequest) {
  try {
    const body: GroqRequest = await req.json();
    const { message, model, format } = body;

    const { fewShot, system } = getPromptConfiguration(format);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: system,
        },
        ...fewShot,
        {
          role: "user",
          content: message,
        },
      ],
      model: model || DEFAULT_MODEL,
      temperature: 0.5,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: false,
      response_format:
        format === "text-to-json" ? { type: "json_object" } : null,
      stop: null,
    });

    const response = chatCompletion.choices[0].message.content;

    return NextResponse.json({
      message: response,
      success: true,
    });
  } catch (err: unknown) {
    console.error("Error processing GROQ request:", getErrorMessage(err));

    return NextResponse.json(
      {
        error: "Failed to process GROQ request: " + getErrorMessage(err),
        success: false,
      },
      { status: 500 }
    );
  }
}

/**
 * Transforms few-shot prompts into chat messages format
 * Converts user/assistant pairs into alternating chat messages
 * Handles both string and object assistant responses appropriately
 *
 * @param prompts - Array of few-shot prompt objects
 * @returns Array of formatted chat messages
 */
function transformFewShotPrompts(prompts: FewShotPrompt[]): ChatMessage[] {
  return prompts.flatMap((prompt) => [
    {
      role: "user" as const,
      content: prompt.user,
    },
    {
      role: "assistant" as const,
      // Only stringify if assistant response is an object, otherwise use as-is
      content:
        typeof prompt.assistant === "string"
          ? prompt.assistant
          : JSON.stringify(prompt.assistant),
    },
  ]);
}

/**
 * Configuration mapping for different prompt formats
 * Centralizes the logic for selecting appropriate prompts and system messages
 */
const PROMPT_CONFIGS: Record<string, () => PromptConfig> = {
  "text-to-json": () => ({
    fewShot: transformFewShotPrompts(textToJSONFewShotPrompts),
    system: textToJSONSystemPrompt,
  }),

  "enhance-prompt": () => ({
    fewShot: transformFewShotPrompts(promptEnhancerFewShotExamples),
    system: promptEnhancerSystemPrompt,
  }),
};

/**
 * Gets the appropriate prompt configuration based on the requested format
 * Falls back to text-to-json format if format is not recognized
 *
 * @param format - The requested prompt format
 * @returns Object containing few-shot examples and system prompt
 */
function getPromptConfiguration(format: string): PromptConfig {
  const configFunction =
    PROMPT_CONFIGS[format] || PROMPT_CONFIGS["text-to-json"];
  return configFunction();
}
