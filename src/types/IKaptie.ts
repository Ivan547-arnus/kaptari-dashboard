import type { IFile } from "./IFile";

export interface IKaptie {
  id?: number;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  marker: IFile | null;
  marker_id: number | null;
  qr_code: IFile | null;
  qr_code_id: number | null;
  zip_file: IFile | null;
  zip_file_id: number | null;
}

export class Kaptie implements IKaptie {
  id?: number;
  title: string = '';
  description: string = '';
  status: 'draft' | 'published' | 'archived' = 'draft';
  marker: IFile | null = null;
  marker_id: number | null = null;
  zip_file: IFile | null = null;
  zip_file_id: number | null = null;
  qr_code: IFile | null = null;
  qr_code_id: number | null = null;
  constructor(data?: IKaptie) {
    if (data) {
      console.log(data)
      Object.assign(this, data);
    }
  }
}
