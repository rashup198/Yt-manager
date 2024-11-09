import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };



  return (
    <>
      {/* Sidebar */}
      <div
        className={`flex ${
          isSidebarOpen ? "flex" : "hidden"
        } h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r border-richblack-700 bg-richblack-800 p-6 md:p-8`}
      >
        <div className="flex flex-col gap-4">
          {sidebarLinks.map((link) => {
            if (link.type && user?.role !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="my-6 h-[1px] w-11/12 bg-richblack-700 self-center" />
        <div className="flex flex-col gap-4 mt-auto">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex items-center gap-3 text-sm font-medium text-richblack-300 hover:text-red-500 transition duration-200 px-4 py-2 rounded-lg hover:bg-richblack-700"
          >
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Toggle Button for Mobile */}
      <button
        className="fixed left-4 bottom-32 z-[3000] bg-[#BCAD3C] text-white p-2 rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <IoClose /> : <MdMenuOpen />}
      </button>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
