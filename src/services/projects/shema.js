const ProjectSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
   RepoUrl: {
      type: String,
      required: true,
    },
    LiveUrl: {
        type: String,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'students',
    },
  })