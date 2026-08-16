import DbException from '@exceptions/inner/DbException';
import AbstractRepository from '@repositories/AbstractRepository';
import FirebaseRefIdType from '@t/parameter-validation/FirebaseRefIdType';
import UserEmailType from '@t/parameter-validation/UserEmailType';
import UserNameType from '@t/parameter-validation/UserNameType';
import UserType from '@t/UserType';
import {FilterQuery, Schema} from 'mongoose';

type UserDocumentType = {_id: unknown; name: string; email: string; firebaseRefId: string; createdAt: Date};

const userSchema = new Schema<UserType>(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    firebaseRefId: {type: String, required: true, unique: true},
  },
  {timestamps: {createdAt: true, updatedAt: false}}
);

class UserRepository extends AbstractRepository<UserType> {
  constructor() {
    super('users', userSchema);
  }

  public async save(name: UserNameType, email: UserEmailType, firebaseRefId: FirebaseRefIdType): Promise<UserType> {
    try {
      const user = await this.collection.create({name, email, firebaseRefId});

      return this.toUserType(user);
    } catch (e: unknown) {
      throw new DbException(e);
    }
  }

  public async getByEmail(email: UserEmailType): Promise<UserType | null> {
    try {
      const user = await this.collection.findOne({email} as FilterQuery<UserType>).lean();

      return user ? this.toUserType(user as UserDocumentType) : null;
    } catch (e: unknown) {
      throw new DbException(e);
    }
  }

  public async getByFirebaseRefId(firebaseRefId: FirebaseRefIdType): Promise<UserType | null> {
    try {
      const user = await this.collection.findOne({firebaseRefId} as FilterQuery<UserType>).lean();

      return user ? this.toUserType(user as UserDocumentType) : null;
    } catch (e: unknown) {
      throw new DbException(e);
    }
  }

  private toUserType(user: UserDocumentType): UserType {
    return {
      id: String(user._id),
      name: user.name,
      email: user.email,
      firebaseRefId: user.firebaseRefId,
      createdAt: user.createdAt,
    };
  }
}

export default UserRepository;
