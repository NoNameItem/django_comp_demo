var momentFormats = {
  hire_date : "DD.MM.YYYY"
};

var $grid = $("#jqxgrid");
var $filterPanel = $("#filters");


function pagerRenderer() {
  var pagenum = $grid.jqxGrid('getpaginginformation').pagenum + 1;
  var rowcount = $grid.jqxGrid('getdatainformation').rowscount;
  var pagesize = $grid.jqxGrid('getpaginginformation').pagesize;
  var pagecount = $grid.jqxGrid('getpaginginformation').pagescount;

  if (pagecount !== 0) {
    // Контейнер для пейджера и счетчика строк
    var container = $('<div class="row jqxgrid-custom-pager-container"></div>');

    // Инициализируем пэйджер
    var pager = $('<div class="jqxgrid-pager col"></div>');
    pager.twbsPagination({
      totalPages : pagecount,
      startPage : pagenum,
      hideOnlyOnePage : false,
      visiblePages : 10,
      paginationClass : "pagination",
      initiateStartPageClick : false,
      first : '<<',
      prev : '<',
      next : '>',
      last : '>>',
      // handler
      onPageClick : function (e, page) {
        $grid.jqxGrid('gotopage', page - 1);
      }
    });

    // Создаем счетчик строк
    var row_counter = $('<div class="row-counter col"></div>');
    var start = (pagenum - 1) * pagesize + 1;
    var end = Math.min(rowcount, pagenum * pagesize);
    var rowString = start + " - " + end + " из " + rowcount;
    row_counter.text(rowString);

    // Добавляем пейджер и счетчик строк в контейнер
    container.append(pager);
    container.append(row_counter);

    return container;
  }

}

function drfFormatQuery(data) {
  var drfData = {};

  // Достаем данные для пагинации
  drfData["pageIndex"] = data.pagenum + 1;
  drfData["pageSize"] = data.pagesize;

  // Достаем из грида поля сортировки
  var sortField = $grid.jqxGrid('getsortinformation').sortcolumns.map(
    function (dataField) {
      return dataField.ascending ? dataField.dataField : "-" + dataField.dataField
    }
  );
  $.extend(drfData, {ordering : sortField.join(",")});

  // Достаем из грида фильтры
  $grid.jqxGrid('getfilterinformation').map(
    function (filter) {
      var filterInfo = filter.filter.getfilters()[0];
      var op = filterInfo.condition;
      var val = filterInfo.id || filterInfo.value;
      var field = filter.filtercolumn;
      // Преобразование даты
      if (filterInfo.type === "datefilter") {
        val = moment(val).format(momentFormats[field]);
      }
      drfData[field + FILTERS[op].lookup] = FILTERS[op].value || val;
    }
  );

  return drfData;
}

var departmentSource = {
  datatype : "json",
  url : "/demo_grid/department",
  async : false,

  datafields : [
    {name : "id"},
    {name : "name"}
  ],

  id : "id"
};

var departmentAdaptor = new $.jqx.dataAdapter(departmentSource, {autoBind : true});

var employeeSource = {
  datatype : "json",
  url : "/demo_grid/jqx-employee",
  cache : false,

  mapChar : ".",
  root : "results",
  id : "id",
  datafields : [
    {name : "id", type : "int"},
    {name : "last_name", type : "string"},
    {name : "first_name", type : "string"},
    {name : "is_active", type : "bool"},
    {name : "email", type : "string"},
    {name : "phone_number", type : "string"},
    {name : "hire_date", format : "dd.MM.yyyy", type : "date"},
    {name : "salary", type : "number"},
    {name : "commission_pct", type : "number"},
    {name : "department__id", map : "department.id", type : "int"},
    {name : "department__name", map : "department.name", type : "string"},
    {name : "comm", type : "string"}
  ],

  beforeprocessing : function (data) {
    this.totalrecords = data.count;
  },
  sort : function () {
    $grid.jqxGrid('updatebounddata', "sort");
  },
  filter : function () {
    $grid.jqxGrid('updatebounddata', "filter");
  },
  addrow : function (rowid, data, commit) {
    var preparedData = data;
    preparedData.hire_date = moment(preparedData.hire_date).format(momentFormats["hire_date"]);
    preparedData.department = {id : preparedData.department__id, name : preparedData.department__name};
    $.ajax({
      type : "POST",
      dataType : "json",
      url : "/demo_grid/jqx-employee",
      cache : false,
      contentType : 'application/json; charset=utf-8',
      data : JSON.stringify(data),
      success : function (data, status, xhr) {
        // update command is executed.
        commit(true);
      },
      error : function (jqXHR, textStatus, errorThrown) {
        commit(false);
      }
    });
  },
  updaterow : function (rowid, data, commit) {
    var preparedData = data;
    preparedData.hire_date = moment(preparedData.hire_date).format(momentFormats["hire_date"]);
    preparedData.department = {id : preparedData.department__id, name : preparedData.department__name};
    $.ajax({
      type : "PUT",
      dataType : "json",
      url : "/demo_grid/jqx-employee/" + rowid,
      cache : false,
      contentType : 'application/json; charset=utf-8',
      data : JSON.stringify(data),
      success : function (data, status, xhr) {
        // update command is executed.
        commit(true);
      },
      error : function (jqXHR, textStatus, errorThrown) {
        commit(false);
      }
    });
  }

};

