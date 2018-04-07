

$(function(){
//  1、发送请求数据
  var currentPage=1;
  var pageSize=5;
  render();
 function render(){
   $.ajax({
     type:'get',
     url:'/category/queryTopCategoryPaging',
     data:{
       page:currentPage,
       pageSize:pageSize
     },
     success:function(info){
       console.log(info);
       var htmlStr=template("firstTmp",info);
       //  添加到页面中
       $(".lt_content tbody").html(htmlStr);
       //  生成分页
       $("#paginator").bootstrapPaginator({
         bootstrapMajorVersion:3,
         currentPage:currentPage,
         totalPages:Math.ceil(info.total/info.size),
       //  注册点击事件
         onPageClicked:function(a,b,c,page){
           currentPage=page;
           render();
         }

       })
     }
   })
 }

////  2、给添加分类按钮注册点击事件
$("#addBtn").click(function(){
  //  让模态框显示
  $("#addModal").modal("show");

})

  //  3、给表单那添加表单校验
  $("#form").bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields:{
      categoryName:{
        //校验规则
        validators:{
          //  非空校验
          notEmpty:{
            //提示信息
            message:"请输入一级分类名称"
          }
        }
      }
    }
  });
  //4、注册表单验证成功事件
  $("#form").on("success.form.bv",function(){

    //发送添加数据请求
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$("#form").serialize(),
      success:function(info){
        console.log(info);
        //添加成功
        if(info.success){
          //让模态框隐藏
          $("#addModal").modal("hide");
          currentPage=1;
          render();

          //重置表单验证状态和表单内容
          //传true不仅可以重置状态，还可以重置内容
          $("#form").data('bootstrapValidator').resetForm(true);
        }
      }
    })

  })


})