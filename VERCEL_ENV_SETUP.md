# Настройка переменных окружения для Vercel

## Необходимые переменные окружения

Для работы приложения с реальной базой данных необходимо настроить следующие переменные в Vercel:

### 1. DATABASE_URL
```
DATABASE_URL=postgresql://username:password@host:port/database_name
```

**Пример для Supabase:**
```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### 2. Дополнительные переменные (опционально)
```
NEXT_PUBLIC_APP_URL=https://gracefinal.vercel.app
NODE_ENV=production
```

## Как настроить в Vercel:

1. Перейдите в настройки проекта в Vercel Dashboard
2. Выберите вкладку "Environment Variables"
3. Добавьте переменную `DATABASE_URL` со значением вашей базы данных
4. Перезапустите деплой

## Настройка Supabase:

1. Создайте новый проект в Supabase
2. Скопируйте Connection String из Settings > Database
3. Замените `[YOUR-PASSWORD]` на ваш пароль базы данных
4. Добавьте эту строку как `DATABASE_URL` в Vercel

## После настройки:

1. Приложение будет использовать реальную базу данных
2. API routes будут работать с PostgreSQL
3. Все данные будут сохраняться в Supabase