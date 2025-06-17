import { generateShapePrompt } from './prompts/generateShape';

export async function generateShapeFromPromptRequest(prompt: string) {
  const model = 'gpt-3.5-turbo';
  const temperature = 0.3;
  const messages = [
    { role: 'system', content: generateShapePrompt },
    { role: 'user', content: prompt },
  ];

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
    }),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (!data.choices?.[0]?.message?.content) {
    throw new Error('No se pudo generar, prueba con otra descripción');
  }

  const content = data.choices[0].message.content;
  const match = content.match(/```(?:json)?([\s\S]*?)```/);
  const json = match ? match[1].trim() : content;
  const shape = JSON.parse(json);

  return shape;
}
