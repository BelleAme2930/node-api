import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Creates a new task.
   *
   * @param createTaskDto - Data required to create a new task.
   * @returns The created task object.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
    type: Task,
  })
  @ApiResponse({
    status: 500,
    description: 'Error creating the task',
  })
  @ApiBody({
    description: 'Task data to be created',
    type: CreateTaskDto,
    examples: {
      default: {
        summary: 'A sample task to create',
        value: {
          name: 'Test Task',
          dueDate: '2024-12-31',
          status: 'Pending',
          priority: 'Low',
          isActive: true,
        },
      },
    },
  })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const task = await this.tasksService.create(createTaskDto);
      if (!task) {
        throw new InternalServerErrorException('Error creating the task');
      }
      return task;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating the task: ' + error,
      );
    }
  }

  /**
   * Retrieves a list of tasks with optional filters and pagination.
   *
   * @param page - The page number for pagination.
   * @param limit - The number of tasks per page.
   * @param status - Optional filter to fetch tasks with a specific status.
   * @param priority - Optional filter to fetch tasks with a specific priority.
   * @returns An array of tasks matching the filters.
   */
  @Get()
  @ApiOperation({
    summary: 'Retrieve all tasks with optional filters and pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully',
    type: [Task],
  })
  @ApiResponse({
    status: 404,
    description: 'No tasks found for the given filters',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter tasks by status',
    enum: ['Pending', 'Done', 'In Progress', 'Paused'],
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    description: 'Filter tasks by priority',
    enum: ['Low', 'Medium', 'High'],
  })
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ): Promise<Task[]> {
    if (isNaN(page) || page <= 0) {
      throw new BadRequestException('Page parameter must be a positive number');
    }
    if (isNaN(limit) || limit <= 0) {
      throw new BadRequestException(
        'Limit parameter must be a positive number',
      );
    }

    const validStatuses = ['Pending', 'Done', 'In Progress', 'Paused'];
    const validPriorities = ['Low', 'Medium', 'High'];

    if (status && !validStatuses.includes(status)) {
      throw new BadRequestException('Invalid status value');
    }

    if (priority && !validPriorities.includes(priority)) {
      throw new BadRequestException('Invalid priority value');
    }

    const filter: { status?: string; priority?: string } = {};
    if (status) filter['status'] = status;
    if (priority) filter['priority'] = priority;

    const tasks = await this.tasksService.findAll(page, limit, filter);

    if (tasks.length === 0) {
      throw new NotFoundException('No tasks found for the given filters');
    }
    return tasks;
  }

  /**
   * Retrieves a task by its ID.
   *
   * @param id - The ID of the task to retrieve.
   * @returns The task object if found.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a task by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Task found successfully',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found with the provided ID',
  })
  async findOne(@Param('id') id: number): Promise<Task> {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  /**
   * Updates an existing task by its ID.
   *
   * @param id - The ID of the task to update.
   * @param updateTaskDto - Data required to update the task.
   * @returns The updated task object.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiResponse({
    status: 200,
    description: 'Task successfully updated',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found for the provided ID',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request for invalid data provided',
  })
  @ApiBody({
    description: 'Task data to be updated',
    type: CreateTaskDto,
    examples: {
      default: {
        summary: 'A sample task to update',
        value: {
          name: 'Updated Test Task',
          dueDate: '2025-01-01',
          status: 'In Progress',
          priority: 'Medium',
          isActive: true,
        },
      },
    },
  })
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const task = await this.tasksService.update(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  /**
   * Deletes a task by its ID.
   *
   * @param id - The ID of the task to delete.
   * @returns A success message.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found for the provided ID',
  })
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.tasksService.remove(id);
    return { message: `Task with ID ${id} has been deleted successfully` };
  }
}
