import CountUp from 'react-countup';

function CountUpNumber({ ...otherProps }) {
    return (
        <CountUp
            {...otherProps}
            className="sora-800 text-primary-light-gray text-7xl"
            end={otherProps.end}
            useEasing={true}
            useGrouping={true}
            startOnMount={false}
            enableScrollSpy={true}
            scrollSpyOnce={true}
        />
    );
}

export default CountUpNumber;