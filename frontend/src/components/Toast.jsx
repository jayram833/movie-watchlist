// Toast.js
import { useEffect } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

const icons = {
    success: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
    error: <ExclamationCircleIcon className="h-6 w-6 text-red-600" />,
    info: <InformationCircleIcon className="h-6 w-6 text-blue-600" />,
};

const bgStyles = {
    success: 'border-green-500',
    error: 'border-red-500',
    info: 'border-blue-500',
};

export default function Toast({ message, type = 'info', duration = 4000, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border-l-4 ${bgStyles[type]} backdrop-blur-md bg-white/80 text-gray-800 animate-slide-in`}>
            {icons[type]}
            <span className="flex-1 font-medium">{message}</span>
            <button onClick={onClose}>
                <XMarkIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition" />
            </button>
        </div>
    );
}
