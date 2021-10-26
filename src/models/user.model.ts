import mongoose from 'mongoose';

const userSchemaObject = {
name: {
    type: String,
    required: true,
},
password: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
}

}

const userSchema = new mongoose.Schema(userSchemaObject);

export default mongoose.model("User", userSchema);