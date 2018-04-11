import * as React from 'react'
import ReactSAlert from 'react-s-alert'

export interface IAlertProps {
    stack: any
    position: string
    effect: string
    timeout: number
}

const Alert: React.StatelessComponent<IAlertProps> = (props) => {
    return <ReactSAlert stack={props.stack} position={props.position} effect={props.effect} timeout={props.timeout} />
}

export default Alert
