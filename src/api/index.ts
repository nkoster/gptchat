import { Response } from '../context/useState'

export async function gptchat(prompt: string, responses: Response[]): Promise<string> {
  const response = await fetch(import.meta.env.VITE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: responses.reduce(
        (acc, cur) => cur.question +
          '\n' + cur.answer + '\n' + acc, ''
      ) + '\n' + prompt,
      max_tokens: 1000,
      n: 1,
      stop: null,
      temperature: 0.5,
      presence_penalty: 0,
      frequency_penalty: 0,
      best_of: 1,
    })
  }).then(res => res.json())
  console.log(response)
  return response.choices[0].text
}
