const usernameRegex = new RegExp('^(?=.{6,30}$)[a-zA-Z0-9._]+$');
const emailRegex = new RegExp('^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$');
const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

export { usernameRegex, emailRegex, passwordRegex };
