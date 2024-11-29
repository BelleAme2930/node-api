import { IsString, IsDateString, IsEnum, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(['Pending', 'Done', 'In Progress', 'Paused'])
  status: 'Pending' | 'Done' | 'In Progress' | 'Paused';

  @IsEnum(['Low', 'Medium', 'High'])
  priority: 'Low' | 'Medium' | 'High';

  @IsBoolean()
  isActive: boolean;
}
