const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find({}));
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {

  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getById = async (req, res) => {
  try {
    const testi = await Testimonial.findById(req.params.id);
    if (!testi) res.status(404).json({ message: 'Not found' });
    else res.json(testi);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK', newTestimonial });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.update = async (req, res) => {

  const { author, text } = req.body;

  try {
    const tes = await Testimonial.findById(req.params.id);
    if(tes) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text }});
      res.json({ message: 'Document edited', tes });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const testi = await Testimonial.findById(req.params.id);
    if (testi) {
      await testi.deleteOne({ _id: req.params.id });
      res.json({ message: 'Deleted', testi });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};