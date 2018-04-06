//表单校验
$(function(){
  //校验规则：
  //1、用户名不能为空
  //2、密码不能为空、且必须是6-12位
  $("#form").bootstrapValidator({
    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //对字段进行校验
    fields:{
      username:{
        //校验的规则
        validators:{
          //非空验证
          notEmpty:{
            //为空时显示的提示信息
            message:"用户名不能为空"
          },
          //长度要求2-6位
          stringLength:{
            min:2,
            max:6,
            message:"密码长度必须是2-6位"
          },
          callback:{
            message:"用户名错误"
          }
        }
      },

      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          //长度校验
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须是6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  })

//提交表单
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      dataType:'json',
      data:$("#form").serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          //alert("登陆成功")
          location.href="index.html";
        }
        if(info.error===1000){
          //alert("用户名不存在")
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");

        }
        if(info.error===1001){
          //参数1、校验字段
          //2、校验状态
          //3、校验规则，可以设置提示文本
          //alert("密码错误")
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
        }
      }
    })
  })
//  重置表单
  $("[type='reset']").on("click",function(){
    $("#form").data("bootstrapValidator").resetForm();
  })


})