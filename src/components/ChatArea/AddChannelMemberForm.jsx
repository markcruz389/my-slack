import React, { useContext } from "react";
import DataListInput from "../common/DataListInput";
import { UsersContext } from "../context";

const AddChannelMemberForm = ({
  newChannelMember,
  onChange,
  onSubmit,
  errors,
}) => {
  const dataList = useContext(UsersContext);

  return (
    <>
      <form onSubmit={onSubmit} autoComplete='on'>
        <div className='row mb-2'>
          <div className='col'>
            <DataListInput
              id='member'
              label='New Channel Member'
              name='member'
              value={newChannelMember.member || ""}
              dataList={dataList.data || []}
              placeholder='x'
              onChange={onChange}
              error={errors.member}
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

export default AddChannelMemberForm;
