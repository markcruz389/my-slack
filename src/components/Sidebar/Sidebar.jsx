import React, { useState, useEffect, useContext } from "react";
import ChannelModal from "./ChannelModal";
import { saveChannel } from "../../api/channelsApi";
import { getUsers } from "../../api/usersApi";
import { toast } from "react-toastify";
import { UserLoginContext } from "../context";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [channel, setChannel] = useState({
    name: "",
    userWith: "",
  });
  const [channelErrors, setChannelErrors] = useState({});
  const [userLoginContext] = useContext(UserLoginContext);

  useEffect(() => {});

  const handleChannelChange = ({ target }) => {
    setChannel({ ...channel, [target.name]: target.value });
  };

  const handleChannelSubmit = (event) => {
    event.preventDefault();

    if (!isChannelFormValid()) {
      toast.error("Some fields are not valid");
      return;
    }

    (async () => {
      const request = {
        name: channel.name,
        userId1: userLoginContext.id,
        userId2: parseInt(channel.userWith.split("-")[0].trim(), 10),
      };
      const response = await saveChannel(request);

      if (response.status === 200) {
        toast.success("Channel Created");
        setShowModal(false);
      }

      console.log(response);
    })();
  };

  const isChannelFormValid = () => {
    const errors = {};

    if (!channel.name) {
      errors.name = "Name is required";
    }

    setChannelErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <div className='row pt-5'>
        <div className='col-2'>
          <button className='btn btn-info btn-sm'>&#9660;</button>
        </div>
        <div className='col-8 d-flex align-items-center'>
          <span className='align-middle'>Channels</span>
        </div>
        <div className='col-2'>
          <button
            className='btn btn-success btn-sm'
            onClick={() => setShowModal(true)}
          >
            +
          </button>
        </div>
      </div>
      <ChannelModal
        channel={channel}
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        onChange={handleChannelChange}
        onSubmit={handleChannelSubmit}
        errors={channelErrors}
      />
    </>
  );
};

export default Sidebar;
