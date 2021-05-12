export const getAverageRating = (ratingsArray) => {
  const starsArray = ratingsArray && ratingsArray.map((item) => item.stars);
  const total = starsArray && starsArray.reduce((a, b) => a + b);
  const average = total / (starsArray && starsArray.length);
  return Math.round(average * 100) / 100;
};
