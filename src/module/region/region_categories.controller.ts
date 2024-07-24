import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegionCategoriesService } from './region_categories.service';
import { CreateRegionDto } from './dto/create_region_categories.dto';
import { UpdateRegionDto } from './dto/update_region_categories.dto';
import { RequiredRoles } from '../auth/guards/roles.decorator';
import { RolesEnum } from 'src/types';

// @ApiTags('role')
// @ApiBearerAuth('JWT-auth')
// @UseGuards(RolesGuard)
// @Controller('api/role')
@Controller('RegionCategories')
@ApiTags('Region categories')
@ApiBearerAuth('JWT-auth')
export class RegionCategoriesController {
  readonly #_service: RegionCategoriesService;
  constructor(service: RegionCategoriesService) {
    this.#_service = service;
  }

  @Get('/all?')
  // @RequiredRoles(RolesEnum.SUPERADMIN)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findall( 
    @Query('search') search: string,
    @Query('page') page: string,
  @Query('pageSize') pageSize: string,) {
    return await this.#_service.findAll(   search,   +page,
      +pageSize,);
  }

  @Get('/one/:id?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string,
  @Query('search') search: string,
  @Query('page') page: string,
@Query('pageSize') pageSize: string,) {
    return await this.#_service.findOne(id,search , +page , +pageSize);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title'],
      properties: {
        title: {
          type: 'string',
          default: 'Toshkent viloyati',
        },
      },
    },
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Body() createRegionDto: CreateRegionDto,
  ) {
    return await this.#_service.create(createRegionDto);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          default: 'Toshkent viloyati',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() createRegionDto: CreateRegionDto,
  ) {
    return await this.#_service.update(id, createRegionDto);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    return await this.#_service.remove(id);
  }
}
