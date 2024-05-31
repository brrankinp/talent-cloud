import {
  Ministry,
  Status,
  UnionMembership,
  Region,
  RegionName,
  FireCentreName,
  FireCentre,
} from '@/common';
import * as Yup from 'yup';
import type { FieldType } from './types';
import { Route } from '@/providers';
import { DriverLicense, DriverLicenseName } from '@/common/enums';

const phoneNumber = (value: any) => {
  if (value === '' || !value) {
    return true;
  } else return value?.toString().replace(/[^\d]/g, '').length === 10;
};

export const editProfileValidationSchema = Yup.object().shape({
  workLocation: Yup.object().shape({
    locationName: Yup.string(),
    region: Yup.string(),
    fireCentre: Yup.string(),
  }),
  homeLocation: Yup.object().shape({
    locationName: Yup.string(),
    region: Yup.string(),
    fireCentre: Yup.string(),
  }),
  remoteOnly: Yup.boolean().required('This field is required.'),
  willingToTravel: Yup.boolean().required('This field is required.'),
  primaryPhone: Yup.string()
    .required('This field is required.')
    .test(
      'phone number',
      'Invalid phone number format. Please enter ten digits.',
      phoneNumber,
    ),
  secondaryPhone: Yup.string()
    .test(
      'phone number',
      'Invalid phone number format. Please enter ten digits.',
      phoneNumber,
    )
    .optional(),
  workPhone: Yup.string().test(
    'phone number',
    'Invalid phone number format. Please enter ten digits.',
    phoneNumber,
  ),

  supervisorFirstName: Yup.string()
    .min(2, 'Max length 2 characters.')
    .max(50, 'Max length 50 characters.')
    .required('This field is required.'),
  supervisorLastName: Yup.string()
    .min(2, 'Max length 2 characters.')
    .max(50, 'Max length 50 characters.')
    .required('This field is required.'),
  supervisorEmail: Yup.string().optional().email('Invalid email format.'),

  approvedBySupervisor: Yup.boolean().required('This field is required.'),

  unionMembership: Yup.string().required('This field is required.'),
  driversLicense: Yup.array().optional(),
  // conditional for pending status for both
});

export const emcrPendingValidationSchema = Yup.object().shape({
  ...editProfileValidationSchema.fields,
  icsTraining: Yup.boolean().required('This field is required.'),
});

export const bcwsProfileValidationSchema = Yup.object().shape({
  ...editProfileValidationSchema.fields,
  purchaseCardHolder: Yup.string().required('This field is required.'),
  paylistId: Yup.string().required('This field is required.'),
  liaisonFirstName: Yup.string().optional(),
  liaisonLastName: Yup.string().optional(),
  liaisonNumber: Yup.string()
    .test(
      'phone number',
      'Invalid phone number format. Please enter ten digits.',
      phoneNumber,
    )
    .optional(),
  liaisonEmail: Yup.string().optional(),
  division: Yup.object().shape({
    division: Yup.string().optional(),
    ministry: Yup.string().optional(),
  }),
  emergencyContactFirstName: Yup.string().optional(),
  emergencyContactLastName: Yup.string().optional(),
  emergencyContactNumber: Yup.string()
    .test(
      'phone number',
      'Invalid phone number format. Please enter ten digits.',
      phoneNumber,
    )
    .optional(),
  emergencyContactRelationship: Yup.string().optional(),
});

export const bcwsPendingValidationSchema = Yup.object().shape({
  ...bcwsProfileValidationSchema.fields,
  parQ: Yup.boolean().required('This field is required.'),
  willingnessStatement: Yup.boolean().required('This field is required.'),
  orientation: Yup.boolean().required('This field is required.'),
});

export const emcrValidationSchema = Yup.object().shape({
  ...editProfileValidationSchema.fields,
  ministry: Yup.string().required('This field is required.'),
});

export type SectionType = {
  header: string;
  fields: FieldType[];
};

