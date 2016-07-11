const RecTable = require('../db/recModel.js');

// function to add recommendations to database
const addingRecommendations = (obj) => {
  for(const key in obj) {
  	RecTable.where('user_id', obj[key].user_id).fetch().then((user) => {
  		if(!user) {
  		  new RecTable(obj[key]).save();	
  		} else {
  		  user.set({
  		  	first: obj[key].first,
  		    second: obj[key].second,
  		    third: obj[key].third,
  		    fourth: obj[key].fourth,
  		    }).save();	
  		}
  	})
  }
}

const checkRecipesDifferences = (rank, user, currentUser, recommendedRecipes) => {
  if (rank > 60) {
    for ( const recipes in user) {
      if(user[recipes] !== currentUser[recipes]) {
        recommendedRecipes.push(user[recipes]);
      };
    };
  };
}

module.exports = function(obj) {
  let userRecObj = {};
	
  for( const key in obj) {
    let bestMatch = null;
    let secondBest = null;
    let thirdBest = null;
    let bestPercent = 0;
    let secondPercent = 0;
    let thirdPercent = 0;
    let recommendedRecipes = [];
    let currentUser = key;
    let currentUserFavs = obj[key]; 
      for( const compareUserKey in obj) {
        let similarityCount = 0;
        for(const recipeKey in obj[compareUserKey] ) {
          if(currentUserFavs[recipeKey] === obj[compareUserKey][recipeKey]) {
            similarityCount ++;
          };
        };

        let similarity = similarityCount / Object.keys(currentUserFavs).length;
        similarity = similarity * 100;
          if(bestPercent < similarity) {
            secondBest = bestMatch;
            bestPercent = secondPercent;
            bestMatch = compareUserKey;
            bestPercent = similarity;
          } else if (secondPercent < similarity && bestPercent > similarity) {
            thirdBest = secondBest;
            thirdPercent = secondPercent;
            secondBest = compareUserKey;
            secondPercent = similarity;
          } else if (thirdPercent < similarity && secondPercent > similarity) {
            thirdBest = compareUserKey;
            thirdPercent = similarity;
          };

      };
    checkRecipesDifferences(bestPercent, obj[bestMatch], currentUserFavs, recommendedRecipes);
    checkRecipesDifferences(secondPercent, obj[bestMatch], currentUserFavs, recommendedRecipes);
    checkRecipesDifferences(thirdPercent, obj[bestMatch], currentUserFavs, recommendedRecipes);

    userRecObj[currentUser] = {
      user_id: currentUser,
      first: recommendedRecipes[0],
      second: recommendedRecipes[1],
      third: recommendedRecipes[2],
      fourth: recommendedRecipes[3],
    }
  }; 
  addingRecommendations(userRecObj);
};
