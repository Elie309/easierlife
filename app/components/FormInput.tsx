
interface Props {

    name: string;
    type: "email" | "password" | "text"
    className?: string;
    inputClassName?: string;
    generalDivClassName?: string;
    textClassName?: string;
    labelClassName?: string;
    placeHolder: string;
    regExp?: RegExp | null;
    errorMessage?: string;
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


export default function FormInput(props: Props) {

    const isPassword = props.type === "password";


    let errorMessages: string[] = [];

    const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();

        const attributeName = "data-showpass";
        const showPassEle = document.querySelector(`[${attributeName}]`) as SVGElement;
        const attr = showPassEle?.getAttribute(attributeName);

        const inputEle = document.querySelector(`[name=${props.name}]`) as HTMLInputElement;

        if (attr === "true") {
            showPassEle?.setAttribute(attributeName, "false");
            showPassEle?.classList.add("hover:fill-slate-500", "fill-blue-600");
            showPassEle?.classList.remove("fill-slate-500", "hover:fill-blue-600");
            inputEle?.setAttribute("type", "text");

        } else {
            showPassEle?.setAttribute(attributeName, "true");
            showPassEle?.classList.remove("hover:fill-slate-500", "fill-blue-600");
            showPassEle?.classList.add("fill-slate-500", "hover:fill-blue-600");
            inputEle?.setAttribute("type", "password");
        }


    }


    const handleKeys = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const errorElement = document.querySelector(`[data-error=${props.name}]`) as HTMLParagraphElement;
        const messageCapsLock = "Caps Lock is on";

        if (e.getModifierState("CapsLock")) {
            e.currentTarget.classList.add("border-red-600");
            e.currentTarget.classList.remove("border-gray-200");
            if(errorMessages.indexOf(messageCapsLock) === -1){
                errorMessages.push(messageCapsLock);
            }
            errorElement.innerText = errorMessages.join(", ");
        } else {
            e.currentTarget.classList.remove("border-red-600");
            e.currentTarget.classList.add("border-gray-200");
            
            
            errorMessages.indexOf(messageCapsLock) > -1 && errorMessages.splice(errorMessages.indexOf(messageCapsLock), 1);
            errorElement.innerText = errorMessages.join(", ");
        }

    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        const errorElement = document.querySelector(`[data-error=${props.name}]`) as HTMLParagraphElement;
        e.currentTarget.classList.remove("border-red-600");

        errorMessages = [];
        errorElement.innerText = errorMessages.join(", ");

        if(!props.regExp?.test(e.currentTarget.value)){


            errorMessages.push(props.errorMessage || "Invalid input");
            errorElement.innerText = errorMessages.join(", ");
        }else{
            errorMessages = [];
            errorElement.innerText = errorMessages.join(", ");

        }

    }


    return (
        <div
            className={`w-full ${props.generalDivClassName || ""}`}
        >

            <label
                className="block mb-3 text-sm font-bold text-skin-muted"
                htmlFor={props.name}>
                {props.placeHolder}
            </label>
            <div className="relative">

                <input
                    name={props.name}
                    className={`w-full h-10 p-3 ${isPassword ? "pr-9" : "pr-3"} 
                        text-skin-muted border peer focus-within:border-skin-inverted border-gray-200 outline-0 
                        rounded-lg ${props.className || ""}`}
                    type={props.type}
                    pattern={props.regExp?.source.toString()}
                    onKeyDown={handleKeys}
                    onBlur={handleBlur}
                />

                {
                    isPassword &&

                    <button
                        tabIndex={-1}
                        className="absolute top-0 right-0 mt-2 mr-2 bg-transparent border-0"
                        onClick={handleShowPassword}
                    >
                        <ShowPassword
                            className={`w-5 h-full cursor-pointer fill-slate-500`}
                        />
                    </button>
                }

            </div>


            <p data-error={props.name} className="text-yellow-500 text-sm italic"></p>
        </div>
    )
}


function ShowPassword(props: { className: string, height?: number, width?: number, fill?: string, subclass?: string }) {
    return (
        <svg
            data-showpass="true"
            className={props.className || ""}
            height={props.height}
            width={props.width}
            fill={props.fill}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
        >
            <path className={props.subclass || ""} d="M16,8.21c0,3.29-3.56,6-7.95,6S0,11.5.05,8.21s3.62-6,8-6S16,4.92,16,8.21Z" />
            <ellipse style={{ "fill": "#fff" }} cx="7.74" cy="8" rx="4.24" ry="4.71" />
            <circle className={props.subclass || ""} cx="7.74" cy="8" r="2.5" />
        </svg>
    )
}
