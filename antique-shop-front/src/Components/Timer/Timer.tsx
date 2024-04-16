import { useEffect, useState } from "react";

interface TimerProps {
    biddingTimeLimit: string;
    setBiddingOver :(t:boolean)=>void
}

export const Timer: React.FC<TimerProps> = ({ biddingTimeLimit,setBiddingOver }) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(Date.parse(biddingTimeLimit) - Date.now());

    useEffect(() => {
        const timerInterval = setInterval(() => {
            const remaining = Date.parse(biddingTimeLimit) - Date.now();
            if (remaining <= 0) {
                clearInterval(timerInterval);
                setTimeRemaining(0);
                setBiddingOver(false)
            } else {
                setTimeRemaining(remaining);
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [biddingTimeLimit]);

    const formatTime = (time: number): string => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="mt-1 timer">
            <h4>Time Remaining: {formatTime(timeRemaining)}</h4>
        </div>
    );
};