export type PostgreSQL = {
  none: function;
  one: function;
  oneOrNone: function;
  many: function;
  manyOrNone: function;
  any: function;
  connect: function;
};

export interface Cloudinary {
  upload: function;
  destroy: function;
}

export interface CloudinaryUploadResponse {
  public_id?: string;
  url?: string;
  secure_url?: string;
  width?: number;
  height?: number;
}

export interface CloudinaryDestroyResponse {
  result?: 'ok' | 'not found' | 'error';
}
