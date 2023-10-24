import {corporateEmailsModel} from '../models/corporateEmails';

export class corporateEmailRepository {
  async getCorporateEmails() {
    const corporateEmails = await corporateEmailsModel.findAll({
      attributes: ['email'],
    });
    return corporateEmails;
  }
}
