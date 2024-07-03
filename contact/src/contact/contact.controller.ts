import { Controller, Post, Body, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './contact.dto'; 

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  async findAll() {
    return this.contactService.findAll();
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.contactService.findByQuery(query);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createContactDto: CreateContactDto) {
    return this.contactService.update(id, createContactDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contactService.delete(id);
  }
}
