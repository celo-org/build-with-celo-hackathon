import * as Yup from "yup";

export const BusinessIncorValidationSchema = Yup.object().shape({
  incorpDocName: Yup.string().label("Document Name"),

  incorpDoc: Yup.mixed(),
});

export const BusinessProofValidationSchema = Yup.object().shape({
  identityDocName: Yup.string().label("Document Name"),
  identityDoc: Yup.mixed(),
  addressDocName: Yup.string().label("Document Name"),
  addressDoc: Yup.mixed(),
});

export const BusinessLicenseValidationSchema = Yup.object().shape({
  licenseDocName: Yup.string().label("Document Name"),

  licenseDoc: Yup.mixed(),
});
