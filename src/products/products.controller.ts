import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDTO } from './dto/create.product.dto';
import { updateProductDTO } from './dto/update.product.dto';
import { Role } from 'src/auth/verifyRoles/roles.decorator';
import { Roles } from 'src/auth/verifyRoles/roles';
import { RolesGuard } from 'src/auth/verifyRoles/roles.guard';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchProductDTO } from './dto/search.product.dto';

@Controller('products')
@ApiTags('Products')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search for products with various parameters' })
  @ApiResponse({
    status: 200,
    description: 'List of products matching the search criteria',
  })
  @ApiResponse({
    status: 404,
    description: 'No products found matching the criteria',
  })
  async searchProducts(@Query() searchParams: SearchProductDTO) {
    return this.productService.findMany(searchParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the product', type: String })
  @ApiResponse({ status: 200, description: 'Product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getDBProductById(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of all products' })
  async getDBProducts() {
    return this.productService.findAll();
  }

  @Post('mod')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully added' })
  @ApiResponse({ status: 400, description: 'Invalid product data' })
  async addProductDB(@Body() data: CreateProductDTO) {
    return this.productService.create(data);
  }

  @Post('mod/fill')
  @Role([Roles.Admin])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add multiple products at once' })
  @ApiResponse({ status: 201, description: 'Products successfully added' })
  @ApiResponse({ status: 400, description: 'Invalid product data' })
  async addManyProducts(@Body() data: CreateProductDTO[]) {
    return this.productService.createMany(data);
  }

  @Post('mod/template-fill')
  @Role([Roles.Admin])
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Fill the database with template data from an external source',
  })
  @ApiResponse({
    status: 201,
    description: 'Database successfully filled with template data',
  })
  @ApiResponse({
    status: 400,
    description:
      'Failed to fetch template data | Cannot fill db with template data',
  })
  async fillTemplateData() {
    return this.productService.fillTemplateData();
  }

  @Delete('mod/:id')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to delete',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async deleteProductDB(@Param('id') id: string) {
    return this.productService.deleteOne(id);
  }

  @Delete('mod')
  @Role([Roles.Admin])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Clear all products from the database' })
  @ApiResponse({ status: 200, description: 'Database successfully cleared' })
  async clearDB() {
    return this.productService.clearDB();
  }

  @Patch('mod')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiResponse({ status: 200, description: 'Product successfully updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async updateItem(@Body() data: updateProductDTO) {
    return this.productService.updateItem(data);
  }
}
