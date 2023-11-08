const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");

const handleGoogleAuth = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "User not found");
  }

  res.json({
    token: user.token,
    user: {
      email: user.email,
    },
  });
};

module.exports = {
  handleGoogleAuth: ctrlWrapper(handleGoogleAuth),
};
