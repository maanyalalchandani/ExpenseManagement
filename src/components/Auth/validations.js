export const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };
  
  export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // export const validatePhoneNumber = (phoneNumber) => {
  //   const regex = /^[0-9]{10}$/;
  //   return regex.test(phoneNumber);
  // };
  
  export const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };
  
  export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  