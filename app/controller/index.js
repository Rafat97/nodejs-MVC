"use strict";

async function  name(req, res, next) {
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
  // mailSend(message)
  res.render("index", { title: "Express" });
}

module.exports = name;
