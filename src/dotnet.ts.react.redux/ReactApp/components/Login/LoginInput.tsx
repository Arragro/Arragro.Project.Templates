import * as React from 'react'
import * as Formsy from 'formsy-react'

class LoginInput extends React.Component<any, any> {
    constructor (props: any) {
        super(props)

        this.changeValue = this.changeValue.bind(this)
    }

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    private changeValue (event: any) {
        this.props.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value'])
    }

    private getValidationError () {
        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        const errorMessage = this.props.getErrorMessage()
        if (errorMessage && errorMessage.length > 0) {
            return <div className='error-summary'><span className='has-error'>{errorMessage}</span></div>
        }
        return null
    }

    private getRequiredError (label: string) {
        if (this.props.showRequired() && this.props.isFormSubmitted()) {
            return <div className='error-summary'><span className='has-error'>{`The ${label} is required.`}</span></div>
        }
        return null
    }

    render () {

        // Set a specific className based on the validation
        // state of this component. showRequired() is true
        // when the value is empty and the required prop is
        // passed to the input. showError() is true when the
        // value typed is invalid
        const className = 'form-group ' + (this.props.className || ' ') +
            (this.props.showRequired() && this.props.isFormSubmitted() ? ' required' : this.props.showError() ? ' has-error' : '')


        return (
            <div className={className}>
                <div className='input-group input-group-lg' data-toggle='tooltip' data-placement='left' title={this.props.title}>
                    <div className='input-group-prepend'><i className={`input-group-text fa ${this.props.icon}`}></i></div>
                     
                    <input
                        className='form-control'
                        placeholder={this.props.label}
                        type={this.props.type || 'text'}
                        name={this.props.name}
                        onChange={this.changeValue}
                        value={this.props.getValue()}
                        checked={this.props.type === 'checkbox' && this.props.getValue() ? true : false}
                    />
                </div>
                {this.getRequiredError(this.props.label)}
                {this.getValidationError()}
            </div>
            )
    }
}

const formsyLoginUImput = Formsy.withFormsy(LoginInput)
export default formsyLoginUImput
