import { useEffect, useState } from "react";
import AdminOverview from "../../../components/Admin/AdminOverview";
import axios from "axios";

function AdminDashboard() {
  const [overViewData, setOverViewData] = useState({});
  useEffect(() => {
    axiosApi();
  }, []);
  const axiosApi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/admin/gettotalrevenue",
        {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
        }
      );
      setOverViewData(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  return <AdminOverview overViewData={overViewData} />;
}

export default AdminDashboard;
