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
      "templates/template.html",
      function (mailBody) {
        mailBody = insertProperty(mailBody, "mailToName", mailToName);
        mailBody = insertProperty(
          mailBody,
          "mailTypePlaceholder",
          mailTypePlaceholder
        );
        mailBody = insertProperty(mailBody, "mailToCompany", mailToCompany);
        mailBody = insertProperty(mailBody, "PoCName", CDCPoC.name[PoCDetails]);
        mailBody = insertProperty(
          mailBody,
          "phoneNumber",
          CDCPoC.phoneNumber[PoCDetails]
        );
        mailBody = insertProperty(
          mailBody,
          "mailAddress",
          CDCPoC.mailAddress[PoCDetails]
        );
        // console.log(mailBody);
        Email.send({
          SecureToken: "7fd55f50-95f2-46c5-8a0d-5cc768b3559b",
          To: mailTo,
          From: "paras.19508@sscbs.du.ac.in",
          Subject: mailSubject,
          Body: mailBody,
        }).then(function (message) {
          alert("mail sent succesfully!");
          document.getElementById("coldMailForm").reset();
        });
      },
      false
    );
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
  // console.log(localStorage.loginSuccess);
  console.log(loginSuccess);

  OnLoginSuccess = function () {
    if (localStorage.loginSuccess == "true" || loginSuccess == true) {
      localStorage.setItem("loginSuccess", "true");
      document.getElementById("navTabs").classList.remove("m-fadeOut");
      document.getElementById("navTabs").classList.add("m-fadeIn");
      document.getElementById("hermesTitle").classList.remove("my-5");
      document.getElementById("hermesTitle").classList.add("my-3");
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("logOutButton").style.display = "block";
      console.log("success");
      $ajaxUtils.sendGetRequest(
        "tabContents.html",
        function (inner_HTML) {
          document.querySelector('.card-body').innerHTML = inner_HTML;
        },
        false
      );
      calOrdinal(dd);
      mailDate = dd + ordinal + " " + mm + " " + yyyy + " (Today)";
      // document.getElementById("mailDate").placeholder = mailDate;
    }
  };

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

  var check = 0;
  var colleagueDetails =
    '</div> <!-- Other PoC Details --> <div class="form-row mb-3" id="telephonicMail_ColleagueDetails"> <div class="col-xs-2" id="div_salutation_PoC_colleague" > <select class="form-control" id="salutation_PoC_colleague" > <option>Mr.</option> <option>Ms.</option> </select> </div> <div class="col" id="div_name_PoC_colleague" > <div class="input-group"> <div class="input-group-prepend"> <span class="input-group-text" id="name_PoC_colleaguePrepend" > <i class="fas fa-user" aria-hidden="true"></i> </span> </div> <input type="text" class="form-control" id="name_PoC_colleague" placeholder="Colleague&apos;s Name" aria-describedby="inputGroupPrepend2" required /> </div> </div>';
  showfield = function (person) {
    if (person == "else" && check < 1) {
      document
        .getElementById("telephonicMail_OtherPerson")
        .insertAdjacentHTML("afterend", colleagueDetails);
      check++;
      document.getElementById("PoC_colleague").selectedIndex = "2";
    } else {
      console.log(person);
      document.getElementById("telephonicMail_ColleagueDetails").remove();
      check = 0;
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
      "templates/template.html",
      function (mailBody) {
        mailBody = insertProperty(mailBody, "mailToName", mailToName);
        mailBody = insertProperty(
          mailBody,
          "mailTypePlaceholder",
          mailTypePlaceholder
        );
        mailBody = insertProperty(mailBody, "mailToName", mailToName);
        mailBody = insertProperty(mailBody, "mailType", mailType);
        mailBody = insertProperty(mailBody, "colleagueName", colleagueName);
        mailBody = insertProperty(mailBody, "mailDate", mailDate);
        mailBody = insertProperty(mailBody, "mailToCompany", mailToCompany);
        mailBody = insertProperty(mailBody, "PoCName", CDCPoC.name[PoCDetails]);
        mailBody = insertProperty(
          mailBody,
          "phoneNumber",
          CDCPoC.phoneNumber[PoCDetails]
        );
        mailBody = insertProperty(
          mailBody,
          "mailAddress",
          CDCPoC.mailAddress[PoCDetails]
        );
        // console.log(mailBody);
        Email.send({
          SecureToken: "7fd55f50-95f2-46c5-8a0d-5cc768b3559b",
          To: mailTo,
          From: "paras.19508@sscbs.du.ac.in",
          Subject: mailSubject,
          Body: mailBody,
        }).then(function (message) {
          alert("mail sent succesfully!");
          document.getElementById("regularMailForm").reset();
        });
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
  var text = document.getElementById("CapsLockWarning");

  // When the user presses any key on the keyboard, run the function
  loginPassword.addEventListener("keyup", function (event) {
    // If "caps lock" is pressed, display the warning text
    if (event.getModifierState("CapsLock")) {
      text.style.visibility = "visible";
    } else {
      text.style.visibility = "hidden";
    }
  });
});
