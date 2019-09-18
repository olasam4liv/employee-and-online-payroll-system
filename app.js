// window.onload = function(){
//     alert("Window loaded");
// }
$(document).ready(function(){
    
  //  login 
  function login(){
    let email = $('#email').val();
    let password = $('#password').val();  
      $.get("http://localhost:3000/employee", function(userData){
      
      for (let object of userData) {
        if (object.email === email && object.password === password && object.isAdmin ===true) {          
          localStorage.setItem('email', object.email)
          window.location.replace('dashboard.html');
        } if(object.email === email && object.password === password && object.isAdmin ===false && object.isActive === true){
          localStorage.setItem('email', object.email)
           window.location.replace('user-dashboard.html');
        }else{
          console.log('Invalid email or password')
        }
      }
      //  return false
  
      }); 
  }
  $('#login-form').click(function(e){
    e.preventDefault();  
    login()
  }); 

  //logout
  $('.logout').click(function() {
    //clear the localstorage and redirect to signup page
    localStorage.clear();
    //$('.checkLogin').html('Kindly login');
    window.location.assign('sign-in.html');
  });

   
 //validate 



  //create
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
            let salary = 0;
            let level = "";
            let idCardNo ='Processing';
            let confirmPassword= $('#confirm_password').val();
            let isActive = true;
            let isAdmin = false;
        
            
            const userData = {
              surname: surname,
              firstname: firstName,
              otheranme: otherName,
              email: email,
              contact_address: contactAddress,
              password: password,
              gender: gender,
              salary: salary,
              level: level,
              idCardNo:idCardNo ,
              isActive:isActive,
              isAdmin: isAdmin
            }
         
            $(".error").remove();
        
            if (surname.length < 1) {
              $('#surname').after('<span class="error">Please input a valid surname</span>');
            }
            if (firstName.length < 1) {
              $('#first_name').after('<span class="error">Please input a valid First Name</span>');
            }
             
            if (email.length < 1) {
              $('#email').after('<span class="error">Please input a valid email</span>');
                        }
            if(contactAddress.length < 1){
                $('#contact_address').after('<span class="error">Please input a valid email</span>');
            }
            if (password.length < 8) {
              $('#password').after('<span class="error">Password must be at least 8 characters long</span>');
            }
            if(confirmPassword !== password){
                $('#confirm_password').after('<span class="error">Password Not Matched</span>')
            } 
                  
         $.post('http://localhost:3000/employee', userData)
         login();
        //  return login()
    });

 //   fetch all data 
$.get('http://localhost:3000/employee', function(data){

if (data < 1){
      alert('Hoops no data available')
      
    } else{
  for (let index = 0; index < data.length; index++) {   
    //console.log(data[index])
     $('#display-user').append(`<tr>
     <th>${data[index].id}</th>
     <td>${data[index].surname}</td>
     <td>${data[index].firstname}</td> 
     <td>${data[index].gender}</td>
     <td>${data[index].idCardNo}</td>
     <td> ${data[index].level}</td>
     <td><a href="edit.html?id=${data[index].id}" data-toggle="tooltip" title="Update user's records. Please becareful" class="btn btn-warning btn-sm">Edit</a>&nbsp;<a href="viewdetails.html?id=${data[index].id}" data-toggle="tooltip" title="View details" class="btn btn-primary btn-sm">View</a>&nbsp;<a href="exampleModal?id=${data[index].id}" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"  title="Pay Salary" class="btn btn-success btn-sm">Pay</a>&nbsp;<a href="viewdetails.html?id=${data[index].id}" data-toggle="tooltip" title="Deactivate user if he/she leaves the company" data-palcement="right" class="btn btn-danger btn-sm">Deactivate</a></td>
     </tr>`);    
  }

}

});

