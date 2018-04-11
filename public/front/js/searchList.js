$(function(){
  //截取地址栏中的信息
  var key=getSearch("key");
  console.log(key);
  //设置给搜索框
  $(".lt_search input").val(key);
  render();
  //功能2:点击搜索按钮，实现搜索功能
  $(".lt_search button").click(function(){
    $(".lt_product").html('<div class="loading"></div>');
    render();
    //把搜索框中的内容，同步到本地存储
    var history=localStorage.getItem("search_list")||"[]";
    var arr=JSON.parse(history);
    //判断有没有重复的项，如果重复先删除
    var value=$('.lt_search input').val();
    var index=arr.indexOf(value);
    if(index!=-1){
      //说明有重复项
      arr.splice(index,1);
    }
    if(arr.length>=10){
      arr.pop();
    }
    arr.unshift(value);
    localStorage.setItem("search_list",JSON.stringify(arr));
  })

  //功能3：点击排序按钮，进行排序
  //1、注册点击事件
  $(".lt_sort a[data-type]").click(function(){
    $(".lt_product").html('<div class="loading"></div>');
     //判断有没有current那个类
    if($(this).hasClass("current")){
      //如果已经被点击过，切换小图标的类
      $(this).find('i').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
      //渲染页面
    }else{
      //说明没有current类
      $(this).addClass("current").siblings().removeClass("current");
      //让所有元素的箭头重置向下
      $(".lt_sort a").find("i").addClass("fa-angle-down").removeClass("fa-angle-up");
    }
    render();
  })

function render(){
  var params={};
  params.proName=$(".lt_search input").val();
  params.page=1;
  params.pageSize=100;
  var $current=$(".lt_sort .current");
  if($current.length>0){
    //说明有这个类，获取被选中元素的type
    var typeName=$current.data("type");
    //根据小箭头判断被选中的值
    var value=$current.find("i").hasClass("fa-angle-down")?2:1;
    params[typeName]=value;
    //发送ajax请求
  }
  setTimeout(function(){
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:params,
      success:function(info){
        console.log(info);
        var htmlStr=template("productTmp",info);
        $(".lt_product").html(htmlStr);
      }
    })
  },500)
}
})