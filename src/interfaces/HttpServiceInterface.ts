import HttpServiceResponseInterface from '@i/HttpServiceResponseInterface';
import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';

interface HttpServiceInterface {
  handle(dto: RequestServiceDtoInterface): Promise<void | HttpServiceResponseInterface>;
}

export default HttpServiceInterface;
