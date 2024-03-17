import mongoose, { Document } from 'mongoose';
import { Profile, Post, File } from '@types';

interface ProfileDocument extends Profile, Document {
  _doc?: Profile;
}

const ProfileModel = mongoose.model(
  'profile',
  new mongoose.Schema<ProfileDocument>(
    {
      uid: { type: Number, required: true },
      username: { type: String, required: true },
      followers: { type: [Number], default: [], required: true },
      followings: { type: [Number], default: [], required: true },
      avatar: { type: String },
      description: { type: String },
    },
    {
      versionKey: false,
    }
  )
);

interface PostDocument extends Post, Document {
  _doc?: Post;
}

const PostModel = mongoose.model(
  'post',
  new mongoose.Schema<PostDocument>(
    {
      uid: { type: Number, required: true },
      content: { type: String, required: true },
      file: {
        dataURL: { type: String, required: true },
        sizeType: { type: String, required: true },
      },
      createdAt: { type: Date, default: Date.now },
      likes: { type: [Number], default: [] },
      comments: { type: Array, default: [] },
    },
    {
      versionKey: false,
    }
  )
);

export { ProfileModel, ProfileDocument };
export { PostModel, PostDocument };
