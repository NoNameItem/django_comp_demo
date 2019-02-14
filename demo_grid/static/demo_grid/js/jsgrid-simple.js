let pagerContainer = $('#pager');
var pagerParams = {
  pagerInitialised : false,
  totalPages : 0
};

let controller ={
  loadData: function(filter) {
    var d = $.Deferred();
    if (filter.sortField){
      filter.sortField = filter.sortOrder === "asc" ? filter.sortField : "-" + filter.sortField;
    }
    $.ajax({
      type: "GET",
      url: "/demo_grid/employee",
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
  width  : "100%",
  height : "auto",

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

  // disable edit on click
  rowClick       : getRowSelect("#jsGrid"),
  rowDoubleClick : getRowEdit("#jsGrid"),

  fields : [
    {
      type  : "control",
      width : 50
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
      type      : "text",
      title     : "Отдел",
      insertcss : "department",
      editcss   : "department",
      validate  : {
        validator : "required",
        message   : 'Поле "Отдел" должно быть заполнено',
        param     : []
      }
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
  onDataLoaded   : getSetPager(pagerContainer, pagerParams),
});