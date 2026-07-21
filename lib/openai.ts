import OpenAI from "openai";

export class OpenAIConfigurationError extends Error {
  constructor() {
    super("OPENAI_API_KEY is not configured.");
    this.name = "OpenAIConfigurationError";
  }
}

let openai: OpenAI | undefined;

/**
 * Creates the OpenAI client only on the server, after configuration has been
 * checked. Next.js loads OPENAI_API_KEY from .env.local for server routes.
 */
export function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new OpenAIConfigurationError();
  }

  openai ??= new OpenAI({ apiKey });
  return openai;
}
