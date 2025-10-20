import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

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
      orderBy: {
        appointmentDate: 'desc'
      },
      skip,
      take: limit
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
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch appointments' },
      { status: 500 }
    );
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

    // Get service price
    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) }
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: 1, // For now, use a default user ID
        masterId: parseInt(masterId),
        serviceId: parseInt(serviceId),
        appointmentDate: new Date(appointmentDate),
        notes: notes || null,
        totalPrice: service.price,
        status: 'PENDING'
      },
      include: {
        master: true,
        service: true
      }
    });

    return NextResponse.json({
      success: true,
      data: appointment
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}
