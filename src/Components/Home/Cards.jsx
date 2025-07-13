
// css files
import "../../ui/CardStyle/card.css"


function Cards({title,Details,color = "primary",className}) {

  return (
    <div className={`bg-${color} card ${className}`}>
      <h3 className="title font-bold">{title}</h3>
      <h3 className="details">{Details}</h3>
    </div>
  )
}

export default Cards