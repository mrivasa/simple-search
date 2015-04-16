# simple-search
jQuery plugin for searching and filtering in a table

How to use

1. Include the plugin in your page
2. Add the attribute "data-simple-search='on'" to the table(s) that you want the search to be attached to.  Yes, you can have multiple tables on the page and each one of them can have its own search/filter textbox.
3. If you do not want to add the data attribute just call the plugin directly.  $('#my-table').searchInTable();

Disclaimer

1. The purpose of this plugin is to add a very simple search for a table.  If you are looking for something more sofisticated try http://www.datatables.net/
2. The plugin uses bootstrap css classes for formating and positioning.  If bootstrap is not available in your page, you will have to create your own css for the textbox, reset button and the div where these two elements are wraped.
