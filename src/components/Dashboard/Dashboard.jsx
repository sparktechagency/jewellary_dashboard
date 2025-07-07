import IncomeOverVeiw from "./IncomeOverVeiw";
import UserGrowth from "./UserGrowth";
import img1 from "../../assets/header/img2.png";
import img2 from "../../assets/header/img3.png";
import img3 from "../../assets/header/img4.png";
import img4 from "../../assets/header/img5.png";
import { Link } from "react-router-dom";
import { useGetAppointmentQuery, useGetDashboradQuery } from "../../page/redux/api/manageApi";
import { Button, Modal, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [incomeYear, setIncomeYear] = useState(null);
  const [userGrowthYear, setUserGrowthYear] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const { data: appointment = [] } = useGetAppointmentQuery();

  
  const { data: dashboard } = useGetDashboradQuery({ income_year: incomeYear, user_growth_year: userGrowthYear })
  // const { data: dashboard } = useGetDashboradQuery({ income_year: incomeYear, user_growth_year: userGrowthYear })

  console.log('Dashboard rendered');

  const dataSource = appointment?.appointments?.slice(0, 5)?.map((item, index) => ({
    key: index + 1,
    userName: item.name,
    email: item.email,
    phone: item.phone,
    schedule: `${new Date(item.start).toLocaleString()} - ${new Date(
      item.end
    ).toLocaleString()}`,
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
          <img
            src={record.image}
            alt="userName"
            className="w-8 h-8 rounded-full"
          />
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
    <div className=" min-h-screen">
      <div className="  grid grid-cols-4 gap-4 text-center pb-4">
        <div className="bg-white py-6 rounded-md">
          <p className=" mt-3 text-2xl">Total User</p>
          <div className="flex justify-center my-4">
            <img className="w-[60px] h-[60px]" src={img1} alt="" />
          </div>
          <h1 className="text-3xl font-bold">{dashboard?.total_users || 0}</h1>
        </div>
        <div className=" bg-white py-6 rounded-md">
          <p className=" mt-3 text-2xl">Order Completed</p>

          <div className="flex justify-center my-4">
            <img className="w-[60px] h-[60px]" src={img2} alt="" />
          </div>
          <h1 className="text-3xl font-bold">{dashboard?.orders_completed || 0}</h1>
        </div>
        <div className=" bg-white py-6 rounded-md">
          <p className=" mt-3 text-2xl">Total Income</p>
          <div className="flex justify-center my-4">
            <img className="w-[60px] h-[60px]" src={img3} alt="" />
          </div>
          <h1 className="text-3xl font-bold">{dashboard?.total_income || 0}</h1>
        </div>
        <div className=" bg-white py-6 rounded-md">
          <p className=" mt-3 text-2xl">Total Items</p>
          <div className="flex justify-center my-4">
            <img className="w-[60px] h-[60px]" src={img4} alt="" />
          </div>
          <h1 className="text-3xl font-bold">{dashboard?.total_items || 0}</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded p-3">
          <IncomeOverVeiw income_overview={dashboard?.income_overview} setIncomeYear={setIncomeYear}></IncomeOverVeiw>
        </div>
        <div className="bg-white rounded">
          <UserGrowth user_growth={dashboard?.user_growth} setUserGrowthYear={setUserGrowthYear}></UserGrowth>
        </div>
      </div>

      <div>
        <div className="flex bg-white justify-between items-center px-4 mt-4">
          <h2 className="text-lg font-semibold pb-2">Appointments</h2>
          <button className="text-[#0022FF]">
            <Link to={'/dashboard/Appointment'}>View all</Link>
          </button>
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
              <p>
                <strong>User Name:</strong> {selectedShop.userName}
              </p>
              <p>
                <strong>Email:</strong> {selectedShop.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedShop.phone}
              </p>
              <p>
                <strong>Schedule:</strong> {selectedShop.schedule}
              </p>

              <p>
                <strong>Note:</strong> {selectedShop.note}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
