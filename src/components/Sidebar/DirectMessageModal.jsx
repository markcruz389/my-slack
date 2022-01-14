import React from "react";
import Modal from "react-modal";
import DirectMessageForm from "./DirectMessageForm";

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

const DirectMessageModal = ({
  directMessage,
  showModal,
  closeModal,
  onChange,
  onSubmit,
  errors,
}) => {
  return (
    <Modal isOpen={showModal} style={customStyles}>
      <div className='row mb-3'>
        <div className='col-10'>
          <h4>New Direct Message</h4>
        </div>
        <div className='col-2 d-flex justify-content-space'>
          <button className='btn btn-danger' onClick={closeModal}>
            x
          </button>
        </div>
      </div>
      <DirectMessageForm
        directMessage={directMessage}
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
      />
    </Modal>
  );
};

export default DirectMessageModal;
