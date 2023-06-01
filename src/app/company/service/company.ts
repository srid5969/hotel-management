import {injectable} from "@leapjs/common";
import {Company, CompanyModel} from "../model/company";

@injectable()
export class CompanyService {
	public async listCompanies() {
		return await CompanyModel.find({});
	}

	//2. Get a specific company by ID
	public async getCompanyDetailsById(_id: string) {
		return await CompanyModel.findOne({_id});
	}

	//3. Create a company

	public async createCompany(payload: Company) {
		const data = new CompanyModel(payload);
		return await data.save();
	}

	//4. Update a company

	public async updateCompanyDetails(_id: string, fields: Company) {
		return await CompanyModel.updateOne({_id}, {$set: fields});
	}

	//5. Add/remove users to/from a company
	public async addUserToCompany(companyId: string, userId: string) {
		return await CompanyModel.updateOne({_id: companyId}, {$push: userId});
	}
    public async deleteUserFromCompany(companyId: string, userId: string) {
		return await CompanyModel.updateOne({_id: companyId}, {$pull: userId});
	}

	public async deleteCompany(_id: string) {
		return await CompanyModel.deleteOne({_id});
	}
}
