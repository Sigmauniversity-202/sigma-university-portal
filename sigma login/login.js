// =====================================================
// SIGMA UNIVERSITY LOGIN JAVASCRIPT
// =====================================================


// =====================================================
// USER TYPE
// =====================================================

const student =
    document.getElementById("student");

const staff =
    document.getElementById("staff");

const username =
    document.getElementById("username");

let userType = "student";


// Student button

student.addEventListener("click", function () {

    userType = "student";

    student.classList.add("active");

    staff.classList.remove("active");

    username.placeholder =
        "Enter your enrollment or application no.";

});


// Staff button

staff.addEventListener("click", function () {

    userType = "staff";

    staff.classList.add("active");

    student.classList.remove("active");

    username.placeholder =
        "Enter your staff ID or email";

});



// =====================================================
// PASSWORD SHOW / HIDE
// =====================================================

const password =
    document.getElementById("password");

const showPassword =
    document.getElementById("showPassword");

const eye =
    document.getElementById("eye");


showPassword.addEventListener("click", function () {


    if (password.type === "password") {

        password.type = "text";

        eye.textContent = "🙈";

        showPassword.setAttribute(
            "aria-label",
            "Hide password"
        );

    }

    else {

        password.type = "password";

        eye.textContent = "👁";

        showPassword.setAttribute(
            "aria-label",
            "Show password"
        );

    }

});



// =====================================================
// REMEMBER USERNAME
// =====================================================

const remember =
    document.getElementById("remember");


const savedUsername =
    localStorage.getItem(
        "sigmaUsername"
    );


if (savedUsername) {

    username.value =
        savedUsername;

    remember.checked = true;

}



// =====================================================
// LOGIN FORM
// =====================================================

const loginForm =
    document.getElementById("loginForm");


const signIn =
    document.getElementById("signIn");


const signText =
    document.getElementById("signText");


loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const user =
            username.value.trim();


        const pass =
            password.value.trim();


        // Username validation

        if (user === "") {

            alert(
                "Please enter your username."
            );

            username.focus();

            return;

        }


        // Password validation

        if (pass === "") {

            alert(
                "Please enter your password."
            );

            password.focus();

            return;

        }


        // Save username

        if (remember.checked) {

            localStorage.setItem(
                "sigmaUsername",
                user
            );

        }

        else {

            localStorage.removeItem(
                "sigmaUsername"
            );

        }


        // Loading

        signIn.disabled = true;

        signText.textContent =
            "Signing in...";


        // Demo login

        setTimeout(function () {

            signIn.disabled = false;

            signText.textContent =
                "Sign In";


            alert(
                "Login submitted successfully!\n\n" +
                "User Type: " +
                userType +
                "\nUsername: " +
                user
            );


        }, 1200);

    }
);



// =====================================================
// FORGOT PASSWORD
// =====================================================

const forgot =
    document.getElementById("forgot");


forgot.addEventListener(
    "click",
    function (event) {

        event.preventDefault();


        const email =
            prompt(
                "Enter your registered email address:"
            );


        if (!email) {

            return;

        }


        alert(
            "Password reset request submitted for:\n\n" +
            email
        );

    }
);



// =====================================================
// GOOGLE LOGIN
// =====================================================

const google =
    document.getElementById("google");


google.addEventListener(
    "click",
    function () {

        alert(
            "Google Sign-In will be connected here."
        );

    }
);



// =====================================================
// CAMPUS SLIDESHOW
// =====================================================

const slides =
    document.querySelectorAll(".slide");


const dots =
    document.querySelectorAll(".dot");


let currentSlide = 0;

let slideshowTimer;



// =====================================================
// SHOW SLIDE
// =====================================================

function showSlide(index) {


    // Remove active from all images

    slides.forEach(
        function (slide) {

            slide.classList.remove(
                "active"
            );

        }
    );


    // Remove active from all dots

    dots.forEach(
        function (dot) {

            dot.classList.remove(
                "active"
            );

        }
    );


    // Add active

    slides[index].classList.add(
        "active"
    );


    dots[index].classList.add(
        "active"
    );


    currentSlide = index;

}



// =====================================================
// NEXT SLIDE
// =====================================================

function nextSlide() {


    let next =
        currentSlide + 1;


    if (next >= slides.length) {

        next = 0;

    }


    showSlide(next);

}



// =====================================================
// START SLIDESHOW
// =====================================================

function startSlideshow() {


    slideshowTimer =
        setInterval(
            nextSlide,
            5000
        );

}



// =====================================================
// STOP / RESTART SLIDESHOW
// =====================================================

function restartSlideshow() {


    clearInterval(
        slideshowTimer
    );


    startSlideshow();

}



// =====================================================
// DOT CLICK
// =====================================================

dots.forEach(
    function (dot, index) {


        dot.addEventListener(
            "click",
            function () {


                showSlide(index);


                restartSlideshow();


            }
        );


    }
);



// =====================================================
// START
// =====================================================

showSlide(0);

startSlideshow();