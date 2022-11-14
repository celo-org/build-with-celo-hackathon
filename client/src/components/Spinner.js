import React from 'react'

function Spinner() {
  return (
    <div 
      class="spinner-border text-primary" 
      role="status"
      style={{
        zIndex: 1000,
        position: 'fixed',
        top: 'calc(50% - 15px)',
        left: 'calc(50% - 15px)',
      }}
    >
      <span class="visually-hidden">Loading...</span>
    </div>

  )
}

export default Spinner