import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './contact.dto'; 
import { Contact,ContactDocument } from './contact.schema'; 
@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument>) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);
    return createdContact.save();
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async findById(id: number): Promise<Contact[]> {
    return this.contactModel.find({ id }).exec();
  }

  async findByQuery(query: string): Promise<Contact[]> {
    const isNumericQuery = !isNaN(Number(query));
    if (isNumericQuery) {
      return this.contactModel.find({ id: Number(query) }).exec();
    }
    const regexQuery = new RegExp(query, 'i');
    return this.contactModel.find({
      $or: [
        { FirstName: { $regex: regexQuery } },
        { LastName: { $regex: regexQuery } },
        { Email: { $regex: regexQuery } },
        { Phone: { $regex: regexQuery } },
      ],
    }).exec();
  }

  async update(id: string, updateContactDto: CreateContactDto): Promise<Contact> {
    return this.contactModel.findByIdAndUpdate(id, updateContactDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Contact> {
    return this.contactModel.findByIdAndDelete(id).exec();
  }
}
