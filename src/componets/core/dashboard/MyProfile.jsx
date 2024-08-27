import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiEditBoxLine } from 'react-icons/ri';
import { formattedDate } from '../../../data/dateFormatter';

export default function MyProfile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="px-4 py-8 md:px-12 lg:px-24">
      <h1 className="mb-10 text-4xl font-semibold text-center text-richblack-5">My Profile</h1>

      <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start bg-richblack-800 rounded-lg shadow-lg p-6 lg:p-12">
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-x-8">
          <img
            src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}&background=%23fff&radius=50`}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-24 h-24 rounded-full border-2 border-richblack-700 object-cover mb-4 lg:mb-0"
          />
          <div className="text-center lg:text-left space-y-1">
            <p className="text-2xl font-bold text-richblack-5">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        
      </div>

      <div className="mt-10 space-y-8">
        <div className="bg-richblack-800 rounded-lg shadow-lg p-6 lg:p-12">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xl font-semibold text-richblack-5">Personal Details</p>
           
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-richblack-600">First Name</p>
                <p className="text-base font-medium text-richblack-5">{user?.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-richblack-600">Email</p>
                <p className="text-base font-medium text-richblack-5">{user?.email}</p>
              </div>
              
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-richblack-600">Last Name</p>
                <p className="text-base font-medium text-richblack-5">{user?.lastName}</p>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
