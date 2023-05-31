import {injectable} from "@leapjs/common";
import {Item, ItemModel} from "../model/item";

@injectable()
export class ItemService {
	public async addItem(item: Item) {
		const data = new ItemModel(item);
		const save = data.save();
		return save;
	}
	public async getAllItems() {
		return ItemModel.find({});
	}
	public async getItemById(_id: any) {
		return ItemModel.findOne({_id});
	}
	public async updateItemById(_id: string, data: Item) {
		return ItemModel.updateOne({_id}, {$set: data});
	}
	public async deleteItemById(_id: string) {
		return ItemModel.deleteOne({_id});
	}

}
