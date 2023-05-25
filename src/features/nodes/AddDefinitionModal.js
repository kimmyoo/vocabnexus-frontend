import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { defFormValidation, canSubmit } from '../../common/utility'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'


const AddDefinitionModal = ({ userId, nodeId, closeDefModal }) => {
    const [formData, setFormData] = useState({
        partOfSpeech: "",
        definition: "",
        sentence: null,
        errors: {}
    })
    const definitionInput = useRef(null)
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        if (definitionInput.current) {
            definitionInput.current.focus()
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = defFormValidation(formData)
        if (canSubmit(errors)) {
            const dataForSubmission = {}
            dataForSubmission.id = nodeId
            dataForSubmission.user = userId
            dataForSubmission.meaning = formData
            axiosPrivate.post('nodes/word/meaning', dataForSubmission)
                .then(response => {
                    console.log("form submission is successful:", response.data)
                    closeDefModal()
                })
                .catch(error => {
                    console.error("Error submission error:", error)
                })
            // console.log(formData)
        } else {
            setFormData((prevData) => ({
                ...prevData,
                errors,
            }))
        }
    }

    const content = (

        <div className='modal addDef'>
            <h4>Add a new definition</h4>
            <form className='form'>
                <label htmlFor="definition">Definition*:{formData.errors?.definition && <span className='errmsg'>{formData.errors.definition}</span>} </label>
                <textarea
                    name="definition"
                    rows="3"
                    onChange={handleInputChange}
                    ref={definitionInput}
                >
                </textarea>
                <label>Part of Speech*: {formData.errors?.partOfSpeech && <span className='errmsg'>{formData.errors.partOfSpeech}</span>} </label>
                <select
                    name="partOfSpeech"
                    value={formData.partOfSpeech}
                    onChange={handleInputChange}
                >
                    <option value="">Select</option>
                    <option value="verb">Verb</option>
                    <option value="noun">Noun</option>
                    <option value="adj.">Adjective</option>
                    <option value="adv.">Adverb</option>
                    <optgroup label="Word Affix">
                        <option value="prefix">prefix--</option>
                        <option value="base word">base</option>
                        <option value="suffix">--suffix</option>
                    </optgroup>
                    <option value="other">other</option>
                </select>
                <label htmlFor="sentence">Exmaple Sentence: </label>
                <textarea
                    name="sentence"
                    rows="6"
                    onChange={handleInputChange}
                >
                </textarea>
                <button onClick={closeDefModal}>close</button>
                <button className="float-right" onClick={handleSubmit}>Add</button>
            </form>
        </div>

    )

    return (
        content
    )
}

export default AddDefinitionModal