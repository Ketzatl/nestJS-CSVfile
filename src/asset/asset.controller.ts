import {Controller, Post, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {readFileSync} from "fs";
import { diskStorage } from 'multer';
import * as papa from 'papaparse';



@Controller('asset')
export class AssetController {

    @Post()
    @UseInterceptors(
        FileInterceptor('file_asset', {
            storage: diskStorage({
                destination: './files',
            }),
        }),
    )
    async uploadFile() {
        const csvFile = readFileSync('files/dummy.csv');
        const csvData = csvFile.toString();

        const parseCsv = await papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
            complete: (results) => results.data,
        });
    }
}
