import ResponseExceptionCodeEnum from '@enums/ResponseExceptionCodeEnum';

type ResponseExceptionMessageType = {
  code: ResponseExceptionCodeEnum;
  reason: string;
};
export default ResponseExceptionMessageType;
