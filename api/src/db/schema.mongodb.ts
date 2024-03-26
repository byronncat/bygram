import mongoose, { Document } from 'mongoose';
import { Profile, Post } from '@types';

interface ProfileDocument extends Profile, Document {
  _doc?: Profile;
}

const ProfileSchema = new mongoose.Schema<ProfileDocument>(
  {
    uid: { type: Number, required: true },
    username: { type: String, required: true },
    followers: { type: [Number], default: [], required: true },
    followings: { type: [Number], default: [], required: true },
    avatar: {
      dataURL: { type: String },
      sizeType: { type: String },
    },
    description: { type: String },
  },
  {
    versionKey: false,
  }
);
// ProfileSchema.index({ username: 'text' });
const ProfileModel = mongoose.model('profile', ProfileSchema);

interface PostDocument extends Post, Document {
  _doc?: Post;
}

const PostModel = mongoose.model(
  'post',
  new mongoose.Schema<PostDocument>(
    {
      uid: { type: Number, required: true },
      content: { type: String },
      file: {
        dataURL: { type: String, required: true },
        sizeType: { type: String, required: true },
      },
      createdAt: { type: Date, default: Date.now },
      likes: { type: [Number], required: true, default: [] },
      comments: [
        {
          uid: { type: Number, required: true },
          content: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
    {
      versionKey: false,
    }
  )
);

export { ProfileModel, ProfileDocument };
export { PostModel, PostDocument };
