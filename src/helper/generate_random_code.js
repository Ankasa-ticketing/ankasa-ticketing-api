function generateRandomCode() {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  var result = "";

  for (var i = 0; i < 6; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

module.exports = generateRandomCode;
