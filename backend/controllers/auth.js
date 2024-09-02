const users = require("../models/users");
const jwt = require('jsonwebtoken');

const {
  encrypt_password,
  decrypt_password,
} = require("../utils/common");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      code: 0,
      message: "Bad Request."
    });
    return;
  }

  try {
    const user_exist = await users.findOne({ username });

    if (!user_exist) {
      res.status(201).json({
        code: 0,
        message: "Account does not exist with this usename."
      });
      return;
    }

    const valid = await decrypt_password(password, user_exist.password);

    if (!valid) {
      res.status(400).json({
        code: 0,
        message: "Username or password is incorrect."
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user_exist._id,
        username: user_exist.username,
        profile: user_exist.profile,
        gender: user_exist.gender,
        full_name: user_exist.full_name
      },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    // res.cookie("token", token, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "Strict"
    // });

    res.status(200).json({
      code: 1,
      message: "Login successfully.",
      data: {
        id: user_exist._id,
        gender: user_exist.gender,
        profile: user_exist.profile,
        username: user_exist.username,
        full_name: user_exist.full_name,
        token
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 0,
      message: "Internal Server Error."
    });
  }
};

const signup = async (req, res) => {
  const { full_name, username, password, gender } = req.body;

  if (!username || !full_name || !password || !gender) {
    res.status(400).json({
      code: 0,
      message: "Bad Request."
    });

    return;
  }

  try {
    const user_exist = await users.findOne({ username });

    if (user_exist) {
      res.status(201).json({
        code: 0,
        message: "Account already exist with this usename."
      });
      return;
    }

    const hash_password = await encrypt_password(password);
    const girl_profile = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const boy_profile = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const user = new users({
      full_name,
      username,
      password: hash_password,
      profile: gender === "Male" ? boy_profile : girl_profile,
      gender
    });

    const save = await user.save();

    const token = jwt.sign(
      {
        id: save._id,
        username: save.username,
        profile: save.profile,
        gender: save.gender,
        full_name: save.full_name
      },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    // res.cookie("token", token, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "Strict"
    // });

    res.status(200).json({
      code: 1,
      message: "User created successfully.",
      data: {
        id: save._id,
        username: save.username,
        profile: save.profile,
        gender: save.gender,
        profile: save.profile,
        full_name: save.full_name,
        token
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 0,
      message: "Internal Server Error."
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0
    });

    res.status(200).json({
      code: 1,
      message: "Logout successfully.",
      data: {}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 0,
      message: "Internal Server Error."
    });
  }
};

module.exports = {
  login,
  signup,
  logout
};
