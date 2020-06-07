import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async index(request: Request, response: Response){
    const {city, uf, items } = request.query;

    //Força a ser entendido como string e quebra no espaço retirando espaços a esquerda e direita
    const parsedItems = String(items)
    .split(',')
    .map((item) => {
      return Number(item.trim());
    });

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()//Pra não retornar o mesmo valor duas vezes
      .select('points.*');//retornar apenas os dados da tabela points e não de todo o join

    return response.json(points);
  }

  async show(request: Request, response: Response){
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if(!point){
      return response.status(400).json({message: 'Point id is invalid.'});
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', '=', id)
      .select('items.title');

    return response.json({point, items});
  }

  async create(request: Request, response: Response) {
    const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = request.body;

  const trx = await knex.transaction();

  const point = {
    image: 'ilustrative-image',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf
  }

  const insertedIds = await trx('points').insert(point);

  const point_id = insertedIds[0];
  const pointItems = items.map((item_id: number) => {
    return {
      point_id,
      item_id,
    }
  })

  await trx('point_items').insert(pointItems);

  await trx.commit();

  return response.json({
    id: point_id,
    ...point,
  });
  }
}

export default PointsController;