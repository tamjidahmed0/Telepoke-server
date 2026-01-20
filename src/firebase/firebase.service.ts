import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
// import serviceAccountKey from '../../telepoke-firebase.json'; // default import
import serviceAccountKey from '../../telepoke-firebase1.json'; // default import
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class FirebaseService {
  private adminApp: admin.app.App;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {


    // Initialize Firebase Admin
    this.adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
    });
  }

  async sendNotification({
    sender_id,
    receiver_id,
    body,
    message_id,
    type = 'message'
  }:

    { receiver_id: string, sender_id: string, body: string, message_id: string, type?: string }) {


    const users = await this.userModel
      .find({ _id: { $in: [sender_id, receiver_id] } })
      .select('FCMtoken name email profilePhotoUrl')
      .lean();

    const receiver_user = users.find(u => u._id.toString() === receiver_id);
    const sender_user = users.find(u => u._id.toString() === sender_id);




    if (!receiver_user || !receiver_user.FCMtoken) {
      throw new Error(`No FCM token found for user with ${receiver_id}`);
    }

    const message: admin.messaging.Message = {
      token: receiver_user.FCMtoken,
      android: { priority: 'high' },
      apns: {
        headers: { 'apns-priority': '10' },
        payload: { aps: { sound: 'ring' } },
      },
      //  Only send data, no notification object
      data: {
        title: sender_user?.name ?? '',
        body,
        sender_id,
        receiver_id,
        avatar: sender_user?.profilePhotoUrl ?? '',
        message_id,
        type
      },
    };




    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}
