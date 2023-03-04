import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  FOLDER: any;

  constructor() { }
  uploadFile(file: { type: any; name: any; }):any {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: 'AKIA34W4D6SOJQXBOTLU',
              secretAccessKey: '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',
              region: 'us-east-2'
          }
      );
      const params = {
          Bucket: 'acqu',
          Key: file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      var returnval=null;
      return bucket.upload(params, function (err: any, data: any) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return null;
          }
          console.log('Successfully uploaded file.', data);
          returnval=data;
          return data;
      });
  }
  
}
