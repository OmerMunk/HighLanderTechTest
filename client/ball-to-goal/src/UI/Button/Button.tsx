import {MouseEventHandler} from "react";

interface IButtonProps {
    children: React.ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: IButtonProps) => {

    return (
        <button
            className={'main-button'}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;