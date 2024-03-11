import { postImageDB } from '@db';
import { CloudinaryApiResponse } from '@db/db';
import { getPublicId } from '@utils';

async function replaceImage(file: Express.Multer.File, deleteURL: string, folder: string) {
  if (deleteURL) {
    const publicId = getPublicId(deleteURL);
    await postImageDB.uploader
      .destroy(publicId)
      .then((result: any) => console.log(`[Cloudinary]: ${result.result}`))
      .catch((error: any) => console.log(`[Cloudinary Error]: ${error}`));
  }

  const base64String = Buffer.from(file.buffer).toString('base64');
  const dataURL = `data:${file.mimetype};base64,${base64String}`;
  let secure_url = '';
  await postImageDB.uploader
    .upload(dataURL, { folder })
    .then((result: CloudinaryApiResponse) => {
      secure_url = result.secure_url!;
    })
    .catch((error: any) => {
      console.log(`[Cloudinary Error]: ${error}`);
      throw new Error(error);
    });

  return secure_url;
}

export default { replaceImage };
