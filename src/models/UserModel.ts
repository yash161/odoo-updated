import mongoose from "mongoose";
import { Schema } from "mongoose";





const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide the username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide the password"],
    },
    book_ref_num: {
        type: [Number],
    },
    interest: {
        type: [String],
    },
    author: {
        type: [String],
    },
    verifyCode: {
        type: String,
    },
    forgotPassCode: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    isLibrarian: {
        type: Boolean,
        default: false
    }
})
const UserModel = mongoose.models.NewUsers || mongoose.model("NewUsers",userSchema)

export default UserModel