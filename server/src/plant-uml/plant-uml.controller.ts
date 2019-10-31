import { Controller, Res, Get, Post, Body } from '@nestjs/common';
import * as fs from 'fs';
import { Request, Response } from 'express';
import * as plantuml from 'node-plantuml';

@Controller('plant-uml')
export class PlantUmlController {
    @Get('generate')
    generate(@Res() res: Response) {
        //const data = JSON.stringify(models);
        plantuml.useNailgun(); // Activate the usage of Nailgun
        
        const gen = plantuml.generate('dist/browser/assets/test.wsd');
        const file = gen.out.pipe(fs.createWriteStream('dist/browser/assets/output-file.png'));
        res.header('Content-Type', 'image/png');
        return fs.readFileSync(`dist/browser/assets/output-file.png`);

    }
}
