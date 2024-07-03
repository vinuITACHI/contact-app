

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactModule } from './contact/contact.module'; // Correct path to ContactsModule

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Contact_Details'), // Update with your MongoDB connection string
    ContactModule, // Updated module name
  ],
})
export class AppModule {}