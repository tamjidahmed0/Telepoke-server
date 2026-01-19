import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:User.name, schema: UserSchema}])],
  providers: [FirebaseService],
  controllers: [FirebaseController],
  exports: [FirebaseService]
})
export class FirebaseModule {}
