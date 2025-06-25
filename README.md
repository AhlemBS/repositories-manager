# Angular application to manage github repositories

search GitHub repositories and view commit history


## Technologies

- Angular  20 (nothing incompabtible with 16/17 versions)
- RxJS  
- TypeScript  
- Angular Material  
- Prettier & ESLint  


## Setup

```bash
git clone https://github.com/AhlemBS/repositories-manager.git
cd repositories-manager
npm install
ng serve

 ```

 ## Usage

Open http://localhost:4200 in your browser.

http://localhost:4200/repos to search repositories by name or text

Click a repository to view its commits on the Commits page.

http://localhost:4200/commits/:ownerName/:repoName , to list all the commits of a given repository

