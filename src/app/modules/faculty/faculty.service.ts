import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFacultiesFromDB = async (
  query: Record<string, unknown>
): Promise<TFaculty[]> => {
  const facultiesQuery = new QueryBuilder(
    Faculty.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),
    query
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultiesQuery.modelQuery;

  return result;
};

const getSingleFacultyFromDB = async (id: string): Promise<TFaculty | null> => {
  const faculty = await Faculty.findOne({ id }).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  if (!faculty) {
    throw new AppError(404, `This Faculty Id ${id} does not exists`);
  }

  return faculty;
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
};
