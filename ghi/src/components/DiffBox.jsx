function DiffBox({ uniStyle, diff }) {
    const printLine = (ln) => {
        console.log(ln)
        if (ln.startsWith("-")) {
            return <p className="reddiff">{ln}</p>
        } else if (ln.startsWith("+")) {
            return <p className="greendiff">{ln}</p>
        } else {
            return <p className="nodiff">{ln}</p>
        }
    }
    return (
        <div className="diff-box">
            {diff.map((line) => {
                return printLine(line)
            })}
        </div>
    )
}


export default DiffBox;
