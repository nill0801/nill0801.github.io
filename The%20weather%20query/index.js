
function captureCityCode(){
  var weather=[];
  var table =document.querySelector('.table');
   table.innerHTML=`               <tr class="success"style="font-size:26px" id="IDS">
            <th></th>
           <th>日期</th>
           <th>星期</th>
           <th>风向</th>
           <th>风力</th>
           <th>最高温度</th>
           <th>最低温度</th>
           <th>天气</th>
          </tr>

`;
  var cityNa =document.querySelector('#cityName').value;
 var http =new XMLHttpRequest();
 http.onreadystatechange=function(e){
   if(http.readyState==4){
     var data =JSON.parse(http.responseText);

     if(data){
       var retData =data.retData;
       var citycode =retData.cityCode;
       $.ajax({
         url:'https://apis.baidu.com/apistore/weatherservice/recentweathers',
         method:'get',
         headers:{
           apikey:'cecee65cc1037e289f23d552d9a1e4e8'
         },
         dataType:'json',
         data:{cityname:cityNa,cityid:citycode},
         success:function(res){
           var keys=res.retData;
           var today =keys.today;
           console.log(today);
      //////////////////////////////////////今天
           var todayStr ='';
           todayStr+=`<tr class="success">
                   <th>今天</th>
                   <th>${today.date}</th>
                   <th>${today.week}</th>
                   <th>${today.fengxiang}</th>
                   <th>${today.fengli}</th>
                   <th>${today.hightemp}</th>
                   <th>${today.lowtemp}</th>
                   <th>${today.type}</th>
                  </tr>`;
                weather.push(todayStr);
                ////////////////////////未来四天
                 var fourDay =keys.forecast;
                 var str='';
                 for(var b=0;b<fourDay.length;b++){
                   var fourObj =fourDay[b];
                   str+=`<tr class="success">
                          <th>未来四天</th>
                           <th>${fourObj.date}</th>
                           <th>${fourObj.week}</th>
                           <th>${fourObj.fengxiang}</th>
                           <th>${fourObj.fengli}</th>
                           <th>${fourObj.hightemp}</th>
                           <th>${fourObj.lowtemp}</th>
                           <th>${fourObj.type}</th>
                          </tr>`;
                 }
                 weather.push(str);

                  //////////////////////前七天
           var history =keys.history;
           var historyStr ='';
           for(var i=0;i<history.length;i++){
             var obj =history[i];
             historyStr+=`<tr class="success">
                    <th>前七天</th>
                     <th>${obj.date}</th>
                     <th>${obj.week}</th>
                     <th>${obj.fengxiang}</th>
                     <th>${obj.fengli}</th>
                     <th>${obj.hightemp}</th>
                     <th>${obj.lowtemp}</th>
                     <th>${obj.type}</th>
                    </tr>`;
           }
           weather.push(historyStr);

            console.dir(weather);
           for(var a=0;a<weather.length;a++){
             var weaStr='';
             weaStr=weather[a];
             console.log(weaStr);
             table.innerHTML+=weaStr;
           }
         }

       });

     }
   }
 };
 var url ='https://apis.baidu.com/apistore/weatherservice/cityinfo';
 url+='?cityname='+cityNa;
http.open('get',url,true);
http.setRequestHeader('apikey','cecee65cc1037e289f23d552d9a1e4e8');
http.send();
}
