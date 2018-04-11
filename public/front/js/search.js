$(function(){
  //一进入页面，调用render();
  render();
  //获取本地存储的数据
  function getHistory(){
    //保证将来取到的一定是一个数组
    var history=localStorage.getItem("search_list")||'[]';
    var arr=JSON.parse(history);
    return arr;
  }
  //渲染页面
  function render(){
    var arr=getHistory();
    var htmlStr=template("searchTmp",{arr:arr});
  //  把数据添加到页面
    $(".lt_history").html(htmlStr);
  };
  //2、删除单条记录功能
  //1、给所有的删除按钮，添加委托事件
  //2、获取索引
  //3、读取本地存储中的数组，进行删除对应索引的数据
  //4、同步到本地存储
  //5、重新渲染页面
  $(".lt_history").on("click",".btn_delete",function(){
    var index=$(this).data("index");
    var arr=getHistory();
    //遮罩层
    mui.confirm("你确定要删除吗","温馨提示",["确认","取消"],function(e){
      console.log(e);
      if(e.index===0){
        //获取本地存储
        //根据索引删除对应的项
        arr.splice(index,1);
        //console.log(arr);
        //同步到本地存储
        localStorage.setItem("search_list",JSON.stringify(arr));
        //重新渲染页面
        render();
      }
    });

  })

  //3、清空功能
  //1、注册事件（事件委托）
  //2、、清除掉本地的search_list
  //3、重新渲染页面
  $(".lt_history").on("click",".btn_empty",function(){
    mui.confirm("是否清空所有历史记录","温馨提示",["确认","取消"],
      function(e){
        if(e.index===0){
          localStorage.removeItem("search_list");
          render();
        }
      });
  })
  //功能四:添加功能
  //1、点击搜索按钮，获取输入框中的值
  //2、获取本地存储的数组
  //3、将输入框中的值，添加到数组的最前面
  //4、持久化到本地存储
  //5、重新渲染页面
  $(".lt_search button").on("click",function(){
    //如果有重复项移除
    var value=$(this).parent().children("input").val().trim();
    if(value==""){
      //添加提示框
      mui.toast('请输入搜索关键字',{ duration:'500'});
      return;
    }
    var arr=getHistory();
    console.log(arr);
    //不等于说明数组中可以找到key,说明重复了，需要删除
    if(arr.indexOf(value)!=-1){
      var index=arr.indexOf(value);
      arr.splice(index,1);
    }
    if(arr.length>=10){
      arr.pop();
    }
    console.log(arr);

    arr.unshift(value);
    console.log(arr);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
    $(".lt_search input").val("");
    //跳转到搜索列表页面
    location.href="searchList.html?key="+value;
  })



})