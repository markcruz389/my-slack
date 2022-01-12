import React, { useContext } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import DataListInput from "../common/DataListInput";
import { UsersContext } from "../context";

const ChannelForm = ({ channel, onChange, onSubmit, errors }) => {
  const dataList = useContext(UsersContext);

  return (
    <>
      <form onSubmit={onSubmit} autoComplete='on'>
        <div className='row mb-2'>
          <div className='col'>
            <TextInput
              id='name'
              label='Name'
              name='name'
              value={channel.name || ""}
              placeholder='x'
              onChange={onChange}
              error={errors.name}
            />
          </div>
        </div>

        <div className='row mb-2'>
          <div className='col'>
            <DataListInput
              id='userWith'
              label='User With'
              name='userWith'
              value={channel.userWith || ""}
              dataList={dataList.data || []}
              placeholder='x'
              onChange={onChange}
              error={errors.name}
            />
          </div>
        </div>
        <div className='row text-center mt-3'>
          <div className='col d-flex justify-content-end'>
            <input type='submit' value='Submit' className='btn btn-primary' />
          </div>
        </div>
      </form>
    </>
  );
};

ChannelForm.propTypes = {
  channel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ChannelForm;
