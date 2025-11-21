import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BirdsModule } from './birds/birds.module';

@Module({
  imports: [AuthModule, BirdsModule],
  controllers: [AppController],
})
export class AppModule {}
