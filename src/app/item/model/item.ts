import { mongoErrorHandler } from "@leapjs/common";
import { getModelForClass, index, post, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

@index({expireAt: 1}, {expireAfterSeconds: 300})
@post("save", mongoErrorHandler("users"))
@post("findOneAndUpdate", mongoErrorHandler("users"))
class Item {
	@prop({_id: true, id: ObjectId})
	public id?: ObjectId;

	@prop({})
	public name!: string;
}

const ItemModel = getModelForClass(Item, {
	schemaOptions: {
		expires: 300,
		expireAfterSeconds: 300,
		collection: "item",
		versionKey: false,
		timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}
	}
});

export { Item, ItemModel };

