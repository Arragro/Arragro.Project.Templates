declare module 'formsy-react' {

    import * as React from 'react'

    export interface ValidationErrors {
        [key: string]: string
    }

    // This is declared for a reference to Formsy.Mixin in FormsyFormComponent.ts
    let Mixin: any
    let validations: any

    export function addValidationRule (name: string, func: any): void

    export default class Formsy extends React.Component<any, any> { }

    export function withFormsy (component: any): any
}
