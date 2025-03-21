/* eslint-disable */

export interface IntakeFormPersonnelData {
  firstName?: string;
  lastName?: string;
  program?: string;
  employeeId?: string;
  paylistId?: string;
  email: string;
  primaryPhoneNumber?: string;
  secondaryPhoneNumber?: string;
  workPhoneNumber?: string;
  unionMembership?: string;
  supervisorFirstName?: string;
  supervisorLastName?: string;
  supervisorEmail?: string;
  supervisorPhoneNumber?: string;
  driverLicense?: string[];
  homeLocation?: string;
  workLocation?: string;
  ministry?: string;
  division?: string;
  tools?: {
    toolId: string;
    toolProficiency: string;
  }[];
  languages?: {
    language: string;
    languageProficiency: string;
  }[];
  certifications?: {
    certificationId: string;
    expiry?: Date;
  }[];
  emergencyContactFirstName?: string;
  emergencyContactLastName?: string;
  emergencyContactPhoneNumber?: string;
  emergencyContactRelationship?: string;

  firstChoiceFunction?: string;
  secondChoiceFunction?: string;
  thirdChoiceFunction?: string;

  firstNationsExperience?: string;
  peccExperience?: string;
  preocExperience?: string;
  emergencyExperience?: string;
  functions?: string[];
  purchaseCardHolder?: boolean;
  liaisonFirstName?: string;
  liaisonLastName?: string;
  liaisonPhoneNumber?: string;
  liaisonEmail?: string;
  firstChoiceSection?: string;
  secondChoiceSection?: string;
  thirdChoiceSection?: string;
  travelPreferenceBcws?: string;
  travelPreferenceEmcr?: string;
  roles?: string[];
  chipsLastActionDate?: Date;
  jobTitle?: string;
}
