app.factory('commonService',['$http',function($http){
  var service={};
  service.getDate=function(type,callBack){
    $http({
      url:'/dangdang-angularjs/data/book_'+type+'.json',
      method:'get'
    })
    .then(function(res){
      console.log('获取数据成功');
      callBack(res);
    },function(err){
      console.log(err);
    });
  };
  return service;
}]);
