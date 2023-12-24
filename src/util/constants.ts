export enum ICDCODE {
  CD2015 = '1CD 10 CM 2015',
  CD2019 = 'ICD 10 CM 2019',
  CD2022 = 'ICD 10 CM 2022',
}
export enum Status {
  ACTIVE = '1',
  INACTIVE = '2',
}
export enum SupportTicketsStatus {
  Closed = '0',
  Open = '1',
  Ongoing = '2',
}
export enum TravelPlansStatus {
  YET_TO_START = 'YET_TO_START',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLEd = 'CANCELLED',
}
export enum UserStatus {
  INACTIVE = '0',
  ACTIVE = '1',
  NewlyRegistered = '2',
  PENDING = '3',
}
export enum YesOrNo {
  YES = '1',
  NO = '0',
}

export interface IResponse<T = any> {
  data: T;
  message: string;
}

export const contentResource: string[] = [
  'Account registration',
  'Appointment Booked',
  'Payment',
  'Forgot password',
  'Request Appointment',
  'Appointment Canceled',
  'Appointment Rescheduled',
  'Trip Booked',
  'Support query reminders',
  'support queries closed',
  'new support queries',
  'chat support',
  'Treatment plan approved',
  'treatment plan rejected',
  'Appointment reminders',
  'Follow up',
];
export enum patientCardDetailsResource {
  Visa = 'Visa',
  Mastercard = 'Mastercard',
  American_Express = 'American Express',
  Discover = 'Discover',
  Capital_One = 'Capital One',
  Bank_of_America = 'Bank of America',
  Citibank = 'Citibank',
  Wells_Fargo = 'Wells Fargo',
}
export enum systemConfigurationKey {
  Email = 'Email',
  SMS = 'SMS',
  Payment = 'Payment',
  Whatsapp = 'Whatsapp',
  URLS = 'URLS',
}
export enum locationAddressType {
  Branch = 'Branch',
  Headquarters = 'Headquarters',
  primary = 'primary',
  secondary = 'secondary',
  other = 'other',
}
export enum TreatmentPlansStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  DISCHARGE = 'DISCHARGE',
}
export enum userProfileSalute {
  Mr = 'Mr',
  Ms = 'Ms',
  Mrs = 'Mrs',
  Dr = 'Dr',
  Miss = 'Miss',
}
export enum patienthistoryKey {
  lab_results = 'lab results',
  previous_prescriptions = 'previous prescriptions',
  x_ray_copy = ' x-ray copy,',
  past_medical_records = 'past medical records',
  diagnostic_test_results = 'diagnostic test results',
}
export const NAME_CANNOT_NULL = 'Name cannot be null or undefined';
export const LOG_CANNOT_NULL = 'Log cannot be null or undefined';
export const LOG_IS_NULL = 'Log has no value';
export const NAME_IS_NULL = 'Name has no value';
export enum NotificationStatus {
  READ = 'READ',
  UNREAD = 'UNREAD',
}
export enum NotificationAction {
  OTP = 'OTP',
  VERIFICATION = 'VERIFICATION',
  GENERAL = 'GENERAL',
}
export enum ContentResource {
  ACCOUNT_REGISTRATION = 'Account registration',

  EMAIL_OTP = 'Email Otp',

  APPOINTMENT_BOOKED = 'Appointment Booked',

  PAYMENT = 'Payment',

  FORGOT_PASSWORD = 'Forgot password',

  REQ_APPOINTMENT = 'Request Appointment',

  APPOINTMENT_CANCELLED = 'Appointment Canceled',

  APPOINTMENT_RESCHEDULED = 'Appointment Rescheduled',

  TRIP_BOOKED = 'Trip Booked',

  SUPPORT_QUERY_REMINDERS = 'Support query reminders',

  NEW_SUPPORT_QUERY = 'new support queries',

  SUPPORT_QUERY_CLOSED = 'support queries closed',

  CHART_SUPPORT = 'chat support',

  TREATMENT_PLAN_APPROVED = 'Treatment plan approved',

  TREATMENT_PLAN_REJECTED = 'Treatment plan rejected',

  FOLLOW_UP = 'Follow up',

  APPOINTMENT_REMINDERS = 'Appointment reminders',
}

