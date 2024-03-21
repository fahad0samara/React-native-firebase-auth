// utils.js
export const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
 
  export const getErrorText = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email format';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long';
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Wrong password';
      case 'auth/network-request-failed':
        return 'Network request failed, please check your internet connection';
      case 'auth/invalid-credential':
        return 'Invalid credential, please check your email and password and try again';
      default:
        return 'Something went wrong';
    }
  };
  
  
  