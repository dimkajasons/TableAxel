var newStorage = localStorage;
var storageArr;
var products = (function () {
    return checkStorage();
})();

function checkStorage() {
    if(newStorage.length === 0)  {
        products = [
            // JSON.parse(localStorage.getItem('myGrid')),
            // { "ProductName": "chicken", "Type": 2, "MyDate": new Date(2015, 2, 6).toISOString() },
        ];
        storageArr = [];
    } else {
        products = reConvert(localStorage.getItem('myGrid'));
        storageArr = reConvert(localStorage.getItem('myGrid'))
    }
    return products;
}

function convert(obj) {
    return JSON.stringify(obj);
}

function reConvert (obj) {
    return JSON.parse(obj);
}


    var MyDateField = function (config) {
        jsGrid.Field.call(this, config);
    };

    MyDateField.prototype = new jsGrid.Field({

        css: "date-field",            // redefine general property 'css'
        align: "center",              // redefine general property 'align'

        sorter: function (date1, date2) {
            return new Date(date1) - new Date(date2);
        },

        itemTemplate: function (value) {
            return new Date(value).toDateString();
        },

        insertTemplate: function (value) {
            return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
        },

        editTemplate: function (value) {
            return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
        },

        insertValue: function () {
            return this._insertPicker.datepicker("getDate").toISOString();
        },

        editValue: function () {
            return this._editPicker.datepicker("getDate").toISOString();
        }
    });
    jsGrid.fields.date = MyDateField;


    var productType = [
        { Name: "", Id: 0 },
        { Name: "Beverage", Id: 1 },
        { Name: "Meat", Id: 2 },
        { Name: "Sweets", Id: 3 }
    ];

    $("#grid").jsGrid({
        width: "100%",
        height: "400px",

        inserting: true,
        editing: true,
        paging: true,

        data: products,

        fields: [
                {name: "ProductName", type: "text", width: 150, validate: "required" },
                {name: "Type", type: "select", items: productType, valueField: "Id", textField: "Name" },
                // {name: "Date", type: "text", validate: "required"},
                {name: "MyDate", type: "date" },
                {type: "control" }
        ],
        onItemInserted: function (item) {
            // localStorage.setItem('myGrid', convert(item.item))
            storageArr.push(item.item);
            localStorage.setItem('myGrid', convert(storageArr))
        },
        onItemUpdated: function (item){
            storageArr[item.itemIndex] = item.item;
            localStorage.setItem('myGrid', convert(storageArr))
        },
        onItemDeleting: function(item) {
            storageArr.splice(item.itemIndex, 1);
            localStorage.setItem('myGrid', convert(storageArr))
        }
        // loadData: function(filter) {
        //     filter.sortField = 'ProductName';
        //     filter.sortOrder = 'asc';
        //     console.log(filter.data)
        // } 
    });




