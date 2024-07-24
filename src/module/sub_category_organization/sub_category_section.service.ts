import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { CreateSubCategorySectionDto } from './dto/create_subcategoryorganization.dto';

import { UpdateSubCategorySectionDto } from './dto/update_subcategoryorganization.dto';

import { Sub_Category_Section_Entity } from 'src/entities/sub_category_org.entity';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { ILike } from 'typeorm';

@Injectable()
export class SubCategorySectionServise {
  async findAll(  title:string , pageNumber = 1,
    pageSize = 10,) {
      const offset = (pageNumber - 1) * pageSize;
    const [results, total] = await Sub_Category_Section_Entity.findAndCount({
      where : {
        title : title == 'null' ? null: ILike(`%${title}%`),
        },
      skip: offset,
      take: pageSize,
      order: {
        create_data: 'desc',
      },
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
    }
  }

  async findOne(id: string) {
    const findOne = await Sub_Category_Section_Entity.find({
      where: {
        id,
      },
      relations: {
        applicationCallcenter: true,
      },
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    return findOne;
  }

  async create(body: CreateSubCategorySectionDto) {
    const findCategory = await Category_Section_Entity.findOne({
      where: {
        id: body.category_id,
      },
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    await Sub_Category_Section_Entity.createQueryBuilder()
      .insert()
      .into(Sub_Category_Section_Entity)
      .values({
        title: body.title.toLowerCase(),
        category_org: findCategory,
      })
      .execute()
      .catch((e) => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });
  }
  async update(id: string, body: UpdateSubCategorySectionDto) {
    const findSubCategoryOrg = await Sub_Category_Section_Entity.findOne({
      where: { id },
    });

    if (!findSubCategoryOrg) {
      throw new HttpException('Sub Category not found', HttpStatus.NOT_FOUND);
    }
    let findCategory: Category_Section_Entity | null = null;
    if (body.category_id) {
      console.log('okkkk,' , body.category_id);
      
      findCategory = await Category_Section_Entity.findOne({ 
        where :{
          id : body.category_id
        }
      }).catch(
        (e) => {
          console.log(e);
          
          throw new HttpException('Not found Category', HttpStatus.NOT_FOUND);
        },
      );
      if (!findCategory) {
        throw new HttpException('Not found Category', HttpStatus.NOT_FOUND);
      }
    }

    const updatedVideo = await Sub_Category_Section_Entity.update(id, {
      title: body.title.toLowerCase() || findSubCategoryOrg.title,
      category_org: findCategory,
    });

    return updatedVideo;
  }

  async remove(id: string) {
    const findSubCatgory = await Sub_Category_Section_Entity.findOneBy({
      id,
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findSubCatgory) {
      throw new HttpException('Sub Catgeory not found', HttpStatus.NOT_FOUND);
    }

    await Sub_Category_Section_Entity.delete({ id });
  }
}
