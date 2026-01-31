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
      link: 'https://twitter.com/lootix', // Replace with real handle
      completed: false,
    },
    {
      id: 2,
      action: 'Join our Discord',
      entries: 5,
      icon: '💬',
      link: 'https://discord.gg/lootix', // Replace with real invite
      completed: false,
    },
    {
      id: 3,
      action: 'Follow on Instagram',
      entries: 3,
      icon: '📸',
      link: 'https://instagram.com/lootix', // Replace with real handle
      completed: false,
    },
    {
      id: 4,
      action: 'Share on Facebook',
      entries: 3,
      icon: '👍',
      link: 'https://facebook.com/sharer/sharer.php?u=https://lootix.com',
      completed: false,
    },
  ]);

  const handleActionClick = (id: number, link: string) => {
    // Open the link in a new tab
    window.open(link, '_blank');

    // Mark as completed (in real app, verify via API)
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
    <section className="py-20 px-6 bg-dark-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-white">
          Earn <span className="text-primary">Bonus Entries</span>
        </h2>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          Complete social actions to increase your chances of winning
        </p>

        {/* Bonus Entries Counter */}
        {totalBonusEntries > 0 && (
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/20 border-2 border-primary rounded-lg px-6 py-3">
              <span className="text-2xl font-display font-bold text-primary">
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
              className={`relative bg-dark-900/50 backdrop-blur-lg border-2 rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
                action.completed
                  ? 'border-green-500/50 bg-green-500/10'
                  : 'border-primary/30 hover:border-primary/60 hover:shadow-neon-purple'
              }`}
            >
              {/* Completed Badge */}
              {action.completed && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
              )}

              {/* Icon */}
              <div className="text-4xl mb-3 text-center">{action.icon}</div>

              {/* Action Name */}
              <h3 className="text-lg font-semibold text-white text-center mb-2">
                {action.action}
              </h3>

              {/* Entries Badge */}
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-bold rounded-full">
                  +{action.entries} entries
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleActionClick(action.id, action.link)}
                disabled={action.completed}
                className={`w-full py-2 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                  action.completed
                    ? 'bg-green-500/50 text-white cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/90 text-white hover:scale-105'
                }`}
              >
                {action.completed ? 'Completed' : 'Complete Action'}
              </button>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Bonus entries are added to your account instantly. Complete all actions for maximum chances to win!
          </p>
        </div>
      </div>
    </section>
  );
};

export default BonusEntryActions;
