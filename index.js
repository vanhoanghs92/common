// when search text get more bolder.

var highlightReg = /<span class="highlight">(.*?)<\/span>/g;
var highlightHtml = '<span class="highlight">$1</span>';

$(document).on('keyup', inputDropdown, function () {
  var searchValue = $(this).val().toLowerCase();
  var dropdownId = $(this).data('dropdown-id');
  var $selector = $root.find(dropdownId);
  var $listItems = $selector.find(listItems);
  var $items = $selector.find(selectedItem);
  var $noItems = $selector.find(listNoItem);

  if (!searchValue) {
    $items.removeClass(hidden);
    $noItems.addClass(hidden);

    return;
  }

  if (!dropdownId || !$items.length) return;

  var hasValueMatched = false;
  $selector.find($iconClose).addClass(hidden);
  $items.closest($listItems).addClass(hidden);

  var $title;
  var $info;
  var textToSearch;
  var fullTextTitle;
  var fullTextInfo;

  $items.each(function (idx, item) {
    textToSearch = $(item).data('search');
    if (textToSearch.toLowerCase().indexOf(searchValue) <= -1) {
      return;
    }

    $(item).closest($listItems).removeClass(hidden);
    $selector.find($iconClose).removeClass(hidden);

    $title = $(item).find('.js-from-to-title');

    fullTextTitle = $title.html().replace(highlightReg, '$1');
    fullTextTitle = fullTextTitle.replace(new RegExp('(' + searchValue + ')', 'gi'), highlightHtml);

    $title.html(fullTextTitle);

    hasValueMatched = true;
  });

  if (!hasValueMatched) {
    $noItems.removeClass(hidden);
  } else {
    $noItems.addClass(hidden);
  }
});
