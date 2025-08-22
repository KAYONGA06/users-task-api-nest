import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/users.entity';
import { Task } from './tasks/tasks.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'YOUR_DB_HOST',        // placeholder for your DB host
      port: 5432,                  // leave port as-is
      username: 'YOUR_DB_USERNAME',// placeholder for DB username
      password: 'YOUR_DB_PASSWORD',// placeholder for DB password
      database: 'YOUR_DB_NAME',    // placeholder for DB name
      entities: [User, Task],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
