const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../models/user");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, SECRET_KEY } =
  process.env;
  
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/auth/google-redirect`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });
        let token = "";

        if (user) {
          const payload = {
            id: user._id,
          };

          token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

          await User.findByIdAndUpdate(user._id, {
            token,
          });
        }

        if (!user) {
          const temporaryPassword = await bcrypt.genSalt(3);
          const payload = {
            id: profile.id,
          };
          token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

          user = await User.create({
            password: temporaryPassword,
            email,
            token,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
