import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({ section, link, page }) => {
  return (
      <div className="font-medium flex items-center">
        <Link to={link}>
          <span className="text-[#959496]">{section}</span>
        </Link>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"
            fill="#959496"
          />
        </svg>
        {page}
      </div>
  )
}

export default Breadcrumbs
