import React from 'react'
import PhoneNum from './PhoneNum'

const Contacs = ({ persons, handleDelPerson }) => {

    return (
        <div>
            { persons && persons.map((person) =>
                <div key={person.id + 'd'}>
                    <PhoneNum key={person.id + 'p'}    
                        name={person.name}
                        number={person.number} />
                    <button key={person.id + 'b'} onClick={() => handleDelPerson(person.id)}>del</button>
              </div>  
            )}

        </div>
    )
}

export default Contacs