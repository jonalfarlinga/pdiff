import { useState } from 'react';


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

function PaginateDiff({ uniStyle, diff }) {
    let pages = []
    const [currentPage, setCurrentPage] = useState(0)

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

    let page = []
    for (let i = 0; i<diff.length; i++) {
        if (/Page number: \d+$/.test(diff[i]) &&
            page.length > 0
        ) {
            pages.push([...page])
            page  = []
        } else {
            page.push(printLine(diff[i]))
        }
    }
    if (pages.length > 0) {
        pages.push([...page])
    }

    const pageChange = (newPage) => {
        if (newPage >= pages.length) {
            setCurrentPage(pages.length - 1)
        } else if (newPage < 0) {
            setCurrentPage(0)
        } else {
            setCurrentPage(newPage)
        }
    }

    return (
        <>
            <div className='container row justify-content-between m-0'>
                <span className='col m-3'></span>
                <button
                type="button"
                className="col btn btn-primary m-3"
                onClick={() => pageChange(0)}>
                    {"<<"}
                </button>
                <button
                type="button"
                className="col btn btn-primary m-3"
                onClick={() => pageChange(currentPage-1)}>
                    {"<"}
                </button>
                <p className='p-3 col btn btn-primary m-3'>{currentPage + 1}</p>
                <button
                type="button"
                className="col btn btn-primary m-3"
                onClick={() => pageChange(currentPage+1)}>
                    {">"}
                </button>
                <button
                type="button"
                className="col btn btn-primary m-3"
                onClick={() => pageChange(pages.length)}>
                    {">>"}
                </button>
                <span className='col m-3'></span>
            </div>
            <div className="diff-box-page">
                {pages[currentPage]}
            </div>
        </>
    )
}


export default PaginateDiff;
