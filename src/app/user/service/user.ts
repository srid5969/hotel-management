import {HttpStatus, inject, injectable} from "@leapjs/common";
import {OTPService} from "app/otp/service/otp";
import {User, UserModel} from "app/user/model/user";
import {ResponseReturnType} from "common/response/responseTypes";
import {UserSessionService} from "common/userSession/service/userSession";
import {ObjectId} from "mongodb";

@injectable()
export class UserService {
	@inject(UserSessionService)
	private service!: UserSessionService;
	@inject(OTPService)
	private otpService!: OTPService;

	public async listAllUser() {
		return Promise.resolve(await UserModel.find({role: "User"}));
	}
	public async deleteUser(id: string) {
		try {
			const deleteUser = await UserModel.deleteOne({role: "User", _id: id});
			return {
				code: 200,
				message: "successfully removed",
				error: null,
				data: deleteUser,
				status: true
			};
		} catch (error) {
			return {
				code: HttpStatus.NOT_ACCEPTABLE,
				message: "cannot remove",
				error: error,
				data: null,
				status: true
			};
		}
	}

	public async updateUserDetails(_id: string, data: User) {
		try {
			const updateUser = await UserModel.findOneUpdate({_id}, data);

			return {
				code: 200,
				message: "successfully updated",
				error: null,
				data: updateUser,
				status: true
			};
		} catch (error) {
			return {
				code: HttpStatus.NOT_ACCEPTABLE,
				message: "cannot update",
				error: error,
				data: null,
				status: true
			};
		}
	}

	public async getUserDetailUsingId(_id: ObjectId): Promise<any> {
		return Promise.resolve(await UserModel.findOne({_id}));
	}

	public async registerUser(payload: User): Promise<ResponseReturnType> {
		const saveUser = new UserModel(payload);

		try {
			const user = await saveUser.save();

			return {
				code: 200,
				message: "successfully registered",
				error: null,
				data: user,
				status: true
			};
		} catch (error) {
			return {
				code: HttpStatus.NOT_ACCEPTABLE,
				message: "cannot register",
				error: error,
				data: null,
				status: true
			};
		}
	}

	//login
	public async login(phone: number): Promise<ResponseReturnType> {
		const user = await UserModel.findOne({phone}, {id: 1});

		if (!user) {
			return {
				code: HttpStatus.NOT_FOUND,
				status: true,
				data: null,
				error: "no user found",
				message: "user cannot be found"
			};
		}

		const data = await this.otpService.generateOTP(phone, user);
		return {
			code: HttpStatus.OK,
			data,
			error: null,
			message: "The otp has been sent successfully and the user verification is still pending",
			status: true
		};
	}

	public async verifyOTP(payload: any): Promise<ResponseReturnType> {
		const {otp, token} = payload;

		const user: ObjectId | boolean = await this.otpService.verifyOTP(otp, token);

		if (user) {
			const userData = await UserModel.findOneAndUpdate({_id: user}, {verified: true});
			const accessToken = await this.service.generateAccessToken(user);
			const refreshToken = await this.service.generateRefreshToken();
			await this.service.saveToken({
				refreshToken,
				user: userData._id
			});

			return {
				code: 200,
				status: true,
				message: "Welcome",
				data: {
					refreshToken,
					accessToken
				},
				error: null
			};
		}
		return {
			code: HttpStatus.NOT_ACCEPTABLE,
			status: false,
			message: "Otp  cannot verified",
			error: null,
			data: null
		};
	}
}
