import { fileDB } from '@db';
import { CloudinaryUploadResponse, CloudinaryDestroyResponse } from '@types';
import { Account } from '@types';
import { logger } from '@utils';
import path from 'path';

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

async function replaceImage(file: Express.Multer.File, deleteURL: string, folder: string) {
  if (deleteURL) {
    const publicId = getPublicId(deleteURL);
    await fileDB
      .destroy(publicId)
      .then((result: CloudinaryDestroyResponse) => console.log(`[Cloudinary]: ${result.result}`))
      .catch((error: any) => console.log(`[Cloudinary Error]: ${error}`));
  }

  const base64String = Buffer.from(file.buffer).toString('base64');
  const dataURL = `data:${file.mimetype};base64,${base64String}`;
  let secure_url = '';
  await fileDB
    .upload(dataURL, { folder })
    .then((result: CloudinaryUploadResponse) => {
      secure_url = result.secure_url!;
    })
    .catch((error: any) => {
      console.log(`[Cloudinary Error]: ${error}`);
      throw new Error(error);
    });

  return secure_url;
}

async function addImage(file: Express.Multer.File, uid: Account['id']) {
  logger.info(`Uploading image for ${uid}`, 'Cloudinary');
  logger.info(`File: ${file.originalname}`, 'Cloudinary');
  const dataURL = getDataURL(file);
  let image = {
    secure_url: '',
    sizeType: '',
  };
  const path = `social-media-app/${uid}`;
  await fileDB
    .upload(dataURL, { folder: path })
    .then((result: CloudinaryUploadResponse) => {
      image.secure_url = result.secure_url!;
      if (result.width! > result.height!) image.sizeType = 'Landscape';
      else if (result.width! < result.height!) image.sizeType = 'Portrait';
      else image.sizeType = 'Square';
    })
    .catch((error: any) => logger.error(`${error}`, 'Cloudinary'));

  return image;
}

async function deleteImage(imgURL: string) {
  let success = false;
  const publicId = getPublicId(imgURL);
  await fileDB
    .destroy(publicId)
    .then((result: CloudinaryDestroyResponse) => {
      logger.warn(`${result.result}`, 'Cloudinary');
      if (result.result === 'ok') success = true;
    })
    .catch((error: any) => logger.error(`${error}`, 'Cloudinary'));

  return success;
}

export default { replaceImage, addImage, deleteImage };
