(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',  MenuSearchService)
.directive('foundItems', foundItems);
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function foundItems() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      foundItems: '<',
      //myTitle: '@title',
     // badRemove: '=',
      onRemove: '&'
    },
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;
  list.found=[]; 
  list.NarrowItDown= function()
  {
    list.found=MenuSearchService.getMatchedMenuItems();
  }
  

  list.removeItem=function (itemIndex) {
   //items.splice(itemIndex, 1); 
   list.found.splice(itemIndex, 1);
  };

}


MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){

var service = this;

service.getMatchedMenuItems = function (searchTerm) {
    var term= searchTerm.toLowerCase();
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
   return response.then(function(result))
    {
      var allItems = response.data; 
      var foundItems=[];
      for(var i=0;i<allItems.length; i++)
      {
        if(allItems[i]["description"].toLowerCase().includes(term,0)===true)
        {
          foundItems.push(allItems[i]);
        }
      }

      return foundItems;
    }
    
    
  };




}



})();
