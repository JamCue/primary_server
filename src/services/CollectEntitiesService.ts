import CollectEntitiesServiceException from '@exceptions/inner/CollectEntitiesServiceException';
import {QuerySnapshot} from 'firebase-admin/firestore';

class CollectEntitiesService {
  /**
   * @throws inner/CollectEntitiesServiceException
   */
  public handle<T>(entityRef: QuerySnapshot): T[] | null {
    try {
      if (!entityRef.size) {
        return null;
      }
      const entitiesData: T[] = [];
      for (const entity of entityRef.docs) {
        const entityData = entity.data() as T;
        entitiesData.push(entityData);
      }
      return entitiesData;
    } catch (e) {
      throw new CollectEntitiesServiceException(e);
    }
  }
}

export default CollectEntitiesService;
