import React, { useEffect, useState, useReducer } from "react";
import { getChannelById, saveMemberInChannel } from "../../api/channelsApi";
import { send, retrieveMessages } from "../../api/messagesApi";
import ChatBox from "./ChatBox";
import MessageBox from "./MessageBox";
import ChannelMembersModal from "./ChannelMembersModal";
import AddChannelMemberModal from "./AddChannelMemberModal";
import { toast } from "react-toastify";

const modalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MEMBERS_MODAL":
      return { ...state, members: true };
    case "OPEN_ADD_MEMBER_MODAL":
      return { ...state, addMember: true };
    case "CLOSE_MODAL":
      return { ...state, members: false, addMember: false };
    default:
  }
};

const ChatArea = ({ channelId }) => {
  const [activeChannel, setActiveChannel] = useState({
    data: {
      id: null,
      owner_id: null,
      name: "",
      created_at: "",
      updated_at: "",
      channel_members: [],
    },
  });
  const [newChannelMember, setNewChannelMember] = useState({
    member: "",
  });
  const [newMemberErrors, setNewMemberErrors] = useState({});
  const [message, setMessage] = useState({
    body: "",
  });
  const [messages, setMessages] = useState({});
  const [messageReferenceId, setMessageReferenceId] = useState(null);
  const [showModal, modalDispatcher] = useReducer(modalReducer, {
    members: false,
    addMember: false,
  });

  useEffect(() => {
    if (channelId !== null) {
      (async () => {
        const response = await getChannelById(channelId);
        if (response.status === 200) {
          setActiveChannel(response.data);
        }
      })();
    }
  }, [channelId]);

  useEffect(() => {
    if (channelId !== null) {
      (async () => {
        const params = {
          receiverId: channelId,
          receiverClass: "Channel",
        };
        const response = await retrieveMessages(params);
        if (response.status === 200) {
          setMessages(response.data);
        }
      })();
    }
  }, [channelId, messageReferenceId]);

  const addChannelMemberHandlers = {
    onChange: ({ target }) => {
      setNewChannelMember({ ...newChannelMember, [target.name]: target.value });
    },
    onSubmit: (event) => {
      event.preventDefault();

      if (!isNewMemberFormIsValid()) {
        toast.error("Field is not valid");
      }

      (async () => {
        const request = {
          id: activeChannel.data.id,
          memberId: parseInt(newChannelMember.member.split("-")[0].trim(), 10),
        };
        const response = await saveMemberInChannel(request);

        if (response.status === 200) {
          console.log(response.data);
          setActiveChannel({
            ...activeChannel,
            data: { ...response.data.data },
          });
          toast.success("Member Added");
          modalDispatcher({ type: "CLOSE_MODAL" });
        }
      })();
    },
  };

  const sendChannelMessageHandlers = {
    onChange: ({ target }) => {
      setMessage({ ...message, [target.name]: target.value });
    },
    onSubmit: (event) => {
      event.preventDefault();

      (async () => {
        const request = {
          receiverId: activeChannel.data.id,
          receiverClass: "Channel",
          body: message.body,
        };
        const response = await send(request);

        if (response.status === 200) {
          console.log(response.data);
          setMessageReferenceId(response.data.data.messageReferenceId);
          toast.success("Message Sent");
        }
      })();
    },
  };

  const isNewMemberFormIsValid = () => {
    const errors = {};

    if (!newChannelMember.member) {
      errors.member = "Member is required";
    }

    setNewMemberErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      {channelId !== null ? (
        <>
          <div className='row mb-2 border-bot tom py-2'>
            <div className='col d-flex justify-content-between px-0'>
              <div className='row'>
                <div className='col'>
                  <span className='fs-4'>{activeChannel.data?.name}</span>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <button
                    className='btn btn-info'
                    onClick={() =>
                      modalDispatcher({ type: "OPEN_MEMBERS_MODAL" })
                    }
                  >
                    Members
                  </button>
                  <ChannelMembersModal
                    members={activeChannel.data?.channel_members}
                    showModal={showModal.members}
                    closeModal={() => modalDispatcher({ type: "CLOSE_MODAL" })}
                  />
                </div>
                <div className='col'>
                  <button
                    className='btn btn-success'
                    onClick={() =>
                      modalDispatcher({ type: "OPEN_ADD_MEMBER_MODAL" })
                    }
                  >
                    +
                  </button>
                  <AddChannelMemberModal
                    newChannelMember={newChannelMember}
                    addChannelMemberHandlers={addChannelMemberHandlers}
                    showModal={showModal.addMember}
                    closeModal={() => modalDispatcher({ type: "CLOSE_MODAL" })}
                    errors={newMemberErrors}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row h-75 overflow-auto'>
            <div className='col'>
              <ChatBox messages={messages.data} />
            </div>
          </div>
          <div className='row'>
            <div className='col px-0 pt-3'>
              <MessageBox
                message={message}
                onChange={sendChannelMessageHandlers.onChange}
                onSubmit={sendChannelMessageHandlers.onSubmit}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatArea;
