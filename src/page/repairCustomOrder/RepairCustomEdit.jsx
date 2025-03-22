import { Form, Input, message, Modal, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useUpdateOrderMutation } from "../redux/api/orderApi";

export const RepairCustomEdit = ({
  editModal1,
  setEditModal1,
  selectedRecord,
}) => {
  const [updateOrder] = useUpdateOrderMutation();
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal1(false);
  };

  useEffect(() => {
    if (selectedRecord) {
      form.setFieldsValue({
        order_status: selectedRecord?.order_status,
        custom_order_price: selectedRecord?.custom_order_price,
        paymentStatus: selectedRecord?.paymentStatus,
      });
    }
  }, [selectedRecord, form]);

  const handleSubmit = async (values) => {
    const data = {
      order_id: selectedRecord?.key,
      price: values.custom_order_price,
      order_status: values.order_status,
      payment_status: values.paymentStatus,
    };
    try {
      const response = await updateOrder(data).unwrap();
      message.success(response?.message);
      form.resetFields();
      setEditModal1(false);
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message);
    }
  };

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
            label="Order Status"
            name="custom_order_price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input className="py-2" type="price" placeholder="Enter price" />
          </Form.Item>
          <Form.Item
            label="Order Status"
            name="order_status"
            rules={[{ required: true, message: "Please select order status" }]}
          >
            <Radio.Group>
              <Radio value="Pending">Pending</Radio>
              <Radio value="In Progress">In Progress</Radio>
              <Radio value="Shipped">Shipped</Radio>
              <Radio value="Completed">Completed</Radio>
              <Radio value="Canceled">Canceled</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Payment Status */}
          <Form.Item
            label="Payment Status"
            name="paymentStatus"
            rules={[
              { required: true, message: "Please select payment status" },
            ]}
          >
            <Radio.Group>
              <Radio value="Pending">Pending</Radio>
              <Radio value="Paid">Paid</Radio>
              <Radio value="Canceled">Canceled</Radio>
            </Radio.Group>
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
