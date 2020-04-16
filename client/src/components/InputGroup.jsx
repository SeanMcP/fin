import * as React from 'react'

function InputGroup({ error, label, help, ...props }) {
    const id = props.name
    const inputProps = { id, ...props }

    let helpId
    if (help) {
        helpId = `${id}-help`
        inputProps['aria-describedby'] = helpId
    }

    return (
        <div style={{ display: 'grid', gap: '0.25rem' }}>
            <label htmlFor={id}>{label}</label>
            {help && <small id={helpId}>{help}</small>}
            <input {...inputProps} />
            {error && <p>{error}</p>}
        </div>
    )
}

export default InputGroup