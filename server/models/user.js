const {admin} = require('../database');

const createUser = async (req, res) => {
  const {
    email,
    password,
    username
  } = req.body;

  const user = await admin.auth.createUser({
    email,
    password,
    username
  });

  return res.send(user);
}

module.exports = createUser;
