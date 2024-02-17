import { useEffect, useRef } from 'react';

export default function useOutsideClick(setState: any, value: any) {
    const componentRef = useRef<any>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (componentRef.current && !componentRef.current.contains(e.target))
            setState(value);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return componentRef;
}