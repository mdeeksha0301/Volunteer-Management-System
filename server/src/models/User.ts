import { Schema, model, connect } from 'mongoose';


interface IUser {
    role: 'admin' | 'organization' | 'volunteer';
    organizationName?: string;
    email: string;
    phoneNumber?: number;
    userName?: string;
    password: string;
  }
  
const userSchema = new Schema({
    role: {
        type: String,
        required: [true, "role is required"],
        enum: ["admin", "organization", "volunteer"],
    },
    organizationName:{
        type: String,
        required: function(this: IUser) {
            if(this.role === "organization"){
                return true
            }
            return false
        }
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: function(this: IUser) {
            if(this.role === "organization" || this.role === "volunteer"){
                return true
            }
            return false
        }
    },
    userName: {
        type: String,
        required: function(this: IUser) {
            if(this.role === "volunteer"){
                return true
            }
            return false
        }
    },
    password:{
        type: String,
        required: [true, "passwprd is required"]
    }
})


const User = model<IUser>("users", userSchema);
export default User
