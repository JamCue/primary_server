import EnvVariableNotFoundException from '@exceptions/inner/EnvVariableNotFoundException';
import AppEnvType from '@t/AppEnvType';

class ParseEnvVariablesService {
  /**
   * @throws EnvVariableNotFoundException
   */
  public handle(env: NodeJS.ProcessEnv): AppEnvType {
    const {getOrFail} = this;

    const app = {
      projectId: getOrFail(env, 'PROJECT_ID'),
      functionName: getOrFail(env, 'FUNCTION_NAME'),
    };

    return {
      app,
    };
  }

  /**
   * @throws EnvVariableNotFoundException
   */
  private getOrFail(env: NodeJS.ProcessEnv, name: string): string {
    const value = env[name];

    if (value === undefined) {
      throw new EnvVariableNotFoundException();
    }

    return value;
  }
}

export default ParseEnvVariablesService;
