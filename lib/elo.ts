export function calculateElo(
  ratingA: number,
  ratingB: number,
  scoreA: 0 | 1,
  k = 24
) {
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedB = 1 - expectedA;

  return {
    newRatingA: Math.round(ratingA + k * (scoreA - expectedA)),
    newRatingB: Math.round(ratingB + k * ((1 - scoreA) - expectedB)),
  };
}
