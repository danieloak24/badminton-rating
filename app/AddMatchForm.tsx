'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { calculateElo } from '@/lib/elo';

type Player = {
  id: string;
  name: string;
  rating: number;
  matches_played: number;
};

export default function AddMatchForm({ players }: { players: Player[] }) {
  const [playerA, setPlayerA] = useState('');
  const [playerB, setPlayerB] = useState('');
  const [winner, setWinner] = useState('');

  const submit = async () => {
    console.log('CLICKED', playerA, playerB, winner);

    if (!playerA || !playerB || !winner) {
      alert('Select players and winner');
      return;
    }

    if (playerA === playerB) {
      alert('Players must be different');
      return;
    }

    const A = players.find(p => p.id === playerA);
    const B = players.find(p => p.id === playerB);

    if (!A || !B) {
      alert('Player not found');
      return;
    }

    const scoreA = winner === playerA ? 1 : 0;

    const { newRatingA, newRatingB } = calculateElo(
      A.rating,
      B.rating,
      scoreA
    );

    // save match
    await supabase.from('matches').insert({
      player_a: playerA,
      player_b: playerB,
      winner,
    });

    // update player A
    await supabase
      .from('players')
      .update({
        rating: newRatingA,
        matches_played: A.matches_played + 1,
      })
      .eq('id', A.id);

    // update player B
    await supabase
      .from('players')
      .update({
        rating: newRatingB,
        matches_played: B.matches_played + 1,
      })
      .eq('id', B.id);

    alert('Match saved!');
    location.reload();
  };

  return (
    <div style={{ marginTop: 32 }}>
      <h3>➕ Add match</h3>

      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <select value={playerA} onChange={e => setPlayerA(e.target.value)}>
          <option value="">Player A</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select value={playerB} onChange={e => setPlayerB(e.target.value)}>
          <option value="">Player B</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select value={winner} onChange={e => setWinner(e.target.value)}>
          <option value="">Winner</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={submit}
          style={{
            padding: '6px 12px',
            cursor: 'pointer',
          }}
        >
          Save match
        </button>
      </div>
    </div>
  );
}
