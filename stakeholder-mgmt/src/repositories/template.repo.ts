import {templateModel} from '../models/template.model';

export class TemplateRepository {
  async getTemplateByType(templateType: string) {
    const temp: any = await templateModel.findOne({
      where: {templateType: templateType},
      attributes: ['templateType', 'template', 'title'],
    });
    return temp;
  }
}
