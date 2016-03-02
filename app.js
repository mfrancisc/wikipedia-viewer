angular.module('WikiViewer', [])
.constant('WikipediaApiEndPoint', {
        "url": "https://en.wikipedia.org/w/api.php"
})
.factory('WikipediaApi', WikipediaApi)
.controller('WikipediaCtrl', WikipediaCtrl);

function WikipediaApi ($http, WikipediaApiEndPoint ) {

  var results  = function(searchText) {
    return $http.jsonp(WikipediaApiEndPoint.url+'?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=JSON_CALLBACK&gsrsearch=' + searchText)
      .then(function(data) {
        return data;
      });
  };

  return {
    find: results
  };
}
function WikipediaCtrl ($scope, WikipediaApi) 
{
  var wikiList = this;
  $scope.change = function (){
    var results = {data : {query: {pages : ""}}};
  WikipediaApi.find(wikiList.searchText).then(function(results){
   wikiList.wikis = results.data.query.pages;
   console.log(wikiList.wikis);
  });
  }

}

