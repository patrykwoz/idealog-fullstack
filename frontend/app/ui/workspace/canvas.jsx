function generateCordset(count) {
    return Array(count).fill(0).map(() => [
        Math.random() * 80 + 10,
        Math.random() * 35 + 10,
    ]);
}

export default function Canvas({ ideas, relations }) {
    const cordset = generateCordset(ideas.length);

    return (
        <>
            <div className={styles.canvas}>
                <svg className={styles.svg}
                    viewBox="0 0 100 50"
                    >
                    {cordset.map(([x, y], i) => (
                        <g key={i}>
                            <circle className={styles.node}
                                    cx={x} cy={y} r="3" />
                            <text   className={styles.nodeTag}
                                    x={x} y={y+0.25}
                                    textAnchor="middle">
                                {`${ideas[i].name.slice(0,8)} `}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </>
    );
}
