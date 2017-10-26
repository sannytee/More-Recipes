const db = [];

db.recipes = [
  {
    id: 1,
    userId: 1,
    recipeName: 'Pounded Yam',
    mealType: 'Lunch',
    level: 'Hard',
    description: 'blah blah blah',
    ingredients: ['yam', 'salt', 'water'],
    upvotes: 30,
    downvotes: 4,
  },
  {
    id: 2,
    userId: 3,
    recipeName: 'Jollof rice',
    mealType: 'Lunch',
    level: 'Hard',
    description: 'blah blah blah',
    ingredients: ['rice', 'pepper', 'water'],
    upvotes: 50,
    downvotes: 40,
  },
];

db.review = [
  {
    id: 1,
    recipeId: 1,
    review: "It's so so delicious"
  },
  {
    id: 2,
    recipeId: 2,
    review: 'not tasty'
  }
];

export default db;
