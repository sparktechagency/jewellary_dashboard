import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { IoCheckmarkSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useGetAppointmentQuery } from "../../page/redux/api/manageApi";

const Apointment = () => {
  const [open, setOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const { data: appointment = [] } = useGetAppointmentQuery();

  const dataSource = appointment?.appointments?.map((item, index) => ({
    key: index + 1,
    userName: item.name,
    email: item.email,
    phone: item.phone,
    schedule: `${new Date(item.start).toLocaleString()} - ${new Date(item.end).toLocaleString()}`,
    note: item.notes,
    
    image: "https://via.placeholder.com/40",
  }));

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
       
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      <Modal
        title="Details"
        centered
        open={open}
        footer={null}
        closable={true}
        onCancel={() => setOpen(false)}
        width={500}
      >
        {selectedShop && (
          <div>
            <p><strong>User Name:</strong> {selectedShop.userName}</p>
            <p><strong>Email:</strong> {selectedShop.email}</p>
            <p><strong>Phone Number:</strong> {selectedShop.phone}</p>
            <p><strong>Schedule:</strong> {selectedShop.schedule}</p>
           
            <p><strong>Note:</strong> {selectedShop.note}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Apointment;
