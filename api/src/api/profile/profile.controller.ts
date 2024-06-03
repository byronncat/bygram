// import { Request, Response } from 'express';
// import { accountService, postService } from '@services';
// import { API, AvatarAPI, Profile, ProfileAPI, SearchProfileAPI } from '@types';

// import multer from 'multer';
// import { isEmptyObject } from '@utilities';
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// async function changeAvatar(req: Request, res: Response, next: any) {
//   const uid = req.body.uid as Profile['uid'];
//   if (typeof uid === 'undefined') {
//     return res.status(400).json({
//       success: false,
//       message: 'Missing UID parameter',
//     } as AvatarAPI);
//   }

//   const type = req.query.type as string;
//   if (type === 'remove') {
//     return await accountService
//       .removeAvatar(uid)
//       .then(() =>
//         res.status(200).json({
//           success: true,
//           message: 'Avatar removed',
//         } as AvatarAPI)
//       )
//       .catch((error) =>
//         res.status(500).json({
//           success: false,
//           message: JSON.stringify(error),
//         } as AvatarAPI)
//       );
//   }

//   if (!('file' in req)) {
//     return res.status(409).json({
//       success: false,
//       message: 'No file uploaded',
//     } as AvatarAPI);
//   }

//   try {
//     return await accountService
//       .setAvatar(uid, req.file!)
//       .then((avatar) => {
//         if (avatar) {
//           return res.status(200).json({
//             success: true,
//             message: 'Avatar changed',
//             data: avatar,
//           } as AvatarAPI);
//         } else {
//           return res.status(500).json({
//             success: false,
//             message: 'Avatar not changed',
//           } as AvatarAPI);
//         }
//       })
//       .catch((error) =>
//         res.status(500).json({
//           success: false,
//           message: JSON.stringify(error),
//         } as AvatarAPI)
//       );
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       message: JSON.stringify(error),
//     } as AvatarAPI);
//   }
// }

// async function follow(req: Request, res: Response) {
//   const { uid, target } = req.body;
//   if (typeof uid === 'undefined' || typeof target === 'undefined') {
//     return res.status(400).json({
//       success: false,
//       message: 'Missing UID or target parameter',
//     } as API);
//   }

//   await accountService
//     .follow(uid, target)
//     .then(() => {
//       res.status(200).json({
//         success: true,
//         message: 'Followed',
//       } as API);
//     })
//     .catch((error: any) => {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       } as API);
//     });
// }

// async function unfollow(req: Request, res: Response) {
//   const { uid, target } = req.body;
//   if (typeof uid === 'undefined' || typeof target === 'undefined') {
//     return res.status(400).json({
//       success: false,
//       message: 'Missing UID or target parameter',
//     } as API);
//   }

//   await accountService
//     .unfollow(uid, target)
//     .then(() => {
//       res.status(200).json({
//         success: true,
//         message: 'Unfollowed',
//       } as API);
//     })
//     .catch((error: any) => {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       } as API);
//     });
// }

// export default {
//   search: [searchTerm],
//   changeAvatar: [upload.single('file'), changeAvatar],
//   getProfile: [getProfile],
//   follow: [follow],
//   unfollow: [unfollow],
// };
