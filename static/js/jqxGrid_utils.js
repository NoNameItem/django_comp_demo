/**
 * Вспомогательные функции и справочники для работы с jqxGrid
 */

/**
 * Справочник запросов фильтра
 * #VALUE# - значение операнда (если требуется)
 */
const FILTERS = {
  EMPTY                 : {lookup : "__isempty", value : "true", paneText : "пусто"},
  NOT_EMPTY             : {lookup : "__isempty", value : "false", paneText : "не пусто"},
  NULL                  : {lookup : "__isnull", value : "true", paneText : "пусто"},
  NOT_NULL              : {lookup : "__isnull", value : "false", paneText : "не пусто"},
  CONTAINS              : {lookup : "__contains", paneText : "содержит <em>#VALUE#</em>"},
  I_CONTAINS            : {lookup : "__icontains", paneText : "содержит <em>#VALUE#</em> (без учета регистра)"},
  DOES_NOT_CONTAIN      : {lookup : "__contains!", paneText : "не содержит <em>#VALUE#</em>"},
  I_DOES_NOT_CONTAIN    : {lookup : "__icontains!", paneText : "не содержит <em>#VALUE#</em> (без учета регистра)"},
  STARTS_WITH           : {lookup : "__startswith", paneText : "начинается с <em>#VALUE#</em>"},
  I_STARTS_WITH         : {lookup : "__istartswith", paneText : "начинается с <em>#VALUE#</em> (без учета регистра)"},
  DOES_NOT_START_WITH   : {lookup : "__startswith!", paneText : "не начинаетя с <em>#VALUE#</em>"},
  I_DOES_NOT_START_WITH : {
    lookup   : "__istartswith!",
    paneText : "не начинается с <em>#VALUE#</em> (без учета регистра)"
  },
  ENDS_WITH             : {lookup : "__endswith", paneText : "заканчивается на <em>#VALUE#</em>"},
  I_ENDS_WITH           : {lookup : "__iendswith", paneText : "заканчивается на <em>#VALUE#</em> (без учета регистра)"},
  DOES_NOT_END_WITH     : {lookup : "__endswith!", paneText : "не заканчивается на <em>#VALUE#</em>\""},
  I_DOES_NOT_END_WITH   : {
    lookup   : "__iendswith!",
    paneText : "не заканчивается на <em>#VALUE#</em> (без учета регистра)"
  },
  EQUAL                 : {lookup : "", paneText : "равно <em>#VALUE#</em>"},
  I_EQUAL               : {lookup : "__iexact", paneText : "равно <em>#VALUE#</em> (без учета регистра)"},
  NOT_EQUAL             : {lookup : "!", paneText : "не равно <em>#VALUE#</em>"},
  I_NOT_EQUAL           : {lookup : "__iexact!", paneText : "не равно <em>#VALUE#</em> (без учета регистра)"},
  LESS_THAN             : {lookup : "__lt", paneText : "меньше <em>#VALUE#</em>"},
  LESS_THAN_OR_EQUAL    : {lookup : "__lte", paneText : "меньше или равно <em>#VALUE#</em>"},
  GREATER_THAN          : {lookup : "__gt", paneText : "больше <em>#VALUE#</em>"},
  GREATER_THAN_OR_EQUAL : {lookup : "__gte", paneText : "больше или равно <em>#VALUE#</em>"}
};

/**
 * @summary Возвращает массив возможных операторов для указанного типа фильтра
 * @param type - тип фильтра
 * @param defaultconditions - операторы по умолчанию
 * @returns {string[]} - Массив кодов операторов
 */
