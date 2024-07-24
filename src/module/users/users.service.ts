import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { extname } from 'path';
import { deleteFileCloud, googleCloud } from 'src/utils/google_cloud';
import { UpdateUserDto } from './dto/update_book.dto';
import { allowedImageFormats } from 'src/utils/videoAndImageFormat';
import { UsersEntity } from 'src/entities/users.entity';
import { AddAdminDto } from './dto/add-admin.dto';
import { AuthServise } from '../auth/auth.service';
import { CustomHeaders } from 'src/types';

@Injectable()
export class UsersServise {
  readonly #_authService: AuthServise;
  constructor(authService: AuthServise) {
    this.#_authService = authService;
  }
  async findOne(header: CustomHeaders) {
    if (header.authorization) {
      const user = await this.#_authService.verify(
        header.authorization.split(' ')[1],
      );
      const findUser = await UsersEntity.findOneBy({ id: user.id });
      if (!findUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return findUser;
    } else {
      throw new HttpException('token not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    const findUsers = await UsersEntity.find();

    if (!findUsers) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }

    return findUsers;
  }

  async AddAdmin(addAdmindto: AddAdminDto) {
    const finduser = await UsersEntity.findOne({
      where: {
        id: addAdmindto.id,
      },
    }).catch((e) => {
      throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
    });
    if (!finduser) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const updated = await UsersEntity.update(addAdmindto.id, {
      role: addAdmindto.role,
    });

    return updated;
  }

  // async update(id: string, body: UpdateUserDto, image: Express.Multer.File) {
  //   const findUser = await UsersEntity.findOne({
  //     where: { id },
  //   });

  //   if (!findUser) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }

  //   let formatImage: string = 'Not image';

  //   if (image) {
  //     formatImage = extname(image.originalname).toLowerCase();
  //   }

  //   if (
  //     allowedImageFormats.includes(formatImage) ||
  //     formatImage === 'Not image'
  //   ) {
  //     let image_link: string = findUser.image;

  //     if (formatImage !== 'Not image') {
  //       if (image_link) {
  //         await deleteFileCloud(image_link);
  //       }
  //       image_link = googleCloud(image);
  //     }

  //     const updatedUser = await UsersEntity.update(id, {
  //       name: body.name || findUser.name,
  //       surname: body.surname || findUser.surname,
  //       phone: body.phone || findUser.phone,
  //       email: body.email || findUser.email,
  //       password: body.password || findUser.password,
  //       image: image_link,
  //     });

  //     return updatedUser;
  //   } else {
  //     throw new HttpException(
  //       'Image should be in the format jpg, png, jpeg, pnmj, svg',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  // async remove(id: string) {
  //   const findUser = await UsersEntity.findOneBy({ id }).catch(() => {
  //     throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  //   });

  //   if (!findUser) {
  //     throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
  //   }
  //   if (findUser.image) {
  //     const imageLink = await deleteFileCloud(findUser?.image);

  //     if (!imageLink) {
  //       throw new HttpException('User was not deleted', HttpStatus.NOT_FOUND);
  //     }
  //   }

  //   await UsersEntity.delete({ id });
  // }
}
