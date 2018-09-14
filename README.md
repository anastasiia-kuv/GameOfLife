# GameOfLife
<a href="https://kuvshinova-am.github.io/GameOfLife/">Посмотреть</a>
<p> Для запуска тестов необходимо ввести в терминале команду:
```
 npm run test 
```
Терминал должен быть запущен из корня папки проекта.
</p>
![Image alt uml diagram](https://github.com/kuvshinova-am/GameOfLife/raw/master/image/uml.jpg)

<p><strong>Controller</strong> обрабатывает события которые рассылают View и Model. И в зависимости от событий вызывает методы в соответствующих классах. Контроллер знает про View Model. Он служит посредником между View и Model.
</p>

<p><strong>View</strong> взаимодействует с DOM. View не знает не о ком. В случаи изменений в DOM элементах он генерирует соответствующие события. 
</p>

<p><strong>Model</strong> отвечает за работу с данными. Model не знает не о ком. Так же, как и View генерирует события, когда изменяются данные.  В Model сосредоточенна вся логика игры и хранятся все данные. 
</p>