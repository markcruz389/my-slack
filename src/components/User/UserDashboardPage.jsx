import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ChatArea from "../ChatArea/ChatArea";
import { saveChannel, getChannels } from "../../api/channelsApi";
import { toast } from "react-toastify";
import { ChannelsContext, UserLoginContext } from "../context";

const UserDashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [channel, setChannel] = useState({
    name: "",
    userWith: "",
  });
  const [channelId, setChannelId] = useState(null);
  const [channelErrors, setChannelErrors] = useState({});
  const [userLoginContext] = useContext(UserLoginContext);
  const [channelsContext, setChannelsContext] = useContext(ChannelsContext);

  useEffect(() => {
    if (channelsContext?.data?.length > 0) {
      setChannelId(channelsContext.data[0].id);
    }
  }, [channelsContext.data]);

  const channelHandlers = {
    onChange: ({ target }) => {
      setChannel({ ...channel, [target.name]: target.value });
    },
    onSubmit: (event) => {
      debugger;
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
          (async () => {
            const response = await getChannels();
            setChannelsContext(response?.data);
          })();
          toast.success("Channel Created");
          setShowModal(false);
        }

        console.log(response);
      })();
    },
    onClick: (channelId) => {
      debugger;
      setChannelId(channelId);
      console.log(channelId);
    },
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
    <div className='container-fluid w-100 vh-100'>
      <div className='row h-100'>
        <div className='col-2 bg-dark'>
          <Sidebar
            channel={channel}
            channelErrors={channelErrors}
            channelHandlers={channelHandlers}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
        <div className='col-10 bg-white px-5 py-3'>
          <ChatArea channelId={channelId} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
