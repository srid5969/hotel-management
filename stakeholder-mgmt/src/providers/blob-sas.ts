import {
  BlobSASPermissions,
  SASProtocol,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from '@azure/storage-blob';

export class BlobSasProvider {
  private endpoint: string;
  constructor(
    private account: string,
    private sharedKeyCredential: StorageSharedKeyCredential,
    private containerName: string
  ) {
    this.account = account;
    this.sharedKeyCredential = sharedKeyCredential;
    this.containerName = containerName;
    this.endpoint = `https://${this.account}.blob.core.windows.net`;
  }

  generteLink(permission: string, blobPath: string) {
    const sas = generateBlobSASQueryParameters(
      {
        containerName: this.containerName,
        blobName: blobPath,
        permissions: BlobSASPermissions.parse(permission),
        startsOn: new Date(new Date().valueOf() - 9000),
        expiresOn: new Date(new Date().valueOf() + 86400),
        protocol: SASProtocol.Https,
      },
      this.sharedKeyCredential
    ).toString();
    return `${this.endpoint}/${this.containerName}/${blobPath}?${sas}`;
  }
}
