$(function(){

//  请求左侧的数据
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      //console.log(info);
      var htmlStr=template("leftTmp",info);
      $("#left_content").html(htmlStr);
      //刚进入页面默认渲染第一页
      render(info.rows[0].id);
    }
  })

//  根据从左侧获取的id请求右侧的数据
  //给左侧a添加点击事件
  $("#left_content").on("click","a",function(){
    //获取点击元素的id
    var id=$(this).data("id");
    render(id);

  })
  // 封装请求函数
  function render(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{id:id},
      success:function(info){
        var htmlStr=template("rightTmp",info);
        $("#right_content").html(htmlStr);
      }
    })
  }
})