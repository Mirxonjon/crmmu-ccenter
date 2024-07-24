import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create_region_categories.dto';
import { UpdateRegionDto } from './dto/update_region_categories.dto';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { Region_Entity } from 'src/entities/region.entity';
import { ILike } from 'typeorm';
import { District_Entity } from 'src/entities/district.entity';
@Injectable()
export class RegionCategoriesService {
  async findAll( title: string,  pageNumber = 1,
    pageSize = 10,) {
      const offset = (pageNumber - 1) * pageSize;
    const [results, total] = await Region_Entity.findAndCount({
      where : {
        title : title == 'null' ? null: ILike(`%${title}%`),
        },
        relations : {
          districts : true
         },
         order: {
          create_data: 'desc',
        },
        select : {
          id: true,
          title :true,
          create_data :true,
          update_date :true,
          districts : {
            id:true
          } ,
        },
      skip: offset,
      take: pageSize,


    }).catch(
      (e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      },
    );
    const resultsWithCount = results.map(result => ({
      ...result,
      districts: result.districts.length,
    }));
    const totalPages = Math.ceil(total / pageSize);
   
    return {
      results : resultsWithCount,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        pageSize,
        totalItems: total,
      },
    };
    
  }

  async findOne(id: string, title: string , pageNumber = 1,
    pageSize = 10) {
      const offset = (pageNumber - 1) * pageSize;
    const [results, total] =
      await District_Entity.findAndCount({
        where: {
          title: title == 'null' ? null : ILike(`%${title}%`),
          region : {
            id :id
          }
        },
        relations: {
          region: true,
        },
 

        skip: offset,
        take: pageSize,
      });
      const totalPages = Math.ceil(total / pageSize);

    return {
      results ,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        pageSize,
        totalItems: total,
      },
    };
  }

  async create(body: CreateRegionDto) {
    const findRegion = await Region_Entity.findOneBy({
      title: body.title,
    });

    if (findRegion) {
      throw new HttpException(
        'Already created this category',
        HttpStatus.FOUND,
      );
    }
    await Region_Entity.createQueryBuilder()
      .insert()
      .into(Region_Entity)
      .values({
        title: body.title.toLowerCase(),
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async update(id: string, body: UpdateRegionDto) {
    const findRegion = await Region_Entity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findRegion) {
      throw new HttpException('Not found Category', HttpStatus.NOT_FOUND);
    }

    await Region_Entity.createQueryBuilder()
      .update(Region_Entity)
      .set({
        title: body.title.toLowerCase() || findRegion.title,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const findRegion = await Region_Entity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Not found Category', HttpStatus.BAD_REQUEST);
    });

    if (!findRegion) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    await Region_Entity.createQueryBuilder()
      .delete()
      .from(Region_Entity)
      .where({ id })
      .execute();
  }
}
