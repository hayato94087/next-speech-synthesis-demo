'use client'

import { useState } from 'react'
import { synthesizeSpeech } from '@/app/actions'

export const Demo1 = () => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null)
  const [inputText, setInputText] = useState<string>('こんにちは！元気ですか！')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSynthesize = async () => {
    if (!inputText.trim()) return
    setIsLoading(true)
    try {
      const base64Audio = await synthesizeSpeech(inputText)
      setAudioSrc(`data:audio/mp3;base64,${base64Audio}`)
    } catch (error) {
      console.error('Error synthesizing speech:', error)
      alert('Failed to synthesize speech. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 px-8 py-8 rounded-lg">
      <h1 className="mb-6 self-start text-xl font-bold ">音声データを生成</h1>
      <p className="mb-4 self-start text-slate-800">音声を生成したいテキストを入力してください</p>
      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-row space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="音声を生成したいテキストを入力してください"
            className="w-full px-3 py-2 rounded-md text-slate-800"
          />
          <button
            onClick={handleSynthesize} 
            className="bg-slate-800 py-2 px-2 rounded-lg text-white w-[200px]"
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? '音声合成中...' : '音声を生成'}
          </button>
        </div>
        {audioSrc && (
          <audio controls src={audioSrc} className="w-full">
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  )
}