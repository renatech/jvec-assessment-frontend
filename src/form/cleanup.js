export const clearFormData=form=>{
    const formData = [...form]
    for (let i = 0; i < formData.length; i++) {
        const field = formData[i];
        field.error = null
        field.value=""
    }

    return formData
}