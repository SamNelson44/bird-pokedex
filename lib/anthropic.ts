import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export interface BirdIdentification {
  identified: boolean;
  common_name?: string;
  scientific_name?: string;
  confidence?: "high" | "medium" | "low";
  description?: string;
}

export async function identifyBird(
  base64Image: string,
  mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif"
): Promise<BirdIdentification> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data: base64Image,
            },
          },
          {
            type: "text",
            text: `You are a bird identification expert. Carefully examine this image and identify the bird species shown.

Return ONLY valid JSON in exactly this format with no other text:
{
  "identified": true,
  "common_name": "Anna's Hummingbird",
  "scientific_name": "Calypte anna",
  "confidence": "high",
  "description": "Small hummingbird with iridescent magenta crown and throat"
}

If no bird is clearly visible in the image, return: {"identified": false}

Confidence levels:
- "high": clearly identifiable species
- "medium": likely species but some uncertainty
- "low": possible species but too blurry/distant/obscured to be sure

Use the most commonly known English name for the species. Be specific — do not just say "hawk" or "sparrow" if you can identify the exact species.`,
          },
        ],
      },
    ],
  });

  const raw =
    response.content[0].type === "text" ? response.content[0].text : "";
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  return JSON.parse(cleaned) as BirdIdentification;
}
