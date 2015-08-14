var PageSize = 20;

function onPageLoad() {
    changePage(1);
}

function getData() {
    var data = {};

    data.Code = $("#UserInfo_Code").val();
    data.Name = $("#UserInfo_Name").val();

    return data;
}

function changePage(page) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/User/List";
    ajax.data = getData();
    ajax.data.PageIndex = page;
    ajax.data.PageSize = PageSize;
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result != "0") {
            var json = eval("(" + result + ")");
            loadList(json);
        }
        else {
            $('#divPager').empty();
        }
    };
    ajax.error = function (error) {
        alert(error.statusText);
    };
    $.ajax(ajax);
}

function loadList(json) {
    $('#divPager').empty();
    if (!json)
        return;

    var totalCount = parseInt(json.PageCount);
    var pageSize = parseInt(json.PageSize);
    var pageIndex = parseInt(json.PageIndex);
    window["pageIndex"] = pageIndex;

    var html = '';
    if (json.Data && json.Data.length > 0) {
        for (var i = 0; i < json.Data.length; i++) {
            var data = json.Data[i];
            var index = (pageIndex - 1) * pageSize + i + 1;
            html += '<tr>';
            html += '<td>' + index + '</td>';
            html += '<td><a onclick="checkInfo(\'' + data.Code + '\',\'' + data.Problem + '\',\'' + data.Answer + '\',\'' + data.QQCrowdName + '\',\'' + data.QQCode + '\',\'' + data.Name + '\',' + data.Sex + ',\'' + data.IdentCard + '\',\'' + data.Mobile + '\',\'' + data.Alipay + '\',\'' + data.Treasure + '\',\'' + data.State + '\',\'' + data.Gold + '\',\'' + data.BillNumber + '\');">' + data.Code + '</a></td>';
            html += '<td>' + data.Name + '</td>';
            html += '<td>' + data.QQCode + '</td>';
            html += '<td>' + data.Gold + '</td>';
            html += '<td>' + (data.State == 0 ? '<a onclick="onOperate(\'' + data.ID + '\',0)">激活</a>' : (data.State == 1 ? '<a onclick="onUpdate(\'' + data.ID + '\',\'' + data.Code + '\',\'' + data.Password + '\',\'' + data.Problem + '\',\'' + data.Answer + '\',\'' + data.QQCrowdName + '\',\'' + data.QQCode + '\',\'' + data.Name + '\',' + data.Sex + ',\'' + data.IdentCard + '\',\'' + data.Mobile + '\',\'' + data.Alipay + '\',\'' + data.Treasure + '\')">修改</a>&nbsp;&nbsp;<a onclick="onOperate(\'' + data.ID + '\',1)">拉入黑名单</a>&nbsp;&nbsp;<a onclick="onInsert(\'' + data.ID + '\',\''+data.Code+'\')">充值</a>' : '<a onclick="onOperate(\'' + data.ID + '\',2)">移除黑名单</a>')) + '</td>';
            html += '</tr>';
        }
    }
    $('#tbList').html(html);
    $('#divPager').pager({
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: totalCount,
        callBack: changePage
    });
}


function onOperate(id, state) {
    if (state == 0) {
        if (confirm("是否确认激活？")) {
            Operate(id, 1);
        }
    }
    else if (state == 1) {
        if (confirm("是否确认拉入黑名单？")) {
            Operate(id, 2);
        }
    }
    else {
        if (confirm("是否确认移除黑名单？")) {
            Operate(id, 1);
        }
    }
}

function Operate(id, state) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/User/Operate";
    ajax.data = {};
    ajax.data.ID = id;
    ajax.data.State = state;
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result == "1") {
            alert("操作成功！");
            changePage(1);
        }
        else {
            alert("操作失败，请刷新页面后重试！");
        }
    };
    ajax.error = function (error) {
        alert(error.statusText);
    };
    $.ajax(ajax);
}

function checkInfo(Code, Problem, Answer, QQCrowdName, QQCode, Name, Sex, IdentCard, Mobile, Alipay, Treasure, State, Gold, Bill) {
    $("#_code").html(Code);
    $("#_problem").html(Problem);
    $("#_answer").html(Answer);
    $("#_qQCrowdName").html(QQCrowdName);
    $("#_qQCode").html(QQCode);
    $("#_name").html(Name);
    $("#_sex").html(Sex > 0 ? "男" : "女");
    $("#_identCard").html(IdentCard);
    $("#_mobile").html(Mobile);
    $("#_alipay").html(Alipay);
    $("#_treasure").html(Treasure);
    $("#_state").html(State == 0 ? "未激活" : (State == 1 ? "正常" : "黑名单"));
    $("#_gold").html(Gold);
    $("#_bill").html(Bill);
    $("#main").css("opacity", "0.3");
    var wid = $(window).width();
    var hei = $(window).height();
    var lef = (wid - 400) / 2 + "px";
    var heii = (hei - 200) / 2 + "px";
    $("#userMsg").css({
        "z-index": "99",
        "position": "absolute",
        "display": "block",
        "width": "0px",
        "height": "0px",
        "top": heii,
        "background": "#EEEEEE"
    });
}

