import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
	imports: [
		UserModule,
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
	],
	controllers: [AppController, HealthController],
	providers: [AppService],
})
export class AppModule {}
