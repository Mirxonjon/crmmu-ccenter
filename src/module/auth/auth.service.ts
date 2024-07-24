import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create_user.dto';
import { UsersEntity } from 'src/entities/users.entity';
import { SingInUserDto } from './dto/sign_in-user.dto';
// import { ControlUsersEntity } from 'src/entities/control_users.entity';
import { UpdateControlUserDto } from './dto/update-conrolUser.dto';
import {
  CreateControlUserDto,
} from './dto/create_controlUser.dto';
import { ILike } from 'typeorm';

@Injectable()
export class AuthServise {
  constructor(private readonly jwtServise: JwtService) {}
  async createUser(createUser: CreateUserDto) {
    const findUser = await UsersEntity.findOne({
      where: {
        username: createUser.username,
      },
    }).catch((e) => {
      throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
    });

    if (findUser) {
      throw new HttpException('username alredy registered', HttpStatus.FOUND);
    }


    const addedUser = await UsersEntity.createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({
        full_name : createUser.full_name  ,
        operator_number: createUser.operator_number ,
        username: createUser.username,
        password: createUser.password,
        role: createUser.role,
      })
      .returning(['id', 'role', 'password'])
      .execute()
      .catch((e) => {

        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

    return {
      message: 'You have successfully registered',
      role :  addedUser.raw.at(-1).role,
      token: this.sign(
        addedUser.raw.at(-1).id,
        addedUser.raw.at(-1).role,
        addedUser.raw.at(-1).password,
      ),
    };
  }
  async signIn(signInDto: SingInUserDto) {
    console.log(signInDto);
    
    const finduser = await UsersEntity.findOne({
      where: {
        username: signInDto.username,
        password: signInDto.password,
      },
    }).catch((e) => {
      
      throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
    });

    if (!finduser) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'successfully sing In',
      role : finduser.role,
      token: this.sign(finduser.id, finduser.role, finduser.password),
    };
  }

  // async signInControlUser(body: ControlUserDto) {
  //   const finduser = await UsersEntity.findOne({
  //     where: {
  //       username: body.username.trim().toLowerCase(),
  //       password: body.password.trim(),
  //     },
  //   }).catch((e) => {
  //     throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
  //   });

  //   if (!finduser) {
  //     throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
  //   }
  //   return {
  //     message: 'successfully sing In',
  //     token: this.sign(finduser.id, finduser.role, finduser.password),
  //   };
  // }

  async findOne(id: string) {
    const finduser = await UsersEntity.findOne({
      where: {
       id: id
      },
    }).catch(() => {
      throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
    });
    if (!finduser) {
      throw new HttpException('user not fount', HttpStatus.NOT_FOUND);
    }

return finduser
  }

  async getAllControlUsers( username : string , role: string, pageNumber = 1,
    pageSize = 10) {

      const offset = (pageNumber - 1) * pageSize;
      if(username == 'null') {
        const [results, total] = await UsersEntity.findAndCount({
          where: 
          {
            role: role == 'null' ? null : role,
          },
          order: {
            create_data: 'desc',
          },
          skip: offset,
          take: pageSize,
        }).catch((e) => {
          console.log(e);
          
          throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
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
      } else {
        const [results, total] = await UsersEntity.findAndCount({
          where: [{
            username : username == 'null' ? null: ILike(`%${username}%`),
            role: role == 'null' ? null : role,
          },
          {
            full_name : username == 'null' ? null: ILike(`%${username}%`),
            role: role == 'null' ? null : role,
          },
        ],
          order: {
            create_data: 'desc',
          },
          skip: offset,
          take: pageSize,
        }).catch((e) => {
          console.log(e);
          
          throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
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

  }

  async createControlUser(body: CreateControlUserDto) {
    const findControlUser = await UsersEntity.findOne({
      where: {
        username: body.username.toLowerCase(),
      },
    }).catch((e) => {
      throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
    });

    if (findControlUser) {
      throw new HttpException('username alredy exist', HttpStatus.FOUND);
    }

    await UsersEntity.createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({
        username: body.username.trim().toLowerCase(),
        password: body.password.trim(),
        role: body.role.toLowerCase(),
      })
      .execute()
      .catch((e) => {
        console.log(e);
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });
  }

  async updateControlUser(id: string, body: UpdateControlUserDto) {
    const findControlUser = await UsersEntity.findOne({
      where: { id },
    });

    if (!findControlUser) {
      throw new HttpException('Control USER not found', HttpStatus.NOT_FOUND);
    }

    const updatedVideo = await UsersEntity.update(id, {
      full_name : body.full_name || findControlUser.full_name,
      operator_number: body.operator_number || findControlUser.operator_number,
      username: body.username.trim().toLowerCase() || findControlUser.username,
      password: body.password.trim() || findControlUser.password,
      role: body.role || findControlUser.role,
    });

    return updatedVideo;
  }

  async deleteControlUser(id: string) {
    const findControlUser = await UsersEntity.findOne({
      where: { id },
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findControlUser) {
      throw new HttpException('Control user not found', HttpStatus.NOT_FOUND);
    }

    await UsersEntity.delete({ id });
  }

  async validateUser(id: string, pass: string): Promise<any> {

    const user = await UsersEntity.findOne({
      where: { id },
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  sign(id: string, role: string, password: string) {
    return this.jwtServise.sign({ id, role, password });
  }

  async verify(token: string) {
    try {
      const verifytoken = await this.jwtServise
        .verifyAsync(token)
        .catch((e) => {
          // throw new UnauthorizedException(e);
          throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        });
      return verifytoken;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
