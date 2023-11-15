import { Module } from '@nestjs/common';

import { MealModule } from '@avans-project-cswp/backend/features';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MealModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
