import { Table, Space, message } from "antd";
import { MdModeEditOutline, MdOutlineArrowOutward } from "react-icons/md";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CategoryEdit } from "./CategoryEdit";
import Navigate from "../../Navigate";
import { AddCategories } from "./AddCategories";
import { useGetCategoryQuery } from "../redux/api/categoryApi";

const Categories = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: category, isLoading, error } = useGetCategoryQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editModal, setEditModal] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to fetch categories!</p>;

  // Table data mapping
  const categoryData = category?.map((item, index) => ({
    key: item._id,
    sl: index + 1,
    categoryName: item.name,
    details: item.details,
    image: item.img_url,
  }));

  const handleEdit = (record) => {
    setSelectedCategory(record);
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
      title: "Category Name",
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
      title: "Category Details",
      dataIndex: "details",
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button>
            <Link to={`/dashboard/categories/sub-categories/${record.key}`}>
              <span className="border text-black w-[35px] h-[35px] flex justify-center items-center rounded text-xl ">
                <MdOutlineArrowOutward />
              </span>
            </Link>
          </button>
          <button
            onClick={() => handleEdit(record)}
            className="bg-[#0022FF] text-white w-[35px] h-[35px] flex justify-center items-center rounded text-xl "
          >
            <MdModeEditOutline />
          </button>
          <button className="bg-[#DC4600] text-white w-[35px] h-[35px] flex justify-center items-center rounded text-xl ">
            <RiDeleteBin6Line />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-screen bg-white p-3">
      <div className="flex justify-between">
        <Navigate title={"Categories"} />
        <button
          onClick={() => setOpenAddModal(true)}
          className="text-white bg-black py-2 px-4"
        >
          + Add New
        </button>
      </div>
<br />
      <Table
        columns={columns}
        dataSource={categoryData}
        pagination={false}
      />

      <AddCategories
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      />
      <CategoryEdit editModal1={editModal} setEditModal1={setEditModal} selectedCategory={selectedCategory}/>
    </div>
  );
};

export default Categories;
