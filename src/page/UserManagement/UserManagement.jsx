import { Table, Input, Space, Spin, message } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../Navigate";
import { useBlockUserMutation, useGetAllUserManagementQuery } from "../redux/api/userApi";

const UserManagement = () => {
  const { data: userManagement, isLoading } = useGetAllUserManagementQuery();
  const [loadingId, setLoadingId] = useState(null);
  const[blockUser] = useBlockUserMutation()
  const navigate = useNavigate();


  const userData =
    userManagement?.users?.map((user, index) => ({
      key: user._id,
      sl: index + 1,
      userName: user.name,
      email: user.email,
      contactNumber: user.phone,
      address: `${user.shipping_address.street_address}, ${user.shipping_address.city}, ${user.shipping_address.state}, ${user.shipping_address.zip_code}`,
      status: user.account_status,
    })) || [];

    const handleBlockUnblock = async (record) => {
      setLoadingId(record.key);
      console.log(record.key)
    
      try {
        const response = await blockUser(record.key).unwrap();
    
        if (response) {
          console.log(response)
          message.success(response?.message);
        } 
      } catch (error) {
        console.error("Error updating user status:", error);
        message.error(error?.data?.message);
      }
    
      setLoadingId(null);
    };
    
    

  const columns = [
    { title: "SL no.", dataIndex: "sl", width: 70, align: "center" },
    { title: "User's Name", dataIndex: "userName", width: 150 },
    { title: "Email", dataIndex: "email" },
    { title: "Mobile Number", dataIndex: "contactNumber" },
    { title: "Address", dataIndex: "address" },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button
             onClick={() => handleBlockUnblock(record)}
            className={`${ 
              record.status === "Banned" ? "bg-red-600" : "bg-gray-600"
            } text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md`}
            disabled={loadingId === record.key}
          >
            {loadingId === record.key ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : (
              <MdBlockFlipped />
            )}
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-screen bg-white p-3">
      <div className="flex justify-between">
        <Navigate title={"User Managements"} />
        <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          style={{ marginBottom: "16px", maxWidth: "300px" }}
        />
      </div>

      {isLoading ? (
        <Spin size="large" className="flex justify-center items-center h-96" />
      ) : (
        <Table columns={columns} dataSource={userData} pagination={false} />
      )}
    </div>
  );
};

export default UserManagement;
