import { Component, ChangeDetectionStrategy, signal, WritableSignal } from '@angular/core';
import { GithubService } from '../../../core/github.service';
import { Router } from '@angular/router';
import { Subject, combineLatest, Observable, of } from 'rxjs';
import { debounceTime, switchMap, startWith, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Repository } from 'app/core/models/repository.interface';

@Component({
  selector: 'app-repos-page',
  templateUrl: './repos-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
  ],
})
export class ReposPageComponent {
  private searchTerm$ = new Subject<string>();
  private language$ = new Subject<string>();
  private stars$ = new Subject<number>();

  isLoading: WritableSignal<boolean> = signal(false);
  repos$: Observable<Repository[]>;
  readonly displayedColumns: string[] = ['avatar', 'name', 'created_at'];

  constructor(
    private github: GithubService,
    private router: Router,
  ) {
    this.repos$ = combineLatest([
      this.searchTerm$.pipe(startWith(''), debounceTime(300)),
      this.language$.pipe(startWith('')),
      this.stars$.pipe(startWith(0)),
    ]).pipe(
      switchMap(([term, language, stars]) => {
        if (!term || term.length < 3) {
          this.isLoading.set(false);
          return of([]);
        }
        this.isLoading.set(true);
        return this.github
          .searchRepositories(term, language || undefined, stars || undefined)
          .pipe(finalize(() => this.isLoading.set(false)));
      }),
    );
  }

  /**
   * Handles search term changes from input.
   * @param term User input search term string.
   */
  onSearchTerm(term: string): void {
    this.searchTerm$.next(term);
  }

  /**
   * Handles language filter changes.
   * @param language Programming language filter.
   */
  onLanguageChange(language: string): void {
    this.language$.next(language);
  }

  /**
   * Handles stars filter changes.
   * Parses string input to number safely.
   * @param stars Number of stars as string.
   */
  onStarsChange(stars: string): void {
    const starsNumber = parseInt(stars, 10);
    this.stars$.next(isNaN(starsNumber) ? 0 : starsNumber);
  }

  /**
   * Navigate to the commits page for a selected repository.
   * @param repo Selected repository object.
   */

  viewCommits(repo: Repository): void {
    this.router.navigate(['/commits', repo.owner.login, repo.name]);
  }
}
