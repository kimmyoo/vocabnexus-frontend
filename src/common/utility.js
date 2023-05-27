// simple form validation function
// return error object
const defFormValidation = (formData) => {
    const errors = {}

    if (!formData.definition.trim()) {
        errors.definition = "required"
    }
    if (!formData.partOfSpeech === null || formData.partOfSpeech === "") {
        errors.partOfSpeech = "required"
    }

    return errors
}


const nexusNodeValidation = (formData) => {
    const errors = {}
    if (!formData.word.trim()) {
        errors.word = "Word required"
    }
    if (!formData.nexusType) {
        errors.nexusType = "required"
    }
    return errors
}


const nodeValidation = (formData) => {
    const errors = {}
    if (!formData.word.trim()) {
        errors.word = "this field is required"
    }
    return errors
}


// takes an object and check if there is any key in there
// no key, no error
// return bool value
const canSubmit = (errors) => {
    return (Object.keys(errors).length === 0)
}


export { defFormValidation, nexusNodeValidation, nodeValidation, canSubmit }


