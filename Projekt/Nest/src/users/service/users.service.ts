import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUsers } from '../interfaces/users.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user';
import { UsersController } from '../controller/users.controller';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUsers> {
    const newUser = await new this.usersModel(createUserDto);
    return newUser.save();
  }

  async checkifUserExists(createUserDto: CreateUserDto): Promise<boolean> {
    let plateExists : IUsers = await this.getUserbyPlate(createUserDto.plate);
    let numberExits : IUsers = await this.getUserbyNumber(createUserDto.number)
    if (plateExists === null && numberExits === null)
      return false;
  }

  async updateUser(userId: string, updateStudentDto: UpdateUserDto): Promise<IUsers> {
    const existingUsers = await this.usersModel.findByIdAndUpdate(userId, updateStudentDto, { new: true });
    if (!existingUsers) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUsers;
  }

  async getAllUsers(): Promise<IUsers[]> {
    const allUserData = await this.usersModel.find();
    if (!allUserData || allUserData.length == 0) {
      throw new NotFoundException('All Users data not found!');
    }
    return allUserData;
  }

  /**
   * Die Userid ist nur in der DB sichtbar und eignet sich nicht direkt als Anfrageargument
   * @param userId
   */
  async getUserbyId(userId: string): Promise<IUsers> {
    const existingUser = await this.usersModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  /**
   * Den User anhand der Kundennummer suchen
   * @param number Kundennummer
   */
  async getUserbyNumber(number: string): Promise<IUsers | null> {
    const existingUserbyNumber = await this.usersModel.findOne({ number: number }).exec();
    if (!existingUserbyNumber)
      throw new NotFoundException(`User #${number} not found`);
    return existingUserbyNumber;
  }

  /**
   * Den User anhand dem Kennzeichen suchen
   * @param plate = Kennzeichen
   */
  async getUserbyPlate(platte: string): Promise<IUsers> {
    const existingUser = await this.usersModel.findOne({ plate: platte }).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${platte} not found`);
    }
    return existingUser;
  }

  async deleteUser(userId: string): Promise<IUsers> {
    const deletedUser = await this.usersModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`Student #${userId} not found`);
    }
    return deletedUser;
  }
}

