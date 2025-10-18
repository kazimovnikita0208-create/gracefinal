# 🔐 Тестирование Telegram аутентификации через ngrok

## 🎯 Цель
Проверить аутентификацию по Telegram ID через WebApp.

## 📋 Пошаговая инструкция

### 1. Настройка ngrok (один раз)

#### Зарегистрируйтесь:
1. Зайдите на https://dashboard.ngrok.com/signup
2. Зарегистрируйтесь (бесплатно)
3. Получите authtoken на https://dashboard.ngrok.com/get-started/your-authtoken

#### Установите токен:
```bash
npx ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
```

### 2. Запуск всех сервисов

#### Терминал 1 - Frontend:
```bash
npm run dev
```

#### Терминал 2 - Backend:
```bash
cd backend
npm run dev
```

#### Терминал 3 - ngrok:
```bash
npx ngrok http 3000
```

#### Терминал 4 - Бот:
```bash
cd telegram-bot
npm start
```

### 3. Получение ngrok URL

ngrok покажет что-то вроде:
```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000
```

**Скопируйте URL: `https://abc123.ngrok.io`**

### 4. Обновление бота

#### Откройте `telegram-bot/bot.js` и замените:
```javascript
web_app: { url: 'https://YOUR_NGROK_URL_HERE.ngrok.io' }
```
на ваш реальный ngrok URL:
```javascript
web_app: { url: 'https://abc123.ngrok.io' }
```

#### Перезапустите бота:
```bash
cd telegram-bot
npm start
```

### 5. Тестирование аутентификации

#### 1. Найдите бота в Telegram
#### 2. Отправьте `/start`
#### 3. Нажмите "Открыть приложение"
#### 4. Приложение откроется в Telegram WebApp

## 🔍 Что проверяется:

### ✅ Публичные страницы (без аутентификации):
- Главная `/` - должна открыться
- Услуги `/services` - список услуг
- Запись `/booking` - процесс записи

### 🔐 Пользовательские страницы (требуют Telegram auth):
- Профиль `/profile` - данные пользователя
- Мои записи `/profile/appointments` - история записей

### 👑 Админ страницы (требуют Telegram auth + админ права):
- Админ панель `/admin` - статистика
- Управление мастерами `/admin/masters` - CRUD мастера
- Управление услугами `/admin/services` - CRUD услуги

## 🐛 Отладка:

### Проверка ngrok:
- Откройте URL в браузере
- Должна открыться главная страница Grace

### Проверка API:
```bash
curl https://abc123.ngrok.io/api/masters
```

### Логи backend:
Смотрите в `backend/logs/combined.log`

### Проверка аутентификации:
1. Откройте админ-панель `/admin`
2. Должна работать аутентификация через Telegram
3. Проверьте, что пользователь создается в базе данных

## ⚠️ Важно:

1. **ngrok URL меняется** при перезапуске (кроме платных аккаунтов)
2. **Обновляйте URL в боте** после каждого перезапуска ngrok
3. **Telegram WebApp** работает только в Telegram, не в браузере
4. **Аутентификация** работает через Telegram initData

## 🎉 Готово!

Теперь у вас есть полноценное тестирование Telegram аутентификации через ngrok!

