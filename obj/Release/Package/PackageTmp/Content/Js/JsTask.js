var PageSize = 20;

function onPageLoad() {
    changePage(1);
}

function getData() {
    var data = {};

    //data.UserID = $("#Apple_AppleUserID").val();
    //data.State = $("#Apple_State").val();

    return data;
}

function changePage(page) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/PageTask/TaskList";
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
            html += '<td>' + data.AppleCode + '</td>';
            html += '<td>' + data.Title + '</td>';
            html += '<td>' + data.Money + '元</td>';
            html += '<td>' + data.PublishTime.substr(0,10) + '</td>';
            html += '<td>' + (data.State == 0 ? "未通过" : (data.State == 1 ? "通过申请" : (data.State == 2 ? "任务完成" : (data.State == 3 ? "交易完成" : "评价完成")))) + '</td>';
            html += '<td><a href="/PageTask/TaskMsg?ID=' + data.ID + '">查看</a></td>';
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