"use client";

import { useState, useCallback } from "react";
import { synthesizeSpeech } from "../app/actions";

export const Demo2 = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputText, setInputText] =
    useState<string>("こんにちは！元気ですか！");

  const playAudio = useCallback(async (base64Audio: string) => {
    const AudioContextClass: typeof AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const audioContext = new AudioContextClass();
    const arrayBuffer = Uint8Array.from(atob(base64Audio), (c) =>
      c.charCodeAt(0)
    ).buffer;
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  }, []);

  const handleSynthesize = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const base64Audio = await synthesizeSpeech(inputText);
      await playAudio(base64Audio);
    } catch (error) {
      console.error("Error synthesizing or playing speech:", error);
      alert("Failed to synthesize or play speech. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 px-8 py-8 rounded-lg">
      <h1 className="mb-6 self-start text-xl font-bold ">
        音声データを即時再生
      </h1>
      <p className="mb-4 self-start text-slate-800">
        音声を再生したいテキストを入力してください
      </p>
      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-row space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to synthesize"
            aria-label="Text to synthesize"
            className="w-full px-3 py-2 rounded-md text-slate-800"
          />
          <button
            onClick={handleSynthesize}
            disabled={isLoading || !inputText.trim()}
            className="bg-slate-800 py-2 px-2 rounded-lg text-white w-[200px]"
          >
            {isLoading ? '音声生成中...' : '音声再生'}
            </button>
        </div>
      </div>
    </div>
  );
};
