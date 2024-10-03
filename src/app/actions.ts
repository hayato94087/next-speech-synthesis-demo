'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function synthesizeSpeech(text: string): Promise<string> {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  })

  const buffer = Buffer.from(await mp3.arrayBuffer())
  return buffer.toString('base64')
}