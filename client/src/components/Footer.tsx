import React from 'react'

export const Footer = () => {
  return (
    <div><footer className="bg-primary text-white py-4">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Volunteer Management App. All rights reserved.
      </p>
    </div>
  </footer></div>
  )
}
