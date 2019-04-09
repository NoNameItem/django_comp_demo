const JQXGRID_LOCALE = {
    // separator of parts of a date (e.g. "/" in 11/05/1955)
    "/": ".",
    // separator of parts of a time (e.g. ":" in 05:44 PM)
    ":": ":",
    // the first day of the week (0 = Sunday, 1 = Monday, etc)
    firstDay: 1,
    days: {
        // full day names
        names: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        // abbreviated day names
        namesAbbr: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        // shortest day names
        namesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
    },
    months: {
        // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
        names: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ""],
        // abbreviated month names
        namesAbbr: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек", ""]
    },
    // AM and PM designators in one of these forms:
    // The usual view, and the upper and lower case versions
    //      [standard,lowercase,uppercase]
    // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
    //      null
    AM: ["AM", "am", "AM"],
    PM: ["PM", "pm", "PM"],
    eras: [
    // eras in reverse chronological order.
    // name: the name of the era in this culture (e.g. A.D., C.E.)
    // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
    // offset: offset in years from gregorian calendar
    {"name": "A.D.", "start": null, "offset": 0 }
],
    twoDigitYearMax: 2099,
    patterns: {
        // short date pattern
        d: "dd.MM.yyyy",
        // long date pattern
        D: "dddd, MMMM dd, yyyy",
        // short time pattern
        t: "h:mm tt",
        // long time pattern
        T: "h:mm:ss tt",
        // long date, short time pattern
        f: "dddd, MMMM dd, yyyy h:mm tt",
        // long date, long time pattern
        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
        // month/day pattern
        M: "MMMM dd",
        // month/year pattern
        Y: "yyyy MMMM",
        // S is a sortable format that does not vary by culture
        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
    },
    percentsymbol: "%",
    currencysymbol: "₽",
    currencysymbolposition: "before",
    decimalseparator: ",",
    thousandsseparator: " ",
    pagergotopagestring: "Страница:",
    pagershowrowsstring: "Строки:",
    pagerrangestring: " из ",
    pagerpreviousbuttonstring: "Назад",
    pagernextbuttonstring: "Вперед",
    groupsheaderstring: "Drag a column and drop it here to group by that column",
    sortascendingstring: "Сортировать по возрастанию",
    sortdescendingstring: "Сортировать по убыванию",
    sortremovestring: "Удалить сортировку",
    groupbystring: "Сгрупировать по этой колонке",
    groupremovestring: "Убрать из групп",
    filterclearstring: "Очистить",
    filterstring: "Фильтр",
    filtershowrowstring: "показать строки где:",
    filtershowrowdatestring: "Показать строки где дата:",
    filterorconditionstring: "Или",
    filterandconditionstring: "И",
    filterselectallstring: "(Выбрать всё)",
    filterchoosestring: "Пожалуйста выберите:",
    // Default: ["empty", "not empty", "contains", "contains(match case)",
    //         "does not contain", "does not contain(match case)", "starts with", "starts with(match case)",
    //         "ends with", "ends with(match case)", "equal", "equal(match case)", "null", "not null"]
    filterstringcomparisonoperators: [
      "Содержит (без учета регистра)",
      "Не содержит (без учета регистра)",
      "Содержит",
      "Не содержит",
      "Равно",
      "Не равно",
      "Равно (без учета регистра)",
      "Не равно (без учета регистра)",
      "Начинается с",
      "Не начинается с",
      "Начинается с (без учета регистра)",
      "Не начинается с (без учета регистра)",
      "Заканчивается на",
      "Не заканчивается на",
      "Заканчивается на (без учета регистра)",
      "Не заканчивается на (без учета регистра)",
      "Пусто",
      "Не пусто"
    ],
    // Default: ["equal", "not equal", "less than", "less than or equal", "greater than", "greater than or equal", "null", "not null"]
    filternumericcomparisonoperators: [
      "Равно",
      "Не равно",
      "Меньше",
      "Меньше или равно",
      "Больше",
      "Больше или равно",
      "Пусто",
      "Не пусто"
    ],
    // Default: ["equal", "not equal", "less than", "less than or equal", "greater than", "greater than or equal", "null", "not null"]
    filterdatecomparisonoperators: [
      "Равно",
      "Не равно",
      "Меньше",
      "Меньше или равно",
      "Больше",
      "Больше или равно",
      "Пусто",
      "Не пусто"
    ],
    // Default: ["equal", "not equal"]
    filterbooleancomparisonoperators: ["Равно", "Не равно"],
    validationstring: "Введенные данные некорректны",
    emptydatastring: "Нет данных для отображения",
    filterselectstring: "Выберите фильтр",
    loadtext: "Загрузка...",
    clearstring: "Очистить",
    todaystring: "Сегодня"
};