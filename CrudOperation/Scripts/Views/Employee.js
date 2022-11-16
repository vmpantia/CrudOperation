var Popup, dataTable;
$(document).ready(function () {
    dataTable = $('#emplyeeTable').DataTable({
        "ajax": {
            "url": "/Employee/GetData",
            "type": "GET",
            "dataType": "json"
        },
        "columns": [
            { "data": "Name" },
            { "data": "Position" },
            { "data": "Office" },
            { "data": "Age" },
            { "data": "Salary" },
        ],
        "language": {
            "emptyTable": "No data found, Please click on <b>Add New</b> Button"
        }
    });
});

function PopupForm(url) {
    var formDiv = $('<div/>');
    $.get(url)
        .done(function (response) {
            formDiv.html(response);

            Popup = formDiv.dialog({
                autoOpen: true,
                resizable: false,
                title: 'Fill Employee Details',
                height: 500,
                width: 700,
                close: function () {
                    Popup.dialog('destroy').remove();
                }
            });
        });
}

function SubmitForm(form) {
    $.validator.unobtrusive.parse(form);
    var isValid = $(form).valid()
    if (isValid) {
        $.ajax({
            type: "POST",
            url: form.action,
            data: $(form).serialize(),
            success: function (data) {
                if (data.success) {
                    Popup.dialog('close');
                    dataTable.ajax.reload();
                }
            }
        });
    }
    return false;
}