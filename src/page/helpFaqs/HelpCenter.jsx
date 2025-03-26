import { Table, Input, Space, Modal, Spin, message, Pagination } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped, MdModeEditOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/header/profileLogo.png";
import { Reply } from "./Reply";
import Navigate from "../../Navigate";
import { useGetContactQuery } from "../redux/api/manageApi";

const HelpCenter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { data: contactData = [] } = useGetContactQuery({page: currentPage,
    limit: pageSize,});
  console.log(contactData)
  const navigate = useNavigate();
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const userData = contactData?.contacts?.map((item, index) => ({
    key: item._id,
    sl: index + 1,
    date: new Date(item.createdAt).toLocaleDateString(),
    userName: item.name,
    contactNumber: item.phone,
    email: item.email,
    message: item.message,
  }));

  const openModal = (record) => {
    setSelectedRecord(record);
    setModal2Open(true);
  };

  const closeModal = () => {
    setModal2Open(false);
    setSelectedRecord(null);
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
          <button onClick={() => openModal(record)}>
            <span className="bg-black text-white w-[35px] h-[35px] flex justify-center items-center rounded text-xl">
              <LuEye />
            </span>
          </button>
         
        </Space>
      ),
    },
  ];

  return (
    <div className="mx-auto h-screen bg-white p-3">
      <div className="flex justify-between pb-4">
        <Navigate title={"Help Center"} />
      </div>

      <Table
        columns={columns}
        dataSource={userData}
        pagination={false}
      />
      <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={contactData?.pagination?.totalContacts || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
            
          />
        </div>

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
              <h4>Message:</h4>
            </div>
            <div className="gap-4 text-lg">
              <h3>{selectedRecord?.userName || "N/A"}</h3>
              <h3>{selectedRecord?.date || "N/A"}</h3>
              <h3>{selectedRecord?.contactNumber || "N/A"}</h3>
              <h3>{selectedRecord?.email || "N/A"}</h3>
              <h3>{selectedRecord?.message || "N/A"}</h3>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HelpCenter;
