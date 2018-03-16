const mockRecipesData = {
  getAllRecipesSuccess: {
    allRecipes: [
      {
        id: 26,
        recipeName: 'rice and chicken',
        image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F702446f3-a2c2-48c7-a9d1-af20be9281d7.jpeg?alt=media&token=1827adb2-4108-4939-9fe0-778e27dd5212',
        mealType: 'lunch',
        description: 'amazing recipe',
        method: 'research on that',
        ingredients: 'rice,chicken,rice,chicken',
        upvotes: 2,
        downvotes: 1,
        userId: 1,
        addedBy: 'sannytee',
        createdAt: '2018-02-20T10:10:45.197Z',
        updatedAt: '2018-03-12T09:32:31.056Z'
      },
      {
        id: 27,
        recipeName: 'new recipe',
        image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F702446f3-a2c2-48c7-a9d1-af20be9281d7.jpeg?alt=media&token=1827adb2-4108-4939-9fe0-778e27dd5212',
        mealType: 'breakfast',
        description: 'amazing',
        method: 'great',
        ingredients: 'awesome',
        upvotes: 0,
        downvotes: 1,
        userId: 1,
        addedBy: 'sannytee',
        createdAt: '2018-02-20T10:11:25.020Z',
        updatedAt: '2018-03-06T11:08:34.739Z'
      },
      {
        id: 33,
        recipeName: 'recipe',
        image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F463fb7f5-37ad-4a76-8dce-2ad3feb73e00.jpeg?alt=media&token=6b3afedd-09f3-4582-829a-6a665454db8d',
        mealType: 'tea',
        description: 'test',
        method: 'great',
        ingredients: 'great',
        upvotes: 1,
        downvotes: 0,
        userId: 1,
        addedBy: 'sannytee',
        createdAt: '2018-02-20T10:19:50.363Z',
        updatedAt: '2018-03-06T10:57:55.712Z'
      },
      {
        id: 48,
        recipeName: 'Eba and vegetable',
        image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F99d42668-42c7-435a-9ea3-0d8ab7a0e62a.jpeg?alt=media&token=cc1d3c0a-716d-42ff-8222-693757baa5cb',
        mealType: 'lunch',
        description: 'awesome ',
        method: 'wash the vegatable\nboil the water',
        ingredients: 'garri, vegetable,seasoning, blah,blah,blah',
        upvotes: 2,
        downvotes: 0,
        userId: 3,
        addedBy: 'admin367',
        createdAt: '2018-02-20T10:57:03.524Z',
        updatedAt: '2018-02-27T10:05:58.619Z'
      },
    ],
    pages: 2
  },
  getAllRecipesError: {
    error: 'Permission denied'
  },
  getPopularRecipesSuccess: [
    {
      id: 48,
      recipeName: 'Eba and vegetable',
      image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F99d42668-42c7-435a-9ea3-0d8ab7a0e62a.jpeg?alt=media&token=cc1d3c0a-716d-42ff-8222-693757baa5cb',
      mealType: 'lunch',
      description: 'awesome ',
      method: 'wash the vegatable\nboil the water',
      ingredients: 'garri, vegetable,seasoning, blah,blah,blah',
      upvotes: 2,
      downvotes: 0,
      userId: 3,
      addedBy: 'admin367',
      createdAt: '2018-02-20T10:57:03.524Z',
      updatedAt: '2018-02-27T10:05:58.619Z'
    },
    {
      id: 26,
      recipeName: 'rice and chicken',
      image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F702446f3-a2c2-48c7-a9d1-af20be9281d7.jpeg?alt=media&token=1827adb2-4108-4939-9fe0-778e27dd5212',
      mealType: 'lunch',
      description: 'amazing recipe',
      method: 'research on that',
      ingredients: 'rice,chicken,rice,chicken',
      upvotes: 2,
      downvotes: 1,
      userId: 1,
      addedBy: 'sannytee',
      createdAt: '2018-02-20T10:10:45.197Z',
      updatedAt: '2018-03-12T09:32:31.056Z'
    },
    {
      id: 53,
      recipeName: 'Shredded chiken',
      image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F401e40a2-a363-4910-9c94-2f5d2c5875b1.jpg?alt=media&token=acf1977d-c406-4a88-9577-9fa1e34c8f70',
      mealType: 'elevenses',
      description: 'An amazing recipe made from chicken',
      method: 'slice the chicken to small pieces\nwash the vegetables\nslice the fruits into small pieces',
      ingredients: 'chicken, vegetables, fruits',
      upvotes: 1,
      downvotes: 0,
      userId: 1,
      addedBy: 'sannytee',
      createdAt: '2018-02-27T09:54:05.790Z',
      updatedAt: '2018-03-06T10:56:57.198Z'
    },
    {
      id: 56,
      recipeName: "Some elements that are clickable mysteriously don't trigger a pointer cursor in browsers. This fixes that, and provides a default class \"pointer\" for applying it to other clickable things as needed.",
      image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F6f3fd226-4237-47fd-a716-f64b3c3dea2f.jpg?alt=media&token=f754b717-f91b-4bc7-9aeb-7fd19f98b123',
      mealType: 'brunch',
      description: "Some elements that are clickable mysteriously don't trigger a pointer cursor in browsers. This fixes that, and provides a default class \"pointer\" for applying it to other clickable things as needed. Some elements that are clickable mysteriously don't trigger a pointer cursor in browsers. This fixes that, and provides a default class \"pointer\" for applying it to other clickable things as needed. Some elements that are clickable mysteriously don't trigger a pointer cursor in browsers. This fixes that, and provides a default class \"pointer\" for applying it to other clickable things as needed. Some elements that are clickable mysteriously don't trigger a pointer cursor in browsers. This fixes that, and provides a default class \"pointer\" for applying it to other clickable things as needed.",
      method: "Some elements that are clickable mysteriously don't trigger a pointer cursor in browsers. This fixes that, and provides a default class \"pointer\" for applying it to other clickable things as needed. Some elements that are clickable mysteriously don't trigger a pointer cursor in browsers. This fixes that, and provides a default class \"pointer\" for applying it to other clickable things as needed. Some elements that are clickable mysteriously don't trigger a pointer cursor in browsers. This fixes that, and provides a default class \"pointer\" for applying it to other clickable things as needed. Some elements that are clickable mysteriously don't trigger a pointer cursor in browsers. This fixes that, and provides a default class \"pointer\" for applying it to other clickable things as needed.",
      ingredients: "Some, elements, that, are, clickable, mysteriously, don't, trigger, a pointer cursor in browsers. This fixes that, and provides, a, default class, \"pointer\" for applying, it to other clickable ,things as needed",
      upvotes: 1,
      downvotes: 0,
      userId: 2,
      addedBy: 'username',
      createdAt: '2018-03-06T11:19:10.386Z',
      updatedAt: '2018-03-13T02:54:06.452Z'
    },
    {
      id: 59,
      recipeName: 'indomie',
      image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F0672f71e-5018-4a19-8970-ecc6c835d827.jpg?alt=media&token=a9730299-fad9-45ba-a07f-3ef5742f9092',
      mealType: 'breakfast',
      description: 'amazing',
      method: 'google it',
      ingredients: 'indomie',
      upvotes: 1,
      downvotes: 0,
      userId: 1,
      addedBy: 'sannytee',
      createdAt: '2018-03-10T23:12:44.072Z',
      updatedAt: '2018-03-11T08:24:52.021Z'
    },
    {
      id: 51,
      recipeName: 'cupcakes',
      image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2Ffb54ab3c-fd39-4955-a9a9-3d4282a6fc10.png?alt=media&token=3058df06-c8eb-461d-ad5b-197996221ad3',
      mealType: 'tea',
      description: 'cupcakes',
      method: 'research on that',
      ingredients: 'cake,cake,cake,cake',
      upvotes: 1,
      downvotes: 0,
      userId: 3,
      addedBy: 'admin367',
      createdAt: '2018-02-20T18:17:37.078Z',
      updatedAt: '2018-03-06T10:57:21.354Z'
    },
  ],
  error: {
    error: 'Permission denied'
  },
  recipeData: {
    id: 27,
    recipeName: 'new recipe',
    image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F702446f3-a2c2-48c7-a9d1-af20be9281d7.jpeg?alt=media&token=1827adb2-4108-4939-9fe0-778e27dd5212',
    mealType: 'breakfast',
    description: 'amazing',
    method: 'great',
    ingredients: 'awesome',
    upvotes: 0,
    downvotes: 1,
    userId: 1,
    addedBy: 'sannytee',
    createdAt: '2018-02-20T10:11:25.020Z',
    updatedAt: '2018-03-06T11:08:34.739Z',
    reviews: [
      {
        userId: 5,
        recipeId: 27,
        review: 'hi there\n',
        username: 'sannikay',
        createdAt: '2018-03-11T06:20:58.315Z'
      }
    ]
  },
  recipeDetailsError: {
    message: 'recipe not found'
  },
  reviewSuccess: {
    id: 26,
    userId: 1,
    username: 'sannytee',
    recipeId: 27,
    review: 'thhhhh',
    updatedAt: '2018-03-14T06:58:31.808Z',
    createdAt: '2018-03-14T06:58:31.808Z'
  },
  voteRecipeResponse: {
    message: 'Recipe successfully upvoted',
    recipe: {
      id: 27,
      recipeName: 'new recipe',
      image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F702446f3-a2c2-48c7-a9d1-af20be9281d7.jpeg?alt=media&token=1827adb2-4108-4939-9fe0-778e27dd5212',
      mealType: 'breakfast',
      description: 'amazing',
      method: 'great',
      ingredients: 'awesome',
      upvotes: 1,
      downvotes: 0,
      userId: 1,
      addedBy: 'sannytee',
      createdAt: '2018-02-20T10:11:25.020Z',
      updatedAt: '2018-03-14T09:54:11.869Z'
    }
  },
  favoriteRecipeResponse: {
    recipeId: 27,
    message: 'Recipe removed from favorites',
  },
  userRecipesSuccess: {
    userRecipes: [
      {
        id: 59,
        recipeName: 'indomie',
        image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F0672f71e-5018-4a19-8970-ecc6c835d827.jpg?alt=media&token=a9730299-fad9-45ba-a07f-3ef5742f9092',
        mealType: 'breakfast',
        description: 'amazing',
        method: 'google it',
        ingredients: 'indomie',
        upvotes: 1,
        downvotes: 0,
        userId: 1,
        addedBy: 'sannytee',
        createdAt: '2018-03-10T23:12:44.072Z',
        updatedAt: '2018-03-11T08:24:52.021Z'
      },
      {
        id: 26,
        recipeName: 'rice and chicken',
        image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F702446f3-a2c2-48c7-a9d1-af20be9281d7.jpeg?alt=media&token=1827adb2-4108-4939-9fe0-778e27dd5212',
        mealType: 'lunch',
        description: 'amazing recipe',
        method: 'research on that',
        ingredients: 'rice,chicken,rice,chicken',
        upvotes: 2,
        downvotes: 0,
        userId: 1,
        addedBy: 'sannytee',
        createdAt: '2018-02-20T10:10:45.197Z',
        updatedAt: '2018-03-14T09:51:21.150Z'
      },
      {
        id: 27,
        recipeName: 'new recipe',
        image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F702446f3-a2c2-48c7-a9d1-af20be9281d7.jpeg?alt=media&token=1827adb2-4108-4939-9fe0-778e27dd5212',
        mealType: 'breakfast',
        description: 'amazing',
        method: 'great',
        ingredients: 'awesome',
        upvotes: 1,
        downvotes: 0,
        userId: 1,
        addedBy: 'sannytee',
        createdAt: '2018-02-20T10:11:25.020Z',
        updatedAt: '2018-03-14T09:54:11.869Z'
      },
    ],
    pages: 2,
    totalRecipes: 7
  },
  favoriteRecipes: {
    favorited: [
      {
        id: 46,
        userId: 1,
        recipeId: 27,
        createdAt: '2018-03-13T08:00:46.343Z',
        updatedAt: '2018-03-13T08:00:46.343Z',
        Recipe: {
          id: 27,
          recipeName: 'new recipe',
          image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F702446f3-a2c2-48c7-a9d1-af20be9281d7.jpeg?alt=media&token=1827adb2-4108-4939-9fe0-778e27dd5212',
          mealType: 'breakfast',
          description: 'amazing',
          method: 'great',
          ingredients: 'awesome',
          upvotes: 1,
          downvotes: 0,
          userId: 1,
          addedBy: 'sannytee',
          createdAt: '2018-02-20T10:11:25.020Z',
          updatedAt: '2018-03-14T09:54:11.869Z'
        }
      }
    ],
    count: 1
  },
  userFavoriteIds: {
    recipeIds: [
      26,
      33,
      27,
      48,
      52
    ]
  },
  addRecipeResponse: {
    success: true,
    Recipe: {
      upvotes: 0,
      downvotes: 0,
      id: 61,
      userId: 1,
      addedBy: 'sannytee',
      recipeName: 'awesome',
      mealType: 'breakfast',
      description: 'amazing',
      method: 'great',
      ingredients: 'awesome',
      image: 'https://firebasestorage.googleapis.com/v0/b/more-r…=media&token=c59a0061-a23c-4ace-9746-32279',
      updatedAt: '2018-03-14T14:58:12.947Z',
      createdAt: '2018-03-14T14:58:12.947Z'
    },
    message: 'Recipe successfully added'
  },
  editRecipeResponse: {
    Recipe: {
      id: 26,
      recipeName: 'aweso',
      image: 'https://firebasestorage.googleapis.com/v0/b/more-r…=media&token=c59a0061-a23c-4ace-9746-32279',
      mealType: 'breakfast',
      description: 'amazing',
      method: 'great',
      ingredients: 'awesome',
      upvotes: 2,
      downvotes: 1,
      userId: 1,
      addedBy: 'sannytee',
      createdAt: '2018-02-20T10:10:45.197Z',
      updatedAt: '2018-03-14T15:09:46.190Z'
    },
    message: 'Recipe successfully updated'
  },
  deleteRecipeResponse: {
    message: 'recipe successfully deleted'
  },
  userData: {
    profile: {
      id: 1,
      username: 'sannytee',
      email: 'tester@test.com',
      image: null,
      createdAt: '2018-02-19T15:54:05.322Z'
    }
  }
};

export default mockRecipesData;
