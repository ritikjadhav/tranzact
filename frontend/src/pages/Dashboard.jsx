import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
  return (
    <div className="w-full">
      <Appbar />
      <div className="mx-12 mt-10">
        <Balance />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
