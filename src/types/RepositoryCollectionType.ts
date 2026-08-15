import {firestore} from 'firebase-admin';

import CollectionReference = firestore.CollectionReference;
import DocumentData = firestore.DocumentData;

type RepositoryCollectionType = CollectionReference<DocumentData>;

export default RepositoryCollectionType;
