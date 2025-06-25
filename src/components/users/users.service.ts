import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}
  create(payload: CreateUserDto) {
    return this.db.user.create({ data: payload })
  }
  findAll() {
    return this.db.user.findMany()
  }
  findOne(userId: string) {
    return this.db.user.findUnique({ where: { id: userId } })
  }
  update(userId: string, payload: UpdateUserDto) {
    return this.db.user.update({ where: { id: userId }, data: payload })
  }
  remove(userId: string) {
    return this.db.user.delete({ where: { id: userId } })
  }
}
