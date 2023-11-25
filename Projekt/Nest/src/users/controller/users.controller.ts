import {
  Body,
  Controller,
  Delete,
  Get, HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception-filter';

@UseFilters(new HttpExceptionFilter())
@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {
  }

  @Post('create')
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    const exits: any = this.userService.checkifUserExists(createUserDto);//TODO -> geht so nicht -- evlt. Pipe
    if (exits) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Conflict',
        message: 'User already exists',
      }, HttpStatus.CONFLICT)
    } else {
      try {
        const newUser = await this.userService.createUser(createUserDto);
        return response.status(HttpStatus.CREATED).json({
          message: 'User has been created successfully',
          newUser,
        });
      } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: User not created :(!',
          error: 'Bad Request',
        });
      }
    }
  }

  @Put(':id')
  async updateUser(@Res() response, @Param('id') userId: string,
                   @Body() updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.userService.updateUser(userId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getUsers(@Res() response) {
    try {
      const userData = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully', userData,
      });
    } catch (err) {
      return response.status(err.status).json({
          message: 'User not found :(',
        },
      );
    }
  }

  @Get(':id')
  async getUserbyId(@Res() response, @Param('id') userId: string) {
    try {
      const existingUser = await
        this.userService.getUserbyId(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully', existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('search-n/:number')//geht
  async getUserbyNumber2(@Res() response, @Param('number') number: string) {
    const existingUser = await this.userService.getUserbyNumber(number);
    if (!existingUser) ///TODO Logik Fehler
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fehler bei dem Controller',
        }, HttpStatus.BAD_REQUEST);

    return response.status(HttpStatus.OK).json({
      message: 'Nutzer anhand Kennzeichen gefunden', existingUser,
    });
  }

  @Get('search-p/:plate')//Geht
  async getUserbyPlate(@Res() response, @Param('plate') plate: string) {
    const user = await this.userService.getUserbyPlate(plate);
    if (!user) throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Fehler bei dem Controller',
      },
      HttpStatus.BAD_REQUEST);

    return response.status(HttpStatus.OK).json({
      message: 'Nutzer anhand Kennzeichen gefunden', user,
    });
  }

  @Delete(':id')
  async deleteStudent(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'Uer deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}

