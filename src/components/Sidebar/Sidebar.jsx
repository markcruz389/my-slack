import React, { useContext } from "react";
import ChannelModal from "./ChannelModal";
import { Link } from "react-router-dom";
import { ChannelsContext, UserLoginContext, UsersContext } from "../context";
import DirectMessageModal from "./DirectMessageModal";

const Sidebar = ({
  channel,
  channelErrors,
  channelHandlers,
  directMessage,
  directMessageHandlers,
  directMessageErrors,
  modalDispatcher,
  showModal,
  receiverIds,
}) => {
  const [userLoginContext] = useContext(UserLoginContext);
  const [channelsContext] = useContext(ChannelsContext);
  const users = useContext(UsersContext);

  return (
    <>
      {console.log(userLoginContext)}
      <div className='row pt-5'>
        <div className='col-10 d-flex align-items-center'>
          <a
            className='btn btn-light'
            data-bs-toggle='collapse'
            href='#channelsCollapse'
            role='button'
            aria-expanded='false'
            aria-controls='channelsCollapse'
          >
            Channels
          </a>
        </div>
        <div className='col-2'>
          <button
            className='btn btn-success btn-sm'
            onClick={() => modalDispatcher({ type: "OPEN_ADD_CHANNEL_MODAL" })}
          >
            +
          </button>
        </div>
        <div className='collapse mt-2' id='channelsCollapse'>
          <ul className='list-group'>
            {channelsContext.data?.map((channel) => (
              <li key={channel.id} className='list-group-item'>
                <Link
                  className='text-decoration-none'
                  to=''
                  onClick={() => channelHandlers.onClick(channel.id)}
                >
                  {channel.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='row pt-5'>
        <div className='col-10 d-flex align-items-center'>
          <a
            className='btn btn-light'
            data-bs-toggle='collapse'
            href='#messagesCollapse'
            role='button'
            aria-expanded='false'
            aria-controls='messagesCollapse'
          >
            Direct Messages
          </a>
        </div>
        <div className='col-2'>
          <button
            className='btn btn-success btn-sm'
            onClick={() =>
              modalDispatcher({ type: "OPEN_ADD_DIRECT_MESSAGE_MODAL" })
            }
          >
            +
          </button>
        </div>
        <div className='collapse mt-2' id='messagesCollapse'>
          <ul className='list-group'>
            {receiverIds?.map((id) => (
              <li className='list-group-item'>
                <Link
                  className='text-decoration-none'
                  to=''
                  onClick={() => channelHandlers.onClick(channel.id)}
                >
                  {users.data?.map((user) =>
                    user.id === id ? `${user.email}` : ""
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ChannelModal
        channel={channel}
        showModal={showModal.addChannel}
        closeModal={() => modalDispatcher({ type: "CLOSE_MODAL" })}
        onChange={channelHandlers.onChange}
        onSubmit={channelHandlers.onSubmit}
        errors={channelErrors}
      />
      <DirectMessageModal
        directMessage={directMessage}
        showModal={showModal.addDirectMessage}
        closeModal={() => modalDispatcher({ type: "CLOSE_MODAL" })}
        onChange={directMessageHandlers.onChange}
        onSubmit={directMessageHandlers.onSubmit}
        errors={directMessageErrors}
      />
    </>
  );
};

export default Sidebar;