export const statusMessage = {
  errorMessage: {
    unexpectedError: 'An unexpected error has occurrred',
  },
  getMessage: {
    getError: 'Unable to get data',
  },
};
export enum SocialMediaLoginProviders {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
}
export enum TransactionsType {
  Credit = 'Credit',
  Debit = 'Debit',
}
export enum DoctorAppointmentStatus {
  NEW = 'NEW',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  ACTIVE = 'ACTIVE',
  DISCHARGED = 'DISCHARGED',
  CANCELLED = 'CANCELLED',
}
export enum NotificationType {
  TreatmentPlan = 'TREATMENT_PLAN',
  ExpertOpinion = 'EXPERT_OPINION',
  OTP = 'OTP',
  JOIN_CALL = 'JOIN CALL',
  GENERAL = 'GENERAL',
  FACILITY_REQUEST = 'FACILITY REQUEST',
  DOCTOR_REQUEST = "FACILITY'S DOCTOR PROFILE REQUEST",
  END_CALL = 'END CALL',
}
export enum LoginStatus {
  BLOCK = '0',
  ALLOW = '1',
}
export enum PatientStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CANCELLED = 'CANCELLED',
  DISCHARGE = 'DISCHARGED',
}

export enum Plans {
  NO_PLAN = 'No Plan',
  TREATMENT_PLAN = 'Treatment Plan',
  TRAVEL_PLAN = 'Travel Plan',
  SECOND_OPINION = 'Second Opinion',
}
export enum UserRoles {
  SUPER_ADMIN = 'Super Admin',
  IPD_SUPER_ADMIN = 'IPD Super Admin',
  OPS_SUPER_ADMIN = 'OPS Super Admin',
  CC_AGENT = 'CC Agent',
  IPD_ADMIN = 'IPD Admin',
  OPS_ADMIN = 'OPS Admin',
  REFERRAL_AGENT = 'Referral Agent',
  VIP_CONCIERGE = 'VIP Concierge',
  PATIENT = 'Patient',
  DOCTOR = 'Doctor',
}
export enum Patient_Current_Plan_Status {
  NEW = 'New',
  EXISTING = 'Existing',
}
export enum HospitalStatus {
  ACCEPT = '1',
  REJECT = '2',
  PENDING = '3',
}
export enum ModeOfInteraction {
  OB_CALL = 'OB Call',
  OB_EMAIL = 'OB Email',
  IB_CALL = 'IB Call',
  IB_EMAIL = 'IB Email',
  CHAT = 'Chat',
  NO_INTERACTION = 'NO INTERACTION',
}
export enum UserTypesInRequest {
  CC_AGENT = 'CC Agent',
  REFERRAL_AGENT = 'Referral Agent',
  PATIENT = 'Patient',
}
export enum UserRequestStatus {
  NEW = 'New',
  ACTIVE = 'Active',
  CANCELLED = 'Cancelled',
}
export enum RequestTypes {
  TREATMENT_PLAN = 'Treatment Plan',
  SO = 'Second Opinion',
  CC_AGENT = UserRoles.CC_AGENT,
  PATIENT = UserRoles.PATIENT,
  REFERRAL_AGENT = UserRoles.REFERRAL_AGENT,
  DOCTOR = UserRoles.DOCTOR,
  VIP_CONCIERGE = UserRoles.VIP_CONCIERGE,
  IPD_ADMIN = UserRoles.IPD_ADMIN,
  IPD_SUPER_ADMIN = UserRoles.IPD_SUPER_ADMIN,
}
export enum ArrangeTransfer {
  YES = 'Yes',
  NO = 'No',
}
export enum ConsultationStatus {
  ACCEPT = '1',
  REJECT = '2',
  PENDING = '3',
}
export enum AppointmentStatus {
  OPEN = '0',
  ONGOING = '1',
  COMPLETED = '2',
  CANCELLED = '3',
  NOTSHOW = '4',
}
export enum CommissionType {
  CURRENCY = 'Currency',
  PERCENTAGE = 'Percentage',
}
export enum EmailPlanType {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  DISCHARGE = 'DISCHARGE',
}
export enum PlansStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  DISCHARGE = 'DISCHARGE',
}
export enum PatientNotificationType {
  REGISTRATION_OTP = 'Registration - OTP',
  SUCCESSFUL_REGISTRATION = 'After successful registration',
  FORGOT_PASSWORD = 'Forgot Password',
  SUBMIT_TREATMENT_PLAN = 'After submitting the treatment plan',
  SUBMIT_SECOND_OPINION = 'After submitting the second opinion',
  PATIENT_APPROVED_TREATMENT_PLAN = 'Patient approved the treatment plan',
  PATIENT_REJECTED_TREATMENT_PLAN = 'Patient rejected the treatment plan',
  PATIENT_APPROVED_SECOND_OPINION = 'Patient approved the second opinion',
  PATIENT_REJECTED_SECOND_OPINION = 'Patient rejected the second opinion',
  CALL_SCHEDULED = 'When the call was scheduled',
  CONSULTATION_SUMMARY_PUBLISHED = 'When the consultation summary is published',
  TREATMENT_PLAN_UPLOADED = 'When Treatment plan has been uploaded by the OPS or IPD',
  SECOND_OPINION_DOCUMENT_UPLOADED = 'When Second Opinion Document has been uploaded by the OPS or IPD',
}
export enum ReferralAgentNotificationType {
  REGISTRATION_OTP = 'Registration - OTP',
  SUCCESSFUL_REGISTRATION = 'After successful registration',
  FORGOT_PASSWORD = 'Forgot Password',
  SUBMIT_TREATMENT_PLAN = 'After submitting the treatment plan',
  SUBMIT_SECOND_OPINION = 'After submitting the second opinion',
  PATIENT_APPROVED_TREATMENT_PLAN = 'Patient approved/rejected the treatment plan',
  PATIENT_APPROVED_SECOND_PLAN = 'Patient approved/rejected the second plan',
  CALL_SCHEDULED = 'When the call was scheduled',
  CONSULTATION_SUMMARY_PUBLISHED = 'When the consultation summary is published',
  TREATMENT_PLAN_UPLOADED_BY_OPS_OR_IPD = 'When Treatment plan has been uploaded by the OPS or IPD',
  SECOND_OPINION_DOCUMENT_UPLOADED_BY_OPS_OR_IPD = 'When Second Opinion Document has been uploaded by the OPS or IPD',
}
export enum VIPConciergeNotificationType {
  PATIENT_ASSIGNED = 'When the patient was assigned',
}
export enum OPSNotificationType {
  TREATMENT_PLAN_REQUESTED_BY_PATIENT = 'When Patient has requested the treatment plan',
  SECOND_OPINION_REQUESTED_BY_PATIENT = 'When Patient has requested the second opinion',
  PATIENT_TREATMENT_PLAN_APPROVAL = 'When patient has accepted/rejected the treatment plan',
  PATIENT_SECOND_OPINION_APPROVAL = 'When patient has accepted/rejected the second opinion',
  FACILITY_PROFILE_EDIT_REQUEST = 'When facility profile edit request is raised',
  DOCTOR_PROFILE_EDIT_REQUEST = 'When doctor profile edit request is raised',
}
export enum IPDNotificationType {
  TREATMENT_PLAN_ASSIGNED_BY_OPS = 'When the treatment plan was assigned by OPS',
  PATIENT_ASSIGNED = 'When new Patient was assigned by IPD',
  SECOND_OPINION_ASSIGNED_BY_OPS = 'When the Second Opinion was assigned by OPS',
  FACILITY_FIELD_APPROVAL_STATUS = 'When the edited field approval has been accepted or rejected - Facility',
  DOCTOR_FIELD_APPROVAL_STATUS = 'When the edited field approval has been accepted or rejected - Doctor',
}
export enum NotificationConsultationStatus {
  OPEN = '1',
  COMPLETED = '2',
}
export enum DocumentType {
  USERDOCUMENT = '1',
  SYSTEMDOCUMENT = '2',
}
export enum TransactionStatus {
  A = 'Completed',
  H = 'Hold (AuthoriZed but on hold for further anti-fraud review)',
  P = 'Pending (for refunds)',
  V = 'Voided',
  E = 'Error',
  D = 'Declined',
  X = 'Expired',
}
