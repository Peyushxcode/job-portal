const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        location: {
            type: String,
        },
        gender: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "recruiter", "user"],
            default: "user",
            required: true
        },
        resume: {
            type: String,
            required: true
        },
    },
    { timestamps: true } // to keep track
);

// Hashing Password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return
    this.password = await bcrypt.hash(this.password, 10)

})

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;