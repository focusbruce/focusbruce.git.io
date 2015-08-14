var PageSize = 20;

function onPageLoad() {
    changePage(1);
}

function getData() {
    var data = {};

    data.Title = $("#Task_Title").val();
    data.UserID = $("#Task_UserID").val();

    return data;
}

function changePage(page) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/Task/List";
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
            html += '<td>' + data.Title + '</td>';
            html += '<td>' + data.PublishTime + '</td>';
            html += '<td><a href="/Task/TaskMsg?TaskID='+data.ID+'">查看</a></td>';
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