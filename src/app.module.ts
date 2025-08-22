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
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: '150821', 
      database: 'users_tasks_db',
      entities: [User, Task],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    AuthModule,
    
  ],
})
export class AppModule {}