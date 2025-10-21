import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock данные для fallback
const mockAppointments = [
  {
    id: 1,
    userId: 1,
    masterId: 1,
    serviceId: 1,
    appointmentDate: '2024-01-15T14:00:00Z',
    notes: 'Тестовая запись',
    totalPrice: 2000,
    status: 'PENDING',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    master: {
      id: 1,
      name: 'Анна Иванова',
      specialization: 'Стилист-парикмахер'
    },
    service: {
      id: 1,
      name: 'Стрижка женская',
      price: 2000
    },
    user: {
      id: 1,
      firstName: 'Тестовый',
      lastName: 'Пользователь'
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    // Проверяем наличие DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not found, using mock data');
      const { searchParams } = new URL(request.url);
      const status = searchParams.get('status');
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      
      let filteredAppointments = mockAppointments;
      
      if (status) {
        filteredAppointments = mockAppointments.filter(apt => apt.status === status);
      }
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedAppointments = filteredAppointments.slice(startIndex, endIndex);
      
      return NextResponse.json({
        success: true,
        data: paginatedAppointments,
        pagination: {
          page,
          limit,
          total: filteredAppointments.length,
          pages: Math.ceil(filteredAppointments.length / limit)
        }
      });
    }

    console.log('Fetching appointments from database');
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const where: any = {};
    if (status) {
      where.status = status;
    }
    
    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        master: true,
        service: true,
        user: true
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { appointmentDate: 'desc' }
    });
    
    const total = await prisma.appointment.count({ where });
    
    return NextResponse.json({
      success: true,
      data: appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Database error, using mock data:', error);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let filteredAppointments = mockAppointments;
    
    if (status) {
      filteredAppointments = mockAppointments.filter(apt => apt.status === status);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAppointments = filteredAppointments.slice(startIndex, endIndex);
    
    return NextResponse.json({
      success: true,
      data: paginatedAppointments,
      pagination: {
        page,
        limit,
        total: filteredAppointments.length,
        pages: Math.ceil(filteredAppointments.length / limit)
      }
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { masterId, serviceId, appointmentDate, notes } = body;

    if (!masterId || !serviceId || !appointmentDate) {
      return NextResponse.json(
        { success: false, error: 'Master, service and date are required' },
        { status: 400 }
      );
    }

    // Проверяем наличие DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not found, using mock data');
      const newAppointment = {
        id: Date.now(),
        userId: 1,
        masterId: parseInt(masterId),
        serviceId: parseInt(serviceId),
        appointmentDate: new Date(appointmentDate).toISOString(),
        notes: notes || null,
        totalPrice: 2000,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        master: {
          id: masterId,
          name: 'Мастер',
          specialization: 'Специализация'
        },
        service: {
          id: serviceId,
          name: 'Услуга',
          price: 2000
        }
      };

      return NextResponse.json({
        success: true,
        data: newAppointment
      }, { status: 201 });
    }

    console.log('Creating appointment in database');
    const newAppointment = await prisma.appointment.create({
      data: {
        userId: 1, // Mock user ID
        masterId: parseInt(masterId),
        serviceId: parseInt(serviceId),
        appointmentDate: new Date(appointmentDate),
        notes: notes || null,
        totalPrice: 2000, // Mock цена
        status: 'PENDING'
      },
      include: {
        master: true,
        service: true,
        user: true
      }
    });

    return NextResponse.json({
      success: true,
      data: newAppointment
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}
