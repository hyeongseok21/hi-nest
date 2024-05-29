import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number):Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    deleteOne(id: number) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto) {
        return this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }

    // 문제. updateDTO에 validation을 할 수 없음
    update(id: number, updateData: UpdateMovieDto) {
        // 기존 movie 찾기
        const movie = this.getOne(id);
        // 기존 movie 삭제
        this.deleteOne(id);
        // 기존 movie에 updateData를 추가한 movie elem을 만들어 movies에 삽입
        this.movies.push({...movie, ...updateData});
    }
}
