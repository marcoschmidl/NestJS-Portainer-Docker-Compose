import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EntrySchema } from './entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Entry', schema: EntrySchema }]),
  ],
})
export class EntriesModule {}
