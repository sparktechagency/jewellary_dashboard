import { Table, Input, Space, Modal, Spin, message } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped, MdModeEditOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/header/profileLogo.png";
import { Reply } from "./Reply";
import Navigate from "../../Navigate";




const HelpCenter = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();

  const userData = [
    {
      key: "1",
      sl: 1,
      userName: "John Doe",
      message: "John Doe",
      date: "1990-05-14",
      contactNumber: "1234567890",
      email: "john@example.com",
      
    },
  ];

  const openModal = (record) => {
    setSelectedRecord(record);
    setModal2Open(true);
  };

  const closeModal = () => {
    setModal2Open(false);
    setSelectedRecord(null);
  };



  const handleEdit = (record) => {
    
    setEditModal(true);
  };

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      width: 70,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      width: 150,
      render: (text) => (
        <Space>
          <img
            src="https://via.placeholder.com/32"
            alt="avatar"
            style={{ borderRadius: "50%", width: 32, height: 32 }}
          />
          {text}
        </Space>
      ),
    },
   
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "contactNumber",
    },
    {
      title: "Message",
      dataIndex: "message",
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
    <div className=" mx-auto h-screen bg-white p-3">
    <div className="flex justify-between pb-4">
      <div className="flex justify-between ">
        <Navigate title={"Help Center"}></Navigate>
      </div>
    </div>

      <Table
        columns={columns}
        dataSource={userData}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />

      <Modal
      title="Details"
        centered
        open={modal2Open}
        onCancel={closeModal}
        footer={null}
        closable={true}
        width={400}
     
        className="no-border-radius-modal"
        closeIcon={<span className="text-lg text-black">×</span>}
      >
       
        <div>
          <div className="grid grid-cols-2">
          <div className="text-lg gap-4">
              <h4>User Name</h4>
              <h4>Date</h4>
              <h4>Contact Number:</h4>
              <h4>Email:</h4>
              <h4>Status:</h4>
            </div>
            <div className="gap-4 text-lg ">
              <h3>{selectedRecord?.userName || "N/A"}</h3>
              <h3>{selectedRecord?.date || "N/A"}</h3>
              <h3>{selectedRecord?.contactNumber || "N/A"}</h3>
              <h3>{selectedRecord?.email || "N/A"}</h3>
              <h3>{selectedRecord?.message || "N/A"}</h3>
             
            </div>
          </div>
        </div>
      </Modal>
      <Reply editModal={editModal}
        setEditModal={setEditModal}></Reply>
    </div>
  );
};

export default HelpCenter;
