// Focus function for input
_focus = function(elem) {
    var _this = $(elem);
    _this.siblings('.placeholder').addClass('focus');
    _this.siblings('.bottom-liner').addClass('lined');
    _this.siblings('.highlight').addClass('light');
};

// Blur function for input
_blur = function(elem) {
    var _this = $(elem);

    // Reset hightlight for input
    _this.siblings('.highlight').addClass('no-light');
    setTimeout(function() {
        _this.siblings('.highlight').removeClass('no-light');
        _this.siblings('.highlight').removeClass('light');
    }, 200);

    // If input is empty return to normal
    if (_this.val() == 0) {
        _this.siblings('.placeholder').removeClass('focus');
        _this.siblings('.bottom-liner').removeClass('lined');
    }
};

$(function() {
    // input On focus
    $('.material-input').on('focus', function() {
        _focus(this);
        $(this).select();
    });

    // input On blur
    $('.material-input').on('blur', function() {
        _blur(this);
    });

    // Enter fake credentials and show button
    $('input#password').on('keyup', function() {
        if (!$('#username').val() <= 0) {
            if ($('input#password').val().length >= 5) {
                $('.btn-custom').removeClass("not-visible");
            }
        }
        if ($('input#password').val().length <= 5) {
            $('.btn-custom').addClass("not-visible");
        }
    });

});

//Submit on press 'Enter'

$("#loginForm input").on('keyup', function (e) {
    if (e.keyCode == 13) {
        validateLogin();
    }
});

$("#registerForm input").on('keyup', function (e) {
    if (e.keyCode == 13) {
        validateRegister();
    }
});


// Validation functions

function validateLogin(){
    var username = document.forms["loginForm"]["username"].value;
    var password = document.forms["loginForm"]["password"].value;
    document.getElementById("username-login").innerHTML = "";
    document.getElementById("password-login").innerHTML = "";

    if (username == "" && password == ""){
        document.getElementById("username-login").innerHTML = 'No puede estar vacío';
        document.getElementById("password-login").innerHTML = 'No puede estar vacío';
    }else if (username == "") {
        document.getElementById("username-login").innerHTML = 'No puede estar vacío';
    }else if (password == ""){
        document.getElementById("password-login").innerHTML = 'No puede estar vacío';
    }else{
        $('#loginForm').submit();
    }
}

function validateRegister(){
    var username = document.forms["registerForm"]["username"].value;
    var email = document.forms["registerForm"]["email"].value;
    var password = document.forms["registerForm"]["password"].value;
    var confirmPassword = document.forms["registerForm"]["confirmPassword"].value;
    document.getElementById("username-register").innerHTML = "";
    document.getElementById("email-register").innerHTML = "";
    document.getElementById("password-register").innerHTML = "";
    document.getElementById("confirmPassword-register").innerHTML = "";
    var reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    valid = true;
    validation = {};

    if (username == ""){
        validation['username'] = 'No puede estar vacío';
    }
    if (email == "" ){
        validation['email'] = 'No puede estar vacío';
    }else if (!reEmail.test(email)){
        validation['email'] = 'Introduce un email válido';
    }
    if (password == ""){
        validation['password'] = 'No puede estar vacío';
    }
    if (confirmPassword == ""){
        validation['confirmPassword'] = 'No puede estar vacío';
    }
    if (password != "" && confirmPassword != "" && password != confirmPassword){
        validation['confirmPassword'] = 'Las contraseñas introducias no coinciden';
    }
    if (Object.keys(validation).length==0){
        $('#registerForm').submit();
    }else{
        for (v in validation){
             document.getElementById(v+"-register").innerHTML = validation[v];
        }
    }
}