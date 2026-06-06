const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");
import { Request, Response } from "express";
const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.FRONTEND_URL?.includes("onrender.com");

// ================= REGISTER =================

// async function register(req: Request, res: Response) {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     const existingUser = await prisma.users.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.users.create({
//       data: {
//         email,
//         password: hashedPassword,
//       },
//     });

//     const token = jwt.sign(
//       {
//         id: user.id,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: isProduction,
//       sameSite: isProduction ? "none" : "lax",
//       partitioned: isProduction ? true : false,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: user.id,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// }

async function register(req: Request, res: Response) {
  try {
    const {
      username,
      first_name,
      last_name,
      email,
      phone_number,
      role,
      country,
      additional_information,
      password,
    } = req.body;

    if (
      !username ||
      !first_name ||
      !last_name ||
      !email ||
      !phone_number ||
      !role ||
      !country ||
      !password
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        username,
        first_name,
        last_name,
        email,
        phone_number,
        role,
        country,
        additional_information,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      partitioned: isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
}

// ================= LOGIN =================

// async function login(req: Request, res: Response) {
//   try {
//     const { email, password } = req.body;

//     const user = await prisma.users.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid email or password",
//       });
//     }

//     const isPasswordValid = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return res.status(400).json({
//         message: "Invalid email or password",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user.id,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: isProduction,
//       sameSite: isProduction ? "none" : "lax",
//       partitioned: isProduction ? true : false,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user.id,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// }
async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      partitioned: isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
}

module.exports = {
  register,
  login,
};