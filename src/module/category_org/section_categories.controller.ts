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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SectionCategoriesService } from './section_categories.service';
import { CreateSectionCategoryDto } from './dto/create_section_categories.dto';
import { UpdateSectionCategoryDto } from './dto/update_section_categories.dto';
import { RequiredRoles } from '../auth/guards/roles.decorator';
import { RolesEnum } from 'src/types';

// @ApiTags('role')
// @ApiBearerAuth('JWT-auth')
// @UseGuards(RolesGuard)
// @Controller('api/role')
@Controller('SectionCategories')
@ApiTags('Section categories')
@ApiBearerAuth('JWT-auth')
export class SectionCategoriesController {
  readonly #_service: SectionCategoriesService;
  constructor(service: SectionCategoriesService) {
    this.#_service = service;
  }

  @Get('/all')
  // @RequiredRoles(RolesEnum.SUPERADMIN)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  
  async findall(  
    @Query('search') search: string,
    @Query('page') page: string,  
  @Query('pageSize') pageSize: string,

  ) {
    return await this.#_service.findAll(   search,   +page,
      +pageSize,);
  }

  @Get('/statistics/filter?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  // @ApiOperation({
  //   summary:
  //     "sana formati 01.04.2024 to'ldirilmagan joyga null qiymati jonatiladi sana va page paramlari null qiymat qabul qilmaydi ",
  // })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'subCategoryId', required: false })
  @ApiQuery({ name: 'region', required: false })
  @ApiQuery({ name: 'date_from', required: false })
  @ApiQuery({ name: 'date_to', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  async findallstatisticsfilter(
    @Query('categoryId') categoryId: string = 'null',
    @Query('subCategoryId') subCategoryId: string = 'null',
    @Query('region') region: string = 'null',
    @Query('date_from') fromDate: string = 'null',
    @Query('date_to') untilDate: string = 'null',
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    return await this.#_service.findallstatisticsfilter(
      categoryId,
      subCategoryId,
      region,
      fromDate,
      untilDate,
      +page,
      +pageSize,
    );
  }

  @Get('/Allstatistics/filterWithRegion?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiQuery({ name: 'region', required: false })
  @ApiQuery({ name: 'date_from', required: false })
  @ApiQuery({ name: 'date_to', required: false })
  async findallAllstatisticsFilterWithRegion(
    @Query('region') region: string = 'null',
    @Query('date_from') fromDate: string = 'null',
    @Query('date_to') untilDate: string = 'null',
  ) {
    return await this.#_service.findallAllstatisticsFilterWithRegion(
      region,
      fromDate,
      untilDate,
    );
  }

  @Get('/AllstatisticsWithRegion?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiQuery({ name: 'date_from', required: false })
  @ApiQuery({ name: 'date_to', required: false })
  async findallAllstatisticsWithRegion(
    @Query('date_from') fromDate: string = 'null',
    @Query('date_to') untilDate: string = 'null',
  ) {
    return await this.#_service.findallAllstatisticsWithRegion(
      fromDate,
      untilDate,
    );
  }

  @Get('/one/:id?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string,
  @Query('search') search: string,
  @Query('page') page: string,
@Query('pageSize') pageSize: string,) {
    return await this.#_service.findOne(id ,search , +page , +pageSize);
  }

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
          default: 'Apteka',
        },
      },
    },
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Body() createOrganizationCategoryDto: CreateSectionCategoryDto,
  ) {
    return await this.#_service.create(createOrganizationCategoryDto);
  }
  @RequiredRoles(RolesEnum.ADMIN)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          default: 'Teatr',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationCategoryDto: UpdateSectionCategoryDto,
  ) {
    return await this.#_service.update(id, updateOrganizationCategoryDto);
  }

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
