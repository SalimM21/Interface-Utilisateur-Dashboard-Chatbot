// 📊 Menu latéral du Dashboard : accès aux sections Scores, Alertes, KPIs

import React, { useState } from "react";
import {
  BarChart3,
  AlertTriangle,
  Activity,
  ChevronLeft,
  ChevronRight,
  Settings,
  Home,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Accueil",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    {
      name: "Scores",
      icon: <BarChart3 size={20} />,
      path: "/scores",
    },
    {
      name: "Alertes",
      icon: <AlertTriangle size={20} />,
      path: "/alerts",
    },
    {
      name: "KPIs",
      icon: <Activity size={20} />,
      path: "/kpis",
    },
    {
      name: "Paramètres",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gray-900 text-gray-100 h-screen flex flex-col transition-all duration-300 fixed top-0 left-0 z-40`}
    >
      {/* === Logo / Titre === */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-white">
            🧠 Fraud Insight
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* === Menu principal === */}
      <nav className="flex-1 mt-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md mx-2 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="flex items-center justify-center">
                {item.icon}
              </span>
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* === Footer === */}
      <div className="p-4 border-t border-gray-800 text-center text-xs text-gray-500">
        {!collapsed && <p>v1.0 • © 2025 Fraud Analytics</p>}
      </div>
    </aside>
  );
};

export default Sidebar;
