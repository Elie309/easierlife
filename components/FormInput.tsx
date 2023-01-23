'use client'
import React, { Component, MutableRefObject } from 'react'

interface Props {

    name: string;
    type: "email" | "password" | "text"
    inputClassName?: string;
    generalDivClassName?: string;
    textClassName?: string;
    placeHolder: string;
    regExp?: RegExp | null;
    errorMessage?: string;
    ref?: React.RefObject<FormInput> | MutableRefObject<FormInput>;
    customValidation?: () => boolean;
    customValidationMessage?: string;
}

interface State {
    value: string;
    isFocused: boolean;
    error: string[];
    warning: string[];
    showPassword: boolean;
}


export default class FormInput extends Component<Props, State> {

    //#region Private Fields

    private refInput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
    private isPassword:boolean = this.props.type === 'password';

    //#endregion

    //#region Constructor

    constructor(props: Props) {
        super(props)

        this.state = {
            value: '',
            isFocused: false,
            error: [],
            warning: [],
            showPassword: false,
            
        }

        this.handleChange = this.handleChange.bind(this);
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.handleKeys = this.handleKeys.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.isValueCorrect = this.isValueCorrect.bind(this);
        this.handleShowPassword = this.handleShowPassword.bind(this);

    }

    //#endregion
 
    //#region Change Handlers

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setValue(e.target.value);
    }

    
    handleShowPassword(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();

        this.setState({
            showPassword: !this.state.showPassword
        }, () => {
            if(this.refInput.current) this.refInput.current.type = this.state.showPassword ? 'text' : 'password';
        })

    }


    handleKeys = (e: React.KeyboardEvent<HTMLInputElement>): void => {


        let capsLockMessage = "Caps Lock is on"

        if (e.getModifierState("CapsLock")) {
            this.setState({
                warning: this.addMessageToState(this.state.warning, capsLockMessage)
            })
        } else {
            this.setState({
                warning: this.removeMessageFromState(this.state.warning, capsLockMessage)
            })
        }
    }

    //#endregion

    //#region Errors Handlers

    resetErrors() {
        this.setState({
            error: [],
            warning: [],
        })
    }

    addMessageToState(arr: string[], message: string): string[] {

        if (!arr.includes(message)) {
            arr.push(message);
        }
        return arr;
    }

    removeMessageFromState(arr: string[], message: string): string[] {

        if (arr.includes(message)) {
            arr.splice(arr.indexOf(message), 1);
        }
        return arr;
    }

    //#endregion

    //#region Focus And Blur
   
    handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
        this.setState({
            isFocused: true
        })
    }

    handleBlur = (): void => {

        //Here even if the value is false, there is still the fact that the value is not empty, so
        //label will not translate back to the placeHolder
        this.setState({
            isFocused: false,
            warning: [],
        })

        const RegexInvalidMessage = this.props.errorMessage || "Invalid input";
        if (this.isValueCorrect()) {
            this.setState({
                error: this.removeMessageFromState(this.state.error, RegexInvalidMessage)
            })
        } else {
            this.setState({
                error: this.addMessageToState(this.state.error, RegexInvalidMessage)
            })
        }

        if(this.props.customValidation) {
            if(this.props.customValidation()) {
                this.setState({
                    error: this.removeMessageFromState(this.state.error, this.props.customValidationMessage || "Custom validation failed")
                })
            } else {
                this.setState({
                    error: this.addMessageToState(this.state.error, this.props.customValidationMessage || "Custom validation failed")
                })
            }
        }

    }

    //#endregion

    //#region Values

    setValue(value: string): void {

        this.setState({
            value
        })
    }

    getValue(): string {
        return this.state.value;
    }

    isValueCorrect(): boolean {

        if (this.props.regExp) {
            return this.props.regExp.test(this.state.value);
        }

        if(this.props.customValidation){
            return this.props.customValidation();
        }

        return true;

    }

    //#endregion

    render() {

        let { name, type, inputClassName: className, generalDivClassName: groupClassName, textClassName, placeHolder } = this.props;


        if (className === undefined) className = "";
        if (groupClassName === undefined) groupClassName = "";
        if (textClassName === undefined) textClassName = "";

        let isThereAnError = this.state.error.length > 0;
        let isThereAWarning = this.state.warning.length > 0;

        // This is important because it handles the case where there is an input or the input is focused
        let labelClassName = this.state.isFocused || this.state.value !== "" ? "text-sm -translate-y-7" : "text-base";
        let showPasswordClassName = this.state.showPassword ? " hover:fill-slate-500 fill-blue-600 " : " fill-slate-500 hover:fill-blue-600";

        return (
            <div
                className={`relative w-full ${groupClassName}`}
            >
                <input
                    name={name}
                    className={`w-full h-10 p-3 ${this.isPassword ? "pr-9" : "pr-3"} text-gray-700 border border-gray-200 outline-0 ${this.state.error.length > 0 ? " ring-1 ring-red-200 " : " focus:border-blue-200 "} rounded-lg ${className}`}
                    type={type}
                    value={this.state.value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onKeyDown={this.handleKeys}
                    ref={this.refInput}
                />

                {
                    this.isPassword &&

                    <button
                    tabIndex={-1}
                    className="absolute top-0 right-0 mt-2 mr-2 bg-transparent border-0"
                    onClick={this.handleShowPassword}
                    >
                        <ShowPassword
                            className={` w-5 h-full  cursor-pointer ${showPasswordClassName}`}
                        />
                    </button>
                }


                {/* Label */}
                <button
                    tabIndex={-1}
                    onClick={() => {
                        this.setState({
                            isFocused: true
                        }, () => {
                            this.refInput.current?.focus();

                        })
                    }}
                    className={`absolute left-0 ml-2 mt-2 bg-transparent border-0 cursor-default transition-transform duration-200 ${labelClassName} ${textClassName}`}>
                    <label
                        className={`select-none text-gray-400 font-bold`}
                        htmlFor={name}
                    >
                        {placeHolder}
                    </label>
                </button>

                {/* ERROR Handler */}
                <p className='text-xs self-start p-0 m-0 mt-1'>
                    {
                        isThereAnError &&
                        <span className='p-0  text-red-500'>
                            {this.state.error.join(", ")}
                        </span>
                    }

                    {
                        (isThereAnError && isThereAWarning)
                        &&
                        <span className='p-0 m-0 text-gray-500'> - </span>
                    }

                    {
                        isThereAWarning &&
                        <span className='p-0 text-yellow-600'>
                            {this.state.warning.join(", ")}
                        </span>
                    }
                </p>
            </div>
        )
    }
}


function ShowPassword(props: { className: string, height?: number, width?: number, fill?: string, subclass?: string }) {
    return (
        <svg
            className={props.className}
            height={props.height}
            width={props.width}
            fill={props.fill}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            >
            <path className={props.subclass} d="M16,8.21c0,3.29-3.56,6-7.95,6S0,11.5.05,8.21s3.62-6,8-6S16,4.92,16,8.21Z" />
            <ellipse style={{ "fill": "#fff" }} cx="7.74" cy="8" rx="4.24" ry="4.71" />
            <circle className={props.subclass} cx="7.74" cy="8" r="2.5" />
        </svg>
    )
}
