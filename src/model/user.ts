import mongoose, { Document, Schema } from 'mongoose';

enum LinkPrecedence {
  Primary = 'primary',
  Secondary = 'secondary'
}

interface User extends Document {
  id: number;
  phoneNumber?: string;
  email?: string;
  linkedId?: mongoose.Types.ObjectId;
  linkPrecedence: LinkPrecedence;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const userSchema = new Schema<User>({

  phoneNumber: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  linkedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: false
  },
  linkPrecedence: {
    type: String,
    enum: Object.values(LinkPrecedence),
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    required: false
  }
});

const UserModel = mongoose.model<User>('user', userSchema);

export default UserModel;
