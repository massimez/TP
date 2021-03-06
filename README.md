
## Организационно-административная система управления по расселению студентов в общежитиях

### Технологии, использованные в проекте: Laravel,HTML,CSS,React/Redux/Formik/Chakra UI,PHP,MySQL.
https://apple-sundae-02076.herokuapp.com
Login: test@test.fr
Password : test1234

### Описание функциональности: 
1. Форма для заполнения данных о студенте (заполнение сущности “студент”: внесение всех данных, которые можно получить при заселении).
2. Выбор комнаты для заселения студента (выбор комнаты облегчается функциями, описанными в пунктах 3-5).
3. Отображение свободных комнат (благодаря этой функции при заселении студента отображаются только пустые комнаты).
4. Отображение комнат, которые подходят для студента [парень, девушка] (благодаря этой функции в списке не будут фигурировать комнаты с жителями противоположного пола).
5. Отображение проживающих в комнате (благодаря этой функции можно будет посмотреть будущих соседей заселяемого студента).
6. Заселение в комнату (сущности “студент” присваивается определенный номер комнаты).
7. Отметка статуса проживания студента [процесс оформления документов, проживает] (данная функция позволяет отслеживать на каком этапе заселения находится студент).
8.Составление договора на проживание (данная функция позволяет подставлять данные студента в шаблон договора найма специализированного жилого помещения и отправление договора на печать).
9. Переселение студента в другую комнату (данная функция позволяет изменять комнату у проживающего при его переселении).
10. Выселение студента (данная функция позволяет отмечать выселенных студентов. Место, которое занимал данный студент, освобождается, сущность студента перемещается в журнал выселенных студентов).
11. Общий журнал проживающих студентов (данная функция позволяет просматривать общий список студентов по комнатам).
12. Общий журнал выселенных студентов (данная функция позволяет просматривать общий список выселенных студентов с указанием времени выселения).
13 .Редактирование данных студента (данная функция позволяет изменять данные сущности “студент”).
14. Поиск студента по базе (данная функция позволяет искать студента в журналах).
15. Фильтрация данных (данная функция позволяет фильтровать журнал студентов по различным признакам).
16. Формирование и печать списков проживающих [этаж, комната, общий] (данная функция позволяет формировать списки для администрации и актива общежития).
17. Пометка семейная комната (данная функция позволяет отдельно отметить комнаты семейного фонда).
18. Выбор количества занятых мест человеком (данная функция позволяет устанавливать различный вес у студентов разного статуса, например староста этажа занимает не одно койко-место, а четыре или три, сотрудник оперотряда или санитарной комиссии – два койко-места).
19. Установка статуса студента [староста этажа, расселитель и тп] (данная функция позволяет отмечать студентов, имеющих особый статус).
20. Вход в личный кабинет для каждой роли должен осуществляться через логин и пароль.
21. Установка возможного количество проживающих человек в комнате.
