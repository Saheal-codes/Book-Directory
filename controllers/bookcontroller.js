const { randomUUID } = require("crypto");
const fs = require("fs");

let all_books = fs.readFileSync(__dirname + "/books.json", "utf8").toString();
all_books = JSON.parse(all_books);

exports.getallbooks = (req, res) => {
  try {
    res
      .status(200)
      .send({ message: "All Books Fetched Successfully", all_books });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
exports.getbook = (req, res) => {
  try {
    let book = all_books.filter((book) => book.id == req.params.id);
    res.send(book);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.createbook = (req, res) => {
  try {
    console.log(all_books);
    let new_book = {
      ...req.body,
      id: randomUUID(),
    };
    all_books.push(new_book);
    fs.writeFileSync(__dirname + "/books.json", JSON.stringify(all_books));
    res.send({ message: "BOOK ENTRY created !", new_book });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.updatebook = (req, res) => {
  try {
    let book;
    all_books = all_books.map((b) => {
      if (b.id === req.params.id) {
        book = {
          ...req.body,
          id: req.params.id,
        };
        return book;
      }
      return b;
    });
    fs.writeFileSync(__dirname + "/books.json", JSON.stringify(all_books));
    res.send({ message: "BOOK ENTRY updated !", book });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
exports.deletebook = (req, res) => {
  try {
    all_books = all_books.filter((book) => book.id != req.params.id);
    fs.writeFileSync(__dirname + "/books.json", JSON.stringify(all_books));
    res.send({ message: "BOOK ENTRY deleted !", all_books });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
