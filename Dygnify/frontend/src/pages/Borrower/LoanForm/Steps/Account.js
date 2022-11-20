import { useFormik } from "formik";
import GradientButton from "../../../../tools/Button/GradientButton";
import TextArea from "../../../../tools/Inputs/TextArea";
import TextField from "../../../../tools/Inputs/TextField";
import { loanDetailsValidationSchema } from "../../../LoanForm/validations/validation";

export default function Account({ formData, handleNext, handleForm }) {
  const formik = useFormik({
    initialValues: formData,
    validationSchema: loanDetailsValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("clicked", values);
      handleNext(values, false);
    },
  });

  return (
    <>
      <div style={{ display: "flex" }} className="flex-col ">
        <form onSubmit={formik.handleSubmit}>
          <div style={{ display: "flex" }}>
            <TextField
              name="loan_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-1/2 mr-2"
              label="Pool Name"
              placeholder="Enter Pool Name"
              error={
                formik.touched.loan_name && formik.errors.loan_name
                  ? formik.errors.loan_name
                  : null
              }
            ></TextField>
            <TextField
              name="loan_amount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.loan_amount && formik.errors.loan_amount
                  ? formik.errors.loan_amount
                  : null
              }
              className="w-1/2 ml-2"
              label="Loan Amount"
              placeholder="Enter Loan Name"
            ></TextField>
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              name="loan_tenure"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.loan_tenure && formik.errors.loan_tenure
                  ? formik.errors.loan_tenure
                  : null
              }
              className="w-1/2 mr-2"
              label="Loan Tenure"
              placeholder="Enter Loan Tenure"
            ></TextField>
            <TextField
              name="payment_frequency"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.payment_frequency &&
                formik.errors.payment_frequency
                  ? formik.errors.payment_frequency
                  : null
              }
              className="w-1/2 ml-2"
              label="Repayment Frequency"
              placeholder="Enter Repayment Frequency"
            ></TextField>
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              name="loan_interest"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.loan_interest && formik.errors.loan_interest
                  ? formik.errors.loan_interest
                  : null
              }
              className="w-1/2 mr-2"
              label="Loan Interest"
              placeholder="Enter Loan Interest"
            ></TextField>
            <div className="w-1/2 ml-2">
              <label class="label">
                <span class="text-white">Loan Type</span>
              </label>
              <select
                className="input input-bordered w-full"
                style={{
                  backgroundColor: "#24272F",
                  border: "2px solid #3A3C43",
                  borderRadius: "8px",
                }}
                name="loan_type"
                defaultValue={"0"}
                value={formik.values.loan_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.loan_type && formik.errors.loan_type
                    ? formik.errors.loan_type
                    : null
                }
              >
                <option value="0">Bullet Loan</option>
                <option value="1">Term Loan</option>
              </select>

              {formik.touched.loan_type && formik.errors.loan_type ? (
                <p style={{ color: "red" }}>
                  <small>{formik.errors.loan_type}</small>
                </p>
              ) : null}
            </div>
          </div>
          <TextArea
            name="loan_purpose"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.loan_purpose && formik.errors.loan_purpose
                ? formik.errors.loan_purpose
                : null
            }
            className="w-full"
            label="Loan Purpose"
            placeholder="Short Summary on Purpose of Loans"
          ></TextArea>

          <div
            style={{ display: "flex", marginTop: 20 }}
            className="flex-row justify-between w-full items-center content-center "
          >
            <div
              style={{ display: "flex" }}
              className="justify-center flex-row w-1/3"
            >
              <label
                onClick={handleForm}
                style={{
                  cursor: "pointer",
                  marginLeft: 5,
                  display: "flex",
                  marginLeft: 50,
                }}
              >
                Cancel
              </label>
            </div>
            <GradientButton type="submit">Next</GradientButton>
          </div>
        </form>
      </div>
    </>
  );
}