function updateFilterConditions(type, defaultconditions) {
  var stringcomparisonoperators = [
    "I_CONTAINS",
    "I_DOES_NOT_CONTAIN",
    "CONTAINS",
    "DOES_NOT_CONTAIN",
    "EQUAL",
    "NOT_EQUAL",
    "I_EQUAL",
    "I_NOT_EQUAL",
    "STARTS_WITH",
    "DOES_NOT_START_WITH",
    "I_STARTS_WITH",
    "I_DOES_NOT_START_WITH",
    "ENDS_WITH",
    "DOES_NOT_END_WITH",
    "I_ENDS_WITH",
    "I_DOES_NOT_END_WITH",
    "EMPTY",
    "NOT_EMPTY"
  ];
  var numericcomparisonoperators = [
    "EQUAL",
    "NOT_EQUAL",
    "LESS_THAN",
    "LESS_THAN_OR_EQUAL",
    "GREATER_THAN",
    "GREATER_THAN_OR_EQUAL",
    "NULL",
    "NOT_NULL"
  ];
  var datecomparisonoperators = [
    "EQUAL",
    "NOT_EQUAL",
    "LESS_THAN",
    "LESS_THAN_OR_EQUAL",
    "GREATER_THAN",
    "GREATER_THAN_OR_EQUAL",
    "NULL",
    "NOT_NULL"
  ];
  var booleancomparisonoperators = [
    "EQUAL",
    "NOT_EQUAL",
  ];
  switch (type) {
    case 'stringfilter':
      return stringcomparisonoperators;
    case 'numericfilter':
      return numericcomparisonoperators;
    case 'datefilter':
      return datecomparisonoperators;
    case 'booleanfilter':
      return booleancomparisonoperators;
  }
}

/**
 * Преобразует фильтр грида в элемент для отображения в интерфейсе
 * @param filter - Элемент массива $grid.jqxGrid('getfilterinformation')
 * @param momentFormats - Справочник форматов дат для полей
 * @return {jQuery.fn.init|jQuery|HTMLElement} - Элемент для отображения в списке фильтров
 */
function filterToElement(filter, momentFormats) {
  // Заготовка элемента в списке фильтров
  var al = $('<div class="alert alert-light alert-dismissible filter-alert" role="alert">' +
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
    '<span aria-hidden="true">×</span>' +
    '</button>' +
    '</div>');

  // Достаем информацию о фильтре
  var fieldText = filter.filtercolumntext;
  var fieldCode = filter.filtercolumn;
  var filterInfo = filter.filter.getfilters()[0];
  var filterType = filterInfo.condition;
  var filterValue = filterInfo.id || filterInfo.value;
  if (filterInfo.type === "datefilter") {
    filterValue = moment(filterValue).format(momentFormats[fieldCode]);
  }

  // Собираем текст описания фильтра
  var m = "<strong>" + fieldText + "</strong> " + FILTERS[filterType].paneText.replace("#VALUE#", filterValue);

  return al.append(m);
}

function getUpdateFilterList(grid, filterPanel, momentFormats) {
  return function (event) {
    // Очищаем панель фильтров
    filterPanel.find('.card-body').html('');


    var filtersInfo = grid.jqxGrid('getfilterinformation');
    var filterCount = filtersInfo.length;

    if (filterCount === 0) {
      filterPanel.hide(); // Прячем панель фильтров, если их нет
    } else {
      filtersInfo.map(function (filter) {
        var el = filterToElement(filter, momentFormats);
        el.on('close.bs.alert', function () {
          grid.jqxGrid('removefilter', filter.filtercolumn);
        });
        filterPanel.find('.card-body').append(el);
        filterPanel.find('.filter-count-badge').text(filterCount);
        filterPanel.show();
      });
    }
  }
}

function everPresentRowText(datafield, htmlElement, popup, addCallback) {
  var inputTag = $('<input style="box-sizing: border-box; border: none;"/>').appendTo(htmlElement);
  inputTag.jqxInput({
    popupZIndex   : 99999999,
    placeHolder   : "",
    displayMember : 'name',
    width         : '100%',
    height        : 30
  });
  $(document).on('keydown.name', function (event) {
    if (event.keyCode == 13) {
      if (event.target === inputTag[0]) {
        addCallback();
      }
    }
  });
}