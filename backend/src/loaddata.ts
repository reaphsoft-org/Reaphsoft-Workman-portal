// 27/04/2024 11:51
// reaphsoft-workman
// github.com/kahlflekzy

import * as fs from 'fs';
import { AppDataSource } from './data-source';
import { Service } from './entities/Service';

interface ServiceDto {
    name: string;
    description: string;
}

const filePath = process.argv[2];

if (!filePath) {
    console.error('Please provide the file path as an argument.');
    process.exit(1);
}

fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const myObjects: ServiceDto[] = JSON.parse(data);

    console.log(`Got ${myObjects.length} items in json file.`);

    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize().catch((e) => {
            console.log(e);
        });
    }
    const repo = AppDataSource.getRepository(Service);
    const resp = await repo.createQueryBuilder('service').delete().execute();
    console.log(resp);
    const services: Service[] = [];
    for (const myObject of myObjects) {
        const service = new Service();
        service.name = myObject.name;
        service.description = myObject.description;
        services.push(service);
    }
    console.log('Creating new services');
    const res = await repo.save(services);
    console.log(`Saved ${res.length} services`);
});
