import BottomWarning from "../components/BottonWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center h-max p-2 px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox label={"First Name"} placeholder="Ritik" />
          <InputBox label={"Last Name"} placeholder="Jadhav" />
          <InputBox label={"Email"} placeholder="ritik@gmail.com" />
          <InputBox label={"Password"} placeholder="12345" />
          <div className="pt-4">
            <Button label={"Sign Up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            linkText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
