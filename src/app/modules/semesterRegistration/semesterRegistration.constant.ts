import { TStatus } from './semesterRegistration.interface';

export const semesterRegistrationStatus: TStatus[] = [
  'UPCOMING',
  'ONGOING',
  'ENDED',
];

export const RegistrationStatus = {
  UPCOMING: 'UPCOMING',
  ONGOING: 'ONGOING',
  ENDED: 'ENDED',
} as const;
