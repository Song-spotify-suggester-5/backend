const router = require("express").Router();
const Songs = require("./songs-models");
const { validateSong } = require("../middleware/validateSong");
const { validateSongId } = require("../middleware/validateSongId");

router.get("/", async (req, res, next) => {
  console.log("req", req.decodedToken);
  try {
    const songs = await Songs.find();
    res.json(songs);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateSong(), async (req, res, next) => {
  try {
    const song = await Songs.add(req.body);
    res.status(201).json(song);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", validateSongId(), async (req, res) => {
  await res.json(req.song);
});

router.put("/:id", validateSong(), validateSongId(), async (req, res, next) => {
  try {
    const song = await Songs.update(req.params.id, req.body);
    res.json(song);
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", validateSongId(), async (req, res, next) => {
  await Songs.remove(req.params.id);
  res.status(200).json({ removed: req.params.id });
});

module.exports = router;
