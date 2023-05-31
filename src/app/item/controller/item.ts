import {inject} from "@leapjs/common";
import {Body, Controller, Delete, Get, Param, Post, Req, Res} from "@leapjs/router";
import {ItemService} from "../service/item";
import {Request, Response} from "express";
import {Item} from "../model/item";

@Controller("/items")
export class ItemController {
	@inject(ItemService)
	private readonly service!: ItemService;

	// - GET `/api/items` - Retrieve all items from the database.
	@Get("")
	public async getAllItems(@Res() res: Response): Promise<Response> {
		return res.send(this.service.getAllItems());
	}

	// - GET `/api/items/:id` - Retrieve a specific item by its ID.
	@Get("/:id")
	public async geItemsById(@Param("id") id: string, @Res() res: Response): Promise<Response> {
		return res.send(this.service.getItemById(id));
	}
	// - POST `/api/items` - Create a new item in the database.
	@Post("")
	public async postRequest(@Body() req: Item, @Res() res: Response): Promise<Response> {
		return res.send(this.service.addItem(req));
	}
	// - PUT `/api/items/:id` - Update an existing item by its ID.
	@Get("/:id")
	public async editItemsById(@Param("id") id: string, @Body() data: Item, @Res() res: Response): Promise<Response> {
		return res.send(this.service.updateItemById(id, data));
	}
	// - DELETE `/api/items/:id` - Delete an item by its ID.
	@Delete("/:id")
	public async deleteItemById(@Param("id") id: string, @Res() res: Response): Promise<Response> {
		return res.send(this.service.deleteItemById(id));
	}
}
