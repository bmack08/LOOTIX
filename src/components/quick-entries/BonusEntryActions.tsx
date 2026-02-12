'use client';

import { FC, useState } from 'react';

interface BonusAction {
  id: number;
  action: string;
  entries: number;
  icon: string;
  link: string;
  completed: boolean;
}

const BonusEntryActions: FC = () => {
  const [bonusActions, setBonusActions] = useState<BonusAction[]>([
    {
      id: 1,
      action: 'Follow us on Twitter',
      entries: 5,
      icon: '𝕏',
      link: 'https://twitter.com/getlootix',
      completed: false,
    },
    {
      id: 2,
      action: 'Join our Discord',
      entries: 5,
      icon: '💬',
      link: 'https://discord.gg/lootix',
      completed: false,
    },
    {
      id: 3,
      action: 'Follow on Instagram',
      entries: 3,
      icon: '📸',
      link: 'https://instagram.com/getlootix',
      completed: false,
    },
    {
      id: 4,
      action: 'Share on Facebook',
      entries: 3,
      icon: '👍',
      link: 'https://facebook.com/sharer/sharer.php?u=https://getlootix.com',
      completed: false,
    },
  ]);

  const handleActionClick = (id: number, link: string) => {
    window.open(link, '_blank');
    setBonusActions((prev) =>
      prev.map((action) =>
        action.id === id ? { ...action, completed: true } : action
      )
    );
  };

  const totalBonusEntries = bonusActions
    .filter((action) => action.completed)
    .reduce((sum, action) => sum + action.entries, 0);

  return (
    <section className="py-20 px-6 bg-bg-secondary">
      <div className="max-w-container mx-auto">
        <h2 className="font-display font-bold text-section-mobile md:text-section text-center mb-4 text-text-primary uppercase">
          Earn <span className="text-cta-primary">Bonus Entries</span>
        </h2>
        <p className="text-center text-text-secondary mb-8 max-w-2xl mx-auto">
          Complete social actions to increase your chances of winning
        </p>

        {/* Bonus Entries Counter */}
        {totalBonusEntries > 0 && (
          <div className="text-center mb-8">
            <div className="inline-block bg-cta-primary/10 border-2 border-cta-primary rounded-md px-6 py-3">
              <span className="text-2xl font-display font-bold text-cta-primary">
                +{totalBonusEntries} Bonus Entries Earned!
              </span>
            </div>
          </div>
        )}

        {/* Bonus Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bonusActions.map((action) => (
            <div
              key={action.id}
              className={`relative bg-bg-primary border rounded-md p-6 transition-all duration-300 hover:translate-y-[-4px] ${
                action.completed
                  ? 'border-success/50 bg-success/5'
                  : 'border-accent-earth/30 hover:border-cta-primary hover:shadow-glow'
              }`}
            >
              {action.completed && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-success rounded-full flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
              )}

              <div className="text-4xl mb-3 text-center">{action.icon}</div>

              <h3 className="text-lg font-semibold text-text-primary text-center mb-2">
                {action.action}
              </h3>

              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 bg-cta-primary/10 text-cta-primary text-sm font-bold rounded-full">
                  +{action.entries} entries
                </span>
              </div>

              <button
                onClick={() => handleActionClick(action.id, action.link)}
                disabled={action.completed}
                className={`w-full py-2 rounded-sm font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  action.completed
                    ? 'bg-success/30 text-success cursor-not-allowed'
                    : 'btn-primary justify-center'
                }`}
              >
                {action.completed ? 'Completed' : 'Complete Action'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-text-muted">
            Bonus entries are added to your account instantly. Complete all actions for maximum chances to win!
          </p>
        </div>
      </div>
    </section>
  );
};

export default BonusEntryActions;
