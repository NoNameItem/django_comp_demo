let pagerContainer = $('#role-pager');
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
      url: "/demo_grid/department/" + item.code,
      data: item
    }).fail(function(response, textStatus, errorThrown) {
      if (response.status != 404) {
        responseGridErrorNotify(response, $(".jsgrid-update-row"));
        gridErrorTooltip({row : $(".jsgrid-update-row")})
      } else {
        errorNotify("Работник не найден", "Возможно, изменяемый работник была удалена, обновите страницу")
      }
    });
  },

  deleteItem: function(item) {
    return $.ajax({
      type: "DELETE",
      url: "/demo_grid/department/" + item.code,
      data: item
    }).fail(function(response, textStatus, errorThrown) {
      if (response.status == 404) {
        errorNotify("Роль не найдена", "Возможно, удаляемая роль была удалена, обновите страницу")
      }
    });
  },
};

$("#jsGrid1").jsGrid({
  width  : "100%",
  height : "auto",

  inserting   : true,
  editing     : true,
  sorting     : true,
  paging      : true,
  pageLoading : true,
  filtering   : true,
  pagerFormat : "",

  controller : controller,
  autoload   : true,

  invalidNotify : gridErrorNotify,

  // disable edit on click
  rowClick : function() {},

  fields : [
    {
      type  : "control",
      width : 50
    },
    {
      name      : "code",
      type      : "text",
      title     : "Код отдела",
      insertcss : "code",
      editcss   : "code",
      validate  : {
        validator : "required",
        message   : 'Поле "Код" должно быть заполнено',
        param     : []
      }
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
  onDataLoaded   : getSetPager(pagerContainer, pagerParams),
});