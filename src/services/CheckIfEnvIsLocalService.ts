class CheckIfEnvIsLocalService {
  public handle(): boolean {
    return process.env.ENV?.toLowerCase() === 'local';
  }
}

export default CheckIfEnvIsLocalService;
