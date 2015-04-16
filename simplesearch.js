(function ($) {

    $.fn.searchInTable = function (options) {

        var settings = $.extend({
            notFoundMessage: 'Nothing was found!'
        }, options);

        function showWholeTable(event) {
            var table = event.data.table;
            var tableContent = event.data.tableContent;
            $(this).prev('input').val('');
            $(table).find('tbody > tr').each(function () {
                $(this).remove();
            });
            tableContent.each(function () {
                $(table).find('tbody').append($(this));
            });
            //removeTextHighlighting(table.find('tbody tr span'));
        }

        function splitString($tdElement) {
            var rowText = "";
            $tdElement.each(function () {
                rowText += $(this).text() + "/";
            });
            return rowText.toLowerCase().trim();
        }

        function search(event) {
            var table = event.data.table;
            var tableContent = event.data.tableContent;
            var text = $(this).val().toLowerCase();
            $(table).find('tbody > tr').each(function () {
                $(this).remove();
            });
            tableContent.each(function () {
                var $row = $(this);
                var $tdElement = $row.find("td");
                var rowText = splitString($tdElement);
                if (rowText.indexOf(text) !== -1) {
                    //addTextHighlighting($tdElement, text);
                    $(event.data.table).find('tbody').append($row);
                }
            });
            if ($(table).find('tbody > tr').length == 0) {
                $(table).find('tbody').append('<tr class="info"><td colspan="' + $(table).find("tr:first th").length + '">' + settings.notFoundMessage + '</td></tr>');
            }
        }

        function Guid() {
            // Taken from: http://stackoverflow.com/a/2117523/416255
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16);
            });
        }

        // Main entry point for the plugin
        return this.each(function () {
            // Generate guids for each table on the page
            var guid = Guid();
            // Add the search textbox to the page
            var inputTextBox = '<input id="ss-input-'+ guid + '" type="text" class="form-control" placeholder="Search..." />&nbsp;';
            var resetButton = '<input id="ss-reset-'+ guid + '" type="button" class="btn btn-default" value="Start Over" />';
            var toolbar = '<div class="form-inline">' + inputTextBox + resetButton + '</div>';
            $(this).before($(toolbar));
            // This is the table that we are going to search on
            var table = $(this);
            // Keep the original table content for future reference
            var tableContent = $(table).find('tbody > tr');
            // Bind events to the controls used for search
            $('#ss-input-' + guid).on('keyup', { table: table, tableContent: tableContent }, search);
            $('#ss-reset-' + guid).click({table : table, tableContent : tableContent}, showWholeTable);
        });

    function removeTextHighlighting(element) {
        element.each(function () {
            $(this).replaceWith($(this).html());
        });
    }

    function addTextHighlighting(columns, text) {
        columns.each(function () {
            var reg = new RegExp("(" + text + ")", "ig");
            var newText = $(this).text().replace(reg, "<span class='findElement'>$1</span>");
            $(this).html(newText);
        });
    }

};

$(function() {
    $('table[data-simple-search="on"]').searchInTable();
});

}(jQuery));
