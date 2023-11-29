import {createContext, ReactNode, useContext, useRef} from 'react';
import {Toast, ToastMessage} from "primereact/toast";

interface ToastContextType {
    showToast: (message: ToastMessage | ToastMessage[]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode | ReactNode[]
}

export const ToastProvider = (props: ToastProviderProps) => {

    const toast = useRef<Toast>(null);
    const showToast = (message: ToastMessage | ToastMessage[]) => {
        toast.current?.show(message)

    };

    return (
        <ToastContext.Provider value={{showToast}}>
            <Toast ref={toast}/>
            {props.children}
        </ToastContext.Provider>
    );
};