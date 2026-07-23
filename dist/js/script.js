$(document).ready(function () {
  loadPersonnel();
});

$("#searchInp").on("keyup", function () {
  
  const searchValue = $(this).val().toLowerCase();

  if ($("#personnelBtn").hasClass("active")) {
    $("#personnelTableBody tr").each(function () {
      const rowText = $(this).text().toLowerCase();
      $(this).toggle(rowText.includes(searchValue));
    });
  } else if ($("#departmentsBtn").hasClass("active")) {
    $("#departmentTableBody tr").each(function () {
      const rowText = $(this).text().toLowerCase();
      $(this).toggle(rowText.includes(searchValue));
    });
  } else {
    $("#locationTableBody tr").each(function () {
      const rowText = $(this).text().toLowerCase();
      $(this).toggle(rowText.includes(searchValue));
    });
  }
  
});

$("#refreshBtn").click(function () {
  
  if ($("#personnelBtn").hasClass("active")) {
    loadPersonnel();
    
    
    
  } else { 
    
    if ($("#departmentsBtn").hasClass("active")) {
      loadDepartments();
      
      
      
    } else {
      loadLocations();
      
      
      
    }
    
  }
  
  
});
$("#personnelBtn").click(function () {
    loadPersonnel();
  });

function loadPersonnel () {
  $.ajax({
    url: "php/getAll.php",
    type: "GET",
    dataType: "json",

    success: function (result) {
      if(result.status.code === "200") {
        $("#personnelTableBody").html("");

        $.each(result.data, function (index, employee) {
          $("#personnelTableBody").append(`
            <tr>
              <td class="align-middle text-nowrap">
                ${employee.lastName}, ${employee.firstName}
              </td>
              
              <td class="align-middle text-nowrap d-none d-md-table-cell">
                ${employee.department ?? ""}
              </td>
              <td class="align-middle text-nowrap d-none d-md-table-cell">
                ${employee.location ?? ""}
              </td>
              <td class="align-middle text-nowrap d-none d-md-table-cell">
                ${employee.email}
              </td>
              <td class="text-end text-nowrap">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editPersonnelModal"
                  data-id="${employee.id}">
                  <i class="fa-solid fa-pencil fa-fw"></i>
                </button>
                
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#deletePersonnelModal"
                  data-id="${employee.id}">
                  <i class="fa-solid fa-trash fa-fw"></i>
                </button>
                </td>
              </tr>
              `);
        });
      } else {
        console.error(result.status.description);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error("loadPersonnel error:", textStatus, errorThrown);
    }

  } 

  );
}

function loadDepartments () {
  $.ajax({
    url: "php/getAllDepartments.php",
    type: "GET",
    dataType: "json",

    success: function (result) {
      if(result.status.code === "200") {
        $("#departmentTableBody").html("");

        $.each(result.data, function (index, department) {
          $("#departmentTableBody").append(`
            <tr>
              <td class="align-middle text-nowrap">
                ${department.name}
              </td>
              
              <td class="align-middle text-nowrap d-none d-md-table-cell">
                ${department.location ?? ""}
              </td>

              <td class="align-middle text-end text-nowrap">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editDepartmentModal"
                  data-id="${department.id}">
                  <i class="fa-solid fa-pencil fa-fw"></i>
                </button>
                
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteDepartmentModal"
                  data-id="${department.id}">
                  <i class="fa-solid fa-trash fa-fw"></i>
                </button>
                </td>
              </tr>
              `);
        });
      } else {
        console.error(result.status.description);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error("loaddepartment error:", textStatus, errorThrown);
    }

  } 

  );
}

function loadLocations () {
  $.ajax({
    url: "php/getAllLocations.php",
    type: "GET",
    dataType: "json",

    success: function (result) {
      if(result.status.code === "200") {
        $("#locationTableBody").html("");

        $.each(result.data, function (index, location) {
          $("#locationTableBody").append(`
            <tr>
              <td class="align-middle text-nowrap">
                ${location.name}
              </td>

              <td class="align-middle text-end text-nowrap">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editLocationModal"
                  data-id="${location.id}">
                  <i class="fa-solid fa-pencil fa-fw"></i>
                </button>
                
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteLocationModal"
                  data-id="${location.id}">
                  <i class="fa-solid fa-trash fa-fw"></i>
                </button>
                </td>
              </tr>
              `);
        });
      } else {
        console.error(result.status.description);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error("loadlocation error:", textStatus, errorThrown);
    }

  } 

  );
}

$("#filterBtn").click(function () {
  
  // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location
  
});

$("#addBtn").click(function () {
  
  if ($("#personnelBtn").hasClass("active")) {
    loadDepartmentSelect("#addPersonnelDepartment");
    const modalElement = document.getElementById("addPersonnelModal");

    const modal = new bootstrap.Modal(document.getElementById("addPersonnelModal"));
    modal.show();

  } else if ($("#departmentsBtn").hasClass("active")) {
    loadLocationSelect("#addDepartmentLocation");


    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("addDepartmentModal"));


    loadDepartmentSelect("#addPersonnelDepartment");
    modal.show();
  } else {

    const modal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("addLocationModal")
    )
    modal.show();
  }
  
  
});

function loadDepartmentSelect(selectID, selectedDepartmentID = null) {

  $.ajax({
    url: "php/getAllDepartments.php",
    type: "GET",
    dataType: "json",

    success: function (result) {
      console.log("Department select result:", result);

      if (result.status.code === "200") {
        const select = $(selectID);

        select.html(`
          <option value="" selected disabled>
            Select department
          </option>
        `);

        

          $.each(result.data, function (index, department) {
          select.append(`
            <option value="${department.id}">
              ${department.name}
            </option>
          `);
        });

        if (selectedDepartmentID !== null) {
          select.val(String(selectedDepartmentID));
        }
      } else {
        console.error(result.status.description);
      }


    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error("loadDepartmentsSelect error:", textStatus, errorThrown);
    }
  });
}


$("#departmentsBtn").click(function () {
  
  loadDepartments();
  
});

$("#locationsBtn").click(function () {
  
  loadLocations();
  
});

$("#editPersonnelModal").on("show.bs.modal", function (e) {
  
  $.ajax({
    url:
      "php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
      id: $(e.relatedTarget).attr("data-id") 
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        const employee = result.data.personnel[0];
        
        // Update the hidden input with the employee id so that
        // it can be referenced when the form is submitted

        $("#editPersonnelEmployeeID").val(employee.id);

        $("#editPersonnelFirstName").val(employee.firstName);
        $("#editPersonnelLastName").val(employee.lastName);
        $("#editPersonnelJobTitle").val(employee.jobTitle);
        $("#editPersonnelEmailAddress").val(employee.email);

        loadDepartmentSelect("#editPersonnelDepartment", employee.departmentID);

        
        
      } else {
        $("#editPersonnelModal .modal-title").text(
          "Error retrieving data"
        );
        console.error(result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").text(
        "Error retrieving data"
      );
      console.error("getPersonnelByID error:", textStatus, errorThrown);
    }
  });
});

