'use client';

import { FC, useState, useMemo } from 'react';
import Image from 'next/image';
import QuickEntryForm from './QuickEntryForm';
import { ENTRY_MULTIPLIER, formatEndDate } from '@/config/giveaway';

interface Giveaway {
  id: number;
  title: string;
  description: string;
  value: string;
  image: string;
  link: string;
  featured?: boolean;
  endDate?: Date;
}

/**
 * No active giveaways — and nothing invented to fill the grid.
 *
 * This was explicitly labelled "Mock giveaway data": four giveaways that have
 * never existed ($500 gift card bundle, $250 peripherals pack, $600 console
 * bundle, $400 collectibles pack), each with a `getEndDate(27..35)` helper that
 * generated a rolling "Ends:" date counted forward from whenever the page was
 * loaded. None of it came from a real giveaway record, so all of it is gone.
 *
 * Populate this from real giveaway records once there is a source to read. Do
 * not re-add placeholder rows to make the grid look full.
 */
const getActiveGiveaways = (): Giveaway[] => [];

const ActiveGiveawayGrid: FC = () => {
  const activeGiveaways = useMemo(() => getActiveGiveaways(), []);
  const [selectedGiveaway, setSelectedGiveaway] = useState<Giveaway | null>(null);

  const handleEnterClick = (giveaway: Giveaway) => {
    setSelectedGiveaway(giveaway);
  };

  return (
    <section className="py-16 md:py-20 px-6 bg-bg-primary">
      <div className="max-w-container mx-auto">
        <h2 className="font-display font-bold text-section-mobile md:text-section text-center text-text-primary uppercase mb-4">
          Active <span className="text-cta-primary">Giveaways</span>
        </h2>
        <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
          {activeGiveaways.length === 0
            ? 'No giveaway is running yet. The Launch Vault sweepstakes has not started — the Official Rules will be posted before it opens.'
            : 'Choose a giveaway below and enter with your email.'}
        </p>

        {/* Giveaway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {activeGiveaways.map((giveaway) => (
            <div
              key={giveaway.id}
              className="card group cursor-pointer"
              onClick={() => handleEnterClick(giveaway)}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={giveaway.image}
                  alt={giveaway.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Value Badge */}
                <div className="badge-value">
                  VALUE: {giveaway.value}
                </div>
                {/* Entry Multiplier Badge */}
                <div className="badge-entry">
                  {ENTRY_MULTIPLIER}X ENTRIES
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-cta-primary transition-colors">
                  {giveaway.title}
                </h3>
                <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                  {giveaway.description}
                </p>
                <div className="flex items-center justify-between">
                  {/* Only shows a close date if the record actually carries one. */}
                  <span className="text-text-muted text-sm">
                    {giveaway.endDate ? `Ends: ${formatEndDate(giveaway.endDate)}` : ''}
                  </span>
                  <span className="btn-primary py-2 px-4 text-sm">
                    ENTER NOW
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Entry Form Modal */}
        {selectedGiveaway && (
          <QuickEntryForm
            giveaway={selectedGiveaway}
            onClose={() => setSelectedGiveaway(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ActiveGiveawayGrid;
