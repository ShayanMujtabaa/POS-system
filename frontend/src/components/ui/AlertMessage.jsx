import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const AlertMessage = ({ message, setShowAlert }) => {
    setTimeout(() => {
        setShowAlert(false);
    }, 3000);

    return (
        <Alert className="fixed top-1/2 left-0 transform -translate-y-1/2 w-fit max-w-sm p-4 bg-white border border-gray-300 shadow-lg rounded-md animate-slide-in">
            <div className="flex items-start space-x-2">
                <Terminal className="h-6 w-6 text-blue-500" />
                <div>
                    <AlertTitle className="font-bold text-lg">Heads up!</AlertTitle>
                    <AlertDescription className="text-gray-700">{message}</AlertDescription>
                </div>
            </div>
        </Alert>
    );
};

export default AlertMessage;
