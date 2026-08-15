import RequestServiceDtoInterface from '@i/RequestServiceDtoInterface';
import {Request} from 'express';

interface RequestServiceInterface {
  handle(req: Request): Promise<RequestServiceDtoInterface>;
}

export default RequestServiceInterface;
