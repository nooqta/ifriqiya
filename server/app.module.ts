import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { HelloController } from './src/hello/hello.controller';
import { LaravelController } from './src/laravel/laravel.controller';
import { PlantUmlController } from './src/plant-uml/plant-uml.controller';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
    })
  ],
  controllers: [HelloController, LaravelController, PlantUmlController]
})
export class ApplicationModule {}
