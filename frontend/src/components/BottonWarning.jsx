import { Link } from "react-router-dom";

const BottomWarning = ({ label, linkText, to }) => {
  return (
    <div className="flex justify-center py-2 text-sm">
      <div>{label}</div>
      <Link className="underline pl-1" to={to}>
        {linkText}
      </Link>
    </div>
  );
};

export default BottomWarning;
