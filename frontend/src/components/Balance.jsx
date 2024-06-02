import axios from "axios";
import { useEffect, useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBalance(response.data);
    };
    fetchBalance();
  }, [balance]);
  return (
    <div>
      <span className="font-bold">Your Balance $10,000</span>
    </div>
  );
};

export default Balance;
