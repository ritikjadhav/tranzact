import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Ritik",
      lastName: "Jadhav",
      _id: 1,
    },
  ]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">Users</h2>
      <input
        className=" w-full border rounded-md mt-4 p-2 px-4"
        type="text"
        placeholder="Search users..."
      />
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-8">
      <div className="flex items-center">
        <div className="flex items-center justify-center bg-slate-200 rounded-full w-10 h-10 mr-4">
          <span className="text-lg text-[#002970]">{user.firstName[0]}</span>
        </div>
        <span className="font-bold">
          {user.firstName} {user.lastName}
        </span>
      </div>
      <button
        onClick={() => {
          navigate("/send");
        }}
        className="bg-[#002970] hover:bg-[#00baf2] hover:bg-black-900 text-white rounded-lg px-6"
      >
        Send Money
      </button>
    </div>
  );
};

export default Users;
