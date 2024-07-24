import { v4 } from 'uuid';
import { Storage } from '@google-cloud/storage';
import { extname, join, resolve } from 'path';

const projectId = 'telecom-398714';
const keyFilename = resolve(process.cwd(), 'src', 'utils', 'key.json');
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket('telecom2003');

export const googleCloud = (file: any | any[]) => {
  const a: any[] = [];
  a.push(file);
  const imageLink = join(v4() + extname(a[0]?.originalname));
  const blob = bucket.file(imageLink);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {});

  blobStream.end(a[0]?.buffer);
  return imageLink;
};

export const googleCloudAsync = async (file: any | any[]): Promise<string> => {
  const a: any[] = [];
  a.push(file);
  const imageLink = join(v4() + extname(a[0]?.originalname));
  const blob = bucket.file(imageLink);
  const blobStream = blob.createWriteStream();

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      reject(err.message);
    });

    blobStream.on('finish', () => {
      resolve(imageLink);
    });

    blobStream.end(a[0]?.buffer);
  });
};

export const deleteFileCloud = async (imageLink: string) => {
  new Promise((resolve, reject) => {
    const blob = bucket
      .file(imageLink)
      .delete()
      .then((image) => {
        resolve(imageLink);
      })
      .catch((e) => {
        reject(e);
      });
  });
  return imageLink;
};
