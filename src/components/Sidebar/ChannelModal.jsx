import React from "react";
import Modal from "react-modal";
import ChannelForm from "./ChannelForm";
import PropTypes from "prop-types";

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

const ChannelModal = ({
  channel,
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
          <h4>Create a private channel</h4>
        </div>
        <div className='col-2 d-flex justify-content-space'>
          <button className='btn btn-danger' onClick={closeModal}>
            x
          </button>
        </div>
      </div>
      <ChannelForm
        channel={channel}
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
      />
    </Modal>
  );
};

ChannelModal.propTypes = {
  channel: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ChannelModal;
