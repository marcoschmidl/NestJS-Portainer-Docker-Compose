import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

@Schema()
export class User extends Document{

  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop({ unique: true })
  plate: string;
  @Prop({ unique: true })
  number: string;
}

export const UserSchema =
  SchemaFactory.createForClass(User);

export type UserDocument =
  User & Document;

