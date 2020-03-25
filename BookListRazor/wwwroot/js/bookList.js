var dataTable;

$(document).ready(function () {
    console.log("GITHUB DATATABLE CALLED");
    loadDataTable();
});

function loadDataTable() {
    console.log("INSIDE LOADDATATBLE TEST");
    console.log("UPSERT DATATABLE");
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/BookList/Upsert?id=${data}" class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
                            Edit Test Upsert
                        </a>
                        &nbsp;
                        <a class='btn btn-danger text-white' style='cursor:pointer; width:70px;'
                            onclick=Delete('/api/book?id='+${data})>
                            Delete Test
                        </a>
                        </div>`;
                }, "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });
}

function Delete(url) {
    swal({
        title: "Are you sure BRO BRO BRO?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        dangerMode: true 
    }).then((willDelete) => {
        if (willDelete) {
            console.log(willDelete);
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}