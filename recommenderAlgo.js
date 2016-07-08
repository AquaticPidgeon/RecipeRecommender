const RecTable = require('./db/recModel.js');

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

module.exports = function(obj) {
	let userRecObj = {};
	
	for( const key in obj) {
	  let bestMatch = null;
	  let secondBest = null;
	  let thirdBest = null;
	  let bestPercent = 0;
	  let secondPercent = 0;
	  let thirdPercent = 0;
      let currentUser = key;
      let currentUserFavs = obj[key]; 
      let recommendedRecipes = [];
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

    if (bestPercent > 60) {
      for ( const recipes in obj[bestMatch]) {
        if(obj[bestMatch][recipes] !== currentUserFavs[recipes]) {
          recommendedRecipes.push(obj[bestMatch][recipes]);
        };
      };
    };
    if (secondPercent > 60) {
      for ( const recipes in obj[secondBest]) {
        if(obj[secondBest][recipes] !== currentUserFavs[recipes]) {
          recommendedRecipes.push(obj[secondBest][recipes]);
        };
      };
    };
    if (thirdPercent > 60) {
      for ( const recipes in obj[thirdBest]) {
        if(obj[thirdBest][recipes] !== currentUserFavs[recipes]) {
          recommendedRecipes.push(obj[thirdBest][recipes]);
        };
      };
    };
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
