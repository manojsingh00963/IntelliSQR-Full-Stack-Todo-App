import mongoose, { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  message: string;
  stack?: string;
  route?: string;
  user?: mongoose.Types.ObjectId | null;
}

const LogSchema: Schema = new Schema({
  message: { type: String },
  stack: { type: String },
  route: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

export default mongoose.model<ILog>('Log', LogSchema);
