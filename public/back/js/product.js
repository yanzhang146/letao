$(function(){
  var currentPage=1;
  var pageSize=2;
  var picArr=[];//声明一个数字，用来存放上传的图片

  render();
  function render(){
    //发送请求获取数据
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        var htmlStr=template("productTmp",info);
      //  将拼接的字符串添加到tbody中
        $(".lt_content tbody").html(htmlStr);

        //使用插件，添加分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          },

          tooltipTitles:function(type, page, current){
            switch (type){
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return "第"+page+"页";
            }
          },
          itemTexts:function( type, page, current){
            switch (type){
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return "第"+page+"页";
            }
          }

        })
      }
    })
  }

//  点击添加商品按钮让模态框显示
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  //  发送请求，下拉框中的数据
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        var htmlStr=template("tmp",info);
        $('.dropdown-menu').html(htmlStr);


      }
    })
  })

  //给所有的a注册点击事件，拿到对应的id
  $(".dropdown-menu").on("click","a",function(){

    var id=$(this).data("id");
    //把id 添加到隐藏域中
    $('[name="brandId"]').val(id);
    //把文本框中的内容添加到框内
    var text=$(this).text();
    $("#dropdownText").text(text);
    $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
  })

//  图片上传
  $("#fileupload").fileupload({
    dateType:'json',
  //  上传成功
    done:function(e,data){
      console.log(data);
      var picObj=data.result;
      var picAddr=picObj.picAddr;

      //把新添加的图片加到最前面
      picArr.unshift(picObj);
      //把上传的图片添加到imgBox中
      $("#imgBox").prepend('<img src="'+picAddr+'" width=100 >');

      if(picArr.length>3){
        picArr.pop();

        //找到imgBox盒子中最后一张图片删除掉
        $("#imgBox img:last-of-type").remove();
      };
      if(picArr.length===3){
        $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
      }
      console.log(picArr);
    }
  })

  //表单校验
  $("#form").bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //配置校验字段
    fields:{
      //二级分类id
      brandId:{
        validators:{
            notEmpty:{
              message:"请输入二级分类名称"
            }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品的尺寸"
          },
          //尺码校验, 规则必须是 32-40
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品的原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品的价格"
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:"请上传三张图片"
          }
        }
      },
    }
  })
//表单校验成功事件
  $("#form").on("success.form.bv",function(){
    console.log("ehhe");

    //发送请求
    //表单提交得到的参数字符串
    var params=$("#form").serialize();
    params+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
    params+="&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
    params+="&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:params,
      success:function(info){
        console.log(info);
        if(info.success){
          //隐藏模态框
          $("#addModal").modal("hide");
          //重新渲染第一页
          currentPage=1;
          render();


          //重置表单
          $("#form").data("bootstrapValidator").resetForm(true);
          //手动重置下来菜单的状态
          $("#dropdownText").text("请选择二级分类");
          //删除添加的图片
          $("#imgBox").empty();
        }
      }
    })

  })


})