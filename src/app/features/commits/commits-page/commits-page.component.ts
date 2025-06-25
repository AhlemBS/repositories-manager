import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../../core/github.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Commit } from 'app/core/models/commit.interface';

@Component({
  selector: 'app-commits-page',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './commits-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitsPageComponent {
  private route = inject(ActivatedRoute);
  private github = inject(GithubService);

  commits: WritableSignal<Commit[]> = signal<Commit[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  error: WritableSignal<string | null> = signal<string | null>(null);

  readonly displayedColumns: string[] = ['author', 'message', 'url'];

  constructor() {
    const repoName: string = this.route.snapshot.paramMap.get('repoName')!;
    const ownerName: string = this.route.snapshot.paramMap.get('ownerName')!;
    if (!repoName || !ownerName) {
      this.error.set('Nom de dépôt ou propriétaire invalide.');
      return;
    }

    this.loadCommits(ownerName, repoName);
  }

  /**
   * Load commits from GitHub API and update state signals.
   * @param owner Repository owner
   * @param repo Repository name
   */
  private loadCommits(owner: string, repo: string) {
    this.isLoading.set(true);
    this.error.set(null);

    this.github.getCommits(owner, repo).subscribe({
      next: res => {
        this.commits.set(res);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors du chargement des commits.');
        this.isLoading.set(false);
      },
    });
  }
}
