export type PostgreSQL = {
  none: function;
  one: function;
  oneOrNone: function;
  many: function;
  manyOrNone: function;
  any: function;
  connect: function;
};

export type Cloudinary = {
  uploader: {
    upload: function;
    destroy: function;
  };
};

export interface CloudinaryApiResponse {
  public_id?: string;
  url?: string;
  secure_url?: string;
  width?: number;
  height?: number;
}
