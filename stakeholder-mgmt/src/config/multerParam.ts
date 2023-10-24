import {uuid} from 'uuidv4';
import {azureFileUploadConfig} from './azure';
const multerAzure = require('multer-azure');
const multerConfig = require('multer');

//#region userProfileUpload
/**
 * userProfileUpload
 */
export const userProfileUpload = multerConfig({
  storage: multerAzure({
    connectionString: azureFileUploadConfig.connectionString,
    account: azureFileUploadConfig.storageAccount,
    key: azureFileUploadConfig.key,
    container: azureFileUploadConfig.userProfileContainer,
    blobPathResolver: function (req: any, file: any, callback: any) {
      const blobPath = getCustomFileName(req, file); //Calculate blobPath in your own way.
      callback(null, blobPath);
    },
  }),
});
//#endregion

//#region stakeholderProfileUpload
/**
 * stakeholderProfileUpload
 */
export const stakeholderProfileUpload = multerConfig({
  storage: multerAzure({
    connectionString: azureFileUploadConfig.connectionString,
    account: azureFileUploadConfig.storageAccount,
    key: azureFileUploadConfig.key,
    container: azureFileUploadConfig.stakeholderProfileContainer,
    blobPathResolver: function (req: any, file: any, callback: any) {
      const blobPath = getCustomFileName(req, file); //Calculate blobPath in your own way.
      callback(null, blobPath);
    },
  }),
});
//#endregion

//#region meetingAttachmentsUpload
/**
 * meetingAttachmentsUpload
 */

export const meetingAttachmentsUpload = multerConfig({
  storage: multerAzure({
    connectionString: azureFileUploadConfig.connectionString,
    account: azureFileUploadConfig.storageAccount,
    key: azureFileUploadConfig.key,
    container: azureFileUploadConfig.meetingAttachmentsContainer,
    blobPathResolver: function (req: any, file: any, callback: any) {
      const blobPath = getCustomFileName(req, file); //Calculate blobPath in your own way.
      callback(null, blobPath);
    },
  }),
});
//#endregion

//#region stakeholderProfileUpload
/**
 * stakeholderProfileUpload
 */
export const meetingReportfileUpload = multerConfig({
  storage: multerAzure({
    connectionString: azureFileUploadConfig.connectionString,
    account: azureFileUploadConfig.storageAccount,
    key: azureFileUploadConfig.key,
    container: azureFileUploadConfig.meetingReportContainer,
    blobPathResolver: function (req: any, file: any, callback: any) {
      const blobPath = getCustomFileName(req, file); //Calculate blobPath in your own way.
      callback(null, blobPath);
    },
  }),
});
//#endregion

//#region getCustomFileName
/**
 * getCustomFileName
 * @param req
 * @param file
 * @returns
 */
function getCustomFileName(req: any, file: any) {
  const uuidVal = uuid();
  const filename = uuidVal + '-' + file.originalname;
  return filename;
}
//#endregion