function onInsert(id,code) {
    $("#_UserId").val(id);
    $("#_Code").html(code);
    $("#UpInfo_Remark").val('');
    $("#main").css("opacity", "0.3");
    var wid = $(window).width();
    var hei = $(window).height();
    var lef = (wid - 400) / 2 + "px";
    var heii = (hei - 200) / 2 + "px";
    $("#upAddOrUpdate").css({
        "z-index": "99",
        "position": "absolute",
        "display": "block",
        "width": "0px",
        "height": "0px",
        "top": heii,
        "background": "#EEEEEE"
    });
}

function onUpdate(id, code, pwd, problem, answer, QQCrowdName, QQCode, name, sex, identCard, mobile, alipay, treasure) {
    $("#_UpdateId").val(id);
    $("#_UpdateCode").val(code);
    $("#_UpdatePwd").val(pwd);
    $("#_UpdateProblem").val(problem);
    $("#_UpdateAnswer").val(answer);
    $("#_UpdateQQCrowdName").val(QQCrowdName);
    $("#_UpdateQQCode").val(QQCode);
    $("#_UpdateName").val(name);
    if (sex > 0) {
        $("#sex1").attr("checked", "checked");
    }
    else {
        $("#sex0").attr("checked", "checked");
    }
    $("#_UpdateIdentCard").val(identCard);
    $("#_UpdateMobile").val(mobile);
    $("#_UpdateAlipay").val(alipay);
    $("#_UpdateTreasure").val(treasure);

    $("#main").css("opacity", "0.3");
    var wid = $(window).width();
    var hei = $(window).height();
    var lef = (wid - 400) / 2 + "px";
    var heii = (hei - 200) / 2 + "px";
    $("#loadUpdate").css({
        "z-index": "99",
        "position": "absolute",
        "display": "block",
        "width": "0px",
        "height": "0px",
        "top": heii,
        "background": "#EEEEEE"
    });
}


function onAddOrUpdate() {
    if ($.trim($("#UpInfo_Number").val()).length <= 0) {
        alert("金币数量不能为空！");
        return false;
    }
    if ($.trim($("#UpInfo_Number").val()).length > 0) {
        var reint = new RegExp("^\\d{1,9}$");
        if (!reint.test($.trim($("#UpInfo_Number").val()))) {
            alert("金币数量只能为大于0的整数！");
            return false;
        }
    }

    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/Up/Save";
    ajax.data = getInfo();
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result == "1") {
            alert("保存成功！");
            changePage(1);
            onClose('upAddOrUpdate');
        }
        else {
            alert("保存失败，请刷新后重试！");
        }
    };
    ajax.error = function (error) {
        alert(error.statusText);
    };
    $.ajax(ajax);
}

function getInfo() {
    var data = {};
    data.UserID = $("#_UserId").val();
    data.Number = $("#UpInfo_Number").val();
    data.Remark = $("#UpInfo_Remark").val();
    return data;
}

function onUpateSave() {
    if ($.trim($("#_UpdateCode").val()).length <= 0) {
        alert("用户名不能为空！");
        return false;
    }
    if ($.trim($("#_UpdatePwd").val()).length <= 0) {
        alert("密码不能为空！");
        return false;
    }
    if ($.trim($("#_UpdateProblem").val()).length <= 0) {
        alert("密保问题不能为空！");
        return false;
    }
    if ($.trim($("#_UpdateAnswer").val()).length <= 0) {
        alert("密保答案不能为空！");
        return false;
    }
    if ($.trim($("#_UpdateQQCrowdName").val()).length <= 0) {
        alert("QQ群名不能为空！");
        return false;
    }
    if ($.trim($("#_UpdateQQCode").val()).length <= 0) {
        alert("QQ号不能为空！");
        return false;
    }
    if ($.trim($("#_UpdateName").val()).length <= 0) {
        alert("姓名不能为空！");
        return false;
    }
    if ($.trim($("#_UpdateIdentCard").val()).length <= 0) {
        alert("身份证不能为空！");
        return false;
    }
    if ($.trim($("#_UpdateMobile").val()).length <= 0) {
        alert("手机号不能为空！");
        return false;
    }

    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/User/Update";
    ajax.data = getUpdateInfo();
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result == "1") {
            alert("保存成功！");
            changePage(1);
            onClose('loadUpdate');
        }
        else {
            alert("保存失败，请刷新后重试！");
        }
    };
    ajax.error = function (error) {
        alert(error.statusText);
    };
    $.ajax(ajax);
}

function getUpdateInfo() {
    var data = {};

    data.ID = $("#_UpdateId").val();
    data.Code = $("#_UpdateCode").val();
    data.Password = $("#_UpdatePwd").val();
    data.Problem = $("#_UpdateProblem").val();
    data.Answer = $("#_UpdateAnswer").val();
    data.QQCrowdName = $("#_UpdateQQCrowdName").val();
    data.QQCode = $("#_UpdateQQCode").val();
    data.Name = $("#_UpdateName").val();
    data.Sex = $('input[name="_UpdateSex"]:checked').val();
    data.IdentCard = $("#_UpdateIdentCard").val();
    data.Mobile = $("#_UpdateMobile").val();
    data.Alipay = $("#_UpdateAlipay").val();
    data.Treasure = $("#_UpdateTreasure").val();

    return data;
}