# 🔧 Настройка переменных окружения в Vercel

## Шаг 1: Открытие настроек проекта
1. Перейдите на https://vercel.com/dashboard
2. Найдите ваш проект `gracefinal`
3. Нажмите на проект
4. Перейдите в **Settings** → **Environment Variables**

## Шаг 2: Добавление DATABASE_URL
1. Нажмите **Add New**
2. Заполните поля:
   - **Name**: `DATABASE_URL`
   - **Value**: вставьте вашу строку подключения из Supabase
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.fuhtyverxeszomnvdtzo.supabase.co:5432/postgres
     ```
   - **Environment**: выберите **Production**, **Preview**, **Development**
3. Нажмите **Save**

## Шаг 3: Перезапуск деплоя
1. Перейдите в **Deployments**
2. Найдите последний деплой
3. Нажмите **Redeploy**
4. Дождитесь завершения (2-3 минуты)

## Шаг 4: Проверка работы
После перезапуска проверьте:
- https://gracefinal.vercel.app/api/health
- https://gracefinal.vercel.app/api/masters

## 🆘 Если что-то не работает
1. Проверьте, что DATABASE_URL добавлен во все окружения
2. Убедитесь, что пароль в строке подключения правильный
3. Проверьте логи деплоя в Vercel
