import React from 'react'

const FormInput = ({id,  type}) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className="text-lg">
            {id+":"}
          </label>
          <input
            {...register(id)}
            type={type}
            name={id}
            id={id}
            className="border border-gray-300 rounded-md p-2 w-64"
          />
    </div>
  )
}

export default FormInput;
