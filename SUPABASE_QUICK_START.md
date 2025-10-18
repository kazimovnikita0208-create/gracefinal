# 🚀 Быстрый старт с Supabase

## Пошаговая настройка (5 минут)

### 1️⃣ Создание проекта в Supabase
1. Откройте https://supabase.com
2. Нажмите **"Start your project"**
3. Войдите через GitHub
4. Нажмите **"New Project"**
5. Заполните:
   - **Name**: `grace-salon-db`
   - **Database Password**: `GraceSalon2024!` (или свой)
   - **Region**: `Europe West (Ireland)`
6. Нажмите **"Create new project"**
7. ⏳ Ждите 2-3 минуты

### 2️⃣ Получение DATABASE_URL
1. В проекте перейдите **Settings** → **Database**
2. Найдите **Connection string**
3. Скопируйте **URI**
4. Замените `[password]` на ваш пароль
5. Пример: `postgresql://postgres:GraceSalon2024!@db.abcdefgh.supabase.co:5432/postgres`

### 3️⃣ Настройка Vercel
1. Откройте https://vercel.com/dashboard
2. Найдите проект `gracefinal`
3. **Settings** → **Environment Variables**
4. **Add New**:
   - Name: `DATABASE_URL`
   - Value: ваша строка подключения
   - Environment: Production, Preview, Development
5. **Save**

### 4️⃣ Перезапуск деплоя
1. **Deployments** → **Redeploy**
2. ⏳ Ждите 2-3 минуты

### 5️⃣ Проверка
- ✅ https://gracefinal.vercel.app/api/health
- ✅ https://gracefinal.vercel.app/api/masters
- ✅ https://gracefinal.vercel.app

## 🎯 Что получится

После настройки у вас будет:
- 🗄️ **База данных** с 3 мастерами и 4 услугами
- 🔗 **API** для работы с данными
- 🌐 **Веб-приложение** для записи к мастерам
- 📱 **Telegram бот** для запуска приложения

## 🆘 Если что-то не работает

1. **Проверьте DATABASE_URL** - должен начинаться с `postgresql://`
2. **Проверьте пароль** - должен совпадать с тем, что вы указали
3. **Перезапустите деплой** - иногда нужно время для применения переменных
4. **Проверьте логи** в Vercel - там будут ошибки, если что-то не так

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте файл `VERCEL_SETUP.md` для подробных инструкций
2. Убедитесь, что проект в Supabase создался успешно
3. Проверьте, что DATABASE_URL добавлен во все окружения Vercel
