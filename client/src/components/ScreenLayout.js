import React, { useEffect } from 'react'

function ScreenLayout(props) {
    useEffect(() => {
        let title = 'Fin'
        if (props.title) {
            title = props.title + ' - ' + title
        }
        document.title = title
    }, [props.title])

    return (
        <div>
            <header>Fin</header>
            <main>{props.children}</main>
        </div>
    )
}

export default ScreenLayout