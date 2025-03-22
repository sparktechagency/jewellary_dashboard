import { Table, Modal, Space } from "antd";
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { AddItem } from "./AddItem";
import { EditItem } from "./EditItem";
import { useGetAllProductQuery } from "../redux/api/categoryApi";
import Navigate from "../../Navigate";

const Items = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: allProduct } = useGetAllProductQuery();
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();

  // Open Modal for Item details
  const openModal = (record) => {
  
    setSelectedRecord(record);
    setModal2Open(true);
  };

  const closeModal = () => {
    setModal2Open(false);
    setSelectedRecord(null);
  };

  // Edit Item
  const handleEdit = (record) => {
    setSelectedProduct(record);
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
      title: "Item Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      render: (category) => category || "N/A",
    },
    {
      title: "Sub-Category",
      dataIndex: "sub_category",
      render: (subcategory) => subcategory || "N/A",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Order Status",
      key: "status",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button
            type="primary"
            className="bg-[#D9F2DD] text-[#359742] rounded-full py-1 px-5"
          >
            {record.availability}
          </button>
        </div>
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button className="" onClick={() => openModal(record)}>
            <span className="bg-black text-[white] w-[35px] h-[35px] flex justify-center items-center rounded text-xl ">
              <LuEye />
            </span>
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
          <button
            onClick={() => handleEdit(record)}
            className="bg-[#0022FF] text-[white] w-[35px] h-[35px] flex justify-center items-center rounded text-xl "
          >
            <MdModeEditOutline />
          </button>
          <button className="">
            <span className="bg-[#DC4600] text-[white] w-[35px] h-[35px] flex justify-center items-center rounded text-xl ">
              <RiDeleteBin6Line />
            </span>
          </button>
        </Space>
      ),
    },
  ];

  const userData = allProduct?.products?.map((product, index) => {

    return {
      key: product._id,
      id: product._id,
      sl: index + 1,
      name: product.name,
      details: product.details,
      discount_price: product?.discount_price,
      image_urls: product.image_urls,
      sizes: product.sizes,
      colors: product.colors,
      
      categoryName:
        product.category?.subcategory_of?.name || product.category?.name,
      sub_category: product.category?.subcategory_of?.name
        ? product.category?.name
        : "N/A",
      price: product.price || product.price,
      availability: product.availability,
      description: product.description,
      category: product.category?._id,

    };
  });

  return (
    <div className="h-screen bg-white p-3">
      <div className="flex justify-between ">
        <Navigate title={"Items"}></Navigate>
        <button
          onClick={() => setOpenAddModal(true)}
          className="text-white bg-black py-2 px-4"
        >
          + Add New
        </button>
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
        width={600}
        className="no-border-radius-modal"
        closeIcon={<span className="text-lg text-black">×</span>}
      >
        <div className="flex  py-8">
          {/* {selectedRecord.image_urls.map((item)=> <img
            className="w-[70px] h-[70px] rounded-full"
            src={item}
            alt="profile"
          />)} */}
          <div className="grid grid-cols-4 gap-3">
            {selectedRecord?.image_urls?.map((img, index) => (
              <img
                key={index}
                className="w-full "
                src={img}
                alt={`image-${index}`}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between ">
            <div className=" font- gap-4 space-y-4">
              <h4>Item Name : </h4>
              <h4>Category :</h4>
              <h4>Sub-Category :</h4>
              <h4>Price :</h4>
              <h4>Discount Price :</h4>
              <h4>Size :</h4>
              <h4>Color :</h4>
              <h4>Status:</h4>
              <h4>Short Description :</h4>
         
            </div>
            <div className="gap-4  space-y-4">
              <h3>{selectedRecord?.name}</h3>
              <h3>{selectedRecord?.category}</h3>
              <h3>{selectedRecord?.sub_category}</h3>
              <h3>{selectedRecord?.price}</h3>
              <h3>{selectedRecord?.discount_price}</h3>
              <h3 className="flex gap-1">
                {selectedRecord?.sizes?.map((img, index) => (
                  <h1 className="border  px-2">{img}</h1>
                ))}
              </h3>
              <h3 className="flex gap-1">
                {selectedRecord?.colors?.map((img, index) => (
                  <h1 className="border  px-2">{img}</h1>
                ))}
              </h3>
              <h3>{selectedRecord?.availability}</h3>
              <h3>{selectedRecord?.details}</h3>
            </div>
          </div>
        </div>
      </Modal>
      <AddItem
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      ></AddItem>
      <EditItem editModal1={editModal} setEditModal1={setEditModal} selectedProduct={selectedProduct}></EditItem>
    </div>
  );
};

export default Items;
