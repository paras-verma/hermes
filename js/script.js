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
        }).then(function(message) {
          
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

  switch (dd % 10) {
    case 1:
      ordinal = "st";
      break;
    case 2:
      ordinal = "nd";
      break;
    case 3:
      ordinal = "rd";
      break;
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 0:
      ordinal = "th";
      break;
  }

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

  mailDate = dd + ordinal + " " + mm + " " + yyyy + " (Today)";
  document.getElementById("mailDate").placeholder = mailDate;

  mail_Day = function (mailDay) {
    if (mailDay == "Today") {
      document.getElementById("mailDate").disabled = true;
      mailDate = dd + ordinal + " " + mm + " " + yyyy + " (Today)";
      document.getElementById("mailDate").value = mailDate;
    } else if (mailDay == "Yesterday") {
      document.getElementById("mailDate").disabled = true;
      mailDate = dd - 1 + ordinal + " " + mm + " " + yyyy + " (Yesterday)";
      document.getElementById("mailDate").value = mailDate;
    } else {
      document.getElementById("mailDate").disabled = false;
      document.getElementById("mailDate").value = "";
      document.getElementById("mailDate").placeholder = "Add Date here";
    }
  };

  var check = 0;
  showfield = function (person) {
    if (person == "else" && check < 1) {
      document.getElementById("telephonicMail_OtherPerson").innerHTML +=
        '          <div class="col-xs-2" id="div_salutation_PoC_colleague">                  <div class="form-group">                    <select class="form-control" id="salutation_PoC_colleague">                      <option>Mr.</option>                      <option>Ms.</option>                    </select>                  </div>                </div>                <div class="col" id="div_name_PoC_colleague">                  <div class="input-group">                    <div class="input-group-prepend">                      <span class="input-group-text" id="name_PoC_colleaguePrepend">                        <i class="fas fa-user"></i>                      </span>                    </div>                    <input                      type="text"                      class="form-control"                      id="name_PoC_colleague"                      placeholder="Name of the PoC"                      aria-describedby="inputGroupPrepend2"                      required                    />                  </div>                </div>            ';
      check++;
      document.getElementById("PoC_colleague").selectedIndex = "2";
    } else {
      console.log(person);
      document.getElementById("div_salutation_PoC_colleague").remove();
      document.getElementById("div_name_PoC_colleague").remove();
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
      "/templates/template.html",
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
        }).then(function(message) {
          
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
});
