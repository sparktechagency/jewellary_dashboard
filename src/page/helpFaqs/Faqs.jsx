import { Form, Input, Modal, Button, message } from 'antd';
import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Navigate from '../../Navigate';
import { useAddFaqMutation, useDeleteFaqMutation, useGetFaqQuery, useUpdateFaqMutation } from '../redux/api/manageApi';

const { TextArea } = Input;

const FAQs = () => {
  const { data: faqData = [] } = useGetFaqQuery(); 
  const [addFaq] = useAddFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const[deleteFaq] = useDeleteFaqMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleAddFaq = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const res= await addFaq(values).unwrap();
      console.log(res)
      message.success(res?.message);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error(` ${error?.data?.message}`);
    } finally {
      setLoading(false);
    }
  };



  const handleUpdateFaq = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const data = {
        id: selectedFaq._id,
        answer: values.answer,
        question: values.question,
      };
      console.log(data);
  
      await updateFaq(data).unwrap();
      message.success('FAQ updated successfully!');
      setIsEditModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error(`Error updating FAQ: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFaq = async (id) => {
    
    try {
      const res = await deleteFaq( id ).unwrap(); // send { id: "..." }
      message.success(res?.message);
    } catch (error) {
      message.error(error?.data?.message || 'Error deleting FAQ');
    }
  };
  
  
  

  const openEditModal = (faq) => {
    console.log(faq)
    setSelectedFaq(faq);
    form.setFieldsValue(faq);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-3 h-screen bg-white">
      <Navigate title={'FAQ'} />

      <div className="grid grid-cols-2 gap-5 mt-2">
        {faqData.map((faq, i) => (
          <div key={faq._id} className="p-2">
            <p className="pb-3">Question no: {i + 1}</p>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.question}</p>
            <div className="flex justify-between">
              <p className="py-2">Answer</p>
              <div className="flex gap-4">
                <button onClick={() => openEditModal(faq)} className="py-2">Edit</button>
                <div className="py-2">
                  <MdDeleteOutline onClick={() => handleDeleteFaq(faq._id)} className="text-xl cursor-pointer" />
                </div>
              </div>
            </div>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-20">
        <button className='px-5 py-2 bg-black text-white rounded' onClick={() => setIsModalOpen(true)}> + Add FAQ </button>
      </div>

      <Modal centered open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <p className="text-center font-semibold pb-5 text-xl">Add FAQ</p>
        <Form form={form}>
          <Form.Item name="question" rules={[{ required: true, message: 'Please enter a question' }]}>
            <Input placeholder="Type question here..." />
          </Form.Item>
          <Form.Item name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
            <TextArea rows={4} placeholder="Type answer here..." />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <Button   loading={loading}   onClick={handleAddFaq} type="primary" shape="round" size="large" style={{ background: "black", borderColor: "#2F799E" }}>
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal centered open={isEditModalOpen} footer={null} onCancel={() => setIsEditModalOpen(false)}>
        <p className="text-center font-semibold pb-5 text-xl">Edit FAQ</p>
        <Form form={form}>
          <Form.Item name="question" rules={[{ required: true, message: 'Please enter a question' }]}>
            <Input placeholder="Type question here..." />
          </Form.Item>
          <Form.Item name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
            <TextArea rows={4} placeholder="Type answer here..." />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <Button onClick={handleUpdateFaq} loading={loading} type="primary" shape="round" size="large" style={{ background: "black", borderColor: "#2F799E" }}>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQs;
