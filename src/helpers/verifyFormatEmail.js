export function validatedEmail(email) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!regexEmail.test(email)) {
      return { valido: false, mensagem: "E-mail inválido. Verifique o formato." };
  }
  const dominiosProibidos = ["tempmail.com", "10minutemail.com", "yopmail.com"];
  const dominio = email.split("@")[1];

  if (dominiosProibidos.includes(dominio)) {
      return { valido: false, mensagem: "Domínio não permitido para registro." };
  }

  return { valido: true, mensagem: "E-mail válido para registro." };
}
/*
console.log(validarEmail("teste@gmail.com"));  // { valido: true, mensagem: "E-mail válido para registro." }
console.log(validarEmail("usuario@yopmail.com")); // { valido: false, mensagem: "Domínio não permitido para registro." }
console.log(validarEmail("email-invalido@com")); // { valido: false, mensagem: "E-mail inválido. Verifique o formato." } */
