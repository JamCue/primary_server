import CheckIfEnvIsLocalService from '@services/CheckIfEnvIsLocalService';
import RepositoryCollectionType from '@t/RepositoryCollectionType';
import mongoose, {Schema} from 'mongoose';

abstract class AbstractRepository<T> {
  protected readonly collection: RepositoryCollectionType<T>;

  protected constructor(
    collectionName: string,
    schema: Schema<T>,
    protected readonly checkIfEnvIsLocalService = new CheckIfEnvIsLocalService()
  ) {
    const suffix = this.checkIfEnvIsLocalService.handle() ? '-local' : '';
    const modelName = `${collectionName}${suffix}`;

    this.collection =
      (mongoose.models[modelName] as RepositoryCollectionType<T>) ?? mongoose.model<T>(modelName, schema, modelName);
  }
}

export default AbstractRepository;
