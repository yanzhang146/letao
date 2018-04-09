$(function(){
  var currentPage=1;
  var pageSize=5;//每页条数
  //1、已进入页面进行渲染
  render();
  function render(){
    //发送ajax请求获取数据
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var htmlStr=template("secondTmp",info);
      //  将数据添加到指定位置
        $(".lt_content tbody").html(htmlStr);
        //生成分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        })
      },


    })
  };

  //2、点击添加分类按钮，显示添加模态框
  $("#addBtn").click(function(){
    //让模态框显示
    $("#addModal").modal('show');
    //请求一级分类名称，渲染下拉菜单
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        var htmlStr1=template("tmp",info);
        //  将数据添加到指定位置
        $(".dropdown-menu").html(htmlStr1);
      },
    })
  });

  //3、通过注册委托事件，给a注册点击事件
  $(".dropdown-menu").on("click","a",function(){
    //获取被选中的a的值
    var value=$(this).text();
    var id=$(this).data("id");
    //添加到框内
    $("#dropdownText").text(value);
    $('[name="categoryId"]').val(id);
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  })

  //4、配置图片上传
  $("#fileupload").fileupload({
    dataType:'json',
    //data图片上传后的对象
    done:function(e,data){
      console.log(data);
      //获取上传成功的图片地址
      var picAddr=data.result.picAddr;
      //设置图片地址
      $("#imgBox img").attr("src",picAddr);
      //将图片的地址存在隐藏域中
      $('[name="brandLogo"]').val(picAddr);
      $("#form").data('bootstrapValidator').updateStatus("brandLogo","VALID");

    }
  })
//  5、配置表单校验
  $("#form").bootstrapValidator({
    //将默认的排除项，充值掉（，默认会对：hidden,disabled等进行排查）
    excluded:[],
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  //  配置字段
    fields:{
      categoryId:{
        //校验项
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类名称'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传图片'
          }
        }
      },
    }
  })

//  6、注册表单验证成功事件
  $("#form").on("success.form.bv",function(){
    //发送请求
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$("#form").serialize(),
      success:function(info){
        console.log(info);
        console.log($("#form").serialize());
        if(info.success){
          //模态框隐藏
          $("#addModal").modal('hide');
          //表单状态重置
          $("#form").data("bootstrapValidator").resetForm(true);
          $("#imgBox img").attr("src","images/none.png");
          $("#dropdownText").text('请选择一级分类');
          //重新渲染第一页
          currentPage=1;
          render();
        }
      }
    })
  })

})