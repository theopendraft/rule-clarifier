import React from 'react';
import { InstrumentSelector } from './InstrumentSelector';

export const Header: React.FC = () => {
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative w-full">
          <div className="font-['Michroma:Regular',_sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#ffffff] text-[24px] text-left text-nowrap uppercase whitespace-pre">
            <div className="mb-0 text-[24px]">earworm</div>
            <div>studio</div>
          </div>
          <InstrumentSelector />
        </div>
      </div>
    </div>
  );
};