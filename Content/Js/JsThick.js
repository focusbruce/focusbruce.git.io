function onThick() {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/PageThick/Thick";
    ajax.data = getData();
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result == "0") {
            alert("账号输入错误，或已被锁定！");
            window.location.href = window.location.href;
        }
        else if (result.length == 6) {
            alert("当前密码：" + result + "，请登录后修改！");
            window.location.href = "/Home/Index";
        }
        else if (result == "-1") {
            alert("验证码输入错误！");
            window.location.href = window.location.href;
        }
        else if (result == "-2") {
            alert("密保问题或密保答案错误！");
            window.location.href = window.location.href;
        }
        else {
            alert("密码找回失败，请刷新后重试！");
        }
    };
    ajax.error = function (error) {
        alert(error.statusText);
    };
    $.ajax(ajax);
}

function getData() {
    var data = {};

    data.Code = $("#Code").val();
    data.Problem = $("#Problem").val();
    data.Answer = $("#Answer").val();
    data.authcode = $("#authcode").val();

    return data;
}