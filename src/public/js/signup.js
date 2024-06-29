console.log("Signup frontend javascript file");


$(function () {
    const fileTarget = $(".file-box .upload-hidden");
  
    let fileName;
  
    fileTarget.on("change", function () {
      if (window.FileReader) {
        const uploadFile = $(this)[0].files[0];
        const fileType = uploadFile["type"];
        const validationType = ["image/jpg", "image/jpeg", "image/png"];
  
        if (!validationType.includes(fileType)) {
          alert("Only image/jpg, image/jpeg, image/png");
        } else {
          if (uploadFile) {
            console.log(URL.createObjectURL(uploadFile));
            $(".upload-img-frame")
              .attr("src", URL.createObjectURL(uploadFile))
              .addClass("success");
          }
          fileName = $(this)[0].files[0].name;
        }
  
        $(this).siblings(".upload-name").val(fileName);
      }
    });
  });

const validateSignupForm = () => {
    const memberNick = $(".member-nick").val();
    const memberPhone = $(".member-phone").val();
    const memberPassword = $(".member-password").val();
    const confirmPassword = $(".confirm-password").val();
  
    if (
      memberNick === "" ||
      memberPassword === "" ||
      confirmPassword === "" ||
      memberPhone === ""
    ) {
      alert("Please insert all required inputs!");
      return false;
    }
  
    if (memberPassword !== confirmPassword) {
      alert("The password is different,  please check!");
      return false;
    }

    const memberImage = $(".member-image").get(0).files[0]
    ? $(".member-image").get(0).files[0].name
    : null;

    if(!memberImage) {
        alert("Please insert restaurant image")
        return false
    }
  };

