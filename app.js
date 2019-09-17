window.onload = function(){
    //alert("Window loaded")
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



});