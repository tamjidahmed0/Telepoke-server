import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({ host: '127.0.0.1', port: 6379 });
  }


  async setObject(key: string, obj: any, ttlSeconds?: number) {
    const value = JSON.stringify(obj);
    const result = ttlSeconds
      ? await this.redis.set(key, value, 'EX', ttlSeconds)
      : await this.redis.set(key, value);
    return result;
  }


  async getObject(key: string) {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async del(key: string) {
    await this.redis.del(key);
  }



  //user online logic

  async addOnlineUser(socket: string, userData: any) {

    await this.redis.hset(`user:online:${socket}`, userData);
    // await this.redis.expire(`user:online:${socket}`, 30);

  }


  async getOnlineUser(socket: string) {
    const key = `user:online:${socket}`;
    const data = await this.redis.hgetall(key);
    return data
  }



  async removeOnlineUser(socket: string) {
    await this.redis.del(`user:online:${socket}`);
  }

  async getAllOnlineUsers() {
    const keys = await this.redis.keys('user:online:*');
    const values = await Promise.all(keys.map(k => this.redis.get(k)));
    return values.map(v => JSON.parse(v!));
  }






}
