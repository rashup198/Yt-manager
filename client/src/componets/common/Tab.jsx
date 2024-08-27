import React, { useState } from 'react';

export default function Tab({ tabData, field, setField }) {
  const [notification, setNotification] = useState(null);

  const handleTabClick = (type) => {
    setField(type);
    // Set the notification message
    setNotification(`*${type} is Selected `);
    
    // Clear the notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="">
      {notification && (
      <div className="bg-green-500 text-yellow-200 rounded-md mb-[-15px]">
        {notification}
      </div>
    )}
    <div className="flex flex-col bg-black p-1 gap-x-1 my-6 rounded-full max-w-max">
      <div className="flex gap-x-1">
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.type)}
            className={`${
              field === tab.type
                ? "bg-black text-richblack-5"
                : "bg-black text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200 focus:outline-none focus:shadow-outline`}
          >
            {tab.tabName}
          </button>
        ))}
      </div>
    </div>
    
    </div>
  );
}
