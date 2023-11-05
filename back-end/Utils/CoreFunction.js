function missingFields(requiredFields, data) {
    return requiredFields.filter(field => !(field in data &&
        (typeof data[field] === 'string' ? data[field].trim() !== '' : true)));
}


module.exports = { missingFields };