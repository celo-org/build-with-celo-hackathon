import { useFormik } from "formik";
import GradientButton from "../../../../../../tools/Button/GradientButton";
import TextField from "../../../../../../tools/Inputs/TextField";

import FileUploader from "../../../../../Components/FileUploader";
import { BusinessLicenseValidationSchema } from "../validation";

export default function LicenseFinal({ finalSubmit, handlePrev, formData }) {
  const formik = useFormik({
    initialValues: {
      licenseDocName: "",
      licenseDoc: "",
    },
    validationSchema: BusinessLicenseValidationSchema,
    onSubmit: (values) => {
      let temp = { ...formData, ...values };
      finalSubmit(temp);
    },
  });

  return (
    <div
      className="bg-[#20232A]  w-full mb-2 mt-2"
      style={{ borderRadius: "17px" }}
    >
      <div style={{ marginBottom: 3 }}>Business license proof</div>
      <form onSubmit={formik.handleSubmit}>
        <div
          className="justify-between bg-[#292C33]"
          style={{
            display: "flex",
            padding: "10px 10px",
            paddingBottom: 15,
            borderRadius: 16,
          }}
        >
          <TextField
            name="licenseDocName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-1/2 mr-2"
            label="Document Name"
            placeholder="Enter Document Name"
            error={
              formik.touched.licenseDocName && formik.errors.licenseDocName
                ? formik.errors.licenseDocName
                : null
            }
          ></TextField>
          <FileUploader
            name="licenseDoc"
            handleFile={(file) => {
              formik.setFieldValue("licenseDoc", file);
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.licenseDoc && formik.errors.licenseDoc
                ? formik.errors.licenseDoc
                : null
            }
            label="Upload Document"
            className="w-1/2 ml-2"
          />
        </div>

        <div
          style={{ display: "flex", marginTop: 40 }}
          className="flex-row justify-around w-full "
        >
          <GradientButton onClick={handlePrev}>Back</GradientButton>
          <GradientButton type="submit">Submit</GradientButton>
        </div>
      </form>
    </div>
  );
}
