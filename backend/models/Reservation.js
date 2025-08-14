const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Train",
        required: true,
    },
    date_de_depart: {
        type: Date,
        required: true,
    },
    date_de_retour: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "confirmed", "cancelled"],
    },
    classe: {
        type: String,
        required: true,
        enum: ["economique", "premiere", "business"],
    },
    prix: {
        type: Number,
        required: true,
    },
    passengers:{
        type: Number,
        required: true,
    }
}, { timestamps: true });
module.exports = mongoose.model("Reservation", reservationSchema);