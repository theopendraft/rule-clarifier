import React from 'react';
import { useGrooveBox } from '../contexts/GrooveBoxContext';
import { VolumeSlider } from './VolumeSlider';

export const Footer: React.FC = () => {
  const { isPlaying, togglePlayback, tempo, setTempo, playDemo, clearSequence, volume, setVolume } = useGrooveBox();

  return (
    <div className="h-16 relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row h-16 items-center justify-between p-0 relative w-full">
          <div className="relative shrink-0">
            <div className="flex flex-row items-center relative size-full">
              <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
                <button
                  onClick={togglePlayback}
                  className="relative rounded-lg shrink-0 size-16 border border-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                  aria-label={isPlaying ? "Stop" : "Play"}
                >
                  <div className="flex flex-row items-center justify-center relative size-full">
                    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
                      <div className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap tracking-[0.56px]">
                        <div className="leading-none whitespace-pre">
                          {isPlaying ? "Stop" : "Play"}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={clearSequence}
                  className="relative rounded-lg shrink-0 size-16 border border-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                  aria-label="Clear"
                >
                  <div className="flex flex-row items-center justify-center relative size-full">
                    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
                      <div className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap tracking-[0.56px]">
                        <div className="leading-none whitespace-pre">Clear</div>
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={playDemo}
                  className="relative rounded-lg shrink-0 size-16 border border-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                  aria-label="Demo"
                >
                  <div className="flex flex-row items-center justify-center relative size-full">
                    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
                      <div className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap tracking-[0.56px]">
                        <div className="leading-none whitespace-pre">Demo</div>
                      </div>
                    </div>
                  </div>
                </button>
                <div className="flex items-center gap-2 ml-2 w-28">
                  <VolumeSlider 
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={setVolume}
                    className="py-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-16 relative shrink-0">
            <div className="flex flex-col items-center relative size-full">
              <div className="box-border content-stretch flex flex-col h-16 items-center justify-between p-0 relative">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTempo(Math.max(60, tempo - 10))}
                    className="bg-[#3b3b3b] rounded-[7.65957px] h-[42px] px-3 text-white"
                    aria-label="Decrease tempo"
                  >
                    -
                  </button>
                  <div className="bg-[#3b3b3b] h-[42px] relative rounded-[7.65957px] shrink-0">
                    <div className="flex flex-row items-center justify-center relative size-full">
                      <div className="box-border content-stretch flex flex-row gap-2 h-[42px] items-center justify-center p-[8px] relative">
                        <div className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[20px] text-left text-nowrap">
                          <div className="leading-none whitespace-pre">{tempo}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setTempo(Math.min(200, tempo + 10))}
                    className="bg-[#3b3b3b] rounded-[7.65957px] h-[42px] px-3 text-white"
                    aria-label="Increase tempo"
                  >
                    +
                  </button>
                </div>
                <div className="font-['Figma_Sans_VF:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                  <div className="leading-none whitespace-pre">Tempo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};