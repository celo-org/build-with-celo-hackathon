import { useFormik } from "formik";
import GradientButton from "../../../../../../tools/Button/GradientButton";
import TextField from "../../../../../../tools/Inputs/TextField";

import FileUploader from "../../../../../Components/FileUploader";
import { BusinessIncorValidationSchema } from "../validation";

export default function Incorporation({ handleNext, handlePrev, formData }) {
  const formik = useFormik({
    initialValues: {
      incorpDocName: "",
      incorpDoc: "",
    },
    validationSchema: BusinessIncorValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleNext(values, true);
    },
  });

  return (
    <div
      className="bg-[#20232A]  w-full mb-2 mt-2"
      style={{ borderRadius: "17px" }}
    >
      <div style={{ marginBottom: 3 }}>Business incorporation proof</div>
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
            name="incorpDocName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-1/2 mr-2"
            label="Document Name"
            placeholder="Enter Document Name"
            error={
              formik.touched.incorpDocName && formik.errors.incorpDocName
                ? formik.errors.incorpDocName
                : null
            }
          ></TextField>
          <FileUploader
            name="incorpDoc"
            handleFile={(file) => {
              formik.setFieldValue("incorpDoc", file);
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.incorpDoc && formik.errors.incorpDoc
                ? formik.errors.incorpDoc
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
          <GradientButton type="submit">Next</GradientButton>
        </div>
      </form>
    </div>
  );
}
