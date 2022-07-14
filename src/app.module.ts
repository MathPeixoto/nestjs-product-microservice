import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'product_ms',
      autoLoadEntities: true,
      synchronize: true,
      logging: ['query', 'error'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
