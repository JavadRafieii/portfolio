import React from 'react';
import CountUpNumber from "./CountUp";

const countUpValues = [
    { id: 1, start: 0, end: 2, duration: 10, suffix: "+", description: "Years of\nExperience" },
    { id: 2, start: 0, end: 50, duration: 10, suffix: "+", description: "Project\nCompleted" },
    { id: 3, start: 0, end: 100, duration: 10, suffix: "%", description: "Happy\nClients" },
    { id: 4, start: 0, end: 14, duration: 10, suffix: "+", description: "My Hard\nSkills" },
];

function CountUpCard() {
    return (
        <>
            {countUpValues.map(({ id, start, end, duration, suffix, delay, description }) => (
                <div key={id} className="flex items-center gap-x-4">
                    <CountUpNumber
                        start={start}
                        end={end}
                        duration={duration}
                        suffix={suffix}
                    />
                    <span className="sora-400 text-primary-light-gray text-lg whitespace-pre-line">
                        {description}
                    </span>
                </div>
            ))}
        </>
    );
}

export default CountUpCard;