export const workLocationField = {
  locationName: {
    name: 'workLocation.locationName',
    label: 'Work Location',
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    required: false,
    handleChange: true,
    options: [{ label: '', value: '' }],
  },
  fireCentre: {
    name: 'workLocation.fireCentre',
    label: 'Work Fire Centre',
    type: 'select',
    autoComplete: 'off',
    break: true,
    disabled: true,
    required: false,
    program: Route.BCWS,
    options: Object.keys(FireCentre).map((itm) => ({
      label: FireCentreName[itm as FireCentre],
      value: itm,
    })),
  },
  region: {
    name: 'workLocation.region',
    label: 'Work Region',
    required: false,
    type: 'select',
    break: true,
    autoComplete: 'off',
    disabled: true,
    program: Route.EMCR,
    options: Object.keys(Region).map((itm) => ({
      label: RegionName[itm as Region],
      value: itm,
    })),
  },
};
export const homeLocationField = {
  locationName: {
    name: 'homeLocation.locationName',
    label: 'Home Location',
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    required: true,
    handleChange: true,
    options: [{ label: '', value: '' }],
  },
  fireCentre: {
    name: 'homeLocation.fireCentre',
    label: 'Home Fire Centre',
    type: 'select',
    autoComplete: 'off',
    break: true,
    disabled: true,
    required: false,
    program: Route.BCWS,
    options: Object.keys(FireCentre).map((itm) => ({
      label: FireCentreName[itm as FireCentre],
      value: itm,
    })),
  },

  region: {
    name: 'homeLocation.region',
    label: 'Home Region',
    required: true,
    type: 'select',
    autoComplete: 'off',
    break: true,
    disabled: true,
    program: Route.EMCR,
    options: Object.keys(Region).map((itm) => ({
      label: RegionName[itm as Region],
      value: itm,
    })),
  },
};

const divisionField = {
  divisionName: {
    name: 'division.divisionName',
    label: 'Division',
    autoComplete: 'off',
    disabled: false,
    handleChange: true,
    required: true,
    type: 'groupedSelect',
    program: Route.BCWS,
    groupedOptions: [{ groupOption: '', options: [{ label: '', value: '' }] }],
  },
  ministry: {
    name: 'division.ministry',
    label: 'Ministry',
    required: false,
    break: true,
    type: 'select',
    autoComplete: 'off',
    disabled: true,
    options: [{ label: '', value: '' }],
  },
};

