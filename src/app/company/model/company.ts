import {Ref, getModelForClass, prop} from "@typegoose/typegoose";
import {User} from "app/user/model/user";
import {IsDefined} from "class-validator";
import {ObjectId} from "mongodb";

class Company {
	@prop({_id: true, id: ObjectId})
	public id?: ObjectId;

	@prop({required: true})
	name!: string;

	@prop({required: true})
	address!: string[];

	@prop()
	location!: string[];

	@prop({ref: User})
	@IsDefined({groups: ["addUsers"]})
	public users!: Ref<User[]> | ObjectId[];
}

const CompanyModel = getModelForClass(Company, {
	schemaOptions: {
		collection: "company",
		versionKey: false,
		timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}
	}
});
export {Company, CompanyModel};
