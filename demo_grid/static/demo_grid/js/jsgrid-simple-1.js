var gDeptId;

$(document).ready(function() {
  $("#jsGrid").hide();
});

// Управление гридом с сотрудниками
function switchDetailGrid(deptId) {
  gDeptId = deptId;
  if (gDeptId == null)
    $("#jsGrid").hide();
  else {
    $("#jsGrid").show();
    $("#jsGrid").jsGrid("loadData");
    $.ajax(
    {
      type: "GET",
      url: "/demo_grid/department/" + deptId
    }
  ).done(function(response){
    $("#jsGrid").jsGrid("fieldOption", "department", "items", response);
  });
    $("#jsGrid").jsGrid("loadData");
  }
}

// Грид с департаментами
let pagerContainer1 = $('#role-pager');
var pagerParams1 = {
  pagerInitialised : false,
  totalPages : 0
};

let controller1 ={
  loadData: function(filter) {
    var d = $.Deferred();
    if (filter.sortField){
      filter.sortField = filter.sortOrder === "asc" ? filter.sortField : "-" + filter.sortField;
    }
    $.ajax({
      type: "GET",
      url: "/demo_grid/department",
      data: filter
    })
    .done(function(response) {
            d.resolve({data: response.results, itemsCount: response.count});
          }
    );
    return d.promise();
  },

  insertItem: function(item) {
    return $.ajax({
      type: "POST",
      url: "/demo_grid/department",
      data: item
    })
    .fail(function(response) {
      responseGridErrorNotify(response, $(".jsgrid-insert-row"));
      gridErrorTooltip({row : $(".jsgrid-insert-row")})
    });
  },

  updateItem: function(item) {
    return $.ajax({
      type: "PUT",
      url: "/demo_grid/department/" + item.id,
      data: item
    }).fail(function(response, textStatus, errorThrown) {
      if (response.status != 404) {
        responseGridErrorNotify(response, $(".jsgrid-update-row"));
        gridErrorTooltip({row : $(".jsgrid-update-row")})
      } else {
        errorNotify("Департамент не найден", "Возможно, изменяемый департамент был удален, обновите страницу")
      }
    });
  },

  deleteItem: function(item) {
    return $.ajax({
      type: "DELETE",
      url: "/demo_grid/department/" + item.id,
      data: item
    }).fail(function(response, textStatus, errorThrown) {
      if (response.status == 404) {
        errorNotify("Департамент не найден", "Возможно, удаляемый департамент был удален, обновите страницу")
      }
    });
  },
};

$("#jsGrid1").jsGrid({
  width  : "100%",
  height : "200px",

  inserting   : true,
  editing     : true,
  sorting     : true,
  paging      : true,
  pageLoading : true,
  filtering   : true,
  pagerFormat : "",

  controller : controller1,
  autoload   : true,

  invalidNotify : gridErrorNotify,

  rowClick       : getRowSelect("#jsGrid1", function(args) { switchDetailGrid(args.item.id) }),
  rowDoubleClick : getRowEdit("#jsGrid1"),

  fields : [
    {
      type  : "control",
      width : 50
    },
    {
      name      : "name",
      type      : "text",
      title     : "Наименование",
      insertcss : "name",
      editcss   : "name",
      validate  : {
        validator : "required",
        message   : 'Поле "Наименование" должно быть заполнено',
        param     : []
      }
    }
  ],

  onItemInserted : function(arg) {$.notifyClose();},
  onItemUpdated  : function(arg) {$.notifyClose();},
  onItemInvalid  : gridErrorTooltip,
  onDataLoaded   : getSetPager(pagerContainer1, pagerParams1),
});

///////////
// Грид, фильтруемый по department_id
///////////

let pagerContainer = $('#pager');
var pagerParams = {
  pagerInitialised : false,
  totalPages : 0
};

function refreshDeptsLOV() {
  $.ajax(
    {
      type: "GET",
      url: "/demo_grid/department"
    }
  ).done(function(response){
    var items = [{id: null, name: null}];
    items = items.concat(response);
    $("#jsGrid").jsGrid("fieldOption", "department", "items", items);
  })
}

