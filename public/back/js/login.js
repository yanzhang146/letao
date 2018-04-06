//表单校验
$(function(){
  //校验规则：
  //1、用户名不能为空
  //2、密码不能为空、、
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
          notEmpty:{
            message:"用户名不能为空"
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
          }
        }
      }
    }
  })
})