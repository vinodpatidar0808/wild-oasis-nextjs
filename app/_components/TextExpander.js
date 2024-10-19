"use client"
import { useState } from 'react';
// NOTE: this logo component is a server component in header this will act as a server component, but when it is used here it will automatically become client component as this is already inside client component..
// NOTE: remember we don't import and use component we use instance of component. 
// NOTE: any component imported here will act like a client component 
import Logo from "./Logo";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 40).join(' ') + '...';

  return (
    <span>
      {displayText}{' '}
      <button
        className='text-primary-700 border-b border-primary-700 leading-3 pb-1'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
      <Logo />
    </span>
  );
}

export default TextExpander;
