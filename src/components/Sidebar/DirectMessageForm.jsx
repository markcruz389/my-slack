import React, { useContext } from "react";
import DataListInput from "../common/DataListInput";
import TextareaInput from "../common/TextareaInput";
import { UsersContext } from "../context";

const style = {
  height: "100px",
};

const DirectMessageForm = ({ directMessage, onChange, onSubmit, errors }) => {
  const dataList = useContext(UsersContext);

  return (
    <>
      <form onSubmit={onSubmit} autoComplete='on'>
        <div className='row mb-2'>
          <div className='col'>
            <DataListInput
              id='sendTo'
              label='To'
              name='sendTo'
              value={directMessage.sendTo || ""}
              dataList={dataList.data || []}
              placeholder='x'
              onChange={onChange}
              error={errors.sendTo}
            />
          </div>
        </div>

        <div className='row mb-2'>
          <div className='col'>
            <TextareaInput
              id='body'
              label='Message'
              name='body'
              value={directMessage.body || ""}
              onChange={onChange}
              style={style}
              error={errors.sendTo}
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

export default DirectMessageForm;
