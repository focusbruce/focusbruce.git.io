
/*
	$('#divPager').pager({
		pageIndex: pageIndex,//当前页
		pageSize: pageSize,//页码
		totalCount: totalCount,//记录总数
		callBack: changePage//翻页事件
	});
*/

$.fn.pager = function (options) {

	var settings = {
		pageIndex: 1, //当前页
		pageSize: 10, //页码
		pageCount: 0, //总页数
		totalCount: 0, //记录总数
		prevText: '上一页',
		nextText: '下一页',
		linkTo: "#",
		callBack: function () { return false; },
		goPage: true,
		goText: 'GO'
	}

	if (options) $.extend(settings, options || {});

	var panel = $(this);
	panel.empty();

	settings.pageCount = parseInt(settings.totalCount / settings.pageSize);
	if (settings.totalCount % settings.pageSize > 0)
		settings.pageCount++;

	//总页数为0，则清空
	if (settings.pageCount < 1) {
		return;
	}

	if (settings.pageIndex > 1) {

		appendItem(settings.pageIndex - 1, { text: settings.prevText });
	}

	if (settings.pageCount < 10) {

		appendItems(1, settings.pageCount);

	}
	else if (settings.pageIndex < 6) {

		appendItems(1, 6);
		panel.append('...');
		appendItems(settings.pageCount - 1, settings.pageCount);
	}
	else if (settings.pageCount - settings.pageIndex < 6) {

		appendItems(1, 2);
		panel.append('...');
		appendItems(settings.pageCount - 6, settings.pageCount);
	}
	else {

		appendItems(1, 2);
		panel.append('...');
		appendItems(settings.pageIndex - 2, settings.pageIndex + 2);
		panel.append('...');
		appendItems(settings.pageCount - 1, settings.pageCount);
	}

	if (settings.pageIndex < settings.pageCount) {

		appendItem(settings.pageIndex + 1, { text: settings.nextText });
	}

	if (settings.goPage) {

		var btn = jQuery('<input type="text" value="' + settings.pageIndex + '" />');
		panel.append(btn);
		var lnk = jQuery('<a>' + settings.goText + '</a>')
						.bind("click", function () { settings.callBack(panel.find('input').val()); })
						.attr('href', settings.linkTo.replace(/__id__/, settings.goText));
		panel.append(lnk);
	}

	return false;

	function appendItems(start, end) {

		for (var i = start; i <= end; i++) {

			appendItem(i);
		}
	}

	function appendItem(page_id, appendopts) {

		appendopts = jQuery.extend({ text: page_id, classes: "" }, appendopts || {});

		var lnk;

		if (page_id == settings.pageIndex) {
			lnk = jQuery('<span class="current">' + (appendopts.text) + '</span>');
		}
		else {
			lnk = jQuery('<a>' + (appendopts.text) + '</a>')
						.bind('click', function () { settings.callBack(page_id); })
						.attr('href', settings.linkTo.replace(/__id__/, page_id));
		}
		if (appendopts.classes) { lnk.addClass(appendopts.classes); }

		panel.append(lnk);
	}
}