const PopTable = require('../db/popularModel.js');
// function adds recipes to the PopTable
const addMostPopular = function (obj) {
  for (let i = 0; i < 5; i++) {
    PopTable.where('id', i + 1).fetch().then((pop) => {
      // if there are no recipes saved then add them
      if(!pop) {
        new PopTable({
          title: obj[i][0],
          count: obj[i][1],
        }).save(); 
      } else {
      // if there are records saved update them with new data 
        pop.set({
          title: obj[i][0],
          count: obj[i][1],
        }).save();
      };
    });
  };
};
// function formats the in coming object
// helps with saving it to the database
const sortRecipes = function (obj) {
  let sortedRecipes = [];
  for(const key in obj) {
  	if(obj.hasOwnProperty(key)) {
  	  sortedRecipes.push([key, obj[key]]);
  	}
  }
  	sortedRecipes.sort(function(a,b) {
  	  return b[1] - a[1];
  	})
  	return sortedRecipes;
  }

module.exports = function(obj) {
  // calls the two functions above
  let sortedRecipes = sortRecipes(obj);
  addMostPopular(sortedRecipes);
}