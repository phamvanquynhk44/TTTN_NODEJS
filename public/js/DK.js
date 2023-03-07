// Đây là thanh kéo lên trên 
// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}





            /* VALIDATE FORM
             * 1. Username không được trống, tối thiểu 5 ký tự, ko chứa ký tự đặc biệt
             * 2. Mật khẩu không được trống, tối thiểu 8 ký tự
             * 3. Mật khẩu nhập lại phải trùng
             * 4. Phone phải là những con số và 10 ký tự
             * 5. Email phải đúng định dạng, va bat buoc nhap
             */

            // Lấy giá trị của một input
            function getValue(id){
              return document.getElementById(id).value.trim();
          }

          // Hiển thị lỗi
          function showError(key, mess){
              document.getElementById(key + '_error').innerHTML = mess;
          }

          function validate()
          {
              var flag = true;
              // 3. Phone
              var phone = getValue('phone');
              if (phone != '' &&  !/^[0-9]{10}$/.test(phone)){
                  flag = false;
                  showError('phone', 'Vui lòng kiểm tra lại số điện thoại phải là những con số và 10 ký tự');
              }
              return flag;
          }




          var myInput = document.getElementById("psw");
          var letter = document.getElementById("letter");
          var capital = document.getElementById("capital");
          var number = document.getElementById("number");
          var length = document.getElementById("length");
          
          // When the user clicks on the password field, show the message box
          myInput.onfocus = function() {
            document.getElementById("message").style.display = "block";
          }
          
          // When the user clicks outside of the password field, hide the message box
          myInput.onblur = function() {
            document.getElementById("message").style.display = "none";
          }
          
          // When the user starts to type something inside the password field
          myInput.onkeyup = function() {
            // Validate lowercase letters
            var lowerCaseLetters = /[a-z]/g;
            if(myInput.value.match(lowerCaseLetters)) {  
              letter.classList.remove("invalid");
              letter.classList.add("valid");
            } else {
              letter.classList.remove("valid");
              letter.classList.add("invalid");
            }
            
            // Validate capital letters
            var upperCaseLetters = /[A-Z]/g;
            if(myInput.value.match(upperCaseLetters)) {  
              capital.classList.remove("invalid");
              capital.classList.add("valid");
            } else {
              capital.classList.remove("valid");
              capital.classList.add("invalid");
            }
          
            // Validate numbers
            var numbers = /[0-9]/g;
            if(myInput.value.match(numbers)) {  
              number.classList.remove("invalid");
              number.classList.add("valid");
            } else {
              number.classList.remove("valid");
              number.classList.add("invalid");
            }
            
            // Validate length
            if(myInput.value.length >= 8) {
              length.classList.remove("invalid");
              length.classList.add("valid");
            } else {
              length.classList.remove("valid");
              length.classList.add("invalid");
            }
          }



          //
          function myFunction() {
            var x = document.getElementById("psw");
            if (x.type === "password") {
              x.type = "text";
            } else {
              x.type = "password";
            }
          }