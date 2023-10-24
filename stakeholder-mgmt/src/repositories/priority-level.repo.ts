import {priorityLevelModel} from '../models/priorityLevel.model';

export class PriorityLevelRepository {
  public async getPriorityLevelList() {
    const getPriorityLevel = await priorityLevelModel.findAll();
    return getPriorityLevel;
  }

  public async getPriorityLevelByLevel(priorityLevel: string) {
    const getPriorityByLevel: any = await priorityLevelModel.findAll({
      where: {priority: priorityLevel},
      attributes: ['priority', 'level', 'description'],
    });
    return getPriorityByLevel;
  }
}
