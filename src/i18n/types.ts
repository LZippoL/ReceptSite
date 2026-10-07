export type Language = 'uk' | 'en' | 'de' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳' }
];

export interface TranslationSchema {
  common: {
    siteName: string;
    siteTagline: string;
    search: string;
    searchPlaceholder: string;
    loading: string;
    error: string;
    retry: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    view: string;
    close: string;
    back: string;
    share: string;
    copied: string;
    minutes: string;
    hours: string;
    min: string;
    h: string;
    servings: string;
    servingsCount: string;
    difficulty: string;
    calories: string;
    cal: string;
    all: string;
    reset: string;
    apply: string;
    clear: string;
    viewAll: string;
    recipesCount: string;
    articlesCount: string;
  };
  nav: {
    home: string;
    recipes: string;
    categories: string;
    fridge: string;
    articles: string;
    favorites: string;
    shoppingList: string;
    profile: string;
    admin: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    searchPlaceholder: string;
    fridgePrompt: string;
    fridgeTitle: string;
    fridgeDesc: string;
    fridgeBtn: string;
  };
  home: {
    categoriesTitle: string;
    categoriesSubtitle: string;
    recipeOfTheDay: string;
    recipeOfTheDaySubtitle: string;
    popularRecipes: string;
    popularSubtitle: string;
    quickRecipes: string;
    quickSubtitle: string;
    budgetRecipes: string;
    budgetSubtitle: string;
    seasonalRecipes: string;
    seasonalSubtitle: string;
    newRecipes: string;
    newSubtitle: string;
    articlesTitle: string;
    articlesSubtitle: string;
    readArticle: string;
    viewMore: string;
    statsRecipes: string;
    statsCategories: string;
    statsTime: string;
  };
  fridge: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    addBtn: string;
    popularTitle: string;
    popularStaples: string;
    yourIngredients: string;
    clearAll: string;
    filterOnlyFullMatch: string;
    manageStaples: string;
    readyNowTitle: string;
    readyNowSubtitle: string;
    almostReadyTitle: string;
    almostReadySubtitle: string;
    partialTitle: string;
    partialSubtitle: string;
    youHave: string;
    missingIngredients: string;
    allIngredientsReady: string;
    noResultsTitle: string;
    noResultsDesc: string;
    startPrompt: string;
    staplesModalTitle: string;
    staplesModalDesc: string;
    staplesAddPlaceholder: string;
    staplesResetDefault: string;
  };
  recipes: {
    title: string;
    subtitle: string;
    filterButton: string;
    activeFilters: string;
    sortBy: string;
    sortPopular: string;
    sortRating: string;
    sortNewest: string;
    sortCookTime: string;
    noRecipesFound: string;
    noRecipesDesc: string;
    resetFilters: string;
    loadMore: string;
    allCaughtUp: string;
  };
  recipeDetail: {
    prepTime: string;
    cookTime: string;
    totalTime: string;
    difficultyEasy: string;
    difficultyMedium: string;
    difficultyHard: string;
    nutrition: string;
    protein: string;
    fat: string;
    carbs: string;
    ingredientsTitle: string;
    checkAll: string;
    uncheckAll: string;
    addToShoppingList: string;
    addedToShoppingList: string;
    instructionsTitle: string;
    step: string;
    tip: string;
    startTimer: string;
    cookingModeBtn: string;
    cookingModeTooltip: string;
    authorBy: string;
    publishedOn: string;
    updatedOn: string;
    relatedRecipes: string;
    dietVegetarian: string;
    dietVegan: string;
    dietGlutenFree: string;
    dietLactoseFree: string;
  };
  cookingMode: {
    title: string;
    stepOf: string;
    prevStep: string;
    nextStep: string;
    finishCooking: string;
    exit: string;
    wellDone: string;
    wellDoneDesc: string;
    soundOn: string;
    soundOff: string;
  };
  shoppingList: {
    title: string;
    subtitle: string;
    addItemPlaceholder: string;
    addItemBtn: string;
    clearChecked: string;
    clearAll: string;
    emptyTitle: string;
    emptyDesc: string;
    browseRecipes: string;
    itemsTotal: string;
    itemsRemaining: string;
  };
  favorites: {
    title: string;
    subtitle: string;
    allFavorites: string;
    collections: string;
    createCollection: string;
    collectionNamePlaceholder: string;
    emptyTitle: string;
    emptyDesc: string;
    exploreBtn: string;
    removedToast: string;
    addedToast: string;
  };
  reviews: {
    title: string;
    count: string;
    writeReview: string;
    yourRating: string;
    yourName: string;
    yourNamePlaceholder: string;
    comment: string;
    commentPlaceholder: string;
    submit: string;
    noReviewsYet: string;
    successToast: string;
  };
  articles: {
    title: string;
    subtitle: string;
    readTime: string;
    byAuthor: string;
    relatedRecipes: string;
    shareArticle: string;
  };
  profile: {
    title: string;
    subtitle: string;
    savedRecipes: string;
    activeShoppingList: string;
    recentViewed: string;
    myStaplesTitle: string;
    myStaplesDesc: string;
    addStaplePlaceholder: string;
    settingsTitle: string;
    themeTitle: string;
    languageTitle: string;
    exportBackup: string;
    exportDesc: string;
    downloadBackup: string;
  };
  filters: {
    title: string;
    category: string;
    cuisine: string;
    difficulty: string;
    maxTime: string;
    upTo15: string;
    upTo30: string;
    upTo60: string;
    dietary: string;
    clearAll: string;
    showResults: string;
  };
  admin: {
    title: string;
    recipesTab: string;
    articlesTab: string;
    addRecipeBtn: string;
    addArticleBtn: string;
    editRecipe: string;
    editArticle: string;
    searchPlaceholder: string;
    deleteConfirm: string;
    savedSuccess: string;
    deletedSuccess: string;
  };
  shareModal: {
    title: string;
    copyLink: string;
    shareVia: string;
  };
  notFound: {
    title: string;
    desc: string;
    homeBtn: string;
  };
  categoriesList: Record<string, { name: string; description: string }>;
  cuisinesList: Record<string, string>;
}
