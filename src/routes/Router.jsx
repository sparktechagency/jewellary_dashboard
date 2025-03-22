import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../page/UserManagement/UserManagement";
import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";
import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";
import Login from "../Auth/Login";
import OrderManagement from "../page/orderManagement/OrderManagement";
import RepairCustomOrder from "../page/repairCustomOrder/RepairCustomOrder";
import Categories from "../page/categories/Categories";
import Items from "../page/items/Items";
import AboutUs from "../page/company/AboutUs";
import HelpSupport from "../page/company/HelpSupport";
import ReturnsExchanges from "../page/company/ReturnsExchanges";
import ShippingDelivery from "../page/company/ShippingDelivery";
import WarrantyRepairs from "../page/company/WarrantyRepairs";
import HelpCenter from "../page/helpFaqs/HelpCenter";
import Faqs from "../page/helpFaqs/Faqs";
import SubCategory from "../page/categories/SubCategory";
import Apointment from "../components/Dashboard/Apointment";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
       <ProtectedRoute> <DashboardLayout></DashboardLayout></ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/UserManagement",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/dashboard/Appointment",
        element: <Apointment></Apointment>
      },
      {
        path: "/dashboard/order_management",
        element: <OrderManagement></OrderManagement>
      },
      
      {
        path: "/dashboard/repair_custom_order",
        element: <RepairCustomOrder></RepairCustomOrder>
      },
      {
        path: "/dashboard/categories",
        element: <Categories></Categories>
      },
      {
        path: "/dashboard/categories/sub-categories/:id",
        element: <SubCategory></SubCategory>
      },
      {
        path: "/dashboard/items",
        element: <Items></Items>
      },
      {
        path: "/dashboard/company/aboutUs",
        element: <AboutUs></AboutUs>
      },
      {
        path: "/dashboard/company/helpSupport",
        element: <HelpSupport></HelpSupport>
      },
      {
        path: "/dashboard/company/returns_Exchanges",
        element: <ReturnsExchanges></ReturnsExchanges>
      },
      {
        path: "/dashboard/company/shippingDelivery",
        element: <ShippingDelivery></ShippingDelivery>
      },
      {
        path: "/dashboard/company/warrantyRepairs",
        element: <WarrantyRepairs></WarrantyRepairs>
      },
      {
        path: "/dashboard/helpFaqs/help_center",
        element: <HelpCenter></HelpCenter>
      },
      {
        path: "/dashboard/helpFaqs/faqs",
        element: <Faqs></Faqs>
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition></TermsCondition>,
      },
    
     
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPass></ForgetPass>,
  },
  {
    path: "/verify",
    element: <Verify></Verify>,
  },
  {
    path: "/reset",
    element: <ResetPass></ResetPass>,
  },
],{future: {
  v7_fetcherPersist: true,
}});
