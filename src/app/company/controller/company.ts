import {HttpStatus, inject} from "@leapjs/common";
import {Body, Controller, Delete, Get, Param, Patch, Post, Req, Res} from "@leapjs/router";
import {Response} from "express";
import {CompanyService} from "../service/company";
import {Company} from "../model/company";

@Controller("/companies")
export class CompanyController {
	@inject(CompanyService)
	private readonly companyService!: CompanyService;
	@Get("/:id")
	public async getCompanyDetailsById(@Param("id") id: string, @Res() res: Response): Promise<Response> {
		const data = await this.companyService.getCompanyDetailsById(id);
		return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
	}
	@Get()
	public async listCompanies(@Res() res: Response): Promise<Response> {
		const data = await this.companyService.listCompanies();
		return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
	}

	@Patch("/:id")
	public async updateCompanyDetails(@Param("id") id: string, @Body() body: Company, @Res() res: Response): Promise<Response> {
		const data = await this.companyService.updateCompanyDetails(id, body);
		return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
	}

	@Delete("/:id")
	public async deleteCompany(@Param("id") id: string, @Res() res: Response): Promise<Response> {
		const data = await this.companyService.deleteCompany(id);
		return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
	}
	@Post()
	public async createCompany(@Body() body: Company, @Res() res: Response): Promise<Response> {
		const data = await this.companyService.createCompany(body);
		return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
	}
	@Patch("/user/:id")
	public async addUserToCompany(@Param("id") id: string, @Body() body: any, @Res() res: Response): Promise<Response> {
		const data = await this.companyService.addUserToCompany(id, body);
		return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
	}
	@Patch("/user/:id")
	public async deleteUserFromCompany(@Param("id") id: string, @Body() body: any, @Res() res: Response): Promise<Response> {
		const data = await this.companyService.deleteUserFromCompany(id, body);
		return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
	}
}
