const mongoose = require("mongoose");
const schema = mongoose.schema;

const studentschema = new schema({

    name :{
        type:String,
        required:true

    },

    age :{

        type:Number,
        required:true
    }
})