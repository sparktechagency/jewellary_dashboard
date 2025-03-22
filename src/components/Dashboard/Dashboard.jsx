import Apointment from "./Apointment";
import IncomeOverVeiw from "./IncomeOverVeiw";
import UserGrowth from "./UserGrowth";
import img1 from "../../assets/header/img2.png";
import img2 from "../../assets/header/img3.png";
import img3 from "../../assets/header/img4.png";
import img4 from "../../assets/header/img5.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className=" min-h-screen">
      <div className="  grid grid-cols-4 gap-4 text-center pb-4">
        <div className="bg-white py-6 rounded-md">
          <p className=" mt-3 text-2xl">Total User</p>
          <div className="flex justify-center my-4">
            <img className="w-[60px] h-[60px]" src={img1} alt="" />
          </div>
          <h1 className="text-3xl font-bold">123</h1>
        </div>
        <div className=" bg-white py-6 rounded-md">
        <p className=" mt-3 text-2xl">Order Completed</p>
          
          <div className="flex justify-center my-4">
            <img className="w-[60px] h-[60px]" src={img2} alt="" />
          </div>
          <h1 className="text-3xl font-bold">9</h1>
         
        </div>
        <div className=" bg-white py-6 rounded-md">
          <p className=" mt-3 text-2xl">Total Income</p>
          <div className="flex justify-center my-4">
            <img className="w-[60px] h-[60px]" src={img3} alt="" />
          </div>
          <h1 className="text-3xl font-bold">9</h1>
        </div>
        <div className=" bg-white py-6 rounded-md">
          <p className=" mt-3 text-2xl">Total Items</p>
          <div className="flex justify-center my-4">
            <img className="w-[60px] h-[60px]" src={img4} alt="" />
          </div>
          <h1 className="text-3xl font-bold">9</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded p-3">
          <IncomeOverVeiw></IncomeOverVeiw>
        </div>
        <div className="bg-white rounded">
          <UserGrowth></UserGrowth>
        </div>
      </div>
     
      <Apointment></Apointment>
    </div>
  );
};

export default Dashboard;
