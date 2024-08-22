import React from "react";

const Button = ({ text = 'Sign in', bg = '#2AB806', fg = '#FFFFFF', pd = '' }) => {
    return (
      <button className="py-3 px-12 md:px-24" style={{ backgroundColor: bg, color: fg, border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
        {text}
      </button>
    );
  };

export default Button;

