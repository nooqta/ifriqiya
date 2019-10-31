import { Controller, Res, Get, Post, Body } from '@nestjs/common';
import * as fs from 'fs';
import { Request, Response } from 'express';
//import * as plantuml from 'node-plantuml';

@Controller('plant-uml')
export class PlantUmlController {
    @Get('generate')
    generate(@Res() res: Response) {
        // plantuml.useNailgun(); // Activate the usage of Nailgun
        
        // const gen = plantuml.generate('dist/browser/assets/test.wsd');
        // res.header('Content-Type', 'image/png');
        // gen.out.pipe(fs.createWriteStream('dist/browser/assets/output-file.png'));
        res.send({uml: 'Uml :)'});

    }
}
