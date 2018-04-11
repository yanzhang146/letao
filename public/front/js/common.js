$(function(){
//初始化scroll控件：
  mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  //配置轮播图
  ///获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
  });
})
//截取地址栏数据的方法
function getSearch(key){
  //先获取数据栏中？后面的信息
  var search=location.search;
  search=search.slice(1);
  //解析成中文
  search=decodeURI(search);
  //切割成数组
  var arr=search.split("&");

  var obj={};
  //遍历数组
  arr.forEach(function(v,i){
    var str= v.split("=");
    var key=str[0];
    var value=str[1];
    obj[key]=value;
  });
  return obj[key];
}