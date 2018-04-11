$(function(){
  //截取地址栏中的信息
  var value=getSearch("value");
  console.log(value);
  //把信息添加到输入框
  $(".lt_search input").val(value);
  render();
  function render(){
    var params={};
    params.proName=$(".lt_search input").val();
    params.page=1;
    params.pageSize=100;
    //获取到有current类的元素
    var $current=$(".lt_sort .current");
    if($current.length>0){
      //说明有这个类
      var sortName=$current.data("type");
      var sortValue=$current.find("i").hasClass("fa-angle-down")? 2:1;
      params[sortName]=sortValue;
    }
   setTimeout(function(){
     $.ajax({
       type:'get',
       url:'/product/queryProduct',
       data:params,
       success:function(info){
         console.log(info);
         //把获取到的数据添加到页面中
         $(".lt_product").html(template("productTmp",info));

       }
     })
   },1000);
  }

})