$("#editPersonnelForm").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: "php/updatePersonnelByID.php",
    type: "POST",
    dataType: "json",

    data: {
      id: $("#editPersonnelEmployeeID").val(),
      firstName: $("#editPersonnelFirstName").val(),
      lastName: $("#editPersonnelLastName").val(),
      jobTitle: $("#editPersonnelJobTitle").val(),
      email: $("#editPersonnelEmailAddress").val(),
      departmentID: $("#editPersonnelDepartment").val(),
    },

    success: function (result) {
      if (result.status.code === "200") {
        const modal = bootstrap.Modal.getOrCreateInstance(
          document.getElementById("editPersonnelModal")
        );

        modal.hide();
        loadPersonnel();
      } else {
        console.error(result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(
        "updatePersonnel error:",
        textStatus,
        errorThrown
      );

      console.error(jqXHR.responseText);
    }
  });
});
$("#addPersonnelForm").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: "php/insertPersonnel.php",
    type: "POST",
    dataType: "json",
    data: {
      firstName: $("#addPersonnelFirstName").val(),
      lastName: $("#addPersonnelLastName").val(),
      jobTitle: $("#addPersonnelJobTitle").val(),
      email: $("#addPersonnelEmailAddress").val(),
      departmentID: $("#addPersonnelDepartment").val(),
    },

    success: function (result) {
      if(result.status.code === "200") {
        const modalElement = document.getElementById("addPersonnelModal");
        const modal = bootstrap.Modal.getInstance(modalElement);

        modal.hide();

        $("#addPersonnelForm")[0].reset();

        loadPersonnel();
      } else {
        console.error(result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("insertPersonnel error:", textStatus, errorThrown);
      console.error(jqXHR.responseText);
    }

    
  })
})

