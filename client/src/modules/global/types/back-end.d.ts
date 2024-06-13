export type API_v1 = {
  readonly success: boolean;
  readonly message: string;
};

export type API<DataType> = {
  readonly success: boolean;
  readonly message: string;
  readonly data: DataType;
};
