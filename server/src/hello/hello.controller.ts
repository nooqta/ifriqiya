import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
    @Get() 
    sayHello() {
        return {'message': 'Hello World!'};
    }
}
