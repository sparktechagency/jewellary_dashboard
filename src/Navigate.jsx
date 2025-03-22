import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navigate = ({title}) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="flex gap-4 ">
        <button className=" " onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">{title}</span>
      </h1>
    </div>
  );
};

export default Navigate;
