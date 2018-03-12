import {requestType, successType, failureType} from './types'
export enum TypeKeys {
  REQUEST = 'API_CALL_REQUEST',
  SUCCESS = 'API_CALL_SUCCESS',
  FAILURE = 'API_CALL_FAILURE'
}

const apiCallRequest = (): requestType => {
  return {type: TypeKeys.REQUEST}
}
const apiCallSuccess = (dog: string): successType => {
  console.log('check types', typeof dog, dog, typeof TypeKeys.SUCCESS, TypeKeys.SUCCESS)
  return {type: TypeKeys.SUCCESS, dog}
}
const apiCallFailure = (e: Error): failureType => {
  return {type: TypeKeys.FAILURE, e}
}

type Actions = failureType | successType | requestType;

export = {
  apiCallRequest,
  apiCallSuccess,
  apiCallFailure,
  TypeKeys,
}
