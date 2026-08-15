import CheckIfEnvIsLocalService from '@services/CheckIfEnvIsLocalService';
import RepositoryCollectionType from '@t/RepositoryCollectionType';
import admin from 'firebase-admin';

admin.initializeApp();

abstract class AbstractRepository {
  protected db;
  protected collection: RepositoryCollectionType;

  protected constructor(
    collectionName: string,
    protected readonly checkIfEnvIsLocalService = new CheckIfEnvIsLocalService()
  ) {
    this.db = admin.firestore();

    const suffix = this.checkIfEnvIsLocalService.handle() ? '-local' : '';

    this.collection = this.db.collection(collectionName + suffix);
  }
}

export default AbstractRepository;
