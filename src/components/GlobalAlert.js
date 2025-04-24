import React, { useEffect, useState, useRef } from 'react';
import Alert from './Alert';

export default function GlobalAlert() {
    const [alertData, setAlertData] = useState(null);
    const timeoutRef = useRef(null); // Store timeout reference

    useEffect(() => {
        const handleShowAlert = (e) => {
            // Clear any existing timeout first
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Show new alert data
            setAlertData(e.detail);

            // Set new timeout
            timeoutRef.current = setTimeout(() => {
                setAlertData(null);
                timeoutRef.current = null;
            }, 2000);
        };

        window.addEventListener('show-alert', handleShowAlert);

        return () => {
            window.removeEventListener('show-alert', handleShowAlert);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return alertData ? <Alert {...alertData} /> : null;
}
