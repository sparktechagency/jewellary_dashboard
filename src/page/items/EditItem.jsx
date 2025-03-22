import {
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Upload,
  Checkbox,
  Button,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import JoditEditor from 'jodit-react';

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
 
  useGetCategoryQuery,
  useGetSubCategoryQuery,
  useUpdateProductMutation,
} from "../redux/api/categoryApi";

export const EditItem = ({ editModal1, setEditModal1 ,selectedProduct}) => {
 console.log(selectedProduct)
  const id = selectedProduct?.id;
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const { data: category } = useGetCategoryQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);
const [updateProdust] = useUpdateProductMutation()
  const { data: subCategoryData, isLoading } = useGetSubCategoryQuery(
    {
      id: selectedCategory,
    },
    { skip: !selectedCategory }
  );

  const categoryData =
    category?.map((item, index) => ({
      key: item._id,
      categoryName: item.name,
    })) || [];


  const subCategories = subCategoryData?.subcategories || [];

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src =
      file.url ||
      (await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      }));
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

 
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal1(false);
  };

  const handleSubmit = (values) => {
    console.log(values)
 
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", values?.name);
    formData.append("category", values.sub_category ? values.sub_category : values.category);
    formData.append("price", values?.price);
    formData.append("description", content); 
    formData.append("availability", values?.availability);
    formData.append("discount_price", values?.discount_price);
    formData.append("details", values?.details);
    formData.append("sizes", JSON.stringify(values?.sizes || []));
    formData.append("colors", JSON.stringify(values?.colors || [])); 
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    updateProdust(formData)
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

    const config = {
      readonly: false,
      placeholder: "Start typings...",
      style: {
        height: 500,
      },
      buttons: [
        "image",
        "fontsize",
        "bold",
        "italic",
        "underline",
        "|",
        "font",
        "brush",
        "align",
      ],
    };

    useEffect(() => {
        if (selectedProduct) {
          form.setFieldsValue({
            name: selectedProduct?.name,
            details: selectedProduct?.details,
            discount_price: selectedProduct?.discount_price,
            price: selectedProduct?.price,
            sub_category: selectedProduct?.sub_category,
            category: selectedProduct?.categoryName,
            availability: selectedProduct?.availability,
            description: selectedProduct?.description,
            sizes: selectedProduct?.sizes,
            colors: selectedProduct?.colors,
          });
        }
      }, [selectedProduct, form]);
  
  return (
    <Modal
      centered
      open={editModal1}
      onCancel={handleCancel}
      footer={null}
      width={1000}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Edit</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Package Name */}

          <Form.Item
            label="Items Name"
            name="name"
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <Input placeholder="Enter Item name" />
          </Form.Item>
          {/* Category */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              placeholder="Select Category"
              onChange={(value) => setSelectedCategory(value)}
            >
              {categoryData.map((cat) => (
                <Select.Option key={cat.key} value={cat.key}>
                  {cat.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Sub-Category */}
          <Form.Item label="Sub-Category" name="sub_category">
            <Select placeholder="Select Sub-Category" loading={isLoading}>
              {subCategories.map((subCat) => (
                <Select.Option key={subCat._id} value={subCat._id}>
                  {subCat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the price!" },
              { type: "number", min: 1, message: "Price must be at least $1" },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter price ($)"
              onChange={(e) =>
                form.setFieldsValue({ price: Number(e.target.value) })
              }
            />
          </Form.Item>

          <Form.Item
            label="Discount Price (Optional)"
            name="discount_price"
            dependencies={["price"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const price = getFieldValue("price");
                  if (!value || value < price) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Discount price must be less than the actual price!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input type="number" placeholder="Enter discount price ($)" />
          </Form.Item>

          {/* Sizes */}
          <Form.List
            name="sizes"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(new Error("Add Size"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => {
              if (fields.length === 0) {
                fields.push({ key: 0, name: 0, isListField: true });
              }

              return (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      label={index === 0 ? "Sizes" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input Size",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="Size Here"
                          style={{ width: "93%" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button ml-3"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "100%" }}
                      icon={<PlusOutlined />}
                    >
                      Add Size
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              );
            }}
          </Form.List>

          {/* Colors */}
          <Form.List
            name="colors"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(new Error("Add Color"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => {
              if (fields.length === 0) {
                fields.push({ key: 0, name: 0, isListField: true });
              }

              return (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      label={index === 0 ? "colors" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input Color",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="color Here"
                          style={{ width: "93%" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button ml-3"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "100%" }}
                      icon={<PlusOutlined />}
                    >
                      Add Color
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              );
            }}
          </Form.List>

          {/* Stock Status */}
          <Form.Item
            label="Stock Status"
            name="availability"
            rules={[{ required: true, message: "Please select stock status!" }]}
          >
            <Radio.Group>
              <Radio value="in_stock">In Stock</Radio>
              <Radio value="stock_out">Stock Out</Radio>
              <Radio value="upcoming">Up Coming</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Short Introduction */}
          <Form.Item label="Short Introduction" name="details">
            <Input.TextArea rows={2} placeholder="Write here" />
          </Form.Item>

          {/* Description */}
          <Form.Item label="Description" name="description">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)} // Content Update
            />
          </Form.Item>

          {/* Upload Image */}
          <Form.Item label="Photos">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple={true} // Allow multiple files
            >
              
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
            >
              Update
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
