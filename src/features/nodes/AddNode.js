import React from 'react'
import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { canSubmit } from '../../common/utility'
import { nodeWordValidation } from '../../common/utility'
import { useNavigate } from 'react-router-dom'

const AddNode = () => {
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const [formData, setFormData] = useState({
        word: "",
        errors: {}
    })
    const [apiErrors, setApiErrors] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === "word") {
            setFormData({
                ...formData,
                [name]: value.toLowerCase()
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }


    const handleSubmit = (e) => {
        setApiErrors(null)
        e.preventDefault()
        const errors = nodeWordValidation(formData)

        if (canSubmit(errors)) {
            axiosPrivate.post('/nodes/', formData)
                .then(response => {
                    console.log(response.data)
                    navigate(`/user-dash/nodes/detail/${response.data.nodeId}`)
                })
                .catch(err => {
                    console.error(err)
                    setApiErrors(err.response.data.message)
                    setFormData({
                        ...formData,
                        errors: {}
                    })
                })
        } else {
            setFormData({
                ...formData,
                errors: errors
            })
        }
    }


    const content = (
        <div className='content-wrapper'>
            <div className='add-node'>
                <h3>Add a word node</h3>
                <p>To quickly add a new/unfamiliar word; you can always add meanings to this word later. </p>
                <form>
                    <label htmlFor='word'>Word in Node</label>
                    <span className='errmsg'>{formData.errors.word}</span>
                    <span className='errmsg'>{apiErrors}</span>
                    <input
                        type="text"
                        id='word'
                        name="word"
                        value={formData.word}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSubmit}>Add</button>
                </form>
            </div>
        </div>
    )

    return (
        content
    )
}

export default AddNode