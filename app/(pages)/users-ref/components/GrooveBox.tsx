import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { DrumSequencer } from './DrumSequencer';
import { BassSequencer } from './BassSequencer';
import { SynthSequencer } from './SynthSequencer';
import { StringSequencer } from './StringSequencer';
import { DropSequencer } from './DropSequencer';
import { Instrument, useGrooveBox } from '../contexts/GrooveBoxContext';

export const GrooveBox: React.FC = () => {
  const { activeInstrument } = useGrooveBox();

  const renderSequencer = (instrument: Instrument) => {
    switch (instrument) {
      case 'drums':
        return <DrumSequencer />;
      case 'bass':
        return <BassSequencer />;
      case 'synth':
        return <SynthSequencer />;
      case 'strings':
        return <StringSequencer />;
      case 'drop':
        return <DropSequencer />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#292929] relative flex flex-col min-h-screen w-full">
      <div className="px-[25.6px] pt-[25.6px] pb-0 flex-shrink-0">
        <Header />
        <div className="h-0 relative shrink-0 w-full mt-[25.6px]" data-name="hr">
          <div className="absolute bottom-[-0.4px] left-0 right-0 top-[-0.4px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1389 2"
            >
              <path
                d="M0 1H1388.8"
                id="hr"
                stroke="var(--stroke-0, #626262)"
                strokeWidth="0.8"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center px-[25.6px] py-8 overflow-x-auto">
        <div className="w-full max-w-[1024px] mx-auto">
          {renderSequencer(activeInstrument)}
        </div>
      </div>

      <div className="px-[25.6px] pb-[25.6px] pt-0 flex-shrink-0">
        <div className="h-0 relative shrink-0 w-full mb-[25.6px]" data-name="hr">
          <div className="absolute bottom-[-0.4px] left-0 right-0 top-[-0.4px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1389 2"
            >
              <path
                d="M0 1H1388.8"
                id="hr"
                stroke="var(--stroke-0, #626262)"
                strokeWidth="0.8"
              />
            </svg>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};