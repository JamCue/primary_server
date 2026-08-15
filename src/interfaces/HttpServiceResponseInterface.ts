import {StatusCodes} from 'http-status-codes';

interface HttpServiceResponseInterface {
  get status(): StatusCodes;
  get payload(): object | string | null;
}

export default HttpServiceResponseInterface;
