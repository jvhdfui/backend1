import{Router} from "express"
import {nuevoContacto, mostrarContactos, buscarPorId, editarContacto, borrarContacto, buscarContacto} from "../bd/contactoBD.js"
const router = Router()

var artistas = ["Bethoven", "Van Gog", "Mozart", "Picasso"]

router.get("/", function(req, res){
	res.render("home", {artistas})
})

router.get("/info/:c", function(req, res){
	var c = req.params.c //c corresponde a lo que se va a recibir
	console.log(c) //terminal
	res.render("información",{c})
})

router.get("/contactanos", function(req, res){
	res.render("contactanos")
})

router.post("/contactanos", async function(req, res){
	var nombre = req.body.nombre
	var edad = req.body.edad //recibir de un formulario
	console.log("Nombre: " + nombre + " Edad: " + edad)
	const respuestaMongo = await nuevoContacto(req.body)//llamar mongoDB, esperar a que termine la función
	console.log(respuestaMongo)
	res.render("respuesta", {nombre, edad}) //mandar datos {nombre, edad}
})

router.get("/mostrarContactos", async function(req, res){
	const contactosBD = await mostrarContactos()
	res.render("mostrarContactos", {contactosBD})
	//res.end()
})

router.get("/editar/:id", async function (req, res) {
	const id = req.params.id //recibir a traves del url
	const contactoBD = await buscarPorId(id)
	res.render("editarContacto", {contactoBD})
})

router.get("/editarContacto", async function (req, res) {
	const id = req.body.id//recibir a travez del formulario
	const respuestaMongo = await editarContacto(req.body)
	res.redirect("/mostrarContactos")
})

router.get("/borrar/:id", async function (req, res){
	const id = req.params.id
	const respuestaMongo = await borrarContacto(id)
	res.redirect("/mostrarContactos")//redireccionar ruta
})

router.post("/buscarContacto", async function(req, res){
	const nombre = req.body.nombre
	const contactosBD = await buscarContacto(nombre)
	res.render("mostrarContactos", {contactosBD})//llamar ejs
})

export default router