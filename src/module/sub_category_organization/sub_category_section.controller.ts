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
  ApiTags,
} from '@nestjs/swagger';
import { SubCategorySectionServise } from './sub_category_section.service';
import { CreateSubCategorySectionDto } from './dto/create_subcategoryorganization.dto';
import { UpdateSubCategorySectionDto } from './dto/update_subcategoryorganization.dto';
import { RequiredRoles } from '../auth/guards/roles.decorator';
import { RolesEnum } from 'src/types';

@Controller('SubCategorySection')
@ApiTags('Sub Category Section')
@ApiBearerAuth('JWT-auth')
export class SubCategorySectionController {
  readonly #_service: SubCategorySectionServise;
  constructor(service: SubCategorySectionServise) {
    this.#_service = service;
  }

  @Get('/all?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findall( 
    @Query('search') search: string,   @Query('page') page: string,
  @Query('pageSize') pageSize: string,) {
    return await this.#_service.findAll(   search,   +page,
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
      required: ['category_id', 'title'],
      properties: {
        category_id: {
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
    @Body() createSubCategoryOrganizationDto: CreateSubCategorySectionDto,
  ) {
    return await this.#_service.create(createSubCategoryOrganizationDto);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        category_id: {
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
    @Body() updateSubCategoryOrganizationDto: UpdateSubCategorySectionDto,
  ) {
    await this.#_service.update(id, updateSubCategoryOrganizationDto);
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
