/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdNotificationsNone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useGetAllNotificationQuery, useGetUserProfileQuery } from "../../../redux/features/setting/settingApi";
import userImage from "/public/Auth/user.png";
import Url from "../../../redux/baseApi/forImageUrl";

// ── Format date helper ──
const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// ── Notification Drawer ───────────────────────────────────────────────────────
const NotificationDrawer = ({ open, onClose }) => {
  const drawerRef = useRef(null);

  const { data, isLoading } = useGetAllNotificationQuery();
  const notifications = data?.data?.notifications || [];

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-20 transition-opacity duration-300 
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#0f0f0f] border-l border-[#2a2a2a] 
          z-30 flex flex-col transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-base font-bold">Notifications</h2>
            {notifications.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#ff3131] text-white text-xs font-semibold">
                {notifications.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a2a] 
              text-[#aab0c6] hover:text-white hover:border-[#444] transition-colors"
          >
            <IoClose size={18} />
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto">

          {/* Loading skeleton */}
          {isLoading && (
            <div className="divide-y divide-[#1a1a1a]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-4 animate-pulse">
                  <div className="w-9 h-9 rounded-full bg-[#1f1f1f] shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-[#1f1f1f] rounded w-3/4" />
                    <div className="h-3 bg-[#1f1f1f] rounded w-full" />
                    <div className="h-2 bg-[#1f1f1f] rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-[#aab0c6]">
              <MdNotificationsNone size={48} className="text-[#333]" />
              <p className="text-sm">No notifications yet</p>
            </div>
          )}

          {/* Notification Items */}
          {!isLoading && notifications.length > 0 && (
            <div className="divide-y divide-[#1a1a1a]">
              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  className="relative flex items-start gap-3 px-5 py-4 bg-transparent hover:bg-[#161616] transition-colors"
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#1f1f1f]">
                    <MdNotificationsNone size={16} className="text-[#ff3131]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#e0e0e0] leading-relaxed">
                      {notif.msg}
                    </p>
                    <p className="text-xs text-[#444] mt-1.5">
                      {formatTime(notif.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-5 py-4 border-t border-[#2a2a2a]">
          {/* <Link
            to="/notification"
            onClick={onClose}
            className="block w-full text-center py-2.5 rounded-xl border border-[#2a2a2a] text-sm 
              font-semibold text-[#aab0c6] hover:border-[#2d2a71] hover:text-white transition-colors"
          >
            View All Notifications
          </Link> */}
        </div>
      </div>
    </>
  );
};

// ── Header ────────────────────────────────────────────────────────────────────
const Header = ({ toggleSidebar }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: userProfile, refetch } = useGetUserProfileQuery();
  const user = userProfile?.data;

  const { data: notifData } = useGetAllNotificationQuery();
  const notifCount = notifData?.data?.notifications?.length || 0;

  useEffect(() => { refetch(); }, [refetch]);

  return (
    <>
      <div className="w-full px-5 py-3.5 bg-[#000000] flex justify-between items-center 
        border-b border-[#8a8a8a42] text-white sticky top-0 left-0 z-10">

        {/* Left — hamburger */}
        <div className="flex items-center gap-3">
          <button className="md:hidden text-white text-3xl" onClick={toggleSidebar}>
            <FiMenu />
          </button>
        </div>

        {/* Right — notification bell + avatar */}
        <div className="flex items-center gap-5">

          {/* Bell button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative p-2 rounded-full border border-[#c2c2c242] hover:border-[#555] transition-colors"
          >
            <MdNotificationsNone className="size-8 text-gray-400" />
            {notifCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-white text-[10px] font-bold 
                flex items-center justify-center bg-[#ff2222] rounded-full">
                {notifCount > 9 ? "9+" : notifCount}
              </span>
            )}
          </button>

          {/* Avatar */}
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={user?.profileImageUrl ? Url + user?.profileImageUrl : userImage}
            alt="User Profile"
          />

          {/* Name + role */}
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold">{user?.fullName}</h1>
            <span className="text-xs text-[#aab0c6]">{user?.role}</span>
          </div>
        </div>
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};

export default Header;