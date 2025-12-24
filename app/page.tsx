import { supabase } from '@/lib/supabase';
import AddPlayerButton from './AddPlayerButton';
import AddMatchForm from './AddMatchForm';
import MatchHistory from './MatchHistory';
import Stats from './Stats';

export default async function Home() {
  const { data: players } = await supabase
    .from('players')
    .select('*')
    .order('rating', { ascending: false });

  return (
    <main style={{ padding: 32, fontFamily: 'sans-serif' }}>
   <h1>🏸 Badminton Rating</h1>
<AddPlayerButton />  
<AddMatchForm players={players || []} />



      <table
        style={{
          marginTop: 20,
          borderCollapse: 'collapse',
          minWidth: 500,
        }}
      >
        <thead>
          <tr>
            <th style={th}>#</th>
            <th style={th}>Player</th>
            <th style={th}>Rating</th>
            <th style={th}>Matches</th>
          </tr>
        </thead>
        <tbody>
          {players?.map((player, index) => (
            <tr key={player.id}>
              <td style={td}>{index + 1}</td>
              <td style={td}>{player.name}</td>
              <td style={td}>{player.rating}</td>
              <td style={td}>{player.matches_played}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <MatchHistory />
<Stats players={players || []} />
    </main>
  );
}

const th = {
  borderBottom: '2px solid #ddd',
  padding: '8px 12px',
  textAlign: 'left' as const,
};

const td = {
  borderBottom: '1px solid #eee',
  padding: '8px 12px',
};