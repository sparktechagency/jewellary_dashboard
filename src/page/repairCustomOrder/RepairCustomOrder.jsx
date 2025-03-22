import { Table, Input, Space, Modal, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";
import { MdModeEditOutline } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/header/profileLogo.png";
import { RepairCustomEdit } from "./RepairCustomEdit";
import Navigate from "../../Navigate";
import { useGetOrderRepairQuery } from "../redux/api/orderApi";

const RepairCustomOrder = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  console.log(selectedRecord)
  const [editModal, setEditModal] = useState(false);
  const { data: orderRepair, error, isLoading } = useGetOrderRepairQuery();
  const navigate = useNavigate();

  // Handle loading, error, or no data scenarios
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching orders</div>;
  if (!orderRepair || orderRepair.length === 0) return <div>No orders found</div>;

  const openModal = (record) => {
    setSelectedRecord(record);
    setModal2Open(true);
  };

  const closeModal = () => {
    setModal2Open(false);
    setSelectedRecord(null);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditModal(true);
  };

  // Map the data from the API to the format used by the table
  const userData = orderRepair.map((order, index) => ({
    key: order._id,
    sl: index + 1,
    orderType: order.order_type,
    name: order.custom_order_details.name,
    shippingAddress: order.custom_order_details.address,
    date: new Date(order.createdAt).toLocaleDateString(),
    contactNumber: order.custom_order_details.phone,
    jewelry_type: order.custom_order_details.jewelry_type,
    email: order.custom_order_details.email,
    description: order.custom_order_details.description,
    order_status: order.order_status,
    custom_order_price: order.custom_order_price,
    paymentStatus: order.payment_status,
    image_url: order.custom_order_details.image_url,
  }));

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      width: 70,
      align: "center",
    },
    {
      title: "Order Type",
      dataIndex: "orderType",
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
 
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
    },
    {
      title: "Payment Status",
      key: "payment",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button className="bg-[#D9F2DD] text-[#359742] rounded-full py-1 px-5">
            {record.paymentStatus}
          </button>
        </div>
      ),
    },
    {
      title: "Order Status",
      key: "order",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button className="bg-[#D9F2DD] text-[#359742] rounded-full py-1 px-5">
            {record.order_status}
          </button>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button className="" onClick={() => openModal(record)}>
            <span className="bg-black text-[white] w-[35px] h-[35px] flex justify-center items-center rounded text-xl ">
              <LuEye />
            </span>
          </button>
          <button
            onClick={() => handleEdit(record)}
            className="bg-[#0022FF] text-[white] w-[35px] h-[35px] flex justify-center items-center rounded text-xl "
          >
            <MdModeEditOutline />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-screen bg-white p-3">
      <div className="flex justify-between ">
        <Navigate title={'Repair/Custom Order'}></Navigate>
        <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          style={{ marginBottom: "16px", maxWidth: "300px" }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={userData}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />

      <Modal
        centered
        open={modal2Open}
        onCancel={closeModal}
        footer={null}
        closable={true}
        width={800}
        className="no-border-radius-modal"
        closeIcon={<span className="text-lg text-black">×</span>}
      >
        <div className="flex justify-center py-8">
          <img
            className="w-[70px] h-[70px] "
            src={selectedRecord?.image_url}
            alt="profile"
          />
        </div>
        <div>
          <div className="grid grid-cols-2">
            <div className="text-md gap-4 space-y-3 font-semibold">
              <h4>Name</h4>
              <h4>Date</h4>
              <h4>Phone</h4>
              <h4>Shipping Address</h4>
              <h4>Email:</h4>
              <h4>Jewelry type</h4>
              <h4>Price</h4>
              <h4>Payment Status:</h4>
              <h4>Order Status</h4>
            </div>
            <div className="gap-4 text-md space-y-3">
              <h3>{selectedRecord?.name}</h3>
              <h3>{new Date(selectedRecord?.createdAt).toLocaleDateString() || "N/A"}</h3>
              <h3>{selectedRecord?.contactNumber || "N/A"}</h3>
              <h3>{selectedRecord?.shippingAddress || "N/A"}</h3>
              <h3>{selectedRecord?.email || "N/A"}</h3>
              <h3>{selectedRecord?.jewelry_type || "N/A"}</h3>
             
              <h3>{selectedRecord?.paymentStatus || "N/A"}</h3>
              <h3>{selectedRecord?.custom_order_price || "N/A"}</h3>
              <h3>{selectedRecord?.order_status || "N/A"}</h3>
              
            </div>
          </div>
          <h1 className="mt-3"><span className="font-semibold">Description:</span> {selectedRecord?.description || "N/A"}</h1>
        </div>
      </Modal>
      <RepairCustomEdit
        editModal1={editModal}
        setEditModal1={setEditModal}
        selectedRecord={selectedRecord}
      />
    </div>
  );
};

export default RepairCustomOrder;
