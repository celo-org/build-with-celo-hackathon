import React from 'react'

function ItemCard(props: any) {

  let url = `${props.data.donationInfo}`

  const handleClick = () => {
    fetch(url)
      .then(response => response.json())
      .then((jsonData) => {
        console.log(jsonData)
      })
      .catch((error) => {
        console.error(error)
      })
    
  }


  return (
    <div>
      <span>{props.data.donationInfo}</span>
      <button onClick={handleClick}>click</button>
    </div>
  )
}

export default ItemCard