import React, {useState} from 'react'
import { FaBars, FaPhone, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'

const NavBar = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName === activeTab ? null : tabName);
  };



  return (
    <nav className='bg-gray-800 px-4 py-3 flex justify-between ml-64'>
      <div className='flex items-center text-xl'>
      </div>
      <div className='flex items-center gap-x-5'>
        <div className='relative md:w-65'>
          <input type="text" className='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block' placeholder='Search Member...'/>
        </div>


        <div className={`mb-2 rounded hover:shadow hover:bg-blue-800 py-2 ${activeTab === 'contact' ? 'bg-blue-800' : ''}`}>
          <button onClick={() => handleTabClick('contact')} className='px-3'>
    <       span className='text-blue-500'>
         <FaPhone className='inline-block w-6 h-6 mr-2 -mt-1'></FaPhone>
           </span>
          Add member
         </button>
        </div>

        <div className='text-white'><FaBell className='w-6 h-6'/></div>
        <div className='relative'>
          <button className='text-white group'>
            <FaUserCircle className='w-6 h-6 mt-1'/>
            <div className='z-10 hidden absolute bg-white rounded-lg shallow w-32 group-focus:block top-full right-0'>
              <ul className='py-2 text-sm text-gray-950'>
                <li><a href="">Profile</a></li>
                <li> <a href="">Setting</a></li>
                <li><a href="">Log Out</a> </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
