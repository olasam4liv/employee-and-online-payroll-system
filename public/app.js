// window.onload = function(){
//     alert("Window loaded");
// }
$(document).ready(function(){
  // localStorage.clear("userID")
 let userId = localStorage.getItem("userID");
//  alert(userId)
  //  login 
  function login(){ 
    let email = $('#email').val();
    let password = $('#password').val();  
      $.get("http://localhost:3000/employee", function(userData){
      
      for (let object of userData) {
        
        if (object.email === email && object.password === password && object.isAdmin ===true) {          
          let id = object.id;
          id = parseInt(id);

          localStorage.setItem('userID', id);

           window.location.replace('dashboard.html');
          $('#userID').append(`Welcome:  <span >${userID}</span>`)
          //return;
        } if(object.email === email && object.password === password && object.isAdmin ===false && object.isActive === true){  
          // let id = object.id;
          // id = parseInt(id);

          // localStorage.setItem('userID', id);
           window.location.replace('user-dashboard.html');
           return;
        }
      }
      //  return false
      alert('Invalid email or password')
  
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
            let idCardNo = "";//surname[0] + firstname[0] + id;
            let confirmPassword= $('#confirm_password').val();
            let isActive = true;
            let isAdmin = false;
            let regDate = Date().toString()
        
            
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
              isAdmin: isAdmin,
              regDate:regDate
            }
         
            $(".error").remove();
        
            if (surname.length < 1) {
              $('#surname').after('<span class="error">Please input a valid surname</span>');
              return;
            }
            if (firstName.length < 1) {
              $('#first_name').after('<span class="error">Please input a valid First Name</span>');
              return;
            }
             
            if (email.length < 1) {
              $('#email').after('<span class="error">Please input a valid email</span>');
              return;
              }
            if(contactAddress.length < 1){
                $('#contact_address').after('<span class="error">Please input a valid email</span>');
                return;
            }
            if (password.length < 8) {
              $('#password').after('<span class="error">Password must be at least 8 characters long</span>');
              return;
            }
            if(confirmPassword !== password){
                $('#confirm_password').after('<span class="error">Password Not Matched</span>');
                return;
            } 
                  
         $.post('http://localhost:3000/employee', userData, function(){
           alert('Successfully Registered')          
          });
          //window.location.replace('user-dashboard.html')   
    });

 //  admin  fetch all data 
$.get('http://localhost:3000/employee', function(data){

if (data < 1){
      alert('Hoops no data available')
      
    } else{
      $('#search').append(`<button class="btn  my-2 my-sm-0 btn-success" type="submit">Pay</button>
    <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>`)
  for (let index = 0; index < data.length; index++) {   
    //console.log(data[index])
    
     $('#display-user').append(`<tr>
     <th>${data[index].id}</th>
     <td>${data[index].surname}</td>
     <td>${data[index].firstname}</td> 
     <td>${data[index].gender}</td>
     <td>${data[index].idCardNo}</td>
     <td> ${data[index].level}</td>
     <td>
     <a href="edit.html?id=${data[index].id}" data-toggle="tooltip" title="Update user's records. Please becareful" class="btn btn-warning btn-sm">Edit</a> &nbsp;     
     <a href="viewdetails.html?id=${data[index].id}" data-toggle="tooltip" title="View details" class="btn btn-primary btn-sm">View</a>  &nbsp;
      
     <a href="paysingle.html?id=${data[index].id}"  data-toggle="tooltip"    title="Pay Salary" class="btn btn-success btn-sm">Pay</a> &nbsp;
     <button type="button" class="btn btn-danger btn-sm delete" value="${data[index].id}"  title="Delete Record" >Delete</button>
     </tr>`); 
     $('#amount-modal').append(`<input id="password" type="text" class="form-control" value="${data[index].surname}">  `)

  }

deleteData();
 
}

});

 //delete
 function deleteData(){
 $("button.delete").click( function(e) {
  e.preventDefault()
  const id = $(this).val();
  $.ajax({
    url: `http://localhost:3000/employee/${id}`,
    method: 'DELETE',
    success: function(e) {
      alert("Success");
      location.reload();
    },
    error: function(e) {
      console.log(e);
      
    }
  })
})
}



//admin fetch single data
const getUrl = window.location.href
let urlId = getUrl.split('id=');
let id = parseInt(urlId[1])
// $.urlParam = function(name){
//   let result = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//   return result[1] || 0;
// }
// let id = $.urlParam('id');
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
                <label for="level">Level</label>
                <input type="text" class="form-control" id="level"
                    value="${data.level}">
            </div>

            <div class="form-group">
              <label for="salary">Salary</label>
              <input type="text" class="form-control" id="salary"
                  value="${Number(data.salary)}">
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
               <th scope="row">Last Amoun Received</th>
               <td colspan="3">${data.lastAmountReceived}</td>
             <tr>
             <tr>
               <th scope="row">Salary Status</th>
               <td colspan="3">${data.salary_status}</td>
             </tr>
             <tr>
               <th scope="row">Salary Status</th>
               <td colspan="3">${data.salary_status}</td>
             </tr>
             
                   
   </tbody>`);

   $('#pay-single').append(` <tbody>
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
             <form>
             <tr>
               <th scope="row">Amount to pay</th>
               <td colspan="3"><input type="text">&nbsp; &nbsp; &nbsp;<button class="btn btn-success">Pay</button></td>
             <tr>          
                   
   </tbody>
   
   </form>`);

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
 
   
});




 


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
            let salary = $('#salary').val();;
            let level = $('#level').val();;
            let idCardNo =$('#staff-idno').val();;            
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
            
            
        
 
  $(".error").remove();
//validate()
//$.put(url + id, userData)
$.ajax({
  url:url + id,
  data:userData,
  type:'PUT',
  success: function(){
    alert('Record  Updated')
    
  }
   
});
window.location.replace('view.html')
});

//Update single user

$('#edit-user').submit(function (e) {
  e.preventDefault();
  $.get(url, function(userData){
      
      for (let object of userData) {
        
        if (object.id === userId) {          
          let surname = $('#surname').val();            
          let firstName = $('#first_name').val();
          let otherName = $('#other_name').val();
          let email = $('#email').val();    
          let contactAddress =$('#contact_address').val();
          let password = $('#password').val();
          let gender = $('#exampleRadios').val();
          let salary = $('#salary').val();;
          let level = $('#level').val();;
          let idCardNo =$('#staff-idno').val();;            
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


          $('#edit-user').append(`
          <div class="form-group">
          <label for="surname">Surname</label>
          <input type="text" class="form-control" id="surname" value="${object.surname}">
      </div>
     
      <div class="form-group">
          <label for="firstname">First Name</label>
          <input type="text" class="form-control" id="first_name" value="" >
      </div>
     
      <div class="form-group">
          <label for="othername">Other Name</label>
          <input type="text" class="form-control" id="other_name" value=" ">
      </div>
     
      <div class="form-group">
          <label for="emailAddress"> Email Address</label>
          <input type="email" class="form-control" id="email" value=" ">
      </div>
      <div class="form-group">
          <label for="dateOfBirth"> Date of Birth</label>
          <input type="text" class="form-control" id="dob" value=" ">
      </div>
     
      <div class="form-group">
          <label for="contactAddress">Contact Address</label>
          <input type="text" class="form-control" id="contact_address"
              placeholder="Please input your contact address">
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
          `)
//  return false
            $.ajax({
        url:url + id,
        data:userData,
        type:'PUT',
        success: function(){
          alert('Record  Updated')
          
        }
         
      });
      window.location.replace('view.html')
        } 
      }
      
    
  
      }); 
  


  
})

//view single user
$.get(url, function(userData){
//console.log(userData)
//userData.filter(function(data){ return data.firstname})
for (let index = 0; index < userData.length; index++) {
}
for(let obj of userData){
 console.log(obj.surname)
  if (obj.id === userId) {
//console.log(userData[index].firstname)
  $('#user-details').append(` <tbody>
     <tr>
       <th scope="row">Staff ID No:</th>
       <td colspan="3">${obj.idCardNo}</td>
     </tr>
     <tr>
       <th scope="row">Suname:</th>
       <td colspan="3">${obj.surname}</td>
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

  }
}
  
})

});