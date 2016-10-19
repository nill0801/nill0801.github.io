app.controller('mainController',['$scope','commonService',function($scope,c_s){
  c_s.getDate('ertong',function(res){
    console.dir(res);
  });

}]);
