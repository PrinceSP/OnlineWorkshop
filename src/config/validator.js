export const isValidObjField = obj => {
  return Object.values(obj).every(value => value.trim());
};

export const updateError = (error,stateUpdate)=>{
  stateUpdate(error)
  setTimeout(()=>{
    stateUpdate('')
  },2500)
}

export const isValidEmail = (value)=>{
  const regEx = /^[a-z0-9]((\.|\+)?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
  return regEx.test(value)
}
