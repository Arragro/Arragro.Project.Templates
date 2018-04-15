import * as React from 'react'
import * as FRC from 'formsy-react-components'

import LoginInput from 'app/components/Login/LoginInput'

const { Form, Input, Checkbox } = FRC

export interface IFormsyProps {
}

export interface IFormsyState {
    userName: string
    emailAddress: string
    truthy: boolean
    isValid: boolean
}

export default class Formsy extends React.Component<IFormsyProps, IFormsyState> {
    constructor (props: any) {
        super(props)

        this.state = {
            userName: '',
            emailAddress: '',
            truthy: true,
            isValid: true
        }

        this.setValid = this.setValid.bind(this)
        this.setInvalid = this.setInvalid.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    setValid () {
        this.setState(state => ({
            isValid: true
        }))
    }

    setInvalid () {
        this.setState(state => ({
            isValid: false
        }))
    }

    onChange (currentValues: any, isChanged: boolean) {
        console.log(currentValues)
    }

    onSubmit (model: any) {
        if (this.state.isValid) {
            alert(JSON.stringify(model))
        }
    }

    render () {
        return (
            <div>
                <Form
                    layout='vertical'
                    validateOnSubmit={true}
                    onInvalid={this.setInvalid}
                    onValid={this.setValid}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                >

                    <div className='row'>
                        <div className='col-6'>

                            <LoginInput
                                label='User Name'
                                name='userName'
                                value={this.state.userName}
                                required
                            />

                            <Input
                                type='text'
                                label='Email Address'
                                validations={{
                                    isEmail: 1,
                                    maxLength: 2000
                                }}
                                name='emailAddress'
                                value={this.state.emailAddress}
                                required
                                validationErrors={{
                                    isEmail: 'Please supply a valid email address.',
                                    maxLength: 'There is a 2000 character limit to this field.'
                                }}
                            />

                            <Checkbox
                                label='Truthy'
                                name='truthy'
                                value={this.state.truthy}
                            />

                            <button type='submit' className='btn btn-primary'>Submit</button>

                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}
