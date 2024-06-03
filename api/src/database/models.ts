import mongoose from 'mongoose';
import type { Document } from 'mongoose';
import type { Profile, Post } from '@types';

const ProfileSchema = new mongoose.Schema<Profile>(
  {
    uid: { type: Number, required: true },
    followers: { type: [Number], default: [], required: true },
    followings: { type: [Number], default: [], required: true },
    avatar: {
      url: { type: String },
      orientation: { type: String },
    },
    description: { type: String },
  },
  {
    versionKey: false,
  },
);
export const ProfileModel = mongoose.model<Profile>('profile', ProfileSchema);

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
        url: { type: String, required: true },
        type: { type: String, required: true },
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
    },
  ),
);

export { PostModel };
export type { PostDocument };
