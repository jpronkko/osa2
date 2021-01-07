import React, { useEffect, useState } from 'react'

const Message = (props) => {
    const [visible, setVisible] = useState(false)

    const msgStyle = {
        margin: 10,
        borderStyle: 'solid',
        borderColor: 'green',
        borderWidth: 10,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'yellow',
        color: 'green'
    }

    const errorStyle = {
        margin: 10,
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 10,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'yellow',
        color: 'green'
    }

    useEffect(() => {
        setVisible(true)
        setTimeout(
            () => {
                setVisible(false)
            }, 3000
        )
    }, [props.text, props.isError])

    if (visible) {
        return (
            <div style={props.isError ? errorStyle : msgStyle}>
                <p>{props.text}</p>
            </div>
        )
    } else {
        return null
    }
}

export default Message