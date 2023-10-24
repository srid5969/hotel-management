import {
  StorageSharedKeyCredential,
  BlobServiceClient,
} from '@azure/storage-blob';
import {azureFileUploadConfig} from '../config';

export class AzureUploader {
  constructor(private filePath: string) {}

  private getEndpoint() {
    return `https://${azureFileUploadConfig.storageAccount}.blob.core.windows.net`;
  }

  private getSharedKeyCredentials() {
    return new StorageSharedKeyCredential(
      azureFileUploadConfig.storageAccount,
      azureFileUploadConfig.key
    );
  }

  async uploadFileByChoice(containerName: string, folderName: string) {
    const blobServiceClient = new BlobServiceClient(
      this.getEndpoint(),
      this.getSharedKeyCredentials()
    );
    const containerClient = await blobServiceClient.getContainerClient(
      containerName
    );
    const blobName = this.filePath;
    const blockBlobClient = containerClient.getBlockBlobClient(
      `${folderName}/${blobName}`
    );
    return await blockBlobClient.uploadFile(blobName);
  }
}
