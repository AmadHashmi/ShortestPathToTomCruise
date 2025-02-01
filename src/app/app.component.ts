import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraphService } from './services/graph.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  actors: string[] = [];
  selectedActor: string = '';
  shortestPath: string = '';
  constructor(private graphService: GraphService) {}
  ngOnInit(): void {
    /**
     * loading actors from graph service
     */
    this.actors = this.graphService.getActors();
  }

  /**
   * method called when an actor
   * is selected and button clicked
   */
  findPath(): void {
    if (this.selectedActor) {
      this.shortestPath = this.graphService.findShortestPath(
        this.selectedActor
      );
    }
  }
}
