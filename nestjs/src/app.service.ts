import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Willkommen im NestBackend lol mmm';
  }
}
