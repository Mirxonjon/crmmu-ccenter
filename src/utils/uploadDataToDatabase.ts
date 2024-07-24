import { resolve } from 'path';
import readXlsxFile from 'read-excel-file/node';

export const readExcel = async (filename: string): Promise<any[]> => {
  const Filepath = resolve(process.cwd(), 'src', 'importedFiles', filename);
  const rows = await readXlsxFile(Filepath);
  return rows;
};
