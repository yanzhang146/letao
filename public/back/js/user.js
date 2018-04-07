$(function(){
  var currentPage=1;
  var pageSize=5;
  //获取用户数据并渲染到页面中
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var htmlStr=template("usertmp",info);
        //  把模板添加到指定的地方
        $(".lt_main tbody").html(htmlStr);

        //  分页功能
        $("#paginator").bootstrapPaginator({
          //注定bootstap的版本
          bootstrapMajorVersion:3,
          //当前页
          currentPage:currentPage,
          //  总页数
          totalPages:Math.ceil(info.total/info.size),
          //  为按钮绑定点击事件
          onPageClicked:function(a,b,c,page){
            //page当前点击的按钮数
            currentPage=page;
            render();

          }


        });
      }
  });
}
//  2、通过事件委托给按钮注册点击事件
  $(".lt_content tbody").on("click",".btn",function(){
  //  1、让模态框显示
    $("#logoutModal").modal("show");
  //  获取点击按钮的id
    var id=$(this).parent().data("id");
    console.log(id);
  //  获取将来需要将用户设置成什么状态
    var isDelete=$(this).hasClass("btn-success")?1:0;
    console.log(isDelete)
    $("#submitBtn").off().on("click",function(){
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          console.log(info);
          if(info.success){
            //关闭模态框
            $("#logoutModal").modal("hide");
            //渲染页面
            //currentPage=1;
            render();
          }

        }
      })
    })


  })
})