import HttpServiceInterface from '@i/HttpServiceInterface';
import HttpResponseOk from '@value-objects/HttpResponseOk';
class GetMicroserviceVersionService implements HttpServiceInterface {
  public async handle(version: string): Promise<HttpResponseOk> {
    return new HttpResponseOk(version);
  }
}

export default GetMicroserviceVersionService;
