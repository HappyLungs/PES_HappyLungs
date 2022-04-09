To develop each task we are going to create a new branch. First we get info about the branch where we are in and with `git checkout` we change of branch.

```
git stash
git checkout -b Branch/Of/Task
```

Execute the following commands to push:

```
git status
git add -A
git commit -m "task #34 Configurar l'idioma"
git pull
git push
```

To merge your branch with the main branch go to github > branches and push the botton "New pull request"
