import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../../../../services/operations/SettingsAPI';
import { FiTrash2 } from 'react-icons/fi';
import ConfirmationModal from '../../../common/ConfirmationModal'; 

export default function DeleteAccount() {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteAccount = () => {
        setConfirmationModal({
            text1: 'Are you sure?',
            text2: 'This action is irreversible and will permanently delete your account.',
            btn1Text: 'Delete',
            btn2Text: 'Cancel',
            btn1Handler: () => {
                dispatch(deleteProfile(token, navigate));
                setConfirmationModal(null);
            },
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    return (
      <>
          <div className="my-10 flex flex-row gap-x-6 rounded-lg border border-teal-700 bg-teal-800 p-8 px-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex aspect-square h-16 w-16 items-center justify-center rounded-full bg-teal-600">
                  <FiTrash2 className="text-4xl text-white" />
              </div>
              <div className="flex flex-col space-y-4">
                  <h2 className="text-xl font-semibold text-white">Delete Account</h2>
                  <div className="text-white text-base">
                      <p>Are you sure you want to delete your account?</p>
                      <p>
                          This action is permanent and will remove all workspaces associated with your account
                      </p>
                  </div>
                  <button
                      type="button"
                      className="bg-teal-500 text-white border border-white px-6 py-3 rounded-lg font-semibold hover:bg-richblack-400 transition-colors duration-300"
                      onClick={handleDeleteAccount}
                  >
                      Delete My Account
                  </button>
              </div>
          </div>
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </>
  );
}