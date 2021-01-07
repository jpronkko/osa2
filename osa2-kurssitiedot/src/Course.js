import React from 'react';

const Header = ({ name }) => {
    return (
        <div>
            <h2>{name}</h2>
        </div>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <>
            <p>{part} {exercises}</p>
        </>
    )
}
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Total = ({ parts }) => {
    const countTot = (total, current) => {
        return total + current.exercises
    }
    return (
        <div>
            <p>Total Number of Exercises {parts.reduce(countTot, 0)}</p>
        </div>
    )
}

const Course = ({ name, parts }) => {
    //console.log("name: ", name)
    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course