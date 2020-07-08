document.addEventListener("DOMContentLoaded", function (event) {
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  sendMail = function () {
    // Mail Address where the mail will be sent
    var mailTo = document.getElementById("mailTo").value;

    // Subject of the mail
    var mailSubject =
      "Placement Season 2020-21: Shaheed Sukhdev College of Business Studies";

    // PoC's Name for Respected Mr. Jhon
    var mailToName = document.getElementById("mailToName").value;

    //Was the same person contacted or contacted someone else
    var personContacted = document.getElementById("personContacted").value;
    var mailToPerson;
    if (personContacted == "Same") {
      mailToPerson = "you";
    } else if (personContacted == "Other") {
      mailToPerson = document.getElementById("otherPersonContacted").value;
    }

    //Date at which the mail was sent
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

    //Name of the company
    var mailToCompany = document.getElementById("mailToCompany").value;

    //CDC who is sending the mail
    var CDCPoC = {
      name: ["Paras", "Samarth"],
      phoneNumber: ["8920060267", "123456"],
      mailAddress: ["connect.parasverma@gmail.com", "samarth@cdc.com"],
    };

    var PoCDetails = document.getElementById("CDCPoC").value;

    var mailBody;

    var pageUrl = "templates/template.html";

    // console.log(mailToName);
    // console.log(mailToPerson);
    // console.log(mailDate);
    // console.log(mailToCompany);
    // console.log(CDCPoC.name[PoCDetails]);
    // console.log(CDCPoC.phoneNumber[PoCDetails]);
    // console.log(CDCPoC.mailAddress[PoCDetails]);

    $ajaxUtils.sendGetRequest(
      pageUrl,
      function (mailBody) {
        mailBody = insertProperty(mailBody, "mailToName", mailToName);
        mailBody = insertProperty(mailBody, "mailToPerson", mailToPerson);
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
          SecureToken: "8cb5e24c-ade0-493e-94c6-95ffe85c09ce",
          To: mailTo,
          From: "gaurav.19537@sscbs.du.ac.in",
          Subject: mailSubject,
          Body: mailBody,
        }).then((message) => alert("mail sent succesfully!"));
      },
      false
    );
  };
});
