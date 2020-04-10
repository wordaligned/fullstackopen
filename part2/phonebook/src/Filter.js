import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => (
    <div>filter entries:
        <input value={newFilter} onChange={handleFilterChange}/>
    </div>)

export default Filter
