import {HttpStatus} from "@leapjs/common";
import {UserModel} from "app/user/model/user";
import {NextFunction, Response} from "express";

export const roleBasedAccess = (expose: string) => {
	return async (req: any, res: Response, next: NextFunction): Promise<any> => {
		const data = await UserModel.findOne({_id: req.user}, {role: 1});

		if (data.role == expose) {
			return next();
		}
		return next({
			code: HttpStatus.FORBIDDEN,
			message: "Unauthorized",
			error: "Permission Denied",
			data: null
		});
	};
};
