import { supabase } from '@/lib/supabase';

export default async function MatchHistory() {
  const { data: matches } = await supabase
    .from('matches')
    .select(`
      id,
      created_at,
      player_a ( name ),
      player_b ( name ),
      winner ( name )
    `)
    .order('created_at', { ascending: false });

  return (
    <div style={{ marginTop: 40 }}>
      <h3>📜 Match history</h3>

      <ul>
        {matches?.map((m: any) => (
          <li key={m.id}>
            {new Date(m.created_at).toLocaleDateString()} —{' '}
            {m.player_a.name} vs {m.player_b.name},{' '}
            <strong>winner: {m.winner.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
