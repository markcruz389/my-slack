import React from "react";
import Modal from "react-modal";
import AddChannelMemberForm from "./AddChannelMemberForm";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AddChannelMemberModal = ({
  newChannelMember,
  addChannelMemberHandlers,
  showModal,
  closeModal,
  errors,
}) => {
  return (
    <Modal isOpen={showModal} style={customStyles}>
      <div className='row mb-3'>
        <div className='col-10'>
          <h4>Add Channel Member</h4>
        </div>
        <div className='col-2 d-flex justify-content-space'>
          <button className='btn btn-danger' onClick={closeModal}>
            x
          </button>
        </div>
      </div>
      <AddChannelMemberForm
        newChannelMember={newChannelMember}
        onChange={addChannelMemberHandlers.onChange}
        onSubmit={addChannelMemberHandlers.onSubmit}
        errors={errors}
      />
    </Modal>
  );
};

export default AddChannelMemberModal;
