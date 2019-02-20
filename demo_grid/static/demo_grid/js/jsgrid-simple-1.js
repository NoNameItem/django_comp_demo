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

  rowClick       : getRowSelect("#jsGrid1"),
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
  onDataLoaded   : getSetPager(pagerContainer, pagerParams),
});