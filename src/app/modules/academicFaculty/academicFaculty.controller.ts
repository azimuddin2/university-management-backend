import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
};
