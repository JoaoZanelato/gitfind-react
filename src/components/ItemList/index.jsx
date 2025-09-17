import React from 'react'
import './styles.css'

function ItemList({title, description, html_url}) {
  return (
    <div className='item-list'>
      <a href={html_url} target='blank'><strong>{title}</strong></a>
      {description ? <p>{description}</p> : <p><i>Repositório sem descrição</i></p>}
      <hr />
    </div>
  )
}

export default ItemList