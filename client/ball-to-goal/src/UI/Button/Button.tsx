import {MouseEventHandler} from "react";

interface IButtonProps {
    children: React.ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: IButtonProps) => {

    return (
        <button
            style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '10px 32px',
                textAlign: 'center',
                textDecoration: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                borderRadius: '12px',
                border: 'white 1px solid',
            }}
            onClick={props.onClick}>
            {props.children}

        </button>
    )
}

export default Button;