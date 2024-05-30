import { 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Body, 
    Query,
    Req,
    Res
} from '@nestjs/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    
    @Get()
    getAll(@Req() req, @Res() res): Movie[] {
        return this.moviesService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') movieId: number): Movie {
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    // Body 유효성 검사 필요
    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData); 
    }

    @Delete(':id')
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }

    // Body 유효성 검사 필요
    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        return this.moviesService.update(movieId, updateData);
    }
}
