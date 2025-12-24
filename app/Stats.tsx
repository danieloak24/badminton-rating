'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default function Stats({ players }: { players: any[] }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3>📈 Matches played</h3>

      <Line
        data={{
          labels: players.map(p => p.name),
          datasets: [
            {
              label: 'Matches',
              data: players.map(p => p.matches_played),
            },
          ],
        }}
      />
    </div>
  );
}
