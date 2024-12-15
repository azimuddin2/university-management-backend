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

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;

  const result = await FacultyServices.updateFacultyIntoDB(facultyId, faculty);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is updated successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is deleted successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
