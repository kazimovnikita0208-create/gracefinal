# 🔍 Диагностика базы данных

## Шаг 1: Проверьте переменные окружения в Vercel

1. Откройте ваш проект в Vercel: https://vercel.com/nikitas-projects-1742d776/gracefinal
2. Перейдите в **Settings** → **Environment Variables**
3. Убедитесь, что есть переменная `DATABASE_URL`
4. Значение должно быть: `postgresql://postgres:Grace2025!!final@db.fuhtyverxeszomnvdtzo.supabase.co:5432/postgres`

## Шаг 2: Проверьте подключение к базе данных

Откройте эту ссылку: **https://gracefinal.vercel.app/api/db-test**

### ✅ Если подключение успешно:
```json
{
  "success": true,
  "message": "База данных подключена успешно",
  "databaseUrl": "Установлен",
  "testResult": [{"test": 1}]
}
```

### ❌ Если ошибка подключения:
```json
{
  "success": false,
  "error": "Ошибка подключения к базе данных",
  "details": {
    "message": "...",
    "code": "...",
    "databaseUrl": "Не установлен"
  }
}
```

## Шаг 3: Возможные проблемы и решения

### Проблема 1: DATABASE_URL не установлен
**Симптом:** `"databaseUrl": "Не установлен"`
**Решение:** 
1. Добавьте переменную `DATABASE_URL` в Vercel
2. Перезапустите деплой

### Проблема 2: Неправильный пароль
**Симптом:** Ошибка аутентификации
**Решение:** 
1. Проверьте пароль в Supabase
2. Обновите DATABASE_URL с правильным паролем

### Проблема 3: База данных недоступна
**Симптом:** Ошибка подключения
**Решение:** 
1. Проверьте, что проект Supabase активен
2. Проверьте, что база данных не приостановлена

## Шаг 4: После исправления

1. **Перезапустите деплой** в Vercel
2. **Проверьте логи** деплоя на предмет ошибок
3. **Протестируйте API:**
   - https://gracefinal.vercel.app/api/health
   - https://gracefinal.vercel.app/api/db-test
   - https://gracefinal.vercel.app/api/masters

## 🚨 Если ничего не помогает

Проверьте логи деплоя в Vercel:
1. Deployments → выберите последний деплой
2. Посмотрите логи на предмет ошибок Prisma
3. Проверьте, что Prisma Client сгенерирован успешно
