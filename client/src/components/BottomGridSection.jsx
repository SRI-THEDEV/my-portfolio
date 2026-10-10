import React from 'react';
import ToolkitCard from './ToolkitCard.jsx';
import WorkProcessCard from './WorkProcessCard.jsx';
import CtaCard from './CtaCard.jsx';

export default function BottomGridSection({ toolkit, processes, onOpenContact }) {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Toolkit */}
          <div className="h-full">
            <ToolkitCard toolkit={toolkit} />
          </div>

          {/* Card 2: Work Process */}
          <div className="h-full">
            <WorkProcessCard processes={processes} />
          </div>

          {/* Card 3: Purple CTA Card */}
          <div className="h-full">
            <CtaCard onOpenContact={onOpenContact} />
          </div>
        </div>
      </div>
    </section>
  );
}
