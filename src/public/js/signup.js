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
function validateSignupForm(){
    const memberNick = $(".member-nick").val()
    const memberPhone = $(".member-phone").val()
    const memberPassword = $(".member-password").val()
    const confirmPassword = $(".confirm-password").val()
    console.log(memberNick, memberPhone, memberPassword, confirmPassword);

    if(
        memberNick == "" || 
        memberPhone == "" ||
        memberPassword == '' ||
        confirmPassword == ''
    ) alert("Please insert all required fields")

    if(memberPassword !== confirmPassword){
        alert("Repeat Password field doesn't match your password")
        return false
    }
    const memberImage = $(".member-image").get(0).files[0]
    ? $(".member-image").get(0).files[0].name
    : null;

    if(!memberImage) {
        alert("Please insert restaurant image")
        return false
    }
}