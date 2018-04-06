
  //ajaxStart 所有的Ajax开始调用
  $(document).ajaxStart(function() {
    NProgress.start();
  });


  // ajaxStop 所有的 ajax 结束调用
  $(document).ajaxStop(function() {
    // 模拟网络延迟
    setTimeout(function() {
      NProgress.done();
    }, 500);
  })

  $(function(){
    //1、点击退出图标显示退出模态框
    $(".icon_logout").click(function(){
      //调用模态框
      $('.modal').modal();
    });
    //2、二级分类切换功能
    $(".category").click(function(){
      $(this).next().stop().slideToggle();
    })
    //3、顶部菜单栏切换显示功能
    $(".icon_menu").click(function(){
      $(".lt_aside").toggleClass("hidemenu");
      $(".lt_main").toggleClass("hidemenu");
      $(".lt_topbar").toggleClass("hidemenu");
    })
    //4、在点击退出图标外注册退出按钮，点击事件
    $("#logoutBtn").click(function(){
      $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        dataType:'json',
        success:function(info){
          console.log(info);
          if(info.success){
            location.href="login.html"
          }
        }
      })
    })
    //5、给.lt_aside下的nav里的每个li注册点击事件
    $(".lt_aside .nav li").each(function(i,v){
      v.addEventListener("click",function(){
        console.log($(this));
       //$(v).siblings().children("a").removeChild("current");
        $(this).children("a").addClass("current");

      })
    })

  })