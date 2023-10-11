const mongoose = require('mongoose')
const Joi = require('joi')

const postSchema = mongoose.Schema(
    {
      title:String,
      description: String, 
      departmentCode: String,
      date: String,
      publishedBy: String,
      location: String,

    }
);

const Post = mongoose.model('Post', postSchema);

function validatePost(post)
{
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(50).required(),
    departmentCode: Joi.string().min(3).max(50).required(),
    date: Joi.string().min(3).max(50).required(),
    publishedBy: Joi.string().min(3).max(50).required(),
    location: Joi.string().min(3).max(50).required(),


});
return schema.validate(post);
}
module.exports = {Post, validatePost};