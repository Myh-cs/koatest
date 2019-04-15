const getToken = require("jsonwebtoken");

exports.verToken = function(token) {
  const tokenTemp=token.split(" ")[1];
  console.log(tokenTemp);
  return new Promise((resolve, rejece) => {
    const info = getToken.verify(tokenTemp, "secret");
    resolve(info);
  });
};
