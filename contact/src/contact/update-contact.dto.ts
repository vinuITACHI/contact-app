import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './contact.dto'; 

export class UpdateContactDto extends PartialType(CreateContactDto) {}
