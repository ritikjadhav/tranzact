import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 h-max p-2 px-4">
          <Heading label={"Sign Up"} />
          <SubHeading
            description={"Enter your information to create an account"}
          />
          <InputBox />
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Signup;
