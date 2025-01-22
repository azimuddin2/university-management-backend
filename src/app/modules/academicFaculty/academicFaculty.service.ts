import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyFromDB = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await academicFacultyQuery.countTotal();
  const result = await academicFacultyQuery.modelQuery;

  return { meta, result };
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  if (!result) {
    throw new AppError(404, `Academic Faculty id ${id} does not exists`);
  }

  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const isFacultyExists = await AcademicFaculty.findById({ _id: id });
  if (!isFacultyExists) {
    throw new AppError(404, `Academic faculty id ${id} does not exists`);
  }

  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
