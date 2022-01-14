import React, { useContext } from "react";
import ChannelModal from "./ChannelModal";
import { Link } from "react-router-dom";
import { ChannelsContext } from "../context";

const Sidebar = ({
  channel,
  channelErrors,
  channelHandlers,
  showModal,
  setShowModal,
}) => {
  const [channelsContext] = useContext(ChannelsContext);

  return (
    <>
      <div className='row pt-5'>
        {/* <div className='col-2'>
          <button className='btn btn-info btn-sm'>&#9660;</button>
        </div> */}
        <div className='col-10 d-flex align-items-center'>
          {/* <a
            className='align-middle'
            href='#collapseExample'
            data-bs-toggle='collapse'role="button"
          >
            Channels
          </a> */}
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
            onClick={() => setShowModal(true)}
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
      <ChannelModal
        channel={channel}
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        onChange={channelHandlers.onChange}
        onSubmit={channelHandlers.onSubmit}
        errors={channelErrors}
      />
    </>
  );
};

export default Sidebar;
