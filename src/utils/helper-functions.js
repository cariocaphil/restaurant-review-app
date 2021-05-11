export const getAverageRating = (ratingsArray) => {
  const starsArray = ratingsArray.map((item) => item.stars);
  const total = starsArray.reduce((a, b) => a + b);
  const average = total / starsArray.length;
  return Math.round(average * 100) / 100;
};
