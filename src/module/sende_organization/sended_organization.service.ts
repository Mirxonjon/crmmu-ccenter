import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSendedOrganizationDto } from './dto/create_sended_organization.dto';
import { UpdateSendedOrganizationDto } from './dto/update_sended_organization.dto';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { SendedOrganizationEntity } from 'src/entities/sende_organization.entity';
import { ILike } from 'typeorm';
@Injectable()
export class SendedOrganizationService {
  async findAll( title :string,    pageNumber = 1,
    pageSize = 10,) {
      const offset = (pageNumber - 1) * pageSize;
    const [results, total] = await SendedOrganizationEntity.findAndCount({
      where : {
        title : title == 'null' ? null : ILike(`%${title}%`)
      },
      skip: offset,
      take: pageSize,
      order: {
        create_data: 'desc',
    }
  }).catch(
      (e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      },
    );
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
    const findSendeOrganization: SendedOrganizationEntity =
      await SendedOrganizationEntity.findOne({
        where: {
          id: id,
        },
      });

    if (!findSendeOrganization) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return findSendeOrganization;
  }

  async create(body: CreateSendedOrganizationDto) {
    const findSendeOrganization = await SendedOrganizationEntity.findOneBy({
      title: body.title,
    });

    if (findSendeOrganization) {
      throw new HttpException(
        'Already created this category',
        HttpStatus.FOUND,
      );
    }
    await SendedOrganizationEntity.createQueryBuilder()
      .insert()
      .into(SendedOrganizationEntity)
      .values({
        title: body.title.toLowerCase(),
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async update(id: string, body: UpdateSendedOrganizationDto) {
    const findSendeOrganization = await SendedOrganizationEntity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findSendeOrganization) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await SendedOrganizationEntity.createQueryBuilder()
      .update(SendedOrganizationEntity)
      .set({
        title: body.title.toLowerCase() || findSendeOrganization.title,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const findCategory = await SendedOrganizationEntity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Not found ', HttpStatus.BAD_REQUEST);
    });

    if (!findCategory) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await SendedOrganizationEntity.createQueryBuilder()
      .delete()
      .from(SendedOrganizationEntity)
      .where({ id })
      .execute();
  }
}
