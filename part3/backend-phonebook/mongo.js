const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.gey3fqx.mongodb.net/phoneBookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    //     const person = new Person({
    //       name: "Cooks",
    //       number: 123456789,
    //     });

    //     return person.save();
    //   })
    return Person.find({});
  })
  .then((people) => {
    people.forEach((person) => {
      console.log(person);
    });
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
