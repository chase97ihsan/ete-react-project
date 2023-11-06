const users = [
  {
    id: 1,
    name: "Ihsan",
    surname: "Dogan",
    email: "ihsannote3@gmail.com",
    password: "ihsan12345",
  },
  {
    id: 2,
    name: "Ete",
    surname: "Company",
    email: "ete@gmail.com",
    password: "ete12345",
  },
];

const createToken = (n) => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let token = "";
  for (let i = 0; i < n; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  //JSON.stringify({ token });
  return token;
};

module.exports = {
  users,
  createToken,
};
