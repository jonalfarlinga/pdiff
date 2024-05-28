import { useState } from 'react'

const initialData = {
    pdf1: undefined,
    pdf2: undefined,
}
function Form({uniStyle, setUniStyle}) {
    const [pdfData, setPdfData] = useState(initialData)
    const [err, setErr] = useState('')
    const [diff, setDiff] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!pdfData.pdf1 || !pdfData.pdf2) {
            setErr(
                <div className='alert alert-warning alert-dismissible' role='alert'>
                    {'You must select two PDFs'}
                </div>
            )
            return;
        }

        const url = `${import.meta.env.VITE_BACKEND_HOST}/api/diff-pdf`

        const formData = new FormData()
        formData.append("pdf1", pdfData.pdf1)
        formData.append("pdf2", pdfData.pdf2)

        const options = {
            method: "POST",
            body: formData,
        }
        try {
            const response = await fetch(
                url,
                options,
            );

            if (response.ok) {
                const data = await response.json();
                setDiff(data.diff)
            } else {
                setErr(
                    <div className='alert alert-danger alert-dismissible' role='alert'>
                        {`Invalid request at ${url}: ${response.status}`}
                    </div>
                )
            }
        } catch (e) {
            setErr(
                <div className='alert alert-danger alert-dismissible' role='alert'>
                    {`Failed to fetch request at ${url}: ${e}`}
                </div>
            )
        }
    }

    const handleChange = (e) => {
        setPdfData({
            ...pdfData,
            [e.target.name]: e.target.files[0]
        })
    }

    return (
        <form className='mt-3 mb-3 col' onSubmit={handleSubmit}>
            <div className='liveAlertPlaceholder'>
                {err}
            </div>
            <input
              onChange={handleChange}
              type='file'
              required
              name='pdf1'
              id='pdf1'
              className='form-control'
            />
            <label htmlFor='pdf1'>Original PDF</label>
            <input
              onChange={handleChange}
              type='file'
              required
              name='pdf2'
              id='pdf2'
              className='form-control'
            />
            <label htmlFor='pdf2'>Edited PDF</label>
            <button className={
                'form-control btn btn-primary ' + (uniStyle)
                }
            >
                Get Differences
            </button>
        </form>
    )
}

export default Form;
