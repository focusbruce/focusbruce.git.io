var PageSize = 20;

function onPageLoad() {
    changePage(1);
}

function getData() {
    var data = {};

    data.Number = $("#Subjoin_Number").val();
    data.State = $("#Subjoin_State").val();
    data.Mark = $("#_mark").val();

    return data;
}

function changePage(page) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/PageSubjoin/List";
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
            html += '<td>' + data.Number + '</td>';
            html += '<td>' + (data.State > 0 ? "已发布" : "未发布") + '</td>';
            html += '<td>' + (data.State > 0 ? '<a href="#" onclick="onNotPublish(\'' + data.ID + '\')">取消发布</a>' : '<a onclick="onUpdate(\'' + data.ID + '\')">修改</a>&nbsp;&nbsp;<a href="#" onclick="onPublish(\'' + data.ID + '\')">发布</a>&nbsp;&nbsp;<a href="#" onclick="onDel(\'' + data.ID + '\')">删除</a>') + '</td>';
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

function onUpdate(id) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/PageSubjoin/GetModel";
    ajax.data = {};
    ajax.data.ID = id;
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result.length > 0) {
            var json = eval("(" + result + ")");
            $("#subjoinId").val(id);
            $("#_Number").val(json.Number);
            $("#main").css("opacity", "0.3");
            var wid = $(window).width();
            var hei = $(window).height();
            var lef = (wid - 400) / 2 + "px";
            var heii = (hei - 200) / 2 + "px";
            $("#subjoin").css({
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

function onInsert() {
    $("#main").css("opacity", "0.3");
    var wid = $(window).width();
    var hei = $(window).height();
    var lef = (wid - 400) / 2 + "px";
    var heii = (hei - 200) / 2 + "px";
    $("#subjoin").css({
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
    if ($.trim($("#_Number").val()).length <= 0) {
        alert("号码不能为空！");
        return false;
    }
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/PageSubjoin/Save";
    ajax.data = getInfo();
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result == "1") {
            alert("保存成功！");
            changePage(1);
            onClose('subjoin');
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
    data.ID = $("#subjoinId").val();
    data.Number = $("#_Number").val();
    data.Mark = $("#_mark").val();
    return data;
}

function onPublish(id)
{
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/PageSubjoin/Publish";
    ajax.data = {};
    ajax.data.ID = id;
    ajax.data.State = 1;
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result == "1") {
            alert("发布成功！");
            changePage(1);
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

function onNotPublish(id) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/PageSubjoin/Publish";
    ajax.data = {};
    ajax.data.ID = id;
    ajax.data.State = 0;
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result == "1") {
            alert("取消发布成功！");
            changePage(1);
        }
        else {
            alert("取消发布失败，请刷新后重试！");
        }
    };
    ajax.error = function (error) {
        alert(error.statusText);
    };
    $.ajax(ajax);
}

function onDel(id)
{
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/PageSubjoin/Delete";
    ajax.data = {};
    ajax.data.ID = id;
    ajax.data.ajax = new Date().getTime();
    ajax.success = function (result) {
        if (result == "1") {
            alert("删除成功！");
            changePage(1);
            onClose('subjoin');
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
