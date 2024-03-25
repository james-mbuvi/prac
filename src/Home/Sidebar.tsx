import React, { useState } from 'react';
import { FaCalendar, FaCog, FaDollarSign, FaHome, FaPhone, FaTasks, FaUsers, FaWallet } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import Contact from './Contact';
import EventForm from '../EventsForm';
import Membership from './Membership';
import HomePage from './images/HomePage';
import Finance from './Finance';
import Campaign from './Campaign';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName === activeTab ? null : tabName);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-64 bg-blue-800 px-4 py-2 md:fixed md:h-full overflow-y-auto'>
        <div className='my-2 mb-4'>
          <h1 className='text-2xl text-white font-bold'>Admin Dashboard</h1>
        </div>
        <hr />
        <ul className='mt-3 text-white font-bold'>
          <li className={`mb-2 rounded hover:shadow hover:bg-gray-800 py-2 ${activeTab === 'home' ? 'bg-gray-800' : ''}`}>
            <button onClick={() => handleTabClick('home')} className='px-3'>
              <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
              Home
            </button>
          </li>

          <li className={`mb-2 rounded hover:shadow hover:bg-gray-800 py-2 ${activeTab === 'contact' ? 'bg-gray-800' : ''}`}>
            <button onClick={() => handleTabClick('contact')} className='px-3'>
              <span className='text-black'>
                <FaPhone className='inline-block w-6 h-6 mr-2 -mt-1'></FaPhone>
              </span>
              Contact
            </button>
          </li>

          <li className={`mb-2 rounded hover:shadow hover:bg-gray-800 py-2 ${activeTab === 'events' ? 'bg-gray-800' : ''}`}>
            <button onClick={() => handleTabClick('events')} className='px-3'>
              <span className='text-black'>
                <FaWallet className='inline-block w-6 h-6 mr-2 -mt-1'></FaWallet>
              </span>
              Events
            </button>
          </li>

          <li className={`mb-2 rounded hover:shadow hover:bg-gray-800 py-2 ${activeTab === 'membership' ? 'bg-gray-800' : ''}`}>
            <button onClick={() => handleTabClick('membership')} className='px-3'>
              <FaUsers className='inline-block w-6 h-6 mr-2 -mt-2'></FaUsers>
              Membership
            </button>
          </li>

          <li className={`mb-2 rounded hover:shadow hover:bg-gray-800 py-2 ${activeTab === 'finance' ? 'bg-gray-800' : ''}`}>
            <button onClick={() => handleTabClick('finance')} className='px-3'>
              <FaDollarSign className='inline-block w-6 h-6 mr-2 -mt-2'></FaDollarSign>
              Finance
            </button>
          </li>

          <li className={`mb-2 rounded hover:shadow hover:bg-gray-800 py-2 ${activeTab === 'campaigns' ? 'bg-gray-800' : ''}`}>
            <button onClick={() => handleTabClick('campaigns')} className='px-3'>
              <FaUserGroup className='inline-block w-6 h-6 mr-2 -mt-2'></FaUserGroup>
              Campaigns
            </button>
          </li>
        </ul>
      </div>
      <div className='flex-1 p-4 md:pl-64'>
        {/* Content on the right */}
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'contact' && <Contact />}
        {activeTab === 'events' && <EventForm />}
        {activeTab === 'membership' && <Membership />}
        {activeTab === 'finance' && <Finance />}
        {activeTab === 'campaigns' && <Campaign />}
      </div>
    </div>
  );
};

export default Sidebar;



































