import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 📌 Inscription
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérif des champs
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    // Vérif si l’email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Cet email est déjà utilisé" });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création de l’utilisateur
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Génération du token JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
