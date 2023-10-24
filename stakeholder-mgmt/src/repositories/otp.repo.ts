import {otpModel} from '../models/otp.model';

export class OtpRepository {
  async createOtp(uId: number, otp: number) {
    const otpResult: any = await otpModel.create({
      userId: uId,
      otpText: otp,
      otpDate: new Date().toISOString(),
      otpMaximumRetries: 0,
    });
    return otpResult;
  }

  async deleteOtpByUserId(UId: number) {
    const delOtp: any = await otpModel.destroy({
      where: {userId: UId},
    });
    return delOtp;
  }

  async getOtpbyUserId(uId: number) {
    const otpDetails: any = await otpModel.findOne({
      where: {userId: uId},
      order: [['createdAt', 'DESC']],
    });
    return otpDetails;
  }
  async updateOtpbyUserId(uId: number, otp: number) {
    const updateOtpResult: any = await otpModel.findOne({
      where: {
        userId: uId,
      },
      order: [['createdAt', 'DESC']],
    });
    if (!updateOtpResult) {
      return null;
    } else {
      await updateOtpResult.update({
        otpText: otp,
        otpDate: new Date().toISOString(),
        otpMaximumRetries: 0,
      });
      return updateOtpResult;
    }
  }
  async updateOtpRetries(uId: number) {
    let updateOtpResult: any = await otpModel.findOne({
      where: {
        userId: uId,
      },
      order: [['createdAt', 'DESC']],
    });
    if (!updateOtpResult) {
      return null;
    } else {
      updateOtpResult = await updateOtpResult.update({
        otpMaximumRetries: parseInt(updateOtpResult.otpMaximumRetries) + 1,
      });
      console.log(
        `Current OTP Retry Count: ${updateOtpResult.otpMaximumRetries}`
      );
      return updateOtpResult;
    }
  }
}
