/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdNotificationsNone } from "react-icons/md";
import { IoCheckmarkDoneOutline, IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../../../redux/features/setting/settingApi";
import userImage from "/public/Auth/user.png";
import Url from "../../../redux/baseApi/forImageUrl";

// ── replace with your real notification query hook ──
// import { useGetNotificationsQuery } from "../../../redux/features/notification/notificationApi";

// ── Static demo notifications (remove once real API is wired) ──
const DEMO_NOTIFICATIONS = [
  {
    id: "1",
    title: "New Capsule Enrolled",
    message: "A new mentee enrolled in your Clarity Sprint capsule.",
    time: "2 min ago",
    read: false,
    avatar: null,
  },
  {
    id: "2",
    title: "Module Completed",
    message: "John Doe completed Module 1 - Clarity in Web Development.",
    time: "15 min ago",
    read: false,
    avatar: null,
  },
  {
    id: "3",
    title: "New Review Submitted",
    message: "A mentee left a 5-star review on your Leadership capsule.",
    time: "1 hr ago",
    read: true,
    avatar: null,
  },
  {
    id: "4",
    title: "Payment Received",
    message: "You received a payment of $79 for Clarity Sprint.",
    time: "3 hr ago",
    read: true,
    avatar: null,
  },
  {
    id: "5",
    title: "System Update",
    message: "The platform has been updated to version 2.4.0.",
    time: "1 day ago",
    read: true,
    avatar: null,
  },
];

// ── Notification Drawer ───────────────────────────────────────────────────────
const NotificationDrawer = ({ open, onClose }) => {
  const drawerRef = useRef(null);

  // Replace DEMO_NOTIFICATIONS with real data:
  // const { data: notifData } = useGetNotificationsQuery();
  // const notifications = notifData?.data ?? [];
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const markOne = (id) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const deleteOne = (id) =>
    setNotifications(prev => prev.filter(n => n.id !== id));

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
        className={`fixed inset-0 bg-black/40 z-20 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#0f0f0f] border-l border-[#2a2a2a] z-30 flex flex-col transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-base font-bold">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#ff3131] text-white text-xs font-semibold">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-xs text-[#aab0c6] hover:text-white transition-colors"
                title="Mark all as read"
              >
                <IoCheckmarkDoneOutline size={16} />
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a2a] text-[#aab0c6] hover:text-white hover:border-[#444] transition-colors"
            >
              <IoClose size={18} />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-[#aab0c6]">
              <MdNotificationsNone size={48} className="text-[#333]" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1a1a1a]">
              {notifications?.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => markOne(notif.id)}
                  className={`relative flex items-start gap-3 px-5 py-4 cursor-pointer transition-colors
                    ${notif.read ? "bg-transparent hover:bg-[#161616]" : "bg-[#301818] hover:bg-[#381c1c]"}`}
                >
                  {/* Unread dot */}
                  {!notif.read && (
                    <span className="absolute top-4 right-5 w-2 h-2 rounded-full bg-[#ff3131] flex-shrink-0" />
                  )}

                  {/* Avatar / Icon */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                    ${notif.read ? "bg-[#1f1f1f]" : "bg-[#ff3131]"}`}>
                    {notif.avatar
                      ? <img src={notif.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                      : <MdNotificationsNone size={16} className={notif.read ? "text-[#555]" : "text-white"} />
                    }
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-4">
                    <p className={`text-sm font-semibold truncate ${notif.read ? "text-[#aab0c6]" : "text-white"}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-[#666] mt-0.5 leading-relaxed line-clamp-2">
                      {notif.message}
                    </p>
                    <p className="text-xs text-[#444] mt-1.5">{notif.time}</p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={e => { e.stopPropagation(); deleteOne(notif.id); }}
                    className="absolute top-3 right-5 w-6 h-6 flex items-center justify-center rounded text-[#444] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <IoClose size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-5 py-4 border-t border-[#2a2a2a]">
          <Link
            to="/notification"
            onClick={onClose}
            className="block w-full text-center py-2.5 rounded-xl border border-[#2a2a2a] text-sm font-semibold text-[#aab0c6] hover:border-[#2d2a71] hover:text-white transition-colors"
          >
            View All Notifications
          </Link>
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

  useEffect(() => { refetch(); }, [refetch]);

  // demo unread count — replace with real data length
  const unreadCount = DEMO_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <>
      <div className="w-full px-5 py-3.5 bg-[#000000] flex justify-between items-center border-b border-[#8a8a8a42] text-white sticky top-0 left-0 z-10">

        {/* Left — hamburger */}
        <div className="flex items-center gap-3">
          <button className="md:hidden text-white text-3xl" onClick={toggleSidebar}>
            <FiMenu />
          </button>
        </div>

        {/* Right — notification bell + avatar */}
        <div className="flex items-center gap-5">

          {/* Bell button — opens drawer instead of navigating */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative p-2 rounded-full border border-[#c2c2c242] hover:border-[#555] transition-colors"
          >
            <MdNotificationsNone className="size-8 text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-white text-[10px] font-bold flex items-center justify-center bg-[#ff2222] rounded-full">
                {unreadCount > 9 ? "9+" : unreadCount}
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