import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body,
    );

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Semester Registration successfully',
        data: result,
    });
});

export const SemesterRegistrationControllers = {
    createSemesterRegistration,
};