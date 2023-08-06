type RootStackParamList = {
  SplashScreen: undefined;
  TabsNavigator: undefined;
  SignInScreen: undefined;
  ForgotPasswordNavigator: undefined;
  SignUpNavigator: undefined;
  AdditionalStepsNavigator: undefined;
  SettingsNavigator: undefined;
  PatientAddressListScreen: undefined;
  AddEditPatientAddressScreen: { addressId: string } | undefined;
  AboutScreen: undefined;
  HealthCardScreen: undefined;
  InsuranceScreen: undefined;
  PrescriptionsScreen: undefined;
  AddMemberNavigator: undefined;
  DispensesScreen: undefined;
};

type TabsParamList = {
  HomeScreen: undefined;
  NotificationsScreen: undefined;
  ProfileScreen: undefined;
};

type SignUpParamList = {
  SignUpScreen: undefined;
  BrandsScreen: undefined;
  AboutYouScreen: undefined;
  AccountTypeScreen: undefined;
  PatientScreen: undefined;
  AlmostDoneScreen: undefined;
  ConfirmPhoneScreen: undefined;
  CreatePasswordScreen: undefined;
};

type AdditionalStepsParamList = {
  AddPrescriptionScreen: undefined;
  AddDispenceScreen: undefined;
  AddHealthCardScreen: undefined;
  AddInsurerScreen: undefined;
  ScheduleCallScreen: undefined;
};

type ForgotPasswordParamList = {
  ResetPasswordCodeScreen: undefined;
  ResetPasswordPassScreen: undefined;
  ResetPasswordPhoneScreen: undefined;
};

type SettingsParamList = {
  SettingsScreen: undefined;
  SettingsChangePhoneScreen: undefined;
  SettingsVerifyPhoneScreen: undefined;
  SettingsChangePasswordScreen: undefined;
  SettingsCreatePasswordScreen: undefined;
};

type AddMemberParamList = {
  AddMemberBrandScreen: undefined;
  AddMemberScreen: undefined;
  AddMemberAlmostDoneScreen: undefined;
  AddMemberPrescriptionsScren: undefined;
  AddMemberDispensesScreen: undefined;
  AddMemberInsurerScreen: undefined;
  AddMemberHealthCardsScreen: undefined;
};

export type {
  RootStackParamList,
  TabsParamList,
  SignUpParamList,
  AdditionalStepsParamList,
  ForgotPasswordParamList,
  SettingsParamList,
  AddMemberParamList
};
