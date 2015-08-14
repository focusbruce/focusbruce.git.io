var PageSize = 20;

function onPageLoad() {
    changePage(1);
}

function getData() {
    var data = {};

    data.Title = $("#Notice_Title").val();
    data.State = $("#Notice_State").val();

    return data;
}

function changePage(page) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/HallPage/List";
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
            html += '<td>' + data.Title + '</td>';
            html += '<td>' + (data.State > 0 ? "已发布" : "未发布") + '</td>';
            html += '<td>' + data.AddTime + '</td>';
            html += '<td>' + (data.State > 0 ? '<a onclick="onCance(\'' + data.ID + '\')">取消发布</a>' : '<a onclick="onPublish(\'' + data.ID + '\')">发布</a>&nbsp;&nbsp;<a href="/HallPage/Add?ID=' + data.ID + '" >修改</a>&nbsp;&nbsp;<a onclick="onDel(\'' + data.ID + '\')">删除</a>') + '</td>';
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

function onCance(id) {
    if (confirm("是否确认取消发布？")) {
        var ajax = {};
        ajax.type = "POST";
        ajax.url = "/HallPage/NoticeCance";
        ajax.data = {};
        ajax.data.ID = id;
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
}

function onPublish(id) {
    if (confirm("是否确认发布？")) {
        var ajax = {};
        ajax.type = "POST";
        ajax.url = "/HallPage/NoticePublish";
        ajax.data = {};
        ajax.data.ID = id;
        ajax.data.ajax = new Date().getTime();
        ajax.success = function (result) {
            if (result == "1") {
                alert("发布成功！");
                changePage(1);
            }
            else {
                alert("发布失败，请刷新后重试！");
            }
        };
        ajax.error = function (error) {
            alert(error.statusText);
        };
        $.ajax(ajax);
    }
}

function onDel(id) {
    if (confirm("是否确认删除？")) {
        var ajax = {};
        ajax.type = "POST";
        ajax.url = "/HallPage/NoticeDel";
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