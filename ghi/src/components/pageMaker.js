export default function pageMaker(array) {
    const pages = []
    let page = 0
    let newPage = ""
    for(let i=0; i<array.length; i++) {
        if (!array[i].startsWith('-') &&
            array[i].endsWith(`Page number: ${page}`)
        ) {
            page++
            pages.push(newPage)
            newPage = ""
        } else {
            newPage += `${array[i]}\n`
        }
    }
    if (newPage) {
        pages.push(newPage)
    }
    return pages;
}
