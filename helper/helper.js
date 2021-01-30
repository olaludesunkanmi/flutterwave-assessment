module.exports =  function ruleValidation (fields) {
  const { rule, data } = fields
  if (!fields.hasOwnProperty('rule')) {
    throw new Error('rule field is required')
  }
  
  if (!fields.hasOwnProperty('data')) {
    throw new Error('data field is required')
  }
  
  const { field, condition, condition_value } = rule
  
  const fieldChunk = field.split('.')
  
  let compareSet = data
  let validData = {
    validation: {
      error: true,
      ...rule
    }
  }
  let message = ''
  let error = false
  for (let i = 0; i < fieldChunk.length; i++) {
    const chunk = fieldChunk[i]
    if (!compareSet.hasOwnProperty(chunk)) {
      error = true
      message = `field ${ field } is missing from data.`
      validData = null
      break
    }
    compareSet = compareSet[chunk]
  }
  
  if (!error) {
    validData['validation']['field_value'] = compareSet
    switch (condition) {
      case 'gte':
        if (compareSet >= condition_value) {
          error = false
          message = `field ${ field } successfully validated.`
        } else {
          error = true
          message = `field ${ field } failed validation.`
        }
        break
      case 'gt':
        if (compareSet > condition_value) {
          error = false
          message = `field ${ field } successfully validated.`
        } else {
          error = true
          message = `field ${ field } failed validation.`
        }
        break
      case 'neq':
        if (compareSet !== condition_value) {
          error = false
          message = `field ${ field } successfully validated.`
        } else {
          error = true
          message = `field ${ field } failed validation.`
        }
        break
      case 'eq':
        if (compareSet === condition_value) {
          error = false
          message = `field ${ field } successfully validated.`
        } else {
          error = true
          message = `field ${ field } failed validation.`
        }
        break
      case 'contains':
      default:
        if (compareSet.match(/condition_value/igm)) {
          error = false
          message = `field ${ field } successfully validated.`
        } else {
          error = true
          message = `field ${ field } failed validation.`
        }
    }
    validData['validation']['error'] = error
  }
  
  return {
    message,
    status: error ? "error" : "success",
    data: validData
  }
}
