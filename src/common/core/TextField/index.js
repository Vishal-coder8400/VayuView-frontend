import React, { useState } from 'react';
import './style.scss'

export const TextInput = ({text, iconRight}) => {

  return (
    <div className='text-field-wrapper'>

    <input className="text-field" placeholder={text}>
    </input>
    {iconRight}
    </div>
  );
};