let stringId: string = ''

export const setStringId = (id: string) => {
    stringId = id;
}
export const getStringId = ():string => {
    return stringId;
}