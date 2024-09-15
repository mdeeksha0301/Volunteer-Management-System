"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: [true, "role is required"],
        enum: ["admin", "organization", "volunteer"],
    },
    organizationName: {
        type: String,
        required: function () {
            if (this.role === "organization") {
                return true;
            }
            return false;
        }
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: function () {
            if (this.role === "organization" || this.role === "volunteer") {
                return true;
            }
            return false;
        }
    },
    userName: {
        type: String,
        required: function () {
            if (this.role === "volunteer") {
                return true;
            }
            return false;
        }
    },
    password: {
        type: String,
        required: [true, "passwprd is required"]
    }
});
const User = (0, mongoose_1.model)("users", userSchema);
exports.default = User;
