interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Primary Caregiver'],
  customerRoles: [],
  tenantRoles: ['Primary Caregiver', 'Secondary Caregiver', 'Sleep Consultant'],
  tenantName: 'Organization',
  applicationName: 'SleepBaby',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
