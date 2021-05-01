export const getAverageRating = (ratingsArray) =>
  ratingsArray.reduce((a, b) => (a.stars + b.stars) / ratingsArray.length);
