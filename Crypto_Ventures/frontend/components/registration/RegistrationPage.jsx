import { BsFillPersonFill } from "react-icons/bs";
import { BtnPrimary } from "../shared/Button";
import CapitalInput from "./CapitalInput";
import PhoneInput from "./PhoneInput";
import TextArea from "./TextArea";
import TextField from "./TextField";

const RegistrationPage = () => {
  return (
    <div className="w-full flex ">
      <div className="w-3/5 pt-20">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="flex">
            <div className="flex-grow">
              <h3 className="text-3xl">
                Are You a Creative <br />
                seeking for
                <br /> Funding?
              </h3>
              <h4 className="text-2xl"> Register With Us!</h4>
            </div>
            <div className="">
              <div className="flex items-center text-blue-600">
                <p>Already a member?&nbsp;</p>
                <BsFillPersonFill />
              </div>
              <button className="bg-black px-7 py-1 my-2 rounded-full text-white border-none">
                Connect wallet
              </button>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between my-3">
            <TextField label={"First name"} placeholder="John" />
            <TextField label={"Last name"} placeholder="Doe" />
          </div>
          <div className="flex justify-between my-3">
            <TextField
              label={"Email"}
              placeholder="John@mail.com"
              type="email"
            />
            <TextField
              label={"Your startup title"}
              placeholder="Doe startups"
            />
          </div>
          <div className="flex justify-between my-3">
            <div className="flex flex-col mx-4 w-1/2">
              <PhoneInput
                label={"Email"}
                placeholder="John@mail.com"
                type="email"
              />
              <CapitalInput
                label={"Your startup title"}
                placeholder="Doe startups"
              />
            </div>
            <div className="flex flex-col mx-4 w-1/2">
              <TextArea
                label={"Briefly describe your startup"}
                placeholder="Lorem ipsum dolor sit amet "
              />
            </div>
          </div>
          <hr className="my-4" />
          <span className="text-[#33333355] mx-4 text-sm">(optional)</span>
          <div className="flex justify-between mb-3">
            <TextField label={"First name"} placeholder="" type="password" />
            <TextField label={"Last name"} placeholder="" type="password" />
          </div>
          <div className="flex flex-row-reverse mx-4 ">
            <BtnPrimary width="fit" px="16">
              Register
            </BtnPrimary>
          </div>
          <hr className="my-4" />
          <div className="flex">
            <input type="checkbox" name="tnc" id="" className="mr-4" />
            <span>
              I agree with{" "}
              <span className="text-[#4743E0]">terms and conditions</span>
            </span>
          </div>
        </div>
      </div>
      <div className="w-2/5">
        <img
          src="png/buildings.png"
          alt=""
          className="w-[40vw] h-screen object-cover fixed"
        />
      </div>
    </div>
  );
};
export default RegistrationPage;
