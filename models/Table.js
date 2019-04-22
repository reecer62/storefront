const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const TableSchema = new Schema({
  table_id: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  table_password: {
    type: String,
    required: true
  }
})

// Authenticate input against database
TableSchema.statics.authenticate = function(
  table_id,
  table_password,
  callback
) {
  Table.findOne({ table_id: table_id }).exec(function(err, table) {
    if (err) {
      return callback(err)
    } else if (!table) {
      const err = new Error("Table not found.")
      err.status = 401
      return callback(err)
    }
    bcrypt.compare(table_password, table.table_password, function(err, result) {
      if (result === true) {
        return callback(null, table)
      } else {
        console.log(table_password + "\n" + table.table_password + "\n" + table)
        return callback()
      }
    })
  })
}

// Hash password before saving it to the db
TableSchema.pre("save", function(next) {
  let table = this
  bcrypt.hash(table.table_password, 10, function(err, hash) {
    if (err) {
      return next(err)
    }
    table.table_password = hash
    next()
  })
})

// Create collection and schema
const Table = mongoose.model("Tables", TableSchema)

module.exports = Table