employeeSettings = {
  formatData : drfFormatQuery
};

var employeeDataAdapter = new $.jqx.dataAdapter(employeeSource, employeeSettings);

$grid.jqxGrid(
  {
    width : "100%",
    autoheight : true,
    source : employeeDataAdapter,
    theme : 'material',
    autorowheight : true,

    sortable : true,
    sortmode : "many",
    showsortmenuitems : false,

    filterable : true,
    showfilterrow : true,

    updatefilterconditions : updateFilterConditions,
    autoshowfiltericon : true,

    editable : true,
    editmode : 'selectedrow',
    showeverpresentrow : true,

    pageable : true,
    pagermode : "simple",
    virtualmode : true,
    pagesize : 20,
    pagerrenderer : pagerRenderer,
    rendergridrows : function (params) {
      return params.data;
    },

    localization : {
      addrowstring : "Добавить",
      udpaterowstring : "Обновить",
      deleterowstring : "Удалить",
      resetrowstring : "Очистить",
    },

    columns : [
      {text : "Фамилия", datafield : "last_name", width : 200, columntype : "textbox", filtertype : "input", createEverPresentRowWidget:everPresentRowText},
      {text : "Имя", datafield : "first_name", width : 200, columntype : "textbox", filtertype : "input"},
      {text : "Активен", datafield : "is_active", width : 80, columntype : "checkbox", filtertype : 'bool'},
      {text : "Email", datafield : "email", width : 200, columntype : "textbox", filtertype : "input"},
      {text : "Телефон", datafield : "phone_number", width : 200, columntype : "textbox", filtertype : "input"},
      {
        text : "Дата найма",
        datafield : "hire_date",
        width : 200,
        columntype : "datetimeinput",
        cellsformat : "dd.MM.yyyy",
        filtertype : "date"
      },
      {
        text : "Зарплата", datafield : "salary", columntype : "numberinput", width : 100, filtertype : "number",
        createeditor : function (row, value, editor) {
          editor.jqxNumberInput({digits : 10, decimalDigits : 2, min : 0});
        }
      },
      {
        text : "Процент с продаж",
        datafield : "commission_pct",
        columntype : "numberinput",
        width : 150,
        filtertype : "number",
        createeditor : function (row, value, editor) {
          editor.jqxNumberInput({digits : 4, decimalDigits : 2, min : 0, max : 100});
        }
      },
      {
        text : "Отдел", datafield : "department__id", displayfield : "department__name", width : 200,
        columntype : 'dropdownlist', filtertype : "list", filteritems : departmentAdaptor.values,
        createeditor : function (row, value, editor) {
          editor.jqxDropDownList({source : departmentAdaptor, displayMember : 'name', valueMember : 'id'});
        }
      },
      {text : "Комментарий", datafield : "comm", width : 300, columntype : "textbox", filtertype : "input"}
    ]
  });
$grid.bind('bindingcomplete', function () {
  $("#jqxgrid").jqxGrid('localizestrings', JQXGRID_LOCALE);
});
$grid.on('filter', getUpdateFilterList($grid, $filterPanel, momentFormats));

$filterPanel.find('.filter-reset-btn').click(function () {
  $grid.jqxGrid('clearfilters');
});

$("#add-row-btn").bind('click', function () {
  $grid.jqxGrid('addrow', null, {}, "first");
});
