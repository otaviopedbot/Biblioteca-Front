import React from 'react'
import Card from '../../components/Card'
import { getAuthor } from '../../requests/author'
import { useParams } from 'react-router-dom'

const ViewAuthors = () => {

  const {id} = useParams()

  const data = getAuthor(id)

  return (
    <div>

      <Card title={'teste'} data={data} />

    </div>
  )
}

export default ViewAuthors