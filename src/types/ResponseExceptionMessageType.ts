import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';

type ResponseExceptionMessageType = {
  code: ResponseExceptionCodeEnum;
  reason: string;
  errors?: {path: string; message: string}[];
};
export default ResponseExceptionMessageType;
