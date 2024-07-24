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
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DistrictServise } from './district.service';
import { CreateDistrictDto } from './dto/create_district.dto';
import { UpdateDistrictDto } from './dto/update_district.dto';
import { RolesEnum } from 'src/types';
import { RequiredRoles } from '../auth/guards/roles.decorator';

@Controller('District')
@ApiTags('District')
@ApiBearerAuth('JWT-auth')
export class DistrictController {
  readonly #_service: DistrictServise;
  constructor(service: DistrictServise) {
    this.#_service = service;
  }

  @Get('/all?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiQuery({ name: 'saerch', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  async findall( 
    @Query('saerch') title: string = 'null' , 
    @Query('page',) page: string = '1',
  @Query('pageSize') pageSize: string ='10' ,) {
    return await this.#_service.findAll(   title,   +page,
      +pageSize,);
  }

  @Get('/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findallWithpage(@Param('id') id: string) {
    return await this.#_service.findOne(id);
  }

  //
  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['region_id', 'title'],
      properties: {
        region_id: {
          type: 'string',
          default: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
        },
        title: {
          type: 'string',
          default: 'title',
        },
      },
    },
  })

  // @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Body() createDistrictDto: CreateDistrictDto,
  ) {
    return await this.#_service.create(createDistrictDto);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        region_id: {
          type: 'string',
          default: '55cc8c2d-34c1-4ca3-88e0-7b1295875642',
        },
        title: {
          type: 'string',
          default: 'title',
        },
      },
    },
  })
  // @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    await this.#_service.update(id, updateDistrictDto);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.remove(id);
  }
}
