window.onload = function(){
    // alert("Window loaded")
}
$(document).ready(function(){
  function modal(){
     $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
  }
 
   $('#register-form').submit(function(e) {
            e.preventDefault();
            //alert("Window loaded");
            let surname = $('#surname').val();            
            let firstName = $('#first_name').val();
            let otherName = $('#other_name').val();
            let email = $('#email').val();
            let contactAddress =$('#contact_address').val();
            let password = $('#password').val();
            let gender = $('#exampleRadios').val();
            let confirmPassword= $('#confirm_password').val();
            let isAdmin = Boolean(0,1)
            const userData = {
              surname: surname,
              firstname: firstName,
              otheranme: otherName,
              email: email,
              contact_address: contactAddress,
              password: password,
              gender: gender,
              isAdmin: isAdmin
            }
         
            $(".error").remove();

            function validate(){
              if (surname.length < 1) {
                $('#surname').after('<span class="error">This field is required</span>');
              }
              if (firstName.length < 1) {
                $('#first_name').after('<span class="error">This field is required</span>');
              }
              if(otherName.length < 1){
                $('#other_name').after('<span class="error">This field is required</span>');
              }
              if (email.length < 1) {
                $('#email').after('<span class="error">This field is required</span>');
              // } else {
              //   let regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
              //   let validEmail = regEx.test(email);
              //   if (!validEmail) {
              //     $('#email').after('<span class="error">Enter a valid email</span>');
              //   }
              }
              if(contactAddress.length < 1){
                  $('#contact_address').after('<span class="error">This field is required</span>');
              }
              if (password.length < 8) {
                $('#password').after('<span class="error">Password must be at least 8 characters long</span>');
              }
              if(confirmPassword !== password){
                  $('#confirm_password').after('<span class="error">Password Not Matched</span>')
              }  
            }
         validate( $.post('http://localhost:3000/employee', userData))
    });

$.get('http://localhost:3000/employee', function(data){

if (data < 1){
      alert('Hoops no data available')
      
    } else{
  for (let index = 0; index < data.length; index++) {   
    console.log(data[index])
     $('#display-user').append(`<tr>
     <th>${data[index].id}</th>
     <td>${data[index].surname}</td>
     <td>${data[index].firstname}</td> 
     <td>${data[index].gender}</td>
     <td>${data[index].idCardNo}</td>
     <td> ${data[index].level}</td>
     <td><a href="edit.html?id=${data[index].id}" data-toggle="tooltip" title="Update user's records. Please becareful" class="btn btn-warning btn-sm">Edit</a>&nbsp;<a href="viewdetails.html" data-toggle="tooltip" title="View details" class="btn btn-primary btn-sm">View</a>&nbsp;<a href="#" data-toggle="tooltip" title="Pay Salary" class="btn btn-success btn-sm">Pay</a>&nbsp;<a href="modal" data-toggle="tooltip" title="Deactivate user if he/she leaves the company" data-palcement="right" class="btn btn-danger btn-sm">Deactivate</a></td>
     </tr>`);    
  }
}
});

//fetch single data
// $.get("http://localhost:3000/employee", (res) => console.log(resizeTo)
// )
// function getEmployee(){
//   $.get('http://localhost:3000/employee', function(data){
//     for (let index = 0; index < data.length; index++) {  

//     }
//   });
// }
$.urlParam = function(name){
  let result = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return result[1] || 0;
}
let id = $.urlParam('id');


const url = "http://localhost:3000/employee/"
$.get(url + id, function(data){
  // console.log(data);
  // console.log('working');


  
 
//console.log(data[index])
     $('#edit-form').append(`     
     
     <div class="form-group">
                <label for="surname" id="surname">Surname</label>
                <input type="text" class="form-control" id="surname" value="${data.surname}">
            </div>

            <div class="form-group">
                <label for="firstname">First Name</label>
                <input type="text" class="form-control" id="first_name" value="${data.firstname}">
            </div>

            <div class="form-group">
                <label for="othername">Other Name</label>
                <input type="text" class="form-control" id="other_name" value="${data.otheranme}">
            </div>

            <div class="form-group">
                <label for="emailAddress"> Email Address</label>
                <input type="email" class="form-control" id="email" value="${data.email}">
            </div>

            <div class="form-group">
                <label for="contactAddress">Contact Address</label>
                <input type="text" class="form-control" id="contact_address"
                    value="${data.contact_address}">
            </div>

            <div class="form-group">
                <label for="gender">Gender</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios"
                        value="${data.gender}">
                    <label class="form-check-label" for="exampleRadios1">
                        Male
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios"
                        value="Female">
                    <label class="form-check-label" for="exampleRadios2">
                        Female
                    </label>
                </div>
            </div>
            `  
     );    
  
});


  //  login
$('#login-form').submit(function(e){
  e.preventDefault();
  let email = $('#email').val().trim();
  let password = $('#password').val().trim();
  const userData = {        
    email: email,     
    password: password
  }
    $.get('http://localhost:3000/employee', userData, function(data){
      if(data == 1){
        window.location.replace('index.html')
      } else{
        console.log(data)
      }
      return false

    }); 
});

});