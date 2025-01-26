import { toast } from "react-toastify";

const position = {
    position: toast.POSITION.TOP_CENTER,
};

/**
 * 
 * @param message - message to display 
 * @param messageType - message type can be "success", "error", "warn", "info"
 */
export const toastMessage = (message, messageType) => {
    switch (messageType) {
        case "success":
            toast.success(message, position);
            break;
        case "error":
            toast.error(message, position);
            break;
        case "warn":
            toast.warn(message, position);
            break;
        default:
            toast.info(message, position); // Use `info` as a catch-all for unsupported types
    }
};
