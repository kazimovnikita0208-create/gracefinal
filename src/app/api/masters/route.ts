import { NextRequest, NextResponse } from 'next/server';

// Mock данные для приложения
const mockMasters = [
  {
    id: 1,
    name: 'Анна Иванова',
    specialization: 'Стилист-парикмахер',
    description: 'Опытный мастер с 8-летним стажем. Специализируется на окрашивании и стрижках.',
    photoUrl: '/images/masters/anna.jpg',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Мария Петрова',
    specialization: 'Мастер маникюра и педикюра',
    description: 'Профессиональный nail-мастер с опытом работы 5 лет.',
    photoUrl: '/images/masters/maria.jpg',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'Елена Сидорова',
    specialization: 'Косметолог',
    description: 'Косметолог с 10-летним опытом. Специалист по уходу за кожей лица.',
    photoUrl: '/images/masters/elena.jpg',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

export async function GET() {
  console.log('Fetching masters from mock data');
  
  return NextResponse.json({
    success: true,
    data: mockMasters
  });
}
