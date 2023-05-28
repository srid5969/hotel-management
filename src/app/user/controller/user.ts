import {HttpStatus, inject} from "@leapjs/common";
import {Body, Controller, Get, Post, Req, Res, UseBefore} from "@leapjs/router";
import {User} from "app/user/model/user";
import validate from "common/middleware/validator";
import {Response} from "express";
import {UserService} from "../service/user";
import {roleBasedAccess} from "common/middleware/admin.auth";

@Controller("/user")
export class UserController {
	@inject(() => UserService) userService!: UserService;
	@Get("/users")
	public async listAllUsers(@Res() res: Response) {
		const data = await this.userService.listAllUser();
		return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
	}
	@Get("/")
	public async userDetail(@Req() req: any, @Res() res: Response): Promise<Response> {
		try {
			const data = await this.userService.getUserDetailUsingId(req.user);
			return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
		} catch (error: any) {
			return error.code ? res.status(error.code).json(error) : res.status(HttpStatus.CONFLICT).send(error);
		}
	}

	@Post("/register")
	@UseBefore(roleBasedAccess("Admin"))
	public async registerUser(@Body() req: any, @Res() res: Response): Promise<Response> {
		const data = await this.userService.registerUser(req);
		return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
	}

	@Post("/login")
	@UseBefore(validate(User, ["login"]))
	public async login(@Body() req: any, @Res() res: Response): Promise<Response> {
		try {
			const data = await this.userService.login(req.phone);
			return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
		} catch (error: any) {
			return error.code ? res.status(error.code).json(error) : res.status(HttpStatus.CONFLICT).send(error);
		}
	}
	@Post("/verify-otp")
	public async verifyOTP(@Body() req: any, @Res() res: Response): Promise<Response> {
		try {
			const data = await this.userService.verifyOTP(req);
			return data.code ? res.status(data.code).json(data) : res.status(HttpStatus.ACCEPTED).send(data);
		} catch (error: any) {
			return error.code ? res.status(error.code).json(error) : res.status(HttpStatus.CONFLICT).send(error);
		}
	}
}
