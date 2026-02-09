export type IResponse<T = unknown> = {
    error: boolean;
    message: string;
    reauth?: boolean
    data: T;
    total?: null | number;
    [propName: string]: unknown;
  };
