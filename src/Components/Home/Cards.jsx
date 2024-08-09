import React from 'react'
import "../../ui/CardStyle/card.css"

function Cards({title,Details,color = "primary"}) {
  return (
    <div className={`bg-${color} card`}>
      <h3 className="title">{title}</h3>
      <h3 className="details">{Details}</h3>
    </div>
  )
}

export default Cards