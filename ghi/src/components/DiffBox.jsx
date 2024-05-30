const prefixImg = (pre) => {
    let source
    if (pre === '+') {
        source = "plus.png"
    } else if (pre === '-') {
        source = "minus.png"
    } else {
        return <span className="ln-pre"></span>
    }
    return <img src={source} className="ln-pre"/>
}

function DiffBox({ uniStyle, diff }) {
    const printLine = (ln) => {
        let cn
        const prefix = ln.slice(0,1)
        const lnNum = ln.slice(1,5)
        const suffix = ln.slice(7)
        if (prefix === '-') {
            cn = "reddiff"

        } else if (prefix === "+") {
            cn = "greendiff"
        } else {
            cn = "nodiff"
        }
        return <p key={prefix+lnNum} className={cn}>{prefixImg(prefix)}<span className="ln-span">{lnNum}</span>{suffix}</p>
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
