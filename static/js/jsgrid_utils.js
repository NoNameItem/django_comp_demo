jsGrid.locale("ru");

// Кастомные поля jsGrid

// Дата
var MyDateField = function(config) {
    jsGrid.Field.call(this, config);
};

MyDateField.prototype = new jsGrid.Field({

    css: "date-field",            // redefine general property 'css'
    align: "center",              // redefine general property 'align'


    sorter: function(date1, date2) {
        return new Date(date1) - new Date(date2);
    },

    itemTemplate: function(value) {
        return new Date(value).toLocaleDateString();
    },

    insertTemplate: function(value) {
        return this._insertPicker = $("<input>").datetimepicker({format: 'DD.MM.YYYY' });
    },

    filterTemplate: function(value) {
        return this._filterPicker = $("<input>").datetimepicker({format: 'DD.MM.YYYY' });
    },

    editTemplate: function(value) {
        this._editPicker = $("<input>").datetimepicker({format: 'DD.MM.YYYY'});
        this._editPicker.data("DateTimePicker").date(new Date(value));
        return this._editPicker
    },

    insertValue: function() {
      var insertValue = this._insertPicker.data('DateTimePicker').date();
			if (typeof insertValue !== 'undefined' && insertValue !== null) {
				return insertValue.format("YYYY-MM-DD");
			} else {
				return null;
			}
    },

    filterValue: function() {
      var filterValue = this._filterPicker.data('DateTimePicker').date();
			if (typeof filterValue !== 'undefined' && filterValue !== null) {
				return filterValue.format("YYYY-MM-DD");
			} else {
				return null;
			}
    },

    editValue: function() {
      var editValue = this._editPicker.data('DateTimePicker').date();
			if (typeof editValue !== 'undefined' && editValue !== null) {
				return editValue.format("YYYY-MM-DD");
			} else {
				return null;
			}
    }
});

jsGrid.fields.date = MyDateField;

// Вспомогательные функции для работы с jsGrid

function gridErrorNotify(args) {
  $.notifyClose();
  $.map(
    args.errors,
    function (error) {
      errorNotify('Ошибка ввода данных', error.message);
    }
  );
}

function gridErrorTooltip(arg) {
    arg.row.find('.jsgrid-invalid').map(function(e) {
      $(this).attr("data-toggle", "tooltip");
      $(this).attr("data-placement", "bottom");
      $(this).tooltip({container : 'body', trigger : 'hover'});
    })
  }

function processFieldError(row, prefix, name, obj) {
  console.log(prefix + ' ' + name);
  console.log(obj);
  console.log($.isArray(obj));
  if ($.isArray(obj)){
    var field_error_title = "";
    row.find('.jsgrid-cell.' + prefix + name).addClass('jsgrid-invalid');
    for (var i in obj) {
      errorNotify('Ошибка ввода данных', obj[i]);
      field_error_title += obj[i];
    }
    row.find('.jsgrid-cell.' + prefix + name).prop("title", field_error_title);
  } else {
    for (i in obj) {
      processFieldError(row, prefix + name + '__', i, obj[i]);
    }
  }
}

function responseGridErrorNotify(response, row) {
  row.find(".jsgrid-cell").removeClass("jsgrid-invalid").removeProp("title");
  $.notifyClose();
  for (var i in response.responseJSON) {
    processFieldError(row, "", i, response.responseJSON[i]);
  }
}

// Генераторы функций для грида

function getSetPager(pagerContainer, pagerParams) {
  return function(obj) {
    console.log(obj);
    var itemsCount = obj.data.itemsCount;
    var pageSize = obj.grid.pageSize;
    var currentPage = obj.grid.pageIndex;
    var pageCount = (itemsCount - itemsCount % pageSize) / pageSize + (itemsCount % pageSize === 0 ? 0 : 1);


    function initPager(container, p_pageCount, p_currentPage) {
      console.log(p_pageCount);
      console.log(p_currentPage);
      if (p_pageCount !== 0) {
        container.twbsPagination({
          totalPages: p_pageCount,
          startPage: p_currentPage,
          hideOnlyOnePage: false,
          visiblePages: 10,
          paginationClass: "pagination justify-content-end",
          initiateStartPageClick: false,
          first: '<<',
          prev: '<',
          next: '>',
          last: '>>',
          // handler
          onPageClick: function (e, page) {
            obj.grid.openPage(page);
          }
        });
      }
    }

    if (!pagerParams.pagerInitialised) {
      initPager(pagerContainer, pageCount, currentPage);
      pagerParams.pagerInitialised = true;
    } else {
      if ((currentPage !== pagerContainer.twbsPagination("getCurrentPage")) || (pagerParams.totalPages !== pageCount)) {
        pagerContainer.twbsPagination("destroy");
        initPager(pagerContainer, pageCount, currentPage);
      }
    }
    pagerParams.totalPages = pageCount;
  }
}

function getRowEdit(grid_selector){
  return function(obj){
    $(grid_selector).jsGrid("editItem", obj.item);
  }
}

function getRowSelect(grid_selector, callback){
  var $callback = callback || function () {};
  return function (obj) {
    var $row = $(grid_selector).jsGrid("rowByItem", obj.item);
    $(grid_selector).find("tr.selected").removeClass("selected");
    $row.addClass("selected");
  }
}