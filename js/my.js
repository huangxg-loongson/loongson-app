/* 我的应用 */
function on_receive_app_html(html)
{
  console.log("on_receive_app_html: " + html);
  $("#app-card-grid").html(html);
}

function get_my_app_html(app_list_data, func)
{
  url = window.location.href;
  n = url.lastIndexOf("/");
  url = url.substr(0, n) + "/getMyAppHtml.php";
  
  get_server_service(url, app_list_data, func);
}

/* 只用于“我的”页面 */
function init_my_app_list()
{
  get_local_app_list(function(app_list_data, errno) {
    if (errno == 0)
    {
      get_my_app_html(app_list_data, on_receive_app_html);
    }
    else
      $("#app-card-grid").html("本机还没有安装任何应用程序，赶快去逛逛吧。");
  });

  init_uninstall_button();
  setTimeout(init_my_app_list, 1000);  
}


/*
 * “我的”页面：删除应用
 */
function show_uninstall_button($div)
{
  $div.find(".uninstall-button").show();
}

function hide_uninstall_button($div)
{
  $div.find(".uninstall-button").hide();
}

function init_uninstall_button()
{
  $("#app-card-grid").on('mouseover', 'div', function () {
    show_uninstall_button($(this));
  });

  $("#app-card-grid").on('mouseout', 'div', function () {
    hide_uninstall_button($(this));
  });

  $("#app-card-grid").on('click', '.uninstall-button', function (event) {
    event.stopPropagation();

    app_uninstall($(this).attr("id"),
         $(this).parent().find("#app_name").attr("value"),
         $(this).parent().find("#app_uninstall_script").attr("value"));
  });
}

if (window.location.href.indexOf("my.php") != -1)
{
console.log("My.php");
  $(document).ready(function(){
    init_my_app_list();
  });
}
