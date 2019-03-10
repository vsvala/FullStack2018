const mongoose = require('mongoose')

//muistiinpanojen skeeman määrittely
const commentSchema = new mongoose.Schema({
  content: String,
  blogId: String
  //blogId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

// formatoidaa mongon sisäinen esitysmuoto frontille sopivamksi esim  _id kenttä
commentSchema.statics.format = (comment) => {
  return {
    id: comment._id,
    content: comment.content,
    blogId:comment.blog_id
  }
}

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment