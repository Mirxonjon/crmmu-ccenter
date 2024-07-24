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
import { SendedOrganizationService } from './sended_organization.service';
import { CreateSendedOrganizationDto } from './dto/create_sended_organization.dto';
import { UpdateSendedOrganizationDto } from './dto/update_sended_organization.dto';
import { RolesEnum } from 'src/types';
import { RequiredRoles } from '../auth/guards/roles.decorator';


// @ApiTags('role')
// @ApiBearerAuth('JWT-auth')
// @UseGuards(RolesGuard)
// @Controller('api/role')
@Controller('SendeOrganization')
@ApiTags('Sende Organization')
@ApiBearerAuth('JWT-auth')
export class SendedOrganizationController {
  readonly #_service: SendedOrganizationService;
  constructor(service: SendedOrganizationService) {
    this.#_service = service;
  }

  @Get('/all?')
  // @RequiredRoles(RolesEnum.SUPERADMIN)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findall( 
    @Query('search') title: string,   @Query('page') page: string,
  @Query('pageSize') pageSize: string,) {
    return await this.#_service.findAll(  title ,   +page,
      +pageSize,);
  }

  @Get('/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string) {
    return await this.#_service.findOne(id);
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
          default: 'Apteka',
        },
      },
    },
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Body() createOrganizationCategoryDto: CreateSendedOrganizationDto,
  ) {
    return await this.#_service.create(createOrganizationCategoryDto);
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
          default: 'Teatr',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationCategoryDto: UpdateSendedOrganizationDto,
  ) {
    return await this.#_service.update(id, updateOrganizationCategoryDto);
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
