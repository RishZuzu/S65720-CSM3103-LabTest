$(document).ready(function() {
    $.ajax({
        url: 'https://kerbau.odaje.biz/getstaff.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            let data = response.map(item => JSON.parse(item)).filter(item => item.status !== 1);
            if (data.length > 0) {
                data.forEach(function(staff) {
                    $('#staff-list').append(
                        `<div>
                            <a href="secondpage.html?id=${staff.employeeNumber}" id="${staff.employeeNumber}">
                                ${staff.email}
                            </a>
                        </div>`
                    );
                });
            }
        },
        error: function(error) {
            console.error('Error fetching staff data', error);
        }
    });
});