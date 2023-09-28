import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    // obtener todos los registros de la tabla posts
    const allPosts = await Post.all()
    //response es la respusta de nuesta api
    response.status(200).json({
      message: 'se obtuvieron los registros',
      data: allPosts,
    })
  }

  public async store({ request, response }: HttpContextContract) {
    //guardar en nuestra tabla post
    // request.all()
    // return request.body()
    const { nombre, direccion, telefono } = request.body()

    const post = new Post()
    post.nombre = nombre
    post.direccion = direccion
    post.telefono = telefono

    const newUser = await post.save()

    return response.status(201).json({ message: 'post creado', data: newUser })
  }

  public async show({ response, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    return response.status(200).json({ data: post })
  }

  public async update({ params, response, request }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const { nombre, direccion, telefono } = request.body()

    post.nombre = nombre
    post.direccion = direccion
    post.telefono = telefono
    post.merge(post)
    post.save()

    return response.status(201).json({ message: 'Post actualizadoo', data: post })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const postDelete = await Post.findOrFail(params.id)
    await postDelete.delete()
    return response.ok({ message: 'deleted post', data: postDelete })
  }
}
