import SecretManagerServiceException from '@exceptions/inner/SecretManagerServiceException';
import {SecretManagerServiceClient} from '@google-cloud/secret-manager';
import CheckIfEnvIsLocalService from '@services/CheckIfEnvIsLocalService';
import ParseEnvVariablesService from '@services/ParseEnvVariablesService';
import SecretManagerParamType from '@t/SecretManagerParamType';

class SecretManagerService {
  constructor(
    private readonly checkIfEnvIsLocalService = new CheckIfEnvIsLocalService(),
    private readonly parseEnvVariablesService = new ParseEnvVariablesService(),
    private readonly client = new SecretManagerServiceClient()
  ) {}

  /**
   * @throws inner/SecretManagerServiceException
   */
  public async handle(secretName: SecretManagerParamType): Promise<string | null> {
    try {
      return this.checkIfEnvIsLocalService.handle()
        ? await this.getViaClient(secretName)
        : this.getInjected(secretName);
    } catch (e: unknown) {
      throw new SecretManagerServiceException(e);
    }
  }

  private async getViaClient(secretName: string): Promise<string | null> {
    const {
      app: {projectId},
    } = this.parseEnvVariablesService.handle(process.env);

    const secretToken = `projects/${projectId}/secrets/${secretName}/versions/latest`;

    const [version] = await this.client.accessSecretVersion({
      name: secretToken,
    });

    return version.payload?.data?.toString() || null;
  }

  /**
   * @throws Error
   */
  private getInjected(secretName: string): string {
    const secret = process.env[secretName];
    if (!secret) {
      throw new Error(`${secretName} is not defined`);
    }
    return secret;
  }
}

export default SecretManagerService;
