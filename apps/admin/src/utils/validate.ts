// 表单验证规则

import type { FormItemRule } from 'element-plus'

/**
 * 手机号验证
 */
export const validatePhone = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback()
    return
  }
  const reg = /^1[3-9]\d{9}$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

/**
 * 邮箱验证
 */
export const validateEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback()
    return
  }
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的邮箱地址'))
  } else {
    callback()
  }
}

/**
 * 密码强度验证
 */
export const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请输入密码'))
    return
  }
  if (value.length < 6 || value.length > 20) {
    callback(new Error('密码长度为6-20位'))
  } else {
    callback()
  }
}

/**
 * 用户名验证
 */
export const validateUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请输入用户名'))
    return
  }
  const reg = /^[a-zA-Z0-9_]{4,20}$/
  if (!reg.test(value)) {
    callback(new Error('用户名只能包含字母、数字、下划线，长度4-20位'))
  } else {
    callback()
  }
}

/**
 * URL验证
 */
export const validateURL = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback()
    return
  }
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的URL地址'))
  } else {
    callback()
  }
}

/**
 * 必填验证规则
 */
export const requiredRule = (message: string = '此项为必填项'): FormItemRule => {
  return { required: true, message, trigger: 'blur' }
}

/**
 * 手机号验证规则
 */
export const phoneRule: FormItemRule = {
  validator: validatePhone,
  trigger: 'blur'
}

/**
 * 邮箱验证规则
 */
export const emailRule: FormItemRule = {
  validator: validateEmail,
  trigger: 'blur'
}

/**
 * 密码验证规则
 */
export const passwordRule: FormItemRule = {
  validator: validatePassword,
  trigger: 'blur'
}

/**
 * 用户名验证规则
 */
export const usernameRule: FormItemRule = {
  validator: validateUsername,
  trigger: 'blur'
}

/**
 * URL验证规则
 */
export const urlRule: FormItemRule = {
  validator: validateURL,
  trigger: 'blur'
}

