export const containsHTML = (input) => /<[^>]*>/.test(input);

export const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidName = (name) =>
    typeof name === "string" &&
  /^[a-zA-Z\u0600-\u06FF\s]+$/.test(name.trim()) &&
  name.trim().length > 0;

export const isValidPassword = (password) =>
   typeof password === "string" &&
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
