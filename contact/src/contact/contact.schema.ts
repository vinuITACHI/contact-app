import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop()
  id: number;

  @Prop()
  FirstName: string;

  @Prop()
  LastName: string;

  @Prop()
  Email: string;

  @Prop()
  Phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);