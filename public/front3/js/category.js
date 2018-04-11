$(function(){
  //请求一级分类数据的ajax
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      console.log(info);
      $("#left").html(template("leftTmp",info));
      //刚进页面默认渲染第一个
      render(info.rows[0].id);
    }
  });
  //根据一级分类id请求二级分类
  //进入页面先调用一次

  render(2);

  function render(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{id:id},
      success:function(info){
        $("#right").html(template("rightTmp",info));
      }
    })
  }
  //给左边的a注册委托事件
  $("#left").on("click","a",function(){
    //获取到对应的id
    var id=$(this).data("id");
    //重新请求ajax
    render(id);
    //移除所有a的current类
    $("#left a").removeClass("current");
    //被点击的元素添加类
    $(this).addClass("current");

  })
})