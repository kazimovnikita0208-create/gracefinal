import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Mock данные для fallback
const mockServices = [
  {
    id: 1,
    name: 'Стрижка женская',
    description: 'Модная женская стрижка с укладкой',
    price: 2000,
    duration: 60,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Окрашивание волос',
    description: 'Профессиональное окрашивание волос',
    price: 4500,
    duration: 180,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'Маникюр',
    description: 'Классический маникюр с покрытием',
    price: 1500,
    duration: 90,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 4,
    name: 'Педикюр',
    description: 'Аппаратный педикюр с покрытием',
    price: 2000,
    duration: 120,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: 'Чистка лица',
    description: 'Комплексная чистка лица',
    price: 3000,
    duration: 90,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 6,
    name: 'Массаж лица',
    description: 'Расслабляющий массаж лица',
    price: 2500,
    duration: 60,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

export async function GET() {
  try {
    // Проверяем, есть ли DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not found, using mock data');
      return NextResponse.json({
        success: true,
        data: mockServices
      });
    }

    const prisma = new PrismaClient();
    const services = await prisma.service.findMany({
      where: {
        isActive: true
      },
      include: {
        masterServices: {
          include: {
            master: true
          }
        },
        _count: {
          select: {
            appointments: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    console.log('Falling back to mock data');
    
    return NextResponse.json({
      success: true,
      data: mockServices
    });
  }
}
