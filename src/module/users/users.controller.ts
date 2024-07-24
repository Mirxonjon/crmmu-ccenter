import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersServise } from './users.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update_book.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
import { AddAdminDto } from './dto/add-admin.dto';
@Controller('Users')
@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
export class UsersController {
  readonly #_service: UsersServise;
  constructor(service: UsersServise) {
    this.#_service = service;
  }

  @Get('/one')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'authorization',
    description: 'User Token',
    required: false,
  })
  async findOne(@Headers() header: any) {
    return await this.#_service.findOne(header);
  }

  // @UseGuards(jwtGuard)
  @Get('/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findAll() {
    return await this.#_service.findAll();
  }

  // @Patch('/UpdateAdmin')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     required: ['id'],
  //     properties: {
  //       id: {
  //         type: 'string',
  //         default: 'fsdgewfghwergkreomgbpregbmpmf',
  //       },
  //       role: {
  //         type: 'string',
  //         default: 'admin',
  //       },
  //     },
  //   },
  // })
  // addAdmin(@Body() body: AddAdminDto) {
  //   return this.#_service.AddAdmin(body);
  // }

  // // @UseGuards(jwtGuard)
  // @Patch('/update/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       surname: {
  //         type: 'string',
  //         default: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
  //       },
  //       name: {
  //         type: 'string',
  //         default: '1 chi dars',
  //       },
  //       phone: {
  //         type: 'string',
  //         default: '1 chi darsru',
  //       },
  //       email: {
  //         type: 'string',
  //         default: 'ru',
  //       },
  //       password: {
  //         type: 'string',
  //         default: 'uuid23422',
  //       },
  //       was_born_date: {
  //         type: 'string',
  //         default: 'Хорошее обучение',
  //       },
  //       image: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // @ApiConsumes('multipart/form-data')
  // @ApiOperation({ summary: 'Attendance Punch In' })
  // @ApiBadRequestResponse()
  // @ApiNotFoundResponse()
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  //   @UploadedFiles()
  //   file: { image?: Express.Multer.File },
  // ) {
  //   await this.#_service.update(
  //     id,
  //     updateUserDto,
  //     file?.image ? file?.image[0] : null,
  //   );
  // }

  // // @UseGuards(jwtGuard)
  // @Delete('/delete/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiBadRequestResponse()
  // @ApiNotFoundResponse()
  // @ApiNoContentResponse()
  // async remove(@Param('id') id: string): Promise<void> {
  //   await this.#_service.remove(id);
  // }
}
