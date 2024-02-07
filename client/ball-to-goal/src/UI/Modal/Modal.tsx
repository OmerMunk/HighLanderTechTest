import Button from "../Button/Button";
import {ReactNode} from "react";
const Modal = ({ children, title, onClose }: {children: ReactNode, title: string, onClose: ()=> void}) => {
    return <div className={'modal-overlay'}>

        <div className={'modal-content'}>
            <h1 className={'modal-header'}>
                {title}
                <Button
                    // buttonType={'cancel'}
                    onClick={onClose}

                >close</Button>
            </h1>
            <div className={'modal-body'}>
                {children}

            </div>

        </div>
    </div>;
};

export default Modal;