$("#deletePersonnelModal").on("show.bs.modal", function (e) {
  const personnelID = $(e.relatedTarget).attr("data-id");

  $("#deletePersonnelID").val(personnelID);

  $.ajax({
    url: "php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: personnelID
    },

    success: function (result) {
      if (result.status.code === "200") {
        const employee = result.data.personnel[0];

        $("#deletePersonnelName").text(`${employee.firstName} ${employee.lastName}`);
      } else {
        console.error(result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(
        "getPersonnelByID error:",
        textStatus,
        errorThrown
      );
    }
    
  });
});

$("#confirmDeletePersonnelBtn").click(function () {
  $.ajax({
    url: "php/deletePersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#deletePersonnelID").val()
    },

    success: function (result) {
      if (result.status.code === "200") {
        const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("deletePersonnelModal"));
        modal.hide();

        loadPersonnel();
      } else {
        console.error(result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(
        "deletePersonnel error:",
        textStatus,
        errorThrown
      );

      console.error(jqXHR.responseText);
    }
  });
});

function loadLocationSelect(selectID, selectedLocationID = null) {
  $.ajax({
    url: "php/getAllLocations.php",
    type: "GET",
    dataType: "json",

    success: function (result) {
      

      if (result.status.code === "200") {
        const select = $(selectID);

        select.html(`
          <option value="" selected disabled>
            Select location
          </option>
        `);

        

          $.each(result.data, function (index, location) {
          select.append(`
            <option value="${location.id}">
              ${location.name}
            </option>
          `);
        });

        if (selectedLocationID !== null) {
          select.val(String(selectedLocationID));
        }
      } else {
        console.error(result.status.description);
      }


    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error("loadlocationSelect error:", textStatus, errorThrown);
    }
  });

}

$("#addDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: "php/insertDepartment.php",
    type: "POST",
    dataType: "json",

    data: {
      name: $("#addDepartmentName").val(),
      locationID: $("#addDepartmentLocation").val()
    },

    success: function (result) {
      if (result.status.code === "200") {
        const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("addDepartmentModal"));
        modal.hide();

        $("#addDepartmentForm")[0].reset();

        loadDepartments();
      } else {
        console.error(result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(
        "insertDepartment error:",
        textStatus,
        errorThrown
      );

      console.error(jqXHR.responseText);
    }
  });
});
$("#editDepartmentModal").on("show.bs.modal", function (e) {
  const departmentID = $(e.relatedTarget).attr("data-id");
  
  $.ajax({
    url:
      "php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
      id: departmentID
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        const department = result.data[0];
        
        

        $("#editDepartmentID").val(department.id);
        $("#editDepartmentName").val(department.name);
        

        loadLocationSelect("#editDepartmentLocation", department.locationID);

        
        
      } else {
        $("#editDepartmentModal .modal-title").text(
          "Error retrieving data"
        );
        console.error(result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").text(
        "Error retrieving data"
      );
      console.error("getDepartmentByID error:", textStatus, errorThrown);
    }
  });
});

$("#editDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: "php/updateDepartmentByID.php",
    type: "POST",
    dataType: "json",

    data: {
      id: $("#editDepartmentID").val(),
      name: $("#editDepartmentName").val(),
      locationID: $("#editDepartmentLocation").val(),
    },

    success: function (result) {
      console.log("Update department result", result);
      if (result.status.code === "200") {
        const modal = bootstrap.Modal.getOrCreateInstance(
          document.getElementById("editDepartmentModal")
        );

        modal.hide();
        loadDepartments();
      } else {
        console.error(result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(
        "updateDepartment error:",
        textStatus,
        errorThrown
      );

      console.error(jqXHR.responseText);
    }
  });
});

// Executes when the form button with type="submit" is clicked

