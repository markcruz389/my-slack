import React, { useEffect, useState, useReducer } from "react";
import { getChannelById, saveMemberInChannel } from "../../api/channelsApi";
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
      {console.log(activeChannel)}
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
                onClick={() => modalDispatcher({ type: "OPEN_MEMBERS_MODAL" })}
              >
                Members
              </button>
              <ChannelMembersModal
                members={activeChannel.data.channel_members}
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
      <div className='row h-75 bg-dark'>
        <div className='col'>
          <ChatBox />
        </div>
      </div>
      <div className='row'>
        <div className='col px-0 pt-3'>
          <MessageBox />
        </div>
      </div>
    </>
  );
};

export default ChatArea;
