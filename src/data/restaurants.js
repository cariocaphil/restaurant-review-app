const initialData = [
  {
    id: 1,
    restaurantName: "Bronco",
    address: "39 Rue des Petites Écuries, 75010 Paris",
    lat: 48.8737815,
    long: 2.3501649,
    ratings: [
      {
        id: 1,
        stars: 4,
        comment:
          "Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande.",
      },
      { id: 2, stars: 5, comment: "Tout simplement mon restaurant préféré !" },
    ],
  },
  {
    id: 2,
    restaurantName: "Babalou",
    address: "4 Rue Lamarck, 75018 Paris",
    lat: 48.8865035,
    long: 2.3442197,
    ratings: [
      {
        id: 1,
        stars: 5,
        comment:
          "Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !",
      },
      { id: 2, stars: 3, comment: "J'ai trouvé ça correct, sans plus" },
    ],
  },
];

export default initialData;
