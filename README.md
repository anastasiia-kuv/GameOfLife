# GameOfLife
 <p>Игра Жизнь</p>

## Установка
 1. Клонирование репозитория

  ```
  git clone https://github.com/anastasiia-kuv/GameOfLife.git
  ```

 2. Установка зависимостей с помощью <a href="https://www.npmjs.com/">npm</a>
 
 ```
 npm install
 ```

## Запуск

  ### Development
  ```
  npm run start
  ```
  ### Production
  ```
  npm run build
  ```
  ### Tests
  ```
  npm run test 
  ```
</p>
![Image alt uml diagram](https://github.com/anastasiia-kuv/GameOfLife/raw/master/src/image/uml.jpg)

<p><strong>Controller</strong> обрабатывает события которые рассылают View и Model. И в зависимости от событий вызывает методы в соответствующих классах. Контроллер знает про View Model. Он служит посредником между View и Model.
</p>

<p><strong>View</strong> взаимодействует с DOM. View не знает не о ком. В случаи изменений в DOM элементах он генерирует соответствующие события. 
</p>

<p><strong>Model</strong> отвечает за работу с данными. Model не знает не о ком. Так же, как и View генерирует события, когда изменяются данные.  В Model сосредоточенна вся логика игры и хранятся все данные. 
</p>

## GitHub Pages
<a href="https://anastasiia-kuv.github.io/GameOfLife/build/index.html">Game Of Life</a>
