import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
/*
Graph service to build a graph of actors and
movies and find the shortest path to Tom Cruise.
*/
export class GraphService {
  private movies: Movie[] = [];
  private adjacencyList: Map<string, string[]> = new Map();

  constructor() {
    this.loadMovies();
    this.buildGraph();
  }

  private loadMovies(): void {
    this.movies = [
      new Movie('Diner', [
        'Steve Guttenberg',
        'Daniel Stern',
        'Mickey Rourke',
        'Tom Cruise',
      ]),
      new Movie('Footloose', ['Tom Cruise', 'Lori Singer', 'Dianne Wiest']),
      new Movie('Flatliners', [
        'Kiefer Sutherland',
        'Julia Roberts',
        'Tom Cruise',
      ]),
      new Movie('Eat Pray Love', [
        'Julia Roberts',
        'Javier Bardem',
        'Billy Crudup',
      ]),
      new Movie('Spotlight', [
        'Mark Ruffalo',
        'Michael Keaton',
        'Rachel McAdams',
      ]),
    ];
  }

  private buildGraph(): void {
    this.movies.forEach((movie) => {
      movie.cast.forEach((actor) => {
        if (!this.adjacencyList.has(actor)) {
          this.adjacencyList.set(actor, []);
        }
        this.adjacencyList.get(actor)?.push(movie.title);

        movie.cast.forEach((coActor) => {
          if (actor !== coActor) {
            this.adjacencyList.get(actor)?.push(coActor);
          }
        });
      });
    });

    console.log(this.adjacencyList);
  }

  public findShortestPath(startActor: string): string {
    if (!this.adjacencyList.has(startActor)) return 'Actor not found.';

    let queue: [string, string[]][] = [[startActor, []]];
    let visited = new Set<string>();

    while (queue.length > 0) {
      let [actor, path] = queue.shift()!;

      console.log([actor, path]);
      if (actor === 'Tom Cruise') return path.concat(actor).join(' => ');

      if (!visited.has(actor)) {
        visited.add(actor);
        let neighbors = this.adjacencyList.get(actor) || [];
        for (let neighbor of neighbors) {
          queue.push([neighbor, path.concat(actor)]);
        }
      }
    }
    return 'No path found.';
  }

  public getActors(): string[] {
    return Array.from(this.adjacencyList.keys());
  }
}
