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


const nodeWordValidation = (formData) => {
    const errors = {}
    if (!formData.word.trim()) {
        errors.word = "this field is required"
    }
    return errors
}


// definition and partOfSpeech of each meaning should not be empty
const nodeEditValidation = (node) => {
    const errors = {}
    if (!node.word.trim()) {
        errors.word = "node word is required"
    }
    if (node.meanings) {
        for (const meaning of node.meanings) {
            if (!meaning.partOfSpeech?.trim() || !meaning.definition?.trim()) {
                errors.meanings = "definition or part of speech cannot be empty"
            }
        }
    }
    return errors
}

// takes an object and check if there is any key in there
// no key, no error
// return bool value
const canSubmit = (errors) => {
    return (Object.keys(errors).length === 0)
}


export {
    defFormValidation,
    nexusNodeValidation,
    nodeWordValidation,
    nodeEditValidation,
    canSubmit
}


