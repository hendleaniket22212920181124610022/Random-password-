import React, { useState, useEffect } from "react";
import "./PasswordGenerator.css";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [previousPasswords, setPreviousPasswords] = useState([]);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeAlphabets, setIncludeAlphabets] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  const generatePassword = () => {
    const numbers = "0123456789";
    const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = '!@#$%^&*()_+[]{}|:;"<>,.?/~';

    let charset = "";

    if (includeNumbers) charset += numbers;
    if (includeAlphabets) charset += alphabets;
    if (includeSpecialChars) charset += specialChars;

    let newPassword = "";

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);

    setPreviousPasswords([...previousPasswords, newPassword]);
  };

  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  useEffect(() => {
    const storedPasswords = JSON.parse(
      localStorage.getItem("previousPasswords")
    );
    if (storedPasswords) setPreviousPasswords(storedPasswords);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "previousPasswords",
      JSON.stringify(previousPasswords)
    );
  }, [previousPasswords]);

  return (
    <div>
      <h1>Password Generator</h1>
      <button onClick={generatePassword}>Generate Password</button>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
      <div>Password: {password}</div>
      <h2>Previous Passwords</h2>
      <ul>
        {previousPasswords.slice(-5).map((prevPassword, index) => (
          <li key={index}>{prevPassword}</li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordGenerator;
