import { fileDatabase } from '@database';
import { CloudinaryUploadResponse, CloudinaryDestroyResponse } from '@types';
import { Account } from '@types';
import { logger } from '@utilities';

async function addImage(file: Express.Multer.File, uid: Account['id']) {
  const dataURL = getDataURL(file);
  const path = `social-media-app/${uid}`;
  const image = await fileDatabase
    .upload(dataURL, { folder: path })
    .then((result: CloudinaryUploadResponse) => {
      return {
        secure_url: result.secure_url,
        sizeType: result.width > result.height ? 'landscape' : 'portrait',
      };
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });

  return image;
}

async function deleteImage(imgURL: string) {
  const publicId = getPublicId(imgURL);
  return await fileDatabase
    .destroy(publicId)
    .then((result: CloudinaryDestroyResponse) => {
      logger.warn(`${result.result}`, 'Cloudinary');
      if (result.result === 'ok') return true;
      return false;
    })
    .catch((error: any) => Promise.reject(error));
}

async function replaceImage(file: Express.Multer.File, deleteURL: string) {
  if (!deleteURL) return Promise.reject('No image to replace');
  const urlParts = deleteURL.split('/');
  const uid = urlParts[urlParts.length - 2];
  const image = await addImage(file, uid);
  await deleteImage(deleteURL);
  return image;
}

export default { addImage, deleteImage, replaceImage };

function getPublicId(imageUrl: string) {
  const urlParts = imageUrl.split('/');
  const publicId = `social-media-app/${urlParts[urlParts.length - 2]}/${
    urlParts[urlParts.length - 1].split('.')[0]
  }`;
  return publicId;
}

function getDataURL(file: Express.Multer.File) {
  const base64String = Buffer.from(file.buffer).toString('base64');
  const dataURL = `data:${file.mimetype};base64,${base64String}`;
  return dataURL;
}
