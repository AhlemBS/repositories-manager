import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Repository } from './models/repository.interface';
import { Commit } from './models/commit.interface';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  /**
   * Searches repositories based on keyword, optional language, and optional minimum stars.
   * @param term Search term (required)
   * @param language Optional programming language filter
   * @param stars Optional minimum number of stars
   * @returns Observable of a filtered list of GitHub repositories
   */
  searchRepositories(term: string, language?: string, stars?: number): Observable<Repository[]> {
    let query = term.trim();
    if (language) query += ` language:${language}`;
    if (stars) query += ` stars:>=${stars}`;

    const url = `${this.apiUrl}/search/repositories?q=${encodeURIComponent(query)}`;

    return this.http.get<{ items: Repository[] }>(url).pipe(map(res => res.items));
  }

  /**
   * Searches GitHub issues by title and retrieves their associated repositories.
   * @param term Search term
   * @returns Observable of an array of repositories related to found issues
   */
  searchReposByIssue(term: string): Observable<Repository[]> {
    const url = `${this.apiUrl}/search/issues?q=${encodeURIComponent(term)}+in:title&type=Issues`;

    return this.http.get<{ items: { repository_url: string }[] }>(url).pipe(
      map(res => res.items.map(issue => issue.repository_url)),
      switchMap((urls: string[]) => forkJoin(urls.map(url => this.http.get<Repository>(url)))),
    );
  }

  /**
   * Fetches commit history for a given GitHub repository.
   * @param owner GitHub username or organization
   * @param repo Repository name
   * @returns Observable of the commit list
   */
  getCommits(owner: string, repo: string): Observable<Commit[]> {
    const url = `${this.apiUrl}/repos/${owner}/${repo}/commits`;

    return this.http.get<Commit[]>(url, {
      headers: {
        Accept: 'application/vnd.github.cloak-preview+json',
      },
    });
  }
}
