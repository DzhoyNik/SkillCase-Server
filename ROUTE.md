# ROUTE.md — SkillCase API (v1)

Документ описывает REST API сервера SkillCase: маршруты, доступы, форматы запросов/ответов и ключевые параметры.


## 0. Base URL и версия

Все маршруты начинаются с: `/api/v1`

Пример: `GET /api/v1/cases`

## 1. Аутентификация и доступ

### 1.1 JWT

- После `POST /auth/login` клиент получает `accessToken` (JWT).
- Во всех защищённых запросах передавать: `Authorization: Bearer <accessToken>`

### 1.2 Роли

- `student`
- `company`
- `admin` *(опционально)*

> Важно: `Company` — это организация, `Employee` — пользователь, связанный с компанией.

## 2. Общие соглашения

### 2.1 Формат успешного ответа
```json
{
    "data": {},
    "meta": {}
}
```

### 2.2 Формат ошибки
```json
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Некорректные данные",
        "details": [
            { "field": "email", "message": "Некорректный email" }
        ]
    }
}
```

### 2.3 Коды ответа

- 200 OK — успешное получение/обновление
- 201 Created — успешное создание
- 204 No Content — успешное удаление без тела ответа
- 400 Bad Request — неверный запрос/валидация
- 401 Unauthorized — нет/невалидный токен
- 403 Forbidden — нет прав
- 404 Not Found — не найдено
- 409 Conflict — конфликт (дубликаты, состояние)
- 500 Internal Server Error — ошибка сервера

1) Auth

Регистрация пользователя (student/company) → POST /auth/register → 201, 400, 409

Вход → POST /auth/login → 200, 400, 401

Получить текущего пользователя → GET /me → 200, 401

2) Теги (нужны для фильтров)

Получить список тегов (с фильтром по типу) → GET /tags?type=skill|direction&q= → 200

(Опц.) Создать тег (если не делаешь seed) → POST /tags → 201, 400, 403, 409

3) Кейсы (каталог + карточка кейса)

Список кейсов (поиск/фильтры/пагинация) → GET /cases?q=&page=&limit=&difficultyId=&statusId=&tagId= → 200

Получить кейс (включая requirements + tags) → GET /cases/:caseId → 200, 404

Создать кейс (компания/сотрудник) → POST /cases → 201, 400, 401, 403

Обновить кейс → PATCH /cases/:caseId → 200, 400, 401, 403, 404

Удалить/архивировать кейс → DELETE /cases/:caseId → 204, 401, 403, 404

4) Требования кейса

Список требований → GET /cases/:caseId/requirements → 200, 404

Добавить требование → POST /cases/:caseId/requirements → 201, 400, 401, 403, 404

Обновить требование → PATCH /cases/:caseId/requirements/:requirementId → 200, 400, 401, 403, 404

Удалить требование → DELETE /cases/:caseId/requirements/:requirementId → 204, 401, 403, 404

5) Теги кейса

Привязать тег к кейсу → POST /cases/:caseId/tags → 201, 400, 401, 403, 404, 409

Отвязать тег → DELETE /cases/:caseId/tags/:tagId → 204, 401, 403, 404

6) Решения (студент отправляет)

Отправить решение → POST /solutions → 201, 400, 401, 403, 404

Мои решения студента → GET /solutions/my → 200, 401, 403

Получить решение (автор или компания-владелец кейса) → GET /solutions/:solutionId → 200, 401, 403, 404

(Опц.) Редактировать решение пока draft → PATCH /solutions/:solutionId → 200, 400, 401, 403, 404, 409

7) Очередь решений для компании (чтобы проверять удобно)

Список решений по компании (фильтр по статусам/кейсу) →
GET /companies/:companyId/solutions?status=&caseId= → 200, 401, 403, 404

8) Ревью (компания принимает/отклоняет)

Создать ревью по решению → POST /reviews → 201, 400, 401, 403, 404, 409

Получить ревью → GET /reviews/:reviewId → 200, 401, 403, 404

(Опц.) Обновить ревью → PATCH /reviews/:reviewId → 200, 400, 401, 403, 404, 409

9) Автопроверка (можно заглушкой, но маршрут заложить)

Запустить автопроверку → POST /solutions/:solutionId/autocheck → 202 (или 201), 401, 403, 404, 409

Получить результат автопроверки → GET /solutions/:solutionId/autocheck → 200, 401, 403, 404

10) Уведомления (Mongo, минимум)

Список уведомлений → GET /notifications → 200, 401

Прочитать одно → PUT /notifications/:id/read → 200 (или 204), 401, 404

Прочитать все → PUT /notifications/read-all → 200 (или 204), 401