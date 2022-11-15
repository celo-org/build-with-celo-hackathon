import * as Yup from "yup";

export const loanDetailsValidationSchema = Yup.object().shape({
  loan_name: Yup.string().label("Loan Name"),
  loan_type: Yup.mixed().label("Loan Type"),
  loan_purpose: Yup.string().label("Loan Purpose"),
  loan_amount: Yup.number().positive().label("Loan Amount"),
  loan_tenure: Yup.number()
    .positive()
    .integer()
    .min(1)
    .max(100)

    .label("Loan Tenure"),
  loan_interest: Yup.number()
    .positive()
    .min(1)
    .max(100)

    .label("Loan Interest"),
  payment_frequency: Yup.number()
    .positive()
    .min(1)

    .label("Payment Frequency"),
});

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const CollateralDetailsValidationSchema = Yup.object().shape({
  collateral_document_name: Yup.string().label("Document Name"),
  collateral_document_description: Yup.string().label("Document Description"),
  collateral_document: Yup.mixed(),
  capital_loss: Yup.number()
    .positive()
    .min(0)
    .max(100)
    .label("First loss capital"),
});
