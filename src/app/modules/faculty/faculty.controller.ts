import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
};
