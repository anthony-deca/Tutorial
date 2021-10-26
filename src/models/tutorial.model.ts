import mongoose from 'mongoose';

const tutorialSchemaObject = {
title: {
    type: String,
    required: true,
},
description: {
    type: String,
    required: true,
},
published: {
    type: Boolean,
    default: false,
    required: true,
}
}

const tutorialSchema = new mongoose.Schema(tutorialSchemaObject, {timestamps:true});

export default mongoose.model("Tutorial", tutorialSchema);