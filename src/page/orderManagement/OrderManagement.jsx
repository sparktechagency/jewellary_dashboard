import { Table, Input, Space, Modal, Spin, message } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped, MdModeEditOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../Navigate";
import { useGetOrderQuery } from "../redux/api/orderApi";
import OrderEdit from "./OrderEdit";
const OrderManagement = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  console.log(selectedRecord)
  const [editModal, setEditModal] = useState(false);
  const { data: orderData, isLoading, isError } = useGetOrderQuery();
  const navigate = useNavigate();

  if (isLoading) return <Spin indicator={<LoadingOutlined />} />;
  if (isError) return <p>Failed to load orders</p>;

  const orders = orderData?.map((order, index) => ({
    key: order._id,
    sl: index + 1,
    date: new Date(order.createdAt).toLocaleDateString(),
    total: order.ready_made_details.products.reduce(
      (sum, item) => sum + (item.product_id.discount_price || item.product_id.price) * item.quantity,
      0
    ),
    shippingAddress: order.ready_made_details.shipping_address,
    paymentStatus: order.payment_status,
    orderStatus: order.order_status,
    details: order,
  }));

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

  const columns = [
    { title: "SL no.", dataIndex: "sl", width: 70, align: "center" },
    { title: "Date", dataIndex: "date" },
    { title: "Total", dataIndex: "total" },
    { title: "Shipping Address", dataIndex: "shippingAddress" },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (text) => (
        <button className="bg-[#D9F2DD] text-[#359742] rounded-full py-1 px-5">
          {text}
        </button>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (text) => (
        <button className="bg-[#D9F2DD] text-[#359742] rounded-full py-1 px-5">
          {text}
        </button>
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => openModal(record)}>
            <span className="bg-black text-white w-9 h-9 flex justify-center items-center rounded text-xl">
              <LuEye />
            </span>
          </button>
          <button onClick={() => handleEdit(record)}>
            <span className="bg-[#0022FF] text-white w-9 h-9 flex justify-center items-center rounded text-xl">
              <MdModeEditOutline />
            </span>
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-screen bg-white p-3">
      <div className="flex justify-between">
        <Navigate title={"Order Management"} />
        <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          style={{ marginBottom: "16px", maxWidth: "300px" }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={orders}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />

      {/* Modal for Order Details */}
      <Modal
        centered
        open={modal2Open}
        onCancel={closeModal}
        footer={null}
        closable={true}
        width={800}
        closeIcon={<span className="text-lg text-black">×</span>}
      >
        {selectedRecord && (
          <div>
            <div className="grid grid-cols-2 ">
              <div className="text-md gap-4 space-y-3">
            
                <h4>Shipping Address:</h4>
                <h4>Order Date:</h4>
                <h4>Total Price:</h4>
                <h4>Payment Status:</h4>
                <h4>Order Status:</h4>
              </div>
              <div className="gap-4 text-md space-y-3">
              
                <h3>{selectedRecord.shippingAddress}</h3>
                <h3>{selectedRecord.date}</h3>
                <h3>${selectedRecord.total}</h3>
                <h3>{selectedRecord.paymentStatus}</h3>
                <h3>{selectedRecord.orderStatus}</h3>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-bold">Order Items:</p>
              <div className="border rounded p-2">
                {selectedRecord.details.ready_made_details.products.map(
                  (item, index) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div>
                      <p>Color: {item.color}</p>
                      </div>
                      <div>
                      <p>Size: {item.size}</p>
                      </div>
                      <div>
                        <p className="font-medium">{item.product_id.name}</p>
                        
                       
                      </div>
                      <div>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <div>
                        <p>Price: ${item.product_id.discount_price  || item.product_id.price}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
      <OrderEdit editModal={editModal}
        setEditModal={setEditModal} selectedRecord={selectedRecord}></OrderEdit>

    </div>
  );
};

export default OrderManagement;
