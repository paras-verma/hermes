var loginSuccess;
document.addEventListener("DOMContentLoaded", function (event) {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBWQjaW053LmAc7qhGcKtXekvIUMPY8Nu0",
    authDomain: "hermes-89444.firebaseapp.com",
    databaseURL: "https://hermes-89444.firebaseio.com",
    projectId: "hermes-89444",
    storageBucket: "hermes-89444.appspot.com",
    messagingSenderId: "208450031848",
    appId: "1:208450031848:web:d0dc2e1a1edf950b79795d",
    measurementId: "G-E5HNT0YVLS",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  logOut = function () {
    console.log(loginSuccess);
    firebase.auth().signOut();
    loginSuccess = false;
    localStorage.setItem("loginSuccess", "false");
    console.log(loginSuccess);
    console.log(localStorage.loginSuccess);
    document.getElementById("navTabs").classList.remove("m-fadeIn");
    document.getElementById("navTabs").classList.add("m-fadeOut");
    document.getElementById("hermesTitle").classList.add("my-5");
    document.getElementById("loginForm").style.display = "";
    document.getElementById("sendMailTabs").style.display = "none";
    document.getElementById("logOutButton").style.display = "none";
  };

  login = function () {
    //DOM Elements
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(loginEmail, loginPassword);

    loginCheck = function () {
      loginSuccess = true;
      localStorage.setItem("loginSuccess", "true");
      document.getElementById("navTabs").classList.remove("m-fadeOut");
      document.getElementById("navTabs").classList.add("m-fadeIn");
      document.getElementById("hermesTitle").classList.remove("my-5");
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("sendMailTabs").style.display = "block";
      document.getElementById("logOutButton").style.display = "block";
    };

    promise
      .then(function (user) {
        loginCheck();
        console.log("success");
        loginSuccess = true;
      })
      .catch(function (error) {
        console.log(error);
        if (error.code == "auth/invalid-email") {
          document.getElementById("loginFail").innerHTML = " Invalid Email";
          document.getElementById("loginFail").style.visibility = "visible";
        } else if (error.code == "auth/wrong-password") {
          document.getElementById("loginFail").innerHTML = "Invaild Password";
          document.getElementById("loginFail").style.visibility = "visible";
        } else if (error.code == "auth/user-not-found") {
          document.getElementById("loginFail").innerHTML = "User doesn't exist";
          document.getElementById("loginFail").style.visibility = "visible";
        } else if (error.code == "auth/too-many-requests") {
          document.getElementById("card-body").innerHTML =
            "Too many requests. Try again later";
        }
      });
    // firebase.auth().onAuthStateChanged((firebaseUser) => {
    //   if (firebase.code == "auth/invalid-email") {
    //     document.getElementById("loginFail").style.visibility = "visible";
    //     console.log("END");
    //   } else if (firebaseUser.email == "paras") {
    //     console.log(firebaseUser);
    //     loginSuccess = true;
    //     document.getElementById("navTabs").classList.remove("m-fadeOut");
    //     document.getElementById("navTabs").classList.add("m-fadeIn");
    //     document.getElementById("hermesTitle").classList.remove("py-5");
    //     document.getElementById("loginForm").style.display = "none";
    //     document.getElementById("sendMailTabs").style.display = "block";
    //   }
    // });
  };

  hideFail = function () {
    document.getElementById("loginFail").style.visibility = "hidden";
  };
});
