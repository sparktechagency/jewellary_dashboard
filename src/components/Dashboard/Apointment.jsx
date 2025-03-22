import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { IoCheckmarkSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Apointment = () => {
  const [open, setOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const dataSource = [
    {
      key: "1",
      userName: "Cameron Salons",
      schedule: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
      email: "sadgfjdg@gmail.com",
      phone: "+3489 9999 9778",
      note: "AB Bank",
      action:'accept',
      image: "https://via.placeholder.com/40",
    },
  ];

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <img src={record.image} alt="userName" className="w-8 h-8 rounded-full" />
          <span>{text}</span>
        </div>
      ),
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
    {
      title: "Contact Number",
      dataIndex: "phone",
      key: "phone",
    },
   
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
    },
    {
        title: "Note",
        dataIndex: "note",
        key: "note",
      },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex space-x-2">
          <button
            type="primary"
            className="bg-[#0022FF] text-[white] w-[35px] h-[35px] flex justify-center items-center rounded text-xl "
          >
            <IoCheckmarkSharp />
          </button>
          <button
            className="bg-[#DC4600] text-white w-[35px] h-[35px] flex justify-center items-center rounded text-xl"
            type="primary"
            danger
          >
           <RxCross2 />
          </button>
        </div>
      ),
    },
    {
      title: "View Details",
      key: "viewDetails",
      render: (record) => (
        <Button
          onClick={() => {
            setSelectedShop(record);
            setOpen(true);
          }}
          shape=""
          icon={<EyeOutlined />}
          style={{ backgroundColor: "#040404", color: "white" }}
        />
      ),
    },
  ];
  return (
    <div className="p-3 bg-white mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold pb-2">Appointments</h2>
        <button className="text-[#0022FF]"><Link to={'/dashboard/Appointment'}>View all</Link></button>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      <Modal
        title="Details"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={500}
      >
        {selectedShop && (
          <div>
            <p>
              <strong>User Name:</strong> {selectedShop.userName}
            </p>
            <p>
              <strong>Email</strong> {selectedShop.email}
            </p>
            <p>
              <strong>Phone Number</strong>{" "}
              {selectedShop.phone}
            </p>
            
            <p>
              <strong>Schedule</strong> {selectedShop.schedule}
            </p>
            <p>
              <strong>Action</strong> {selectedShop.action}
            </p>
            <p>
              <strong>NOte</strong> {selectedShop.note}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Apointment;
