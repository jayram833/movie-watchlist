import { useEffect, useState } from "react";
export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? stored : initialValue;
        } catch (err) {
            console.error("Error reading localStorage key:", key, err);
            return initialValue;
        }
    });
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error("Error writing localStorage key:", key, err);

        }
    }, [key, value]);
    return [value, setValue];
}