export const fields = {
  icsTraining: {
    name: 'icsTraining',
    label: 'ICS Training',
    required: true,
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    program: Route.EMCR,
    options: [
      { label: 'Incomplete', value: 'false' },
      { label: 'Completed', value: 'true' },
    ],
  },
  approvedBySupervisor: {
    name: 'approvedBySupervisor',
    label: ' Supervisor Approval',
    required: true,
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    options: [
      { label: 'Not Yet Received', value: 'false' },
      { label: 'Received', value: 'true' },
    ],
  },
  willingnessStatement: {
    name: 'willingnessStatement',
    label: 'Willingness Statement',
    autoComplete: 'off',
    disabled: false,
    required: true,
    type: 'select',
    program: Route.BCWS,
    options: [
      { label: 'Completed', value: 'true' },
      { label: 'Incomplete', value: 'false' },
    ],
  },
  parQ: {
    name: 'parQ',
    label: 'ParQ',
    autoComplete: 'off',
    disabled: false,
    required: true,
    type: 'select',
    program: Route.BCWS,
    options: [
      { label: 'Completed', value: 'true' },
      { label: 'Incomplete', value: 'false' },
    ],
  },
  orientation: {
    name: 'orientation',
    label: 'TEAMS Orientation',
    autoComplete: 'off',
    disabled: false,
    required: true,
    type: 'select',
    program: Route.BCWS,
    options: [
      { label: 'Completed', value: 'true' },
      { label: 'Incomplete', value: 'false' },
    ],
  },
  dateApplied: {
    name: 'dateApplied',
    label: 'Date Applied',
    type: 'text',
    autoComplete: 'off',
    disabled: true,
    required: true,
    status: Status.PENDING,
  },
  dateApproved: {
    name: 'dateApproved',
    label: 'Date Approved',
    type: 'text',
    autoComplete: 'off',
    disabled: true,
    required: true,
    status: Status.ACTIVE,
  },

  remoteOnly: {
    name: 'remoteOnly',
    label: 'Remote Only',
    required: true,
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
  willingToTravel: {
    name: 'willingToTravel',
    label: 'Willing to Travel',
    required: true,
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },

  purchaseCardHolder: {
    name: 'purchaseCardHolder',
    label: 'Purchase Card Holder',
    autoComplete: 'off',
    disabled: false,
    required: true,
    type: 'select',
    program: Route.BCWS,
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },

  driverLicense: {
    name: 'driverLicense',
    label: 'Drivers License',
    autoComplete: 'off',
    disabled: false,
    multiple: 'true',
    required: false,
    type: 'select',
    options: Object.values(DriverLicense).map((itm) => ({
      label: DriverLicenseName[itm],
      value: itm,
    })),
  },

  primaryPhone: {
    name: 'primaryPhone',
    label: 'Primary Number',
    required: true,
    type: 'tel',
    autoComplete: 'off',
    disabled: false,
  },
  secondaryPhone: {
    name: 'secondaryPhone',
    label: 'Secondary Number',
    break: true,
    required: false,
    type: 'tel',
    autoComplete: 'off',
    disabled: false,
  },
  email: {
    name: 'email',
    label: 'Work Email',
    break: true,
    required: true,
    type: 'text',
    autoComplete: 'off',
    disabled: true,
  },

  workPhone: {
    name: 'workPhone',
    label: 'Work Number',
    required: false,
    type: 'tel',
    autoComplete: 'off',
    disabled: false,
  },

  emergencyContactFirstName: {
    name: 'emergencyContactFirstName',
    label: 'Emergency Contact First Name',
    autoComplete: 'off',
    disabled: false,
    required: false,
    type: 'text',
    program: Route.BCWS,
  },

  emergencyContactLastName: {
    name: 'emergencyContactLastName',
    label: 'Emergency Contact Last Name',
    autoComplete: 'off',
    disabled: false,
    required: false,
    type: 'text',
    program: Route.BCWS,
  },

  emergencyContactNumber: {
    label: 'Emergency Contact Number',
    name: 'emergencyContactNumber',
    autoComplete: 'off',
    disabled: false,
    required: false,
    type: 'tel',
    program: Route.BCWS,
  },

  emergencyContactRelationship: {
    label: 'Emergency Contact Relationship',
    name: 'emergencyContactRelationship',
    autoComplete: 'off',
    disabled: false,
    required: false,
    type: 'text',
    program: Route.BCWS,
  },

  supervisorFirstName: {
    name: 'supervisorFirstName',
    label: 'Supervisor First Name',
    required: true,
    type: 'text',
    autoComplete: 'off',
    disabled: false,
  },
  supervisorLastName: {
    name: 'supervisorLastName',
    label: 'Supervisor Last Name',
    required: true,
    type: 'text',
    autoComplete: 'off',
    disabled: false,
  },
  supervisorEmail: {
    name: 'supervisorEmail',
    label: 'Supervisor Email',
    required: false,
    type: 'text',
    autoComplete: 'off',
    disabled: false,
  },

  paylistId: {
    name: 'paylistId',
    label: 'Paylist ID',
    autoComplete: 'off',
    disabled: false,
    required: true,
    type: 'text',
    program: Route.BCWS,
  },

  unionMembership: {
    name: 'unionMembership',
    label: 'Union Membership',
    required: true,
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    options: Object.values(UnionMembership).map((itm) => ({
      label: itm.toString(),
      value: itm.toString(),
    })),
  },
  ministry: {
    name: 'ministry',
    label: 'Ministry',
    required: false,
    type: 'select',
    autoComplete: 'off',
    disabled: false,
    options: Object.values(Ministry).map((itm) => ({ label: itm, value: itm })),
  },

  liaisonFirstName: {
    name: 'liaisonFirstName',
    label: 'Liaison First Name',
    type: 'text',
    autoComplete: 'off',
    disabled: false,
    required: false,
    program: Route.BCWS,
  },
  liaisonLastName: {
    name: 'liaisonLastName',
    label: 'Liaison Last Name',
    type: 'text',
    autoComplete: 'off',
    disabled: false,
    required: false,
    program: Route.BCWS,
  },

  liaisonNumber: {
    name: 'liaisonNumber',
    label: 'Liaison Number',
    type: 'tel',
    autoComplete: 'off',
    disabled: false,
    required: false,
    program: Route.BCWS,
  },
  liaisonEmail: {
    name: 'liaisonEmail',
    label: 'Liaison Email',
    type: 'text',
    autoComplete: 'off',
    disabled: false,
    required: false,
    program: Route.BCWS,
  },
  homeLocation: homeLocationField,
  workLocation: workLocationField,
  division: divisionField,
};
