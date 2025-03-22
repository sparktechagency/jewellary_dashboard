import { Form, Input, message, Modal, Radio, Select, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../redux/api/categoryApi";

export const SubCategoryEdit = ({
  editModal1,
  setEditModal1,
  selectedSubCategory,
  subCategoryData
}) => {

const [updateCategory ,{ isLoading }] = useUpdateCategoryMutation()
  const id = selectedSubCategory?.key;

  const [fileList, setFileList] = useState([]);
   useEffect(() => {
     if (selectedSubCategory?.image) {
       setFileList([
         {
           uid: "-1",
           name: "category-image.png",
           status: "done",
           url: selectedSubCategory.image,
         },
       ]);
     }
   }, [selectedSubCategory]);
 
   const onChange = ({ fileList: newFileList }) => {
     setFileList(newFileList);
   };
 
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal1(false);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
  
    formData.append("id", id);
    formData.append("name", values.categoryName);
    fileList.forEach((file) => {
      formData.append("image", file.originFileObj);
    });
  

   updateCategory(formData)
         .then((response) => {
     
           setEditModal1(false);
   
           if (response) {
             message.success(response?.data?.message);
             form.resetFields();
           }
           setFileList([]);
         
         })
         .catch((error) => {
           message.error(error?.data?.message);
           console.error("Error submitting form:", error);
         });
  
  };

  useEffect(() => {
    if (selectedSubCategory) {
      form.setFieldsValue({
        categoryName: selectedSubCategory?.categoryName,
        
      });
    }
  }, [selectedSubCategory, form]);
  return (
    <Modal
      centered
      open={editModal1}
      onCancel={handleCancel}
      footer={null}
      width={400}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Edit</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Package Name */}

          <Form.Item
            label="Category Name"
            name="parent"
            initialValue={subCategoryData?.name}
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input
              disabled
              className="py-2"
              type="price"
              placeholder="Enter Category"
            />
          </Form.Item>
          <Form.Item
            label="Sub-Category Name"
            name="categoryName"
            rules={[{ required: true, message: "Please enter the category" }]}
          >
            <Input className="py-2" type="price" placeholder="Enter Category" />
          </Form.Item>
       
        <Form.Item label="Photos">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            maxCount={1} 
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
        

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 w-full border text-black rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 w-full bg-black text-white rounded-md"
              disabled={isLoading} 
            >
              {isLoading ? (
                <Spin size="small" /> 
              ) : (
                "Update"
              )}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
