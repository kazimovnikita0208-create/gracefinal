# 🆕 Создание нового Supabase проекта

## Если текущий проект не работает, создайте новый:

### 1. Создайте новый проект в Supabase
1. Откройте: https://supabase.com/dashboard
2. Нажмите **"New Project"**
3. Выберите организацию
4. **Project Name**: `grace-salon-db`
5. **Database Password**: `Grace2025!!final` (или любой другой)
6. **Region**: выберите ближайший к вам
7. Нажмите **"Create new project"**

### 2. Дождитесь создания проекта (2-3 минуты)

### 3. Получите новый DATABASE_URL
1. В новом проекте: **Settings** → **Database**
2. Найдите **"Connection string"**
3. Выберите **"URI"** формат
4. Скопируйте строку подключения
5. Замените `[YOUR-PASSWORD]` на ваш пароль

### 4. Обновите DATABASE_URL в Vercel
1. Откройте: https://vercel.com/nikitas-projects-1742d776/gracefinal
2. **Settings** → **Environment Variables**
3. Найдите `DATABASE_URL`
4. **Edit** → вставьте новый URL
5. **Save**

### 5. Перезапустите деплой
1. **Deployments** → **Redeploy**
2. Дождитесь завершения
3. Проверьте: https://gracefinal.vercel.app/api/db-test

## 🚀 Быстрое решение

Если хотите быстро протестировать, можете временно использовать **SQLite** вместо PostgreSQL:

1. Обновите `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. Обновите `DATABASE_URL` в Vercel на:
```
file:./dev.db
```

3. Перезапустите деплой

**Какой вариант предпочитаете?**
