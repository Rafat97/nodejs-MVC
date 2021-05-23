# Why, We used this framework?
We all know that, structured coding is a art of coding. And also it's help to build and maintain large application easily. Because, of this I made this structured framework. In this framework, you can follow two types of structured. first is `Component Based` and second one is `MVC(Model-View-Controller) Based`.

*** This framework will be updating continuously.

# Install Process

## Using Docker

1. Clone the project
2. Go to project directory
3. Open commend-line and run :
    ```bash
    $ docker-compose up -d --build
    ```

## Manual Installation

1. Clone the project
2. Go to project directory
3. Open commend-line and run :
    ```bash
    $ npm install
    ```
    Then
    ```bash
    $ npm run start
    ```


# Some Global function

## `using(name : string)`

This is the alternative of `require` function. In this function you don't need to `Manual Symlinks`. This function create `Automated Symlinks` from project root directory.

Ex:
```js
require("../stub/controller/index")
```
to 
```js
using("stub/controller/index")
```

## `routeCreate(type: string, url: string, controllerData: function,object)`

This function is use to create router for project. This function automated handle project router. You don't need to handle manual route. 

Ex:
```js
routeCreate("use", "/", using("stub/controller/index")),
```


## `appRoot()`

This function return the project root absolute path.

Ex:
```js
/**
 * return
 * C:\Users\rafat\OneDrive\Documents\GitHub\amarischool-course-selling-website\back-end\amarischool-api-node
 *
 */
console.log(appRoot())
```

## `mailSend(message : object)`
This function is using for sending mail based on your `.env` information. This is used [Nodemailer](https://www.npmjs.com/package/nodemailer). It is async function. In, this mail function we used `nodemailer-express-handlebars`.Mail template directory is `views\email`. If any mail was failed, It will store into fail log file in `storage\log\email` directory. 

Ex: 
```js
  var message = {
    from: "Fred Foo 👻 <foo@example.com>",
    to: ['recipient@example.com', "baz@example.com", "bar@example.com"],
    subject: "hello ", // Hello ✔
    cc : ['recipient@example.com', "baz@example.com", "bar@example.com"],
    bcc: ['recipient@example.com', "baz@example.com", "bar@example.com"],
    // html: "<h1>Hello {{ user }},</h1>",
    template:'test',
    date: new Date(),
    context: {
      user : "test",
    }
  }
    mailSend(message)
  ```

<h1 style="text-align: center"> --- Thank You --- </h1>
