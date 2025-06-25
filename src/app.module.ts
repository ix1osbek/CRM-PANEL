import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './components/auth/auth.module'
import { UserModule } from './components/users/users.module'
import { GroupsModule } from './components/groups/groups.module'
import { StudentsModule } from './components/students/students.module'
import { TransactionModule } from './components/payments/payments.module'
import { AnalyticsModule } from './components/analytics/analytics.module'
import { PanelModule } from './components/panel/panel.module'
import { PrismaModule } from './prisma/prisma.module'
import { RoleCheck } from './common/guards/roleCheck'
import { TelegramModule } from './Bot/Bot.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    GroupsModule,
    StudentsModule,
    TransactionModule,
    AnalyticsModule,
    PanelModule,
    TelegramModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleCheck
    },
  ],
})
export class AppModule { }