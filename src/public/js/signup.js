console.log("Signup frontend javascript file");


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
  };