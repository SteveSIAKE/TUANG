const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // un minimum de sécurité
      },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
    },
    sexe: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    date_de_naissance: {
        type: Date,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
