$(document).ready(function() {
    // Function to get the query parameter value by name
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get the employeeNumber from the URL
    const employeeNumber = getQueryParam('id');

    if (employeeNumber) {
        // Make an AJAX call to fetch staff details by employeeNumber
        $.ajax({
            url: 'https://kerbau.odaje.biz/getstaffbyid.php',
            method: 'GET',
            data: { id: employeeNumber },
            dataType: 'json',
            success: function(response) {
               let data = response.map(item => JSON.parse(item)).filter(item => item.status !== 1);
               if (data.length > 0) {
                  let staff = data[0];
                  // Display the staff details
                  $('#staff-details').html(`
                     <p><strong>Employee Number:</strong> ${staff.employeeNumber}</p>
                     <p><strong>First Name:</strong> ${staff.firstName}</p>
                     <p><strong>Last Name:</strong> ${staff.lastName}</p>
                     <p><strong>Office Code:</strong> ${staff.officeCode}</p>
                     <p><strong>Phone Extension:</strong> ${staff.extension}</p>
                     <p><strong>Email Address:</strong> ${staff.email}</p>
                     <p><strong>Job Title:</strong> ${staff.jobTitle}</p>
                     <p><strong>Reports To:</strong> ${staff.reportsTo}</p>
                  `);
                } else {
                    $('#staff-details').html('<p>No details found for this employee.</p>');
                }
            },
            error: function(error) {
                console.error('Error fetching staff details', error);
                $('#staff-details').html('<p>Error fetching staff details. Please try again later.</p>');
            }
        });
    } else {
        $('#staff-details').html('<p>No employee ID provided in the URL.</p>');
    }
});