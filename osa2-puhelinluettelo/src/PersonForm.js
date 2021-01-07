import React from 'react'

const PersonForm = ({ addPerson, newName, handleNewNameChange, newNum, handleNewNumChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNewNameChange} />
            </div>
            <div>
                number: <input value={newNum} onChange={handleNewNumChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm