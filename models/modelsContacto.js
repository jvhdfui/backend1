import mongoose from "mongoose"
const contactoSchema = new mongoose.Schema({
	nombre:{
		type: String,
		required: true,
		trim:true, //aceptar espacios
		unique: false
	},
	edad:{
		type: Number,
		required: true,
		trim: true,
		unique: false
	}
})

export default mongoose.model("contacto", contactoSchema)