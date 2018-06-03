var tableApp = {
    products: [],
    productTypes: [
        { Name: "", Id: 0 },
        { Name: "Beverage", Id: 1 },
        { Name: "Meat", Id: 2 },
        { Name: "Sweets", Id: 3 }
    ],
    getProducts: function () {
        var localStorageProducts = reConvert(localStorage.getItem('myGrid'));
        if (!localStorageProducts || !localStorageProducts.length) {
            tableApp.products = [];
        } else {
            tableApp.products = localStorageProducts;
        }
    },
    startApp: function() {
        tableApp.getProducts();
        $("#grid").jsGrid({
            width: "100%",
            height: "400px",

            inserting: true,
            editing: true,
            sorting: true,
            paging: true,

            data: tableApp.products,

            fields: [
                { name: "ProductName", type: "text", width: 150, validate: "required", sorting: true, sorter: 'string' },
                { name: "Type", type: "select", items: tableApp.productTypes, valueField: "Id", textField: "Name", sorting: true, sorter: 'string' },
                { name: "MyDate", type: "date", sorting: true },
                { type: "control" }
            ],
            onItemInserted: function (item) {
                // localStorage.setItem('myGrid', convert(item.item))
                // tableApp.products.push(item.item);
                localStorage.setItem('myGrid', convert(tableApp.products));
                xhr.open('post', 'http://localhost:3000/register');
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(JSON.stringify(item.item));
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200)
                        console.log(JSON.stringify(item.item));
                }
                console.log(JSON.stringify(item.item));
            },
            onItemUpdated: function (item) {
                tableApp.products[item.itemIndex] = item.item;
                localStorage.setItem('myGrid', convert(tableApp.products))
            },
            deleteItem: function(item) {
                tableApp.products.splice(tableApp.products.indexOf(item), 1);
                localStorage.setItem('myGrid', convert(tableApp.products))
                $("#grid").jsGrid("refresh");
                // return new Promise(function(resolve) {
                //     return resolve();
                // })
            },
            loadData: function (filter) {
                filter.sortField = 'ProductName';
                filter.sortOrder = 'asc';
                console.log(filter.data)
            }
        });
    }
}
function convert(obj) {
    return JSON.stringify(obj);
}

function reConvert(obj) {
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







