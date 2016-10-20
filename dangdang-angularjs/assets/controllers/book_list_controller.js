app.controller('bookListController',['$scope','routeParams','commonService',function($scope,$routeParams,c_s){
  $scope.data=[];
  c_s.getDate($routeParams.id,function(res){
    $scope.data=res.data;
  });
}]);