let controller ={
  loadData: function(filter) {
    var d = $.Deferred();
    if (filter.sortField){
      filter.sortField = filter.sortOrder === "asc" ? filter.sortField : "-" + filter.sortField;
    }
    $.ajax({
      type: "GET",
      url: "/demo_grid/department/" + gDeptId + "/employees",
      data: filter
    })
    .done(function(response) {
            d.resolve({data: response.results, itemsCount: response.count});
          }
    );
    return d.promise();
  },

  insertItem: function(item) {
    return $.ajax({
      type: "POST",
      url: "/demo_grid/employee",
      data: item
    })
    .fail(function(response) {
      responseGridErrorNotify(response, $(".jsgrid-insert-row"));
      gridErrorTooltip({row : $(".jsgrid-insert-row")})
    });
  },

  updateItem: function(item) {
    return $.ajax({
      type: "PUT",
      url: "/demo_grid/employee/" + item.id,
      data: item
    }).fail(function(response, textStatus, errorThrown) {
      if (response.status != 404) {
        responseGridErrorNotify(response, $(".jsgrid-update-row"));
        gridErrorTooltip({row : $(".jsgrid-update-row")})
      } else {
        errorNotify("Работник не найден", "Возможно, изменяемый работник был удален, обновите страницу")
      }
    });
  },

  deleteItem: function(item) {
    return $.ajax({
      type: "DELETE",
      url: "/demo_grid/employee/" + item.id,
      data: item
    }).fail(function(response, textStatus, errorThrown) {
      if (response.status == 404) {
        errorNotify("Работник не найден", "Возможно, удаляемый работник был удален, обновите страницу")
      }
    });
  },
};

$("#jsGrid").jsGrid({
  width  : "120%",
  height : "500px",

  inserting   : true,
  editing     : true,
  sorting     : true,
  paging      : true,
  pageLoading : true,
  filtering   : true,
  pagerFormat : "",
  pageSize    : 5,

  controller : controller,
  autoload   : true,

  invalidNotify : gridErrorNotify,

  rowClick       : getRowSelect("#jsGrid"),
  rowDoubleClick : getRowEdit("#jsGrid"),

  fields : [
    {
      type  : "control",
      width : 50
    },
    {
      name      : "last_name",
      type      : "text",
      title     : "Фамилия",
      insertcss : "last_name",
      editcss   : "last_name",
      validate  : {
        validator : "required",
        message   : 'Поле "Фамилия" должно быть заполнено',
        param     : []
      }
    },
    {
      name      : "first_name",
      type      : "text",
      title     : "Имя",
      insertcss : "first_name",
      editcss   : "first_name",
      validate  : {
        validator : "required",
        message   : 'Поле "Имя" должно быть заполнено',
        param     : []
      }
    },
    {
      name      : "is_active",
      type      : "checkbox",
      title     : "Активен",
      insertcss : "is_active",
      editcss   : "is_active"
    },
    {
      name      : "email",
      type      : "text",
      title     : "Email",
      insertcss : "email",
      editcss   : "email",
      validate  : {
        validator : "required",
        message   : 'Поле "Email" должно быть заполнено',
        param     : []
      }
    },
    {
      name      : "phone_number",
      type      : "text",
      title     : "Номер телефона",
      insertcss : "phone_number",
      editcss   : "phone_number"
    },
    {
      name      : "hire_date",
      type      : "date",
      title     : "Дата найма",
      insertcss : "hire_date",
      editcss   : "hire_date"
    },
    {
      name      : "salary",
      type      : "number",
      title     : "Зарплата",
      insertcss : "salary",
      editcss   : "salary",
      validate  : {
        validator : "required",
        message   : 'Поле "Зарплата" должно быть заполнено',
        param     : []
      }
    },
    {
      name      : "commission_pct",
      type      : "number",
      title     : "Процент с продаж",
      insertcss : "commission_pct",
      editcss   : "commission_pct",
    },
    {
      name      : "department",
      type      : "select",
      title     : "Отдел",
      insertcss : "department",
      editcss   : "department",
      items      : [{id: null, name: null}],
      valueField : "id",
      textField  : "name"
    },
    {
      name      : "comm",
      type      : "textarea",
      title     : "Комментарий",
      insertcss : "comm",
      editcss   : "comm",
    },
  ],

  onItemInserted : function(arg) {$.notifyClose();},
  onItemUpdated  : function(arg) {$.notifyClose();},
  onItemInvalid  : gridErrorTooltip,
  onDataLoaded   : getSetPager(pagerContainer, pagerParams)
});

refreshDeptsLOV();