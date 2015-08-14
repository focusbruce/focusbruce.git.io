function onLogin() {
    //if (!$.trim($("#VerifiCode").val())) {
    //    alert("请输入验证码。");
    //    return false;
    //}
    if (!$.trim($("#UserInfo_Code").val())) {
        alert("请输入用户名。");
        return false;
    }
    if (!$.trim($("#UserInfo_Password").val())) {
        alert("请输入密码。");
        return false;
    }

    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/PassPort/Login";
    ajax.data = getData();
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result == "1") {
            window.location.href = "/User/List";
        }
        else if (result == "0") {
            alert("验证码错误！");
            window.location.href = window.location.href;
        }
        else {
            alert("用户名或密码错误！");
            window.location.href = window.location.href;
        }
    };
    ajax.error = function (error) {
        alert(error.statusText);
    };
    $.ajax(ajax);
}

function getData() {
    var data = {};
    data.Code = $("#UserInfo_Code").val();
    data.Password = $("#UserInfo_Password").val();
    data.VerifiCode = $("#VerifiCode").val();
    return data;
}