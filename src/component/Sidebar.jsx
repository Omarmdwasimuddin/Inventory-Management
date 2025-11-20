'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiHome, 
  FiPackage, 
  FiDollarSign, 
  FiShoppingCart, 
  FiClipboard,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiMapPin,
  FiBell,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

// FiBuilding এর পরিবর্তে অন্য আইকন ব্যবহার করছি
import { FiBriefcase } from 'react-icons/fi';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <FiHome size={20} />,
      path: '/dashboard'
    },
    {
      name: 'Products',
      icon: <FiPackage size={20} />,
      submenu: [
        { name: 'Product List', path: '/adminDashboard/products/product-list' },
        { name: 'Add Product', path: '/adminDashboard/products/add-product' },
        { name: 'Categories', path: '/adminDashboard/products/categories' },
        { name: 'Stock Adjustment', path: '/adminDashboard/products/stock-adjustment' }
      ]
    },
    {
      name: 'Sales',
      icon: <FiDollarSign size={20} />,
      submenu: [
        { name: 'POS', path: '/adminDashboard/pos' },
        { name: 'Sales List', path: '/adminDashboard/sales-list' },
        { name: 'Sale Returns', path: '/adminDashboard/sale-returns' }
      ]
    },
    {
      name: 'Purchases',
      icon: <FiShoppingCart size={20} />,
      submenu: [
        { name: 'Add Purchase', path: '/adminDashboard/add-purchase' },
        { name: 'Purchase List', path: '/adminDashboard/purchase-list' },
        { name: 'Purchase Returns', path: '/adminDashboard/purchase-returns' }
      ]
    },
    {
      name: 'Companies',
      icon: <FiBriefcase size={20} />, // FiBuilding এর পরিবর্তে FiBriefcase
      submenu: [
        { name: 'Company List', path: '/adminDashboard/company-list' },
        { name: 'Due Payments', path: '/adminDashboard/due-payments' }
      ]
    },
    {
      name: 'Inventory',
      icon: <FiClipboard size={20} />,
      submenu: [
        { name: 'Real-time Stock', path: '/adminDashboard/real-time-stock' },
        { name: 'Low Stock', path: '/adminDashboard/low-stock' },
        { name: 'Batch/Expiry', path: '/adminDashboard/batch-expiry' }
      ]
    },
    {
      name: 'Employees',
      icon: <FiUsers size={20} />,
      submenu: [
        { name: 'Employee List', path: '/adminDashboard/employee-list' },
        { name: 'Add Employee', path: '/adminDashboard/add-employee' },
        { name: 'Salary', path: '/adminDashboard/salary' },
        { name: 'Documents', path: '/adminDashboard/documents' }
      ]
    },
    {
      name: 'Reports',
      icon: <FiBarChart2 size={20} />,
      path: '/adminDashboard/reports'
    },
    {
      name: 'Settings',
      icon: <FiSettings size={20} />,
      path: '/adminDashboard/settings'
    },
    {
      name: 'Users',
      icon: <FiUser size={20} />,
      path: '/adminDashboard/users'
    },
    {
      name: 'Branches',
      icon: <FiMapPin size={20} />,
      path: '/adminDashboard/branches'
    },
    {
      name: 'Notifications',
      icon: <FiBell size={20} />,
      path: '/adminDashboard/notifications'
    }
  ];

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.path ? (
                // Single menu item with link
                <Link
                  href={item.path}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors group"
                >
                  <span className="mr-3">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="flex-1">{item.name}</span>
                  )}
                </Link>
              ) : (
                // Menu item with submenu
                <div>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition-colors group"
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {!isCollapsed && (
                        <span>{item.name}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <FiChevronDown 
                        size={16} 
                        className={`transform transition-transform ${openMenus[item.name] ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                  
                  {/* Submenu */}
                  {!isCollapsed && openMenus[item.name] && (
                    <ul className="ml-6 mt-1 space-y-1 border-l-2 border-gray-600 pl-4">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.path}
                            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors text-sm text-gray-300 hover:text-white"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">A</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">nazimrbl0103@gmail.com</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;