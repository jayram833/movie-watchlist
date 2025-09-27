import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            if (stored === null) return initialValue;
            try {
                return JSON.parse(stored);
            } catch {
                return stored;
            }
        } catch (err) {
            console.error("Error reading localStorage key:", key, err);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            if (typeof value === "string") {
                localStorage.setItem(key, value);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (err) {
            console.error("Error writing localStorage key:", key, err);
        }
    }, [key, value]);

    return [value, setValue];
}
