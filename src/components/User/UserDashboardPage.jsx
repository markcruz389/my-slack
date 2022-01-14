import React, { useContext, useEffect, useState, useReducer } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ChatArea from "../ChatArea/ChatArea";
import { saveChannel, getChannels } from "../../api/channelsApi";
import { send } from "../../api/messagesApi";
import { toast } from "react-toastify";
import { ChannelsContext, UserLoginContext } from "../context";
import {
  saveReceiverId,
  getReceiverIds,
  getAuth,
} from "../../services/localStorage";

const modalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_ADD_CHANNEL_MODAL":
      return { ...state, addChannel: true };
    case "OPEN_ADD_DIRECT_MESSAGE_MODAL":
      return { ...state, addDirectMessage: true };
    case "CLOSE_MODAL":
      return { ...state, addChannel: false, addDirectMessage: false };
    default:
  }
};

const UserDashboardPage = () => {
  const auth = getAuth();
  const [showModal, modalDispatcher] = useReducer(modalReducer, {
    addChannel: false,
    addDirectMessage: false,
  });
  const [channel, setChannel] = useState({
    name: "",
    userWith: "",
  });
  const [directMessage, setDirectMessage] = useState({
    sendTo: "",
    body: "",
  });
  const [channelId, setChannelId] = useState(null);
  const [channelErrors, setChannelErrors] = useState({});
  const [directMessageErrors, setDirectMessageErrors] = useState({});
  const [receiverIds, setReceiverIds] = useState([]);

  const [userLoginContext] = useContext(UserLoginContext);
  const [channelsContext, setChannelsContext] = useContext(ChannelsContext);

  useEffect(() => {
    if (channelsContext?.data?.length > 0) {
      setChannelId(channelsContext.data[0].id);
    }
  }, [channelsContext.data]);

  useEffect(() => {
    setReceiverIds(getReceiverIds(auth.userId));
  }, [auth.userId]);

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
          modalDispatcher({ type: "CLOSE_MODAL" });
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

  const directMessageHandlers = {
    onChange: ({ target }) => {
      setDirectMessage({ ...directMessage, [target.name]: target.value });
    },
    onSubmit: (event) => {
      event.preventDefault();

      if (!isDirectMessageFormValid()) {
        toast.error("Some fields are not valid");
        return;
      }

      (async () => {
        const request = {
          receiverId: parseInt(directMessage.sendTo.split("-")[0].trim(), 10),
          receiverClass: "User",
          body: directMessage.body,
        };
        const response = await send(request);

        if (response.status === 200) {
          saveReceiverId(userLoginContext.id, request.receiverId);
          console.log(response.data);
          toast.success("Message Sent");
        }
      })();
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

  const isDirectMessageFormValid = () => {
    const errors = {};

    if (!directMessage.sendTo) {
      errors.to = "Receiver is required";
    }

    if (!directMessage.body) {
      errors.body = "Message should not be blank";
    }

    setDirectMessageErrors(errors);
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
            directMessage={directMessage}
            directMessageHandlers={directMessageHandlers}
            directMessageErrors={directMessageErrors}
            modalDispatcher={modalDispatcher}
            showModal={showModal}
            receiverIds={receiverIds}
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
