

export let validateSpace = (space) => {
    let reg = /^\S*$/;
    return reg.test(space)
}

export let validateNumber = (number) => {
    let reg = /^([^0-9]*)$/;
    return reg.test(number)
}