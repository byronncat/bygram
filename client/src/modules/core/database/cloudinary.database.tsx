import { createContext, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import type { ReactProps } from '@global';
import type { MediaInfo, UploadedFile } from '../types';

const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
(function validateCloudinaryConfig() {
  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration is missing');
  }
})();

const CloudinaryContext = createContext(
  {} as {
    uploadFile: (
      files: UploadedFile[],
      options?: {
        asset_folder?: string;
        public_id_prefix?: string;
      },
    ) => Promise<MediaInfo[]>;
    DefaultAvatar: () => JSX.Element;
  },
);

const CloudinaryProvider = ({ children }: ReactProps) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  async function uploadFile(
    files: UploadedFile[],
    options?: {
      asset_folder?: string;
      public_id_prefix?: string;
      use_asset_folder_as_public_id_prefix?: boolean;
    },
  ) {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file.url);
      formData.append('public_id', file.id);
      formData.append('upload_preset', uploadPreset!);

      if (options) {
        if (options.asset_folder)
          formData.append('asset_folder', options.asset_folder);
        if (options.public_id_prefix)
          formData.append('public_id_prefix', options.public_id_prefix);
      }

      const fileType = file.type.split('/')[0];
      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(function (response: AxiosResponse) {
          return {
            id: response.data.public_id,
            url: response.data.secure_url,
            type: fileType,
            orientation: file.orientation,
          } as MediaInfo;
        });
    });

    return await Promise.all(uploadPromises);
  }

  function DefaultAvatar() {
    return <AdvancedImage cldImg={cld.image('default-avatar')} />;
  }

  return (
    <CloudinaryContext.Provider
      value={{
        uploadFile,
        DefaultAvatar,
      }}
    >
      {children}
    </CloudinaryContext.Provider>
  );
};

export default CloudinaryProvider;
export const useCloudinaryContext = () => useContext(CloudinaryContext);
