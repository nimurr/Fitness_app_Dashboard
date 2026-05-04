/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosLogOut, IoIosWarning } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "/public/logo/main_logo.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import { MdDashboard } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiMeal } from "react-icons/gi";
import { AiFillCrown } from "react-icons/ai";
import { FaAngleRight, FaChevronRight, FaProductHunt, FaUsersViewfinder } from "react-icons/fa6";


const sidebarItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: <MdDashboard className="size-6" />,
  },
  {
    path: "/user-list",
    name: "User List",
    icon: <HiMiniUserGroup className="size-6" />,
  },
  {
    path: "/meal-plan",
    name: "Meal Plan",
    icon: <GiMeal roup className="size-6" />,
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    icon: <AiFillCrown roup className="size-6" />,
  },
  {
    path: "/subscription-list",
    name: "Subscription List",
    icon: <FaUsersViewfinder roup className="size-6" />,
  },
  {
    path: "/promo-list",
    name: "Promo List",
    icon: <FaProductHunt roup className="size-6" />,
  },
  {
    path: "/report-issue",
    name: "Report & Issue",
    icon: <IoIosWarning roup className="size-6" />,
  },




  //? Start here


  {
    path: "/settings",
    name: "Settings",
    icon: <IoSettingsSharp className="size-6" />,
  },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/auth");
  };

  return (
    <div className="relative">
      {/* Desktop Sidebar */}
      <div className="hidden overflow-y-auto md:block w-full md:w-[200px] lg:w-[250px] xl:w-[280px] h-full bg-[#000000] border-r border-[#8a8a8a42] fixed shadow-2xl">
        <Link to={"/"} className="flex flex-col justify-center items-center pt-5 gap-2">
          <img src={logo} alt="logo" className="w-40 shadow rounded mb-20 mt-5" />
        </Link>
        <ul className="flex flex-col gap-5">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `w-[80%] mx-auto px-5 py-2 flex justify-start items-center gap-3 rounded text-white ${isActive ? "bg-red-500 !text-white " : ""
                }`
              }
            >
              {item?.icon}
              <h>{item.name}</h>

            </NavLink>
          ))}
        </ul>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 font-bold px-10 py-4 text-black  ml-6 mt-5 absolute bottom-2 pt-10"
        >
          <IoIosLogOut className="size-8  p-1 text-red-500 rounded-md" />
          <span className="text-red-500">Logout</span>
        </button>

      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 overflow-y-auto left-0 z-40 w-64 h-full bg-[#000000] border-r border-[#8a8a8a42] shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div onClick={toggleSidebar} className="absolute top-0 right-0 p-4">
          <RxCross1 className="size-6 text-white" />
        </div>
        <div className="flex flex-col justify-center items-center pt-5 gap-2 ">
          <img src={logo} alt="logo" className=" w-32 rounded shadow my-10" />
        </div>
        <ul className="flex flex-col gap-3 mt-10">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `w-[80%] mx-auto px-5 py-2 flex rounded items-center gap-3 text-white ${isActive ? "bg-[#8c0303] " : ""
                }`
              }
            >
              {item?.icon}
              <h>{item.name}</h>
            </NavLink>
          ))}
        </ul>

        <button
          onClick={() => {
            setShowModal(true);
            toggleSidebar();
          }}
          className="flex items-center gap-2 px-10 ml-5 mt-5 absolute bottom-2 pt-10"
        >
          <IoIosLogOut className="size-8   p-1 text-red-500 rounded-md" />
          <span className="text-red-500">Logout</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#8d2222] p-6 rounded text-white shadow-lg w-80">
            <h3 className="text-3xl font-bold mb-2 text-center">Confirm Logout</h3>
            <p className="mb-10 text-center">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-10 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-black px-10 py-2 rounded hover:bg-gray-800"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
