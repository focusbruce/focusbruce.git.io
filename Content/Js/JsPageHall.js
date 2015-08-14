var PageSize = 20;

function onPageLoad() {
    changePage(1);
}

function getData() {
    var data = {};

    data.Title = $("#Task_Title").val();

    return data;
}

function changePage(page) {
    var ajax = {};
    ajax.type = "POST";
    ajax.url = "/PageHall/HallList";
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
            html += '<dl class="tasklist clearfix">';
            html += '<dt>';
            html += '<div class="taskitem clearfix">';
            html += '<label>商家编号：</label><span>【' + data.UserCode + '】</span><label>QQ：</label><span><a target="_blank" href="http://wpa.qq.com/msgrd?V=1&Uin=' + data.QQCode + '"><img src="../../Content/images/pa.gif" border="0"></a></span><label>连接数：</label><span>【' + data.Number + '】</span><label>总金额：</label><span>【' + data.Money + '元】</span><br>';
            html += '<label class="red">任务要求：</label><span class="remark">【' + data.Title + '】</span><br>';
            html += '<label>假聊：</label><span>【<img src="../../Content/images/' + (data.Fake > 0 ? 'cross.png' : 'tick.png') + '" alt="" height="16" width="16">】</span><label>改地址：</label><span>【<img src="../../Content/images/' + (data.Change > 0 ? 'cross.png' : 'tick.png') + '" alt="" height="16" width="16">】</span><label>返款时间：</label><span>【' + data.BackMoney + '】</span>';
            html += '</div>';
            html += '</dt>';
            html += '<dd>';
            html += '<a href="/PageHall/HallMsg?TaskID=' + data.ID + '" class="red">' + (data.IsJoin > 0 ? "已申请" : "申请参加") + '</a>';
            html += '</dd>';
            html += '</dl>';
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
        ajax.url = "/Suffer/NoticeCance";
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
        ajax.url = "/Suffer/NoticePublish";
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
        ajax.url = "/Suffer/NoticeDel";
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