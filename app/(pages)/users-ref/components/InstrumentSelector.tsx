import React from 'react';
import { Instrument, useGrooveBox } from '../contexts/GrooveBoxContext';

export const InstrumentSelector: React.FC = () => {
  const { activeInstrument, setActiveInstrument } = useGrooveBox();

  const instruments: { id: Instrument; name: string; color: string }[] = [
    { id: 'drums', name: 'Drums', color: '#FD8EFF' },
    { id: 'bass', name: 'Bass', color: '#56BEFF' },
    { id: 'synth', name: 'Synth', color: '#99ff71' },
    { id: 'strings', name: 'Strings', color: '#C06BFF' },
    { id: 'drop', name: 'Drop', color: '#ff9a00' },
  ];

  return (
    <div className="relative shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
          {instruments.map((instrument) => (
            <button
              key={instrument.id}
              onClick={() => setActiveInstrument(instrument.id)}
              style={{
                backgroundColor: activeInstrument === instrument.id 
                  ? instrument.color 
                  : 'transparent',
                border: activeInstrument === instrument.id 
                  ? 'none' 
                  : '1px solid rgba(255,255,255,0.4)',
                borderRadius: '8px',
                width: '64px',
                height: '64px',
                flexShrink: 0,
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
              aria-label={`Select ${instrument.name}`}
            >
              <div className="flex flex-row items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
                  <div 
                    style={{
                      color: activeInstrument === instrument.id ? '#292929' : '#ffffff',
                      fontSize: '14px',
                      fontWeight: 'normal',
                      lineHeight: 0,
                      letterSpacing: '0.56px',
                      whiteSpace: 'nowrap',
                      textAlign: 'center'
                    }}
                  >
                    <div className="leading-none whitespace-pre">
                      {instrument.name}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};