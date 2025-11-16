import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface IUser extends Document {
email: string;
password: string;
name?: string;
comparePassword(candidate: string): Promise<boolean>;
resetPasswordToken?: string | null;
resetPasswordExpires?: Date | null;
}


const UserSchema: Schema = new Schema({
name: { type: String },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
resetPasswordToken: { type: String },
resetPasswordExpires: { type: Date }
}, { timestamps: true });


UserSchema.pre<IUser>('save', async function (next) {
if (!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});


UserSchema.methods.comparePassword = async function (candidate: string) {
return bcrypt.compare(candidate, this.password);
};


export default mongoose.model<IUser>('User', UserSchema);