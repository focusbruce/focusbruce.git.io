var PageSize = 20;

function onPageLoad() {
    changePage(1);
}

function getData() {
    var data = {};

    data.UserID = $("#UpInfo_UserID").val();
    data.UpState = $("#UpInfo_UpState").val();

    return data;
}

function changePage(page) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/Up/List";
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
            html += '<td>' + data.UserCode + '</td>';
            html += '<td>' + data.Number + '</td>';
            html += '<td>' + data.UpTime + '</td>';
            html += '<td>' + (data.UpState > 0 ? "已完成" : "未完成") + '</td>';
            html += '<td><a onclick="checkInfo(\'' + data.Remark + '\')">备注</a></td>';
            //html += '<td>' + (data.UpState > 0 ? '' : '<a onclick="onUpdate(\'' + data.ID + '\')">修改</a>&nbsp;&nbsp;<a onclick="openUp(\'' + data.ID + '\');">充值</a>') + '&nbsp;&nbsp;<a onclick="checkInfo(\'' + data.Remark + '\')">备注</a></td>';
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
//&nbsp;&nbsp;<a onclick="onDel(\'' + data.ID + '\')">删除</a>


function onUpdate(id) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/Up/GetModel";
    ajax.data = {};
    ajax.data.ID = id;
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result.length > 0) {
            var json = eval("(" + result + ")");
            $("#UpInfo_ID").val(id);
            $("#_UserID").val(json.UserID);
            $("#UpInfo_Number").val(json.Number);
            $("#UpInfo_Remark").val(json.Remark);
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
        else {
            alert("加载失败，请刷新后重试！");
        }
    };
    ajax.error = function (error) {
        alert(error.statusText);
    };
    $.ajax(ajax);
}


function openUp(id) {
    if (confirm("是否确认充值？")) {
        var ajax = {};
        ajax.type = "POST";
        ajax.url = "/Up/UpGold";
        ajax.data = {};
        ajax.data.ID = id;
        ajax.data.ajax = new Date().getTime();
        ajax.success = function (result) {
            if (result == "1") {
                alert("充值成功！");
                changePage(1);
            }
            else {
                alert("充值失败，请刷新后重试！");
            }
        };
        ajax.error = function (error) {
            alert(error.statusText);
        };
        $.ajax(ajax);
    }
}

function checkInfo(remark) {
    $("#_remark").val(remark);
    $("#main").css("opacity", "0.3");
    var wid = $(window).width();
    var hei = $(window).height();
    var lef = (wid - 400) / 2 + "px";
    var heii = (hei - 200) / 2 + "px";
    $("#upMsg").css({
        "z-index": "99",
        "position": "absolute",
        "display": "block",
        "width": "0px",
        "height": "0px",
        "top": heii,
        "background": "#EEEEEE"
    });
}

function onDel(id) {
    if (confirm("是否确认删除？")) {
        var ajax = {};
        ajax.type = "POST";
        ajax.url = "/Up/UpDel";
        ajax.data = {};
        ajax.data.ID = id;
        ajax.data.ajax = new Date().getTime();
        ajax.success = function (result) {
            if (result == "1") {
                alert("删除成功！");
                changePage(1);
            }
            else {
                alert("删除失败，请刷新后重试！");
            }
        };
        ajax.error = function (error) {
            alert(error.statusText);
        };
        $.ajax(ajax);
    }
}

function onSelectUser() {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/Up/UserList";
    ajax.data = {};
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result.length > 0) {
            var json = eval('(' + result + ')');

            var html = $("#_UserID").html();;
            $("#_UserID").html('');
            for (var i = 0; i < json.length; i++) {
                html += '<option value="' + json[i].ID + '">' + json[i].Code + '</option>';
            }

            $("#_UserID").html(html);
        }
        else {
            alert("加载失败，请刷新后重试！");
        }
    };
    ajax.error = function (error) {
        alert(error.statusText);
    };
    $.ajax(ajax);
}