//fetch single data
$.urlParam = function(name){
  let result = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return result[1] || 0;
}
let id = $.urlParam('id');
const url = "http://localhost:3000/employee/";
$.get(url + id, function(data){ 
     $('#edit-form').append(`
     <div class="form-group">
     <label for="staff-idno">Staff ID Number</label>
     <input type="text" class="form-control" id="staff-idno"   value="${data.idCardNo}">
 </div>     
     <div class="form-group">
                <label for="surname" >Surname</label>
                <input type="text" class="form-control" id="surname" disabled value="${data.surname}">
      </div>

            <div class="form-group">
                <label for="firstname">First Name</label>
                <input type="text" class="form-control" id="first_name" disabled value="${data.firstname}">
            </div>

            <div class="form-group">
                <label for="othername">Other Name</label>
                <input type="text" class="form-control" id="other_name" disabled value="${data.otheranme}">
            </div>

            <div class="form-group">
                <label for="emailAddress"> Email Address</label>
                <input type="email" class="form-control" id="email" disabled value="${data.email}">
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
            <button type="submit" class="btn btn-primary">Update</button>
            `   
     ); 
     
     $('#view-details').append(` <tbody>
     <tr>
       <th scope="row">Staff ID No:</th>
       <td colspan="3">${data.idCardNo}</td>
     </tr>
     <tr>
       <th scope="row">Suname:</th>
       <td colspan="3">${data.surname}</td>
     </tr>
     <tr>
       <th scope="row">First Name</th>
       <td colspan="3">${data.firstname}</td>
     </tr>
     <tr>
       <th scope="row">Other Name</th>
       <td colspan="3">${data.otheranme}</td>                             
     </tr>
       <tr>
           <th scope="row">Date of Birth:</th>
           <td colspan="3">${data.dob}</td>
       </tr>
       <tr>
           <th scope="row">Email</th>
           <td colspan="3">${data.email}</td>
         </tr>
         <tr>
           <th scope="row">Address</th>
           <td colspan="3">${data.contact_address}</td>
         </tr>
         <tr>
           <th scope="row">Gender</th>
           <td colspan="3">${data.gender}</td>                             
         </tr>
         <tr>
               <th scope="row">Level:</th>
               <td colspan="3">${data.level}</td>
          </tr>
         <tr>
               <th scope="row">Salary Amount:</th>
               <td colspan="3">&#8358 ${data.salary}</td>
          </tr>
             <tr>
               <th scope="row">Salary Status</th>
               <td colspan="3">${data.salary_status}</td>
             </tr>
             <tr>
               <th scope="row">Account Status</th>
               <td colspan="3">${data.isActive}</td>
             <tr>
                   
   </tbody>`);

   $('list-group').append(`
   <a class="list-group-item list-group-item-action active" id="home"  
   href="dashboard.html" role="tab" aria-controls="home">Home</a>
<a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
   href="dashboard.html" role="tab" aria-controls="profile">Profile</a>
<a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
   href="" role="tab" aria-controls="messages">Update</a>
<a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list"
   href="#list-settings" role="tab" aria-controls="settings">Settings</a>
   `);
     
   $('#user-name').append(`<p >Hello [username]</p>`);
});

//delete




//Update
$('#edit-form').submit(function(e) {
  e.preventDefault();

            let surname = $('#surname').val();            
            let firstName = $('#first_name').val();
            let otherName = $('#other_name').val();
            let email = $('#email').val();    
            let contactAddress =$('#contact_address').val();
            let password = $('#password').val();
            let gender = $('#exampleRadios').val();
            let salary = 0;
            let level = "";
            let idCardNo ='Processing';            
            let isActive = true;
            let isAdmin = false;
        
            
            const userData = {
              surname: surname,
              firstname: firstName,
              otheranme: otherName,
              email: email,
              contact_address: contactAddress,
              password: password,
              gender: gender,
              salary: salary,
              level: level,
              idCardNo:idCardNo,
              isActive:isActive,
              isAdmin: isAdmin
            }
         
            $(".error").remove();
        
            if (surname.length < 1) {
              $('#surname').after('<span class="error">Please input a valid surname</span>');
            }
            if (firstName.length < 1) {
              $('#first_name').after('<span class="error">Please input a valid First Name</span>');
            }
             
            if (email.length < 1) {
              $('#email').after('<span class="error">Please input a valid email</span>');
                        }
            if(contactAddress.length < 1){
                $('#contact_address').after('<span class="error">Please input a valid email</span>');
            }
            
            
        
console.log(url + id)
  $(".error").remove();
//validate()
//$.put(url + id, userData)
$.ajax({
  url:url + id,
  data:userData,
  type:'PUT',
  success: function(result){
    console.log('updated')
  }
});

});







});