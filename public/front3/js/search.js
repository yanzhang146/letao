$(function(){
  //获取本地存储的数据
  function getHistory(){
    var history=localStorage.getItem("search_list")||'[]';
    var arr=JSON.parse(history);
    return arr;
  }
  //渲染到页面中
  function render(){
    var arr=getHistory();
    $(".lt_history").html(template("searchTmp",{arr:arr}));
  }

  render();

  //功能1、删除功能
  //步骤:1、给每个删除按钮,添加委托事件
  //2、那么当前按钮的index下标
  //3、读取本地存储中的数组，进行删除对应索引的那项
  //4、同步到本地存储中
  //5、重新刷新页面

  $(".lt_history").on("click",".btn_delete",function(){
  //  获取存储的索引
    var index=$(this).data("index");
    console.log(index);
    //获取数组
    var arr=getHistory();
    arr.splice(index,1);
    //同步到本地存储中
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
  })



  //功能2：清空历史记录
  $(".lt_history").on("click",".btn_empty",function(){
    //消耗本地存储
    localStorage.removeItem("search_list");
    //重新渲染页面
    render();
  })

  //功能3：添加功能
  $(".lt_search button").click(function(){
    //获取输入框中的内容

    var value=$(".lt_search input").val().trim();
    if(value===""){
      mui.toast( "请输入搜索关键字" );
      return;
    }
    var arr=getHistory();
    //先判断数组中有没有重复的项
    var index=arr.indexOf(value);
    if(index!==-1){
      //说明有重复的项，直接删除
      arr.splice(index,1);
    }
    if(arr.length>=8){
      arr.pop();
    }
    //把用户输入的内容添加到数组的最前面
    arr.unshift(value);
    //同步到本地存储
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();

    //页面跳转
    location.href="searchList.html?value="+value;
  })
})