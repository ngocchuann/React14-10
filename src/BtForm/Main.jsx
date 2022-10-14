import React, { Component } from 'react'
import FormReact from './FormReact'
import TableReact from './TableReact'

export default class Main extends Component {
  render() {
    return (
      <div className='container py-5'>
        <FormReact/>
        <TableReact/>
      </div>
    )
  }
}
