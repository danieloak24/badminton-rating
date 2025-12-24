
'use client';

import { supabase } from '@/lib/supabase';

export default function AddPlayerButton() {
  const addPlayer = async () => {
    const name = prompt('Enter player name');
    if (!name) return;

    await supabase.from('players').insert({
      name,
      rating: 1000,
      matches_played: 0,
    });

    location.reload();
  };

  return (
    <button
      onClick={addPlayer}
      style={{
        marginTop: 16,
        padding: '8px 14px',
        fontSize: 14,
        cursor: 'pointer',
      }}
    >
      ➕ Add player
    </button>
  );
}
