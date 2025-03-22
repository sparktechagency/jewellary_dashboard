import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { logout } from "../../page/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: dashboard,
    link: "/",
  },
  {
    key: "userManagement",
    label: "User Management",
    icon: user,
    link: "/dashboard/UserManagement",
  },
  {
    key: "orderManagement",
    label: "Order Management",
    icon: user,
    link: "/dashboard/order_management",
  },
  {
    key: "repairCustom",
    label: "Repair/Custom Order",
    icon: user,
    link: "/dashboard/repair_custom_order",
  },

  {
    key: "categories",
    label: "Categories",
    icon: user,
    link: "/dashboard/categories",
  },
  {
    key: "items",
    label: "Items",
    icon: user,
    link: "/dashboard/items",
  },
  
  {
    key: "company",
    label: "Company",
    icon: categorie,
    link: "/dashboard/company/aboutUs",
    children: [
      {
        key: "aboutUs",
        label: "About Us",
        link: "/dashboard/company/aboutUs",
      },
      {
        key: "helpSupport",
        label: "Help & Support",
        link: "/dashboard/company/helpSupport",
      },
      {
        key: "shippingDelivery",
        label: "Shipping & Delivery",
        link: "/dashboard/company/shippingDelivery",
      },
      {
        key: "warrantyRepairs",
        label: "Warranty & Repairs",
        link: "/dashboard/company/warrantyRepairs",
      },
      {
        key: "returnExchanges",
        label: "Returns & Exchanges",
        link: "/dashboard/company/returns_Exchanges",
      },
    ],
  },
  {
    key: "helpFaqs",
    label: "Help & FAQs",
    icon: categorie,
    link: "/dashboard/helpFaqs/help_center",
    children: [
      {
        key: "helpCenter",
        label: "Help Center",
        link: "/dashboard/helpFaqs/help_center",
      },
      {
        key: "faqs",
        label: "FAQs",
        link: "/dashboard/helpFaqs/faqs",
      },
      
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: settings,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
     
    ],
  },
];

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;

    items.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, [location]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Logout Function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="custom-sidebar h-[100vh] bg-white">
      
      <div className="lg:flex lg:justify-center pt-4">
          <div className="lg:text-center">
            <h1 className="md:text-4xl text-2xl font-serif ">CATHY'S</h1>
            <div className="">
              <h1 className="md:text-2xl  text-xl font-serif ">
                JEWELRY
              </h1>
            </div>
          </div>
        </div>
      <div className="menu-items pt-8">
        {items.map((item) => {
          const isSettingsActive =
            item.key === "settings" &&
            item.children.some((child) => child.link === location.pathname);

          const isCreatorActive =
            item.key === "creatorManagement" &&
            item.children.some((child) => child.link === location.pathname);

          const isCategoriesActive =
            item.key === "categoriesManagement" &&
            item.children.some((child) => child.link === location.pathname);

          return (
            <div key={item.key}>
              <Link
                to={item.link}
                className={`menu-item my-3 py-3 px-6 flex items-center cursor-pointer ${
                  selectedKey === item.key || isSettingsActive || isCreatorActive || isCategoriesActive
                    ? "bg-[black] text-white rounded-tr rounded-br"
                    : "bg-white hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault(); 
                    onParentClick(item.key); 
                  } else {
                    setSelectedKey(item.key);
                  }
                }}
              >
                <img src={item.icon} alt={item.label} className="w-5 h-5 mr-3" />
                <span className="block w-full ">{item.label}</span>

                {/* Show dropdown arrow if children exist */}
                {item.children && (
                  <FaChevronRight
                    className={`ml-auto transform transition-all duration-300 ${
                      expandedKeys.includes(item.key) ? "rotate-90" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Show children menu if expanded */}
              {item.children && (
                <div
                  className={`children-menu bg-white -my-2  transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? "expanded" : ""
                  }`}
                  style={{
                    maxHeight: expandedKeys.includes(item.key)
                      ? `${contentRef.current[item.key]?.scrollHeight}px`
                      : "0",
                  }}
                  ref={(el) => (contentRef.current[item.key] = el)}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      to={child.link}
                      className={`menu-item px-5 py-3 flex items-center cursor-pointer ${
                        selectedKey === child.key
                          ? "bg-black rounded-tr rounded-br text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedKey(child.key); // Set the selected key for children
                        setExpandedKeys([]); // Close all expanded items
                      }}
                    >
                      <span className="block w-full ">{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="  w-full pt-8 ">
        <button
          onClick={handleLogout}
          className="w-full flex  text-black text-start rounded-md  p-3"
        >
          <span className="text-2xl">
            <IoIosLogIn />
          </span>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SidBar;
