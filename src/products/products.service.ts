import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { updateProductDTO } from './dto/update.product.dto';
import { CreateProductDTO } from './dto/create.product.dto';
import { Product } from './model/product.schema';
import { SearchProductDTO } from './dto/search.product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name, 'products') private productModel: Model<Product>,
  ) {}
  async findAll() {
    try {
      return this.productModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      let objectId = await this.convertToObjectID(id);

      let response = await this.productModel.findById(objectId).exec();
      if (!response)
        throw new NotFoundException(`Product with id - ${id} doesn't  exists`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findMany(params: SearchProductDTO) {
    try {
      let response = await this.productModel.find(params).exec();
      if (!response)
        throw new NotFoundException(
          `Product with this parameters doesn't find`,
        );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(product: Product) {
    try {
      let dbProduct = await this.productModel.create(product);
      return { message: 'Product successfully added', dbProduct };
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id: string) {
    try {
      let objectId = await this.convertToObjectID(id);
      let response = await this.productModel.findByIdAndDelete(objectId);

      if (!response)
        throw new NotFoundException(`Product with id - ${id} doesn't  exists`);

      return { message: `Product with id - ${id} successfully deleted` };
    } catch (error) {
      throw error;
    }
  }

  async clearDB() {
    try {
      let response = await this.productModel.deleteMany().exec();
      return {
        message: `Database ${response.deletedCount > 0 ? 'successfully cleared' : 'is already empty'}. Deleted ${response.deletedCount} data's`,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateItem({ id, data }: updateProductDTO) {
    try {
      let objectId = await this.convertToObjectID(id);
      let response = await this.productModel.findByIdAndUpdate(objectId, data);

      if (!response)
        throw new NotFoundException(`Product with id - ${id} doesn't  exists`);

      return { message: 'Object successfully updated' };
    } catch (error) {
      throw error;
    }
  }

  async fillTemplateData() {
    try {
      let fetchData: CreateProductDTO[] = await this.fetchTemplateData();

      if (!fetchData) {
        throw new BadGatewayException('Cannot fill db with template data');
      } else {
        let results = await this.productModel.create(fetchData);
        return results;
      }
    } catch (error) {
      throw error;
    }
  }

  private async convertToObjectID(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID format');
      }
      return new Types.ObjectId(id);
    } catch (error) {
      throw error;
    }
  }

  async createMany(data: Product[]) {
    try {
      await Promise.all(
        data.map(async (product: Product) => {
          try {
            let response = await this.create(product);
            if (!response) throw new BadGatewayException();
          } catch (error) {
            throw error;
          }
        }),
      );

      return {
        message: `Successfully added ${data.length} data(s) to database.`,
      };
    } catch (error) {
      throw error;
    }
  }

  private async fetchTemplateData() {
    try {
      let fetchData = await fetch('https://fakestoreapi.com/products');

      if (fetchData.ok) {
        let fetchJSON: CreateProductDTO[] = await fetchData.json();
        return fetchJSON;
      } else {
        throw new BadGatewayException('Cannot get fetch data');
      }
    } catch (error) {
      throw error;
    }
  }
}
