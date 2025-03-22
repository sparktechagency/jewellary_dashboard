import { Table, Input, Space, Modal, Spin, message } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped, MdModeEditOutline, MdOutlineArrowOutward } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../../assets/header/profileLogo.png";

import img from "../../assets/header/img1.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CategoryEdit } from "./CategoryEdit";
import { SubCategoryEdit } from "./SubCategoryEdit";
import Navigate from "../../Navigate";
import { AddSubCategories } from "./AddSubCategories";
import { useGetSubCategoryQuery } from "../redux/api/categoryApi";

const SubCategory = () => {
  const { id } = useParams();
  const { data: subCategoryData, isLoading } = useGetSubCategoryQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const userData = subCategoryData?.subcategories?.map((item, index) => ({
    key: item._id,
    sl: index + 1,
    categoryName: item.name,
    image: item.img_url,
  })) || [];

  

 

  
  const handleEdit = (record) => {
    setSelectedSubCategory(record);
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
      title: "Sub-Category Name",
      dataIndex: "categoryName",
    },
    {
      title: "Image",
      key: "image",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center">
          <img
            className="w-16 h-16 object-cover rounded"
            src={record.image}
            alt={record.categoryName}
          />
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

  return (
    <div className="h-screen bg-white p-3">
      <div className="flex justify-between">
        <Navigate title={"Sub-Categories"} />
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-black py-2 px-4 text-white"
        >
          + Add New
        </button>
      </div>

<br />
      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={userData}
          pagination={false}
        />
      )}

      <AddSubCategories
      subCategoryData={subCategoryData}
      id={id}
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      />
      <SubCategoryEdit subCategoryData={subCategoryData} editModal1={editModal} setEditModal1={setEditModal} selectedSubCategory={selectedSubCategory}/>
    </div>
  );
};

export default SubCategory;
