const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "belajarmongo";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    console.error("Failed to connect to the database:", error);
    return;
  }

  //   pilih database
  const db = client.db(dbName);

  //   menambahkan 1 data di collection
  //   db.collection("mahasiswa").insertOne({
  //     nama: "budi",
  //     email: "budi@gmail.com",
  //   }, (error, result) => {
  //     if (error) {
  //       console.error("Failed to insert data:", error);
  //       return;
  //     }
  //     console.log("Data inserted successfully:", result.insertedId);
  //   });

  // menambahkan banyak data di collection
  //   db.collection("mahasiswa").insertMany(
  //     [
  //       {
  //         nama: "joko",
  //         email: "joko@gmail.com",
  //       },
  //       {
  //         nama: "mulyo",
  //         email: "mulyo@gmail.com",
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         console.error("Failed to insert multiple data:", error);
  //         return;
  //       }

  //       console.log("Multiple data inserted successfully:", result.insertedIds);
  //     }
  //   );

  //   menampilkan semua data di collection
  //   db.collection("mahasiswa")
  //     .find({ _id: ObjectId("68a339d425193ebe7aeec4a9") })
  //     .toArray((error, result) => {
  //       if (error) {
  //         console.error("Failed to retrieve data:", error);
  //         return;
  //       }
  //       console.log("Data retrieved successfully:", result);
  //     });

  //   mengubah data di collection
  //   const updatePromise = db.collection("mahasiswa").updateOne(
  //     {
  //       _id: ObjectId("68a339d425193ebe7aeec4a9"),
  //     },
  //     {
  //       $set: {
  //         nama: "alfa",
  //       },
  //     }
  //   );

  //   updatePromise
  //     .then((result) => {
  //       console.log("Data updated successfully:", result.modifiedCount);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to update data:", error);
  //     });

  //   menghapus data di collection
  db.collection("mahasiswa")
    .deleteOne({ _id: ObjectId("68a339d425193ebe7aeec4a9") })
    .then((result) => {
      console.log("Data deleted successfully:", result.deletedCount);
    })
    .catch((error) => {
      console.error("Failed to delete data:", error);
    });
});
