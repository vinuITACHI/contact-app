import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './interfaces/contact.interface';
import { ContactDto } from './contact.dto';
 
@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private readonly contactModel: Model<Contact>,
  ) {}
 
  public async getContact(): Promise<ContactDto[]> {
    const contacts = await this.contactModel.find().exec();
    if (!contacts || !contacts[0]) {
      throw new HttpException('Not Found', 404);
    }
    return contacts;
  }
 
  public async postContact(newContact: ContactDto) {
    const contact = new this.contactModel(newContact);
    return contact.save();
  }
 
  public async getContactById(id: number): Promise<ContactDto> {
    const contact = await this.contactModel.findOne({ id }).exec();
    if (!contact) {
      throw new HttpException('Not Found', 404);
    }
    return contact;
  }
 
  public async deleteContactById(id: number): Promise<any> {
    const contact = await this.contactModel.deleteOne({ id }).exec();
    if (contact.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return contact;
  }
 
  public async putContactById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<ContactDto> {
    const contact = await this.contactModel
      .findOneAndUpdate(
        { id },
        { [propertyName]: propertyValue },
        { new: true },
      )
      .exec();
    if (!contact) {
      throw new HttpException('Not Found', 404);
    }
    return contact;
  }
}