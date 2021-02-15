import React from 'react'

const rusLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
const rusUpper = rusLower.toUpperCase()
const enLower = 'abcdefghijklmnopqrstuvwxyz'
const enUpper = enLower.toUpperCase()
const rus = rusLower + rusUpper
const en = enLower + enUpper

const getChar = (e: any) => String.fromCharCode(e.keyCode || e.charCode)

export const langCheck = (language: string | null, e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const char = getChar(e)
    return ((rus.includes(char) && language==='English') || (en.includes(char)&& language==='Русский'))
}