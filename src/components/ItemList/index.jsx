import React from 'react'
import './styles.css'

function ItemList({title, description, html_url}) {
  return (
    <div className='item-list'>
      <a href={html_url}><strong>{title}</strong></a>
      <p>{description}</p>
      <hr />
    </div>
  )
}

export default ItemList