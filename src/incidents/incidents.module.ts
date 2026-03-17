import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from 'src/core/db/entities/incident.entity';

@Module({
  imports:[
    EmailModule,
    TypeOrmModule.forFeature([Incident])
  ],
  providers: [IncidentsService],
  controllers: [IncidentsController]
})
export class IncidentsModule {}
