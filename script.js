$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3000/',
        success: function(response) {
            let customer = response;

            for( let i = 0; i < customer.length; i++) {
                $('.customers-table').append(
                    `<tr id="item_${customer[i].id}">
                        <th scope="row">${customer[i].id}</th>
                        <td>${customer[i].name}</td>
                        <td>${customer[i].surname}</td>
                        <td>${customer[i].age}</td>
                        <td>
                            <button type="button" 
                            value="${customer[i].id}" id="btn-edit" class="btn btn-primary btn-sm"
                            data-toggle="modal" data-target="#editModal" data-whatever="FFF"
                            >Edit</button>
                            <button type="button" value="${customer[i].id}" id="btn-delete" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>`
                );
            };
        },
        error: function(error) {
            alert(`Error: ${error.status}`);
        }
    });

    let addInputs = $('#add-name, #add-surname, #add-age');
    let editInputs = $('#edit-name, #edit-surname, #edit-age');

    function addErrorClass() {
        addInputs.removeClass('form-control');
        addInputs.addClass('error-input');
        editInputs.removeClass('form-control');
        editInputs.addClass('error-input');
    };

    function removeErrorClass() {
        addInputs.removeClass('error-input');
        addInputs.addClass('form-control');
        editInputs.removeClass('error-input');
        editInputs.addClass('form-control');
    };
    
    $('#add-name, #add-surname, #add-age').focus(function() {
        $('.error-text').text('');
    });

    $('#edit-name, #edit-surname, #edit-age').focus(function() {
        $('.error-text').text('');
    });

    $('.customers-table').on('click', 'button#btn-edit', function() {
        $('.error-text').text('');
        removeErrorClass();
    })

    $('#btn-add-customer').click(function() {
        $('.error-text').text('');
        addInputs.val('');
        removeErrorClass();
    });

    $('#btn-submit').click(function() { 
        removeErrorClass();

        let name = $('#add-name').val();
        let surname = $('#add-surname').val();
        let age = $('#add-age').val();

        if (name == '' || surname == '' || age == '') {
            addErrorClass();
            $('.add-error').text('All fields must be filled');
        } else if (age <= 0) {
            addErrorClass();
            $('.add-error').text('Enter customer age correctly');
        } else if (!isNaN(name)) {
            addErrorClass();
            $('.add-error').text('Enter customer name correctly');
        } else if (!isNaN(surname)) {
            addErrorClass();
            $('.add-error').text('Enter customer surname correctly');
        } else {
            removeErrorClass();
             $.ajax({
                method: 'POST',
                url: `http://localhost:3000/add`,
                data: {name: name, surname: surname, age: age},
                success: function(response) {
                    let newCustomer = response
                    $('.add-error').prepend('<p class="success-text">Customer successfully added</p>');
                    $('.customers-table').append(
                        `<tr id="item_${newCustomer.id}">
                            <th scope="row">${newCustomer.id}</th>
                            <td>${newCustomer.name}</td>
                            <td>${newCustomer.surname}</td>
                            <td>${newCustomer.age}</td>
                            <td>
                                <button type="button" value="${newCustomer.id}" id="btn-edit" class="btn btn-primary btn-sm"
                                data-toggle="modal" data-target="#editModal" data-whatever="FFF"
                                >Edit</button>
                                <button type="button" value="${newCustomer.id}" id="btn-delete" class="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>`
                        );    
                },
                error: function(error) {
                    alert(`Error status: ${error.status}`);
                }
            });
            addInputs.val('');
        }
    }); 
    
    $('.customers-table').on('click', 'button#btn-edit', function(){
        let customerId = $(this).val();
        let name = $('#edit-name').val();
        let surname = $('#edit-surname').val();
        let age = $('#edit-age').val();

       $.ajax({
           method: 'GET',
           data: {name: name, surname: surname, age: age},
           url: `http://localhost:3000/edit/${customerId}`,
           success: function(response) {
                let customer = response;
                $('#edit-id').text(customer.id);
                $('#edit-name').val(customer.name); 
                $('#edit-surname').val(customer.surname);
                $('#edit-age').val(customer.age);
           },
           error: function(error) {
            alert(`Error status: ${error.status}`);
           }
       });
    });

    $('#btn-edit-customer').click(function() { 
        removeErrorClass();
        let customerId = $('#edit-id').text();
        let name = $('#edit-name').val();
        let surname = $('#edit-surname').val();
        let age = $('#edit-age').val();

        if (name == '' || surname == '' || age == '') {
            addErrorClass();
            $('.edit-error').text('All fields must be filled');
        } else if (age <= 0) {
            addErrorClass();
            $('.edit-error').text('Enter customer age correctly');
        } else if (!isNaN(name)) {
            addErrorClass();
            $('.edit-error').text('Enter customer name correctly');
        } else if (!isNaN(surname)) {
            addErrorClass();
            $('.edit-error').text('Enter customer surname correctly');
        } else {
            removeErrorClass();
            $.ajax({
                method: 'POST',
                url: `http://localhost:3000/edit/${customerId}`,
                data: {name: name, surname: surname, age: age},
            success: function(response) {
                let customer = response;
                $('.edit-error').append('<p class="success-text">Customer successfully edited</p>')
                $(`#item_${customer.id}`).html(
                    `<th scope="row">${customer.id}</th>
                        <td>${customer.name}</td>
                        <td>${customer.surname}</td>
                        <td>${customer.age}</td>
                        <td>
                            <button type="button" value="${customer.id}" id="btn-edit" class="btn btn-primary btn-sm"
                            data-toggle="modal" data-target="#editModal" data-whatever="FFF"
                            >Edit</button>
                            <button type="button" value="${customer.id}" id="btn-delete" class="btn btn-danger btn-sm">Delete</button>
                        </td>`);    
            },
            error: function(error) {
                alert(`Error status: ${error.status}`);
            }
            });
        };
    }); 

    $('.customers-table').on('click', 'button#btn-delete', function() {
        let customerId = $(this).val();

        $.ajax({
            method: 'DELETE',
            url: `http://localhost:3000/delete/${customerId}`,
            success: function(response) {
                let id = response;
                alert(`Customer: ${id} is deleted`);
                $(`#item_${id}`).remove();
            } 
        })
    })
});