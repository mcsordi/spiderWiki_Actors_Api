const express = require("express");
const mongoose = require("mongoose");
let dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
mongoose.connect(process.env.BASE_URL);
const Actor = mongoose.model("Actor", {
  nameActor: String,
  character: String,
  description: String,
  image_url: String,
  poster_url: String,
});
app.get("/", async (req, res) => {
  const getAllActors = await Actor.find();
  res.json(getAllActors);
});
app.get("/:name", async (req, res) => {
  const nameActor = req.params.name;
  const getAllActors = await Actor.find({
    nameActor: { $regex: nameActor, $options: "i" },
  });
  res.json(getAllActors);
});
app.post("/", async (req, res) => {
  const actor = new Actor({
    nameActor: req.body.nameActor,
    character: req.body.character,
    description: req.body.description,
    image_url: req.body.image_url,
    poster_url: req.body.poster_url,
  });
  await actor.save();
  res.json(actor);
});

app.delete("/:id", async (req, res) => {
  const thisId = req.params.id;
  const deleteActor = await Actor.findByIdAndDelete(thisId);
  res.json(deleteActor);
});
app.put("/:id", async (req, res) => {
  const thisId = req.params.id;
  const updateActor = await Actor.findByIdAndUpdate(
    thisId,
    {
      nameActor: req.body.nameActor,
      character: req.body.character,
      description: req.body.description,
      image_url: req.body.image_url,
      poster_url: req.body.poster_url,
    },
    {
      new: true,
    }
  );
  res.json(updateActor);
});
app.listen(port, () => {
  console.log("running aplication");
});
