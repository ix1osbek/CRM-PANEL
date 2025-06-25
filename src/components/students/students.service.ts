import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../prisma/prisma.service';
import { CreateStudentDto } from './dto/create.student.dto';
import { UpdateStudentDto } from './dto/update.student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly db: DatabaseService) {}

  async create(createStudentDto: CreateStudentDto) {
    return this.db.student.create({ data: createStudentDto });
  }

  async findAll() {
    return this.db.student.findMany({
      include: {
        group: true,
        payments: true,
      },
    });
  }

  async findOne(learnerId: string) {
    const learner = await this.db.student.findUnique({
      where: { id: learnerId },
      include: {
        group: true,
        payments: true,
      },
    });

    if (!learner) {
      throw new NotFoundException('Learner not located');
    }

    return learner;
  }

  async update(learnerId: string, updateStudentDTO: UpdateStudentDto) {
    await this.findOne(learnerId);
    return this.db.student.update({
      where: { id: learnerId },
      data: updateStudentDTO,
    });
  }

  async remove(learnerId: string) {
    await this.findOne(learnerId);
    return this.db.student.delete({
      where: { id: learnerId },
    });
  }
}
