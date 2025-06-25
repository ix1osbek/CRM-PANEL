import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common'
import { StudentsService } from './students.service'
import { CreateStudentDto } from './dto/create.student.dto'
import { UpdateStudentDto } from './dto/update.student.dto'

@Controller('learners')
export class StudentsController {
  constructor(private readonly learnerService: StudentsService) {}

  @Post('add')
  registerLearner(@Body() payload: CreateStudentDto) {
    return this.learnerService.create(payload)
  }

  @Get('list')
  fetchAllLearners() {
    return this.learnerService.findAll()
  }

  @Get('details/:learnerId')
  getLearnerById(@Param('learnerId') learnerId: string) {
    return this.learnerService.findOne(learnerId)
  }

  @Patch('update/:learnerId')
  updateLearner(
    @Param('learnerId') learnerId: string,
    @Body() payload: UpdateStudentDto,
  ) {
    return this.learnerService.update(learnerId, payload)
  }

  @Delete('remove/:learnerId')
  deleteLearner(@Param('learnerId') learnerId: string) {
    return this.learnerService.remove(learnerId)
  }
}
