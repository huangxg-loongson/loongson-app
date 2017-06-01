/* 我的应用 */

/* 处理远程的服务接口 */

function get_server_service(url, post_data, func)
{
  $.ajax({
    url: url,
    type: 'POST',
    async: true,
    data:{
        data: post_data
    },
    dataType:'html',    //返回的数据格式：json/xml/html/script/jsonp/text
    success:function(data, textStatus, jqXHR){
        console.log('Success:')
        console.log(data)
        console.log("textStatus: " + textStatus)
        //console.log(jqXHR)
        func(data);
    },
    error:function(xhr,textStatus){
        console.log('错误')
        console.log(xhr)
        console.log(textStatus)
    },
  })
}

function on_receive_app_html(html)
{
  console.log("on_receive_app_html: " + html);
  $("#app-card-grid").html(html);

  n = 0;
  $(".update-icon").each( function() {
    $div = $(this).prev("div");

    $div.append($(this));
    $(this).show();

    n ++;
  });

  $("#my-title").append("<div class='gray small'>共有" + n + "个应用需要升级</div>");
}

function get_my_app_html(app_list_data, func)
{
  url = window.location.href;
  n = url.lastIndexOf("/");
  url = url.substr(0, n) + "/getMyAppHtml.php";
  
  get_server_service(url, app_list_data, func);
}

/* Chrome APP不支持async:false */
function init_local_app_list()
{
  get_local_app_list(function(app_list_data) {
    get_my_app_html(app_list_data, on_receive_app_html);
  });
}

if (window.location.href.indexOf("my.php") != -1)
{
  $(document).ready(function(){
    init_local_app_list();
  });
}
