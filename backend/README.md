# 🚀 Grace Beauty Salon Backend

Backend API для салона красоты Grace с интеграцией Telegram Web App.

## 📋 Особенности

- **REST API** для frontend приложения
- **Telegram аутентификация** через Telegram ID
- **SQLite база данных** с Prisma ORM
- **Админ панель** для управления салоном
- **Уведомления** через Telegram Bot
- **Аналитика и статистика**

## 🛠️ Технологический стек

- **Node.js** + **Express.js**
- **TypeScript** для типобезопасности
- **SQLite** + **Prisma ORM**
- **Telegram Bot API** для уведомлений
- **Winston** для логирования
- **Helmet** для безопасности

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка окружения

Скопируйте `.env.example` в `.env` и заполните переменные:

```bash
cp env.example .env
```

### 3. Настройка базы данных

```bash
# Генерация Prisma клиента
npm run db:generate

# Применение миграций
npm run db:migrate

# Заполнение тестовыми данными
npm run db:seed
```

### 4. Запуск в режиме разработки

```bash
npm run dev
```

### 5. Запуск в продакшене

```bash
npm run build
npm start
```

## 📊 API Endpoints

### Health Check
- `GET /health` - Проверка состояния сервера

### Пользователи
- `GET /api/users/me` - Получить текущего пользователя
- `PUT /api/users/me` - Обновить профиль

### Мастера
- `GET /api/masters` - Список всех мастеров
- `GET /api/masters/:id` - Информация о мастере
- `GET /api/masters/:id/schedule` - Расписание мастера
- `GET /api/masters/:id/available-slots` - Доступные слоты

### Услуги
- `GET /api/services` - Список всех услуг
- `GET /api/services/:id` - Информация об услуге

### Записи
- `POST /api/appointments` - Создать запись
- `GET /api/appointments` - Список записей
- `GET /api/appointments/:id` - Информация о записи
- `PUT /api/appointments/:id` - Обновить запись
- `DELETE /api/appointments/:id` - Отменить запись

## 🔐 Аутентификация

API использует аутентификацию через Telegram Web App. Все запросы должны содержать заголовок:

```
X-Telegram-Init-Data: <telegram_init_data>
```

## 📁 Структура проекта

```
backend/
├── src/
│   ├── controllers/     # Контроллеры API
│   ├── middleware/      # Middleware (auth, validation)
│   ├── routes/          # API маршруты
│   ├── services/        # Бизнес логика
│   ├── utils/           # Утилиты
│   ├── types/           # TypeScript типы
│   └── app.ts           # Главный файл приложения
├── prisma/
│   ├── schema.prisma    # Схема базы данных
│   ├── seed.ts          # Начальные данные
│   └── migrations/      # Миграции
├── logs/                # Логи приложения
└── dist/                # Скомпилированный код
```

## 🗄️ База данных

### Основные модели:
- **User** - Пользователи (клиенты)
- **Master** - Мастера салона
- **Service** - Услуги
- **Appointment** - Записи клиентов
- **MasterSchedule** - Расписание мастеров
- **Review** - Отзывы
- **Admin** - Администраторы
- **Notification** - Уведомления

## 📝 Логирование

Логи сохраняются в папке `logs/`:
- `error.log` - Только ошибки
- `combined.log` - Все логи

## 🔒 Безопасность

- **Rate limiting** - Ограничение количества запросов
- **CORS** - Настройки для frontend
- **Helmet** - HTTP заголовки безопасности
- **Telegram подпись** - Проверка аутентификации
- **Валидация** - Проверка всех входных данных

## 🧪 Тестирование

```bash
# Запуск тестов
npm test

# Запуск тестов с покрытием
npm run test:coverage
```

## 📦 Развертывание

### Docker

```bash
# Сборка образа
docker build -t grace-salon-backend .

# Запуск контейнера
docker run -p 3001:3001 grace-salon-backend
```

### PM2

```bash
# Установка PM2
npm install -g pm2

# Запуск приложения
pm2 start dist/app.js --name grace-salon-backend

# Мониторинг
pm2 monit
```

## 🤝 Разработка

### Команды

```bash
# Разработка
npm run dev

# Сборка
npm run build

# База данных
npm run db:generate    # Генерация Prisma клиента
npm run db:push        # Применение изменений схемы
npm run db:migrate     # Создание миграции
npm run db:seed        # Заполнение данными
npm run db:studio      # Prisma Studio
```

### Git Hooks

```bash
# Pre-commit проверки
npm run lint
npm run type-check
npm test
```

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи в папке `logs/`
2. Убедитесь что все переменные окружения настроены
3. Проверьте подключение к базе данных
4. Проверьте токен Telegram бота

## 📄 Лицензия

MIT License



