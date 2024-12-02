import React from 'react';
import { FaUserShield, FaShoppingBag, FaShieldAlt } from "react-icons/fa";
import { HiOutlineBriefcase, HiOutlineCreditCard, HiOutlineHome, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
const Services:React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-700">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-white p-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-6">BankDash</h2>
        <nav>
          {[
            { name: "Dashboard", icon: HiOutlineHome },
            { name: "Transactions", icon: HiOutlineSwitchHorizontal },
            { name: "Accounts", icon: HiOutlineBriefcase },
            { name: "Investments", icon: HiOutlineCreditCard },
            { name: "Credit Cards", icon: HiOutlineCreditCard },
            { name: "Loans", icon: HiOutlineBriefcase },
            { name: "Services", icon: HiOutlineBriefcase },
            { name: "My Privileges", icon: HiOutlineBriefcase },
            { name: "Setting", icon: FiSettings },
          ].map((item, index) => (
            <button
              key={index}
              className={`flex items-center p-3 rounded-lg mb-2 w-full hover:bg-blue-50 ${
                item.name === "Services" ? "text-blue-700 bg-blue-50" : "text-gray-500"
              }`}
            >
              <item.icon className="mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Services</h1>
          <div className="flex items-center space-x-4">
            <BiSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search for something"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <FiSettings className="text-xl" />
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        </header>

        {/* Service Options */}
        <section className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-3">
            <FaUserShield className="text-blue-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold">Life Insurance</h3>
              <p className="text-sm text-gray-500">Unlimited protection</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-3">
            <FaShoppingBag className="text-yellow-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold">Shopping</h3>
              <p className="text-sm text-gray-500">Buy. Think. Grow.</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-3">
            <FaShieldAlt className="text-green-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold">Safety</h3>
              <p className="text-sm text-gray-500">We are your allies</p>
            </div>
          </div>
        </section>

        {/* Bank Services List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Bank Services List</h2>
          <div className="space-y-4">
            {[
              { name: "Business loans", icon: HiOutlineBriefcase },
              { name: "Checking accounts", icon: HiOutlineCreditCard },
              { name: "Savings accounts", icon: HiOutlineBriefcase },
              { name: "Debit and credit cards", icon: HiOutlineCreditCard },
              { name: "Life Insurance", icon: FaUserShield },
              { name: "Business loans", icon: HiOutlineBriefcase },
            ].map((service, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <service.icon className="text-pink-500 text-3xl" />
                  <div>
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-500">It is a long established</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
export default Services;