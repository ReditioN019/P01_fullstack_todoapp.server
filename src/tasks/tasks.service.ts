import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';


@Injectable()
export class TasksService {

  private readonly logger = new Logger('TasksService')

  constructor(

    @InjectRepository(Task)
    private readonly taskRespository: Repository<Task>,

  ){}


  async create(createTaskDto: CreateTaskDto) {

    try {
      //crea la instancia de la tarea
      const task = this.taskRespository.create(createTaskDto);
      
      await this.taskRespository.save(task); //guardo la nueva tarea en la BD
      return task;

    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  findAll() { 
    return this.taskRespository.find({})
  }

  async findOne(id: string) {

    const task = await this.taskRespository.findOneBy({ id })
    if (!task) throw new NotFoundException(`No se encontró la tarea con id: ${id}`);

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {

    const task = await this.taskRespository.preload({
      id: id,
      ...updateTaskDto
    });

    if (!task) throw new NotFoundException(`No se encontró la tarea con id: ${id}`);

    try {
      await this.taskRespository.save(task);
      return task;
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    await this.taskRespository.remove(task);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    console.log(error)
    throw new InternalServerErrorException('Problems!')
  }

}
