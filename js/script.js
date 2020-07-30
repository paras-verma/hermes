document.addEventListener("DOMContentLoaded", function (event) {
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  var mailType; // Cold/Telephonic/LinkedIn
  var mailTypePlaceholder; // "with reference..."
  var mailTo; // Mail Address where the mail will be sent
  // Subject of the mail
  var mailSubject =
    "Placement Season 2020-21: Shaheed Sukhdev College of Business Studies";
  //PoC's Name
  var salutation;
  var mailToName;
  // PoC's colleague in-case a direct contact couldn't be established
  var colleagueSalutation;
  var colleagueName;
  var mailToCompany; //Company Name
  var mailBody; //Mail's Body
  var accountPassword;

  setCapsCheck = function () {
    // Get the input field
    var loginEmail = document.getElementById("loginEmail");

    // Get the warning text
    var CapsLockWarningEmail = document.getElementById("CapsLockWarningEmail");
    // When the user presses any key on the keyboard, run the function
    loginEmail.addEventListener("keyup", function (event) {
      // If "caps lock" is pressed, display the warning text
      if (event.getModifierState("CapsLock")) {
        CapsLockWarningEmail.style.visibility = "visible";
      } else {
        CapsLockWarningEmail.style.visibility = "hidden";
      }
    });

    var loginPassword = document.getElementById("loginPassword");
    var CapsLockWarning = document.getElementById("CapsLockWarning");

    // When the user presses any key on the keyboard, run the function
    loginPassword.addEventListener("keyup", function (event) {
      // If "caps lock" is pressed, display the warning text
      if (event.getModifierState("CapsLock")) {
        CapsLockWarning.style.visibility = "visible";
      } else {
        CapsLockWarning.style.visibility = "hidden";
      }
    });
  };

  // Login Check
  OnLoginSuccess = function () {
    if (localStorage.loginSuccess == "true" || loginSuccess == true) {
      localStorage.setItem("loginSuccess", "true");
      console.log("onlogin loaded");
      document.getElementById("navTabs").classList.remove("m-fadeOut");
      document.getElementById("navTabs").classList.add("m-fadeIn");
      document.getElementById("hermesTitle").classList.remove("my-5");
      document.getElementById("hermesTitle").classList.add("my-3");
      document.getElementById("logOutButton").style.display = "block";
      $ajaxUtils.sendGetRequest(
        "tabContents.html",
        function (inner_HTML) {
          document.querySelector(".card-body").innerHTML = inner_HTML;
          calOrdinal(dd);
          mailDate = dd + ordinal + " " + mm + " " + yyyy + " (Today)";
          document.getElementById("mailDate").placeholder = mailDate;

          const coldForm = document.getElementById("coldMailForm");

          coldForm.addEventListener("submit", (event) => {
            event.preventDefault();
            $("#mailPreview").modal("show");
            sendCold();
          });

          const regularForm = document.getElementById("regularMailForm");

          regularForm.addEventListener("submit", (event) => {
            event.preventDefault();
            $("#mailPreview").modal("show");
            sendRegular();
          });
        },
        false
      );
    } else {
      $ajaxUtils.sendGetRequest(
        "loginPlaceholder.html",
        function (inner_HTML) {
          document.querySelector(".card-body").innerHTML = inner_HTML;

          console.log("Login Unsuccessful!");

          setCapsCheck();
        },
        false
      );
    }
  };
  // Login Check ends here

  // SCRIPT FOR COLD MAIL

  sendCold = function () {
    mailTypePlaceholder = "";
    mailTo = document.getElementById("mailTo_Cold").value;
    salutation = document.getElementById("salutation_Cold").value;
    mailToName = document.getElementById("mailToName_Cold").value;
    mailToName = salutation + " " + mailToName;
    mailToCompany = document.getElementById("mailToCompany_Cold").value;
    CDCPoC = document.getElementById("CDCPoC_Cold").value;

    if (CDCPoC == "CDC PoC") alert("Please enter a PoC");

    //CDC who is sending the mail
    var CDCPoC = {
      name: ["Aarushi Jain", "Anshika Goel", "Arpit Madan"],
      phoneNumber: ["0000000001", "0000000001", "0000000003"],
      mailAddress: ["aarushi@cdc.com", "anshika@cdc.com", "arpit@cdc.com"],
    };

    // CDC PoC Details
    var PoCDetails = document.getElementById("CDCPoC_Cold").value;

    $ajaxUtils.sendGetRequest(
      "templates/newTemplate.html",
      function (mailContent) {
        mailContent = insertProperty(mailContent, "mailToName", mailToName);
        mailContent = insertProperty(
          mailContent,
          "mailTypePlaceholder",
          mailTypePlaceholder
        );
        mailContent = insertProperty(
          mailContent,
          "mailToCompany",
          mailToCompany
        );
        mailContent = insertProperty(
          mailContent,
          "PoCName",
          CDCPoC.name[PoCDetails]
        );
        mailContent = insertProperty(
          mailContent,
          "phoneNumber",
          CDCPoC.phoneNumber[PoCDetails]
        );
        mailContent = insertProperty(
          mailContent,
          "mailAddress",
          CDCPoC.mailAddress[PoCDetails]
        );

        document.querySelector(".modal-body").innerHTML = mailContent;
        mailBody = mailContent;
      },
      false
    );
  };

  verify = function () {
    $("#verificationModal").modal("show");
  };

  //Date at which the mail is to be sent
  var mailDate = new Date();
  var dd = String(mailDate.getDate()).padStart(2, "0");
  var ordinal;

  var mm = String(mailDate.getMonth() + 1);
  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  mm = month[mm - 1];

  var yyyy = mailDate.getFullYear();

  calOrdinal = function (date) {
    switch (date % 10) {
      case 1:
        return (ordinal = "st");
      case 2:
        return (ordinal = "nd");
      case 3:
        return (ordinal = "rd");
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 0:
        return (ordinal = "th");
    }
  };

  console.log(localStorage.loginSuccess);
  console.log(loginSuccess);

  mail_Day = function (mailDay) {
    if (mailDay == "Today") {
      document.getElementById("mailDate").disabled = true;
      calOrdinal(dd);
      mailDate = dd + ordinal + " " + mm + " " + yyyy + " (Today)";
      document.getElementById("mailDate").value = mailDate;
    } else if (mailDay == "Yesterday") {
      document.getElementById("mailDate").disabled = true;
      calOrdinal(dd - 1);
      mailDate = dd - 1 + ordinal + " " + mm + " " + yyyy + " (Yesterday)";
      document.getElementById("mailDate").value = mailDate;
    } else {
      document.getElementById("mailDate").disabled = false;
      document.getElementById("mailDate").value = "";
      document.getElementById("mailDate").placeholder = "Add Date here";
    }
  };

  var showfieldCheck = 0;
  var colleagueDetails =
    '</div> <!-- Other PoC Details --> <div class="form-row mb-3" id="telephonicMail_ColleagueDetails"> <div class="col-xs-2" id="div_salutation_PoC_colleague" > <select class="form-control" id="salutation_PoC_colleague" > <option>Mr.</option> <option>Ms.</option> </select> </div> <div class="col" id="div_name_PoC_colleague" > <div class="input-group"> <div class="input-group-prepend"> <span class="input-group-text" id="name_PoC_colleaguePrepend" > <i class="fas fa-user" aria-hidden="true"></i> </span> </div> <input type="text" class="form-control" id="name_PoC_colleague" placeholder="Colleague&apos;s Name" aria-describedby="inputGroupPrepend2" required /> </div> </div>';
  showfield = function (person) {
    if (person == "else" && showfieldCheck < 1) {
      document
        .getElementById("telephonicMail_OtherPerson")
        .insertAdjacentHTML("afterend", colleagueDetails);
      showfieldCheck++;
      document.getElementById("PoC_colleague").selectedIndex = "2";
    } else {
      console.log(person);
      document.getElementById("telephonicMail_ColleagueDetails").remove();
      showfieldCheck = 0;
    }
  };

  sendRegular = function () {
    // Mail address of PoC
    mailTo = document.getElementById("mailTo_Regular").value;
    // Mr./Ms.
    salutation = document.getElementById("salutation_Regular").value;
    // Name of the PoC
    mailToName = document.getElementById("mailToName_Regular").value;
    mailToName = salutation + " " + mailToName;
    // 'with reference to...'
    mailTypePlaceholder =
      "with reference to the    {{mailType}} conversation I had with    {{colleagueName}}&nbsp;on<b      >&nbsp;{{mailDate}}</b    >";
    // Telephonic/LinkedIn
    if (document.getElementById("mailType").value == "none") {
      alert("Enter a valid type");
    } else mailType = document.getElementById("mailType").value;
    //takled with a colleague?
    var PoC_colleague = document.getElementById("PoC_colleague").value;
    if (PoC_colleague == "same") {
      colleagueName = "you";
      console.log(colleagueName);
    } else {
      colleagueSalutation = document.getElementById("salutation_PoC_colleague")
        .value;
      colleagueName = document.getElementById("name_PoC_colleague").value;
      colleagueName =
        "<b>" + colleagueSalutation + " " + colleagueName + "</b>";
      console.log(colleagueName);
    }
    // Name of the Company
    mailToCompany = document.getElementById("mailToCompany_Regular").value;
    // CDC PoC who's sending the mail
    CDCPoC = document.getElementById("CDCPoC_Regular").value;

    if (CDCPoC == "CDC PoC") alert("Please enter a PoC");

    //CDC who is sending the mail
    var CDCPoC = {
      name: ["Aarushi Jain", "Anshika Goel", "Arpit Madan"],
      phoneNumber: ["0000000001", "0000000001", "0000000003"],
      mailAddress: ["aarushi@cdc.com", "anshika@cdc.com", "arpit@cdc.com"],
    };

    // CDC PoC Details
    var PoCDetails = document.getElementById("CDCPoC_Regular").value;

    $ajaxUtils.sendGetRequest(
      "templates/newTemplate.html",
      function (mailContent) {
        mailContent = insertProperty(mailContent, "mailToName", mailToName);
        mailContent = insertProperty(
          mailContent,
          "mailTypePlaceholder",
          mailTypePlaceholder
        );
        mailContent = insertProperty(mailContent, "mailToName", mailToName);
        mailContent = insertProperty(mailContent, "mailType", mailType);
        mailContent = insertProperty(
          mailContent,
          "colleagueName",
          colleagueName
        );
        mailContent = insertProperty(mailContent, "mailDate", mailDate);
        mailContent = insertProperty(
          mailContent,
          "mailToCompany",
          mailToCompany
        );
        mailContent = insertProperty(
          mailContent,
          "PoCName",
          CDCPoC.name[PoCDetails]
        );
        mailContent = insertProperty(
          mailContent,
          "phoneNumber",
          CDCPoC.phoneNumber[PoCDetails]
        );
        mailContent = insertProperty(
          mailContent,
          "mailAddress",
          CDCPoC.mailAddress[PoCDetails]
        );

        document.querySelector(".modal-body").innerHTML = mailContent;
        mailBody = mailContent;
      },
      false
    );

    // console.log(mailType);
    // console.log(mailTo);
    // console.log(mailToName);
    // console.log(colleagueName);
    // console.log(mailDate);
    // console.log(mailToCompany);
    // console.log(PoCDetails);
  };

  sendMail = function () {
    accountPassword = document.getElementById("accountPassword").value;
    // console.log(accountPassword);
    // console.log(mailTo);
    // console.log(mailSubject);
    // console.log(mailBody);
    Email.send({
      Host: "smtp.gmail.com",
      Username: "paras.19508@sscbs.du.ac.in",
      Password: accountPassword,
      To: mailTo,
      From: "paras.19508@sscbs.du.ac.in",
      Subject: mailSubject,
      Body: mailBody,
    }).then(function (message) {
      if (message == "OK") {
        alert("Mail sent successfully!");
        document.getElementById("coldMailForm").reset();
        document.getElementById("regularMailForm").reset();
      } else {
        alert("Wrong Password");
      }
    });
  };
});
