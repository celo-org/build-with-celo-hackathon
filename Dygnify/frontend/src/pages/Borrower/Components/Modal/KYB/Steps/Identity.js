import { useFormik } from "formik";
import GradientButton from "../../../../../../tools/Button/GradientButton";
import TextArea from "../../../../../../tools/Inputs/TextArea";
import TextField from "../../../../../../tools/Inputs/TextField";
import { BusinessProofValidationSchema } from "../validation";
import FileUploader from "../../../../../Components/FileUploader";

export default function Identity({ formData, handleNext }) {
  const formik = useFormik({
    initialValues: formData,
    validationSchema: BusinessProofValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("clicked", values);
      handleNext(values, false);
    },
  });

  return (
    <>
      <div style={{ display: "flex" }} className="flex-col ">
        <form onSubmit={formik.handleSubmit}>
          <div style={{ marginTop: 20, marginBottom: 5 }}>
            Business identity proof
          </div>
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
              name="identityDocName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-1/2 mr-2"
              label="Document Name"
              placeholder="Enter Document Name"
              error={
                formik.touched.identityDocName && formik.errors.identityDocName
                  ? formik.errors.identityDocName
                  : null
              }
            ></TextField>
            <FileUploader
              name="identityDoc"
              handleFile={(file) => {
                formik.setFieldValue("identityDoc", file);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.identityDoc && formik.errors.identityDoc
                  ? formik.errors.identityDoc
                  : null
              }
              label="Upload Document"
              className="w-1/2 ml-2"
            />
          </div>
          <div style={{ marginTop: 20, marginBottom: 5 }}>
            Business address proof
          </div>
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
              name="addressDocName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-1/2 mr-2"
              label="Document Name"
              placeholder="Enter Document Name"
              error={
                formik.touched.addressDocName && formik.errors.addressDocName
                  ? formik.errors.addressDocName
                  : null
              }
            ></TextField>
            <FileUploader
              name="addressDoc"
              handleFile={(file) => {
                formik.setFieldValue("addressDoc", file);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.addressDoc && formik.errors.addressDoc
                  ? formik.errors.addressDoc
                  : null
              }
              label="Upload Document"
              className="w-1/2 ml-2"
            />
          </div>

          <div
            style={{ display: "flex", marginTop: 20 }}
            className="justify-center"
          >
            <GradientButton type="submit">Next</GradientButton>
          </div>
        </form>
      </div>
    </>
  );
}
