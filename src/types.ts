export type requestType = {type: typeof TypeKeys.REQUEST}
export type successType = {type: typeof TypeKeys.SUCCESS, dog: string}
export type failureType = {type: typeof TypeKeys.FAILURE, error: Error}
