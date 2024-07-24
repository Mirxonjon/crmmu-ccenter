import { HttpException, HttpStatus, Injectable, } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create_district.dto';
import { UpdateDistrictDto } from './dto/update_district.dto';
import { District_Entity } from 'src/entities/district.entity';
import { Region_Entity } from 'src/entities/region.entity';
import { ILike } from 'typeorm';

@Injectable()
export class DistrictServise {
  async findAll( title :string,   pageNumber = 1,
    pageSize = 10,) {
      const offset = (pageNumber - 1) * pageSize;
    const [results, total] = await District_Entity.findAndCount({
      where : {
        title : title == 'null' ? null: ILike(`%${title}%`),
      },
      order: {
        create_data: 'desc',
      },
      skip: offset,
      take: pageSize,
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    const totalPages = Math.ceil(total / pageSize);
    return {
      results,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        pageSize,
        totalItems: total,
      },
    };
  }

  async findOne(id: string) {
    const findOne = await District_Entity.find({
      where: {
        id,
      },
      relations: {
        applicationCallcenterIndistrict: true,
      },
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    return findOne;
  }

  async create(body: CreateDistrictDto) {
    const findRegion = await Region_Entity.findOne({
      where: {
        id: body.region_id,
      },
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findRegion) {
      throw new HttpException(' Region not found', HttpStatus.NOT_FOUND);
    }

    await District_Entity.createQueryBuilder()
      .insert()
      .into(District_Entity)
      .values({
        title: body.title,
        region: findRegion,
      })
      .execute()
      .catch((e) => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });
  }
  async update(id: string, body: UpdateDistrictDto) {
    const findDistrict = await District_Entity.findOne({
      where: { id },
    });

    if (!findDistrict) {
      throw new HttpException('Distric not found', HttpStatus.NOT_FOUND);
    }
    let findRegion: Region_Entity | null = null;
    if (body.region_id) {
      findRegion = await Region_Entity.findOne({ 
        where :{
          id: body.region_id
        }
       }).catch(
        (e) => {
          throw new HttpException('Not found Region', HttpStatus.NOT_FOUND);
        },
      );
      if (!findRegion) {
        throw new HttpException('Not found Region', HttpStatus.NOT_FOUND);
      }
    }

    const updatedDistrict = await District_Entity.update(id, {
      title: body.title.toLowerCase() || findDistrict.title,

      region: findRegion,
    });

    return updatedDistrict;
  }

  async remove(id: string) {
    const findDistrict = await District_Entity.findOneBy({
      id,
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findDistrict) {
      throw new HttpException('District not found', HttpStatus.NOT_FOUND);
    }

    await District_Entity.delete({ id });
  }
}
