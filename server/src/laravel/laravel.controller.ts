import { Controller, Res, Get, Post, Body } from '@nestjs/common';
import * as fs from 'fs';
import { Request, Response } from 'express';

@Controller('laravel')
export class LaravelController {
    @Post('json')
    generateJson(@Res() res: Response, @Body('models') models: any) {
        const data = JSON.stringify(models);
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        fs.writeFileSync(`dist/browser/assets/${randomName}.json`, data);
        res.header('Content-Type', 'application/json');
        return res.send({uri: `assets/${randomName}.json` });
    